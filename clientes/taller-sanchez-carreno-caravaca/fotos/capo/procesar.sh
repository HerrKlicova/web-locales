#!/usr/bin/env bash
# Procesa el vídeo del capó de Higgsfield para la web.
#   bash fotos/capo/procesar.sh material/capo/capo-original.mp4          (color)
#   bash fotos/capo/procesar.sh material/capo/capo-original.mp4 --bn     (blanco y negro)
# (el original de Kling vive en material/, fuera de git: pesa 11 MB)
# Saca: public/video/capo-1080.mp4 (escritorio), public/video/capo-movil.mp4 (recorte 4:5) y
# los fotogramas inicial y final como JPEG, para el LCP y para el modo de movimiento reducido.
# Con --bn pasa todo por la LUT de fotos/bn/etalonaje.mjs (la genera si no está) y escribe
# public/video/capo-bn-*.mp4 y fotos/bn/capo-*.jpg: vídeo y fotogramas salen del mismo
# etalonaje, así que el cambio de la foto al vídeo no se nota.
# Fotograma clave cada 4 cuadros y sin cuadros B: así se puede saltar a cualquier punto del
# vídeo casi al instante, que es lo que necesita un vídeo que sigue al scroll.
set -euo pipefail
FF="/c/Program Files/BlueStacks_nxt/ffmpeg.exe"
ORIGEN="$1"
MODO="${2:-}"
D="$(dirname "$0")"
PUB="$(dirname "$0")/../../public/video"
mkdir -p "$PUB"

# Todo se lleva primero a 1920 × 1080 exactos (Kling entrega 1928 × 1076: la diferencia es
# del 0,4 % y no se ve). Así el recorte de móvil es siempre el mismo que usa Capo.astro:
# 864 × 1080 empezando en x = 528.
BASE="scale=1920:1080:flags=lanczos,setsar=1"
RECORTE="crop=864:1080:528:0"
VIDEO="$PUB/capo"
FOTO="$D/"

if [ "$MODO" = "--bn" ]; then
  LUT="$D/../../material/bn.cube"
  [ -f "$LUT" ] || node "$D/../bn/etalonaje.mjs"
  # La ruta va relativa: en un filtro de ffmpeg los dos puntos de «C:» harían de separador.
  LUT_REL="$(realpath --relative-to="$PWD" "$LUT")"
  BASE="$BASE,lut3d=file=$LUT_REL:interp=tetrahedral"
  VIDEO="$PUB/capo-bn"
  FOTO="$D/../bn/capo-"
fi

COMUN=(-an -c:v h264_nvenc -preset p7 -rc vbr -cq 30 -b:v 0 -g 4 -bf 0 -profile:v high -pix_fmt yuv420p -movflags +faststart)
"$FF" -hide_banner -loglevel error -y -i "$ORIGEN" -vf "$BASE" "${COMUN[@]}" "$VIDEO-1080.mp4"
"$FF" -hide_banner -loglevel error -y -i "$ORIGEN" -vf "$BASE,$RECORTE,scale=720:900:flags=lanczos" "${COMUN[@]}" "$VIDEO-movil.mp4"

# Fotogramas: el primero y el último, a tamaño completo y en su recorte de móvil.
"$FF" -hide_banner -loglevel error -y -i "$ORIGEN" -frames:v 1 -vf "$BASE" -q:v 2 "${FOTO}inicio.jpg"
"$FF" -hide_banner -loglevel error -y -sseof -0.06 -i "$ORIGEN" -frames:v 1 -vf "$BASE" -q:v 2 "${FOTO}final.jpg"
"$FF" -hide_banner -loglevel error -y -i "$ORIGEN" -frames:v 1 -vf "$BASE,$RECORTE" -q:v 2 "${FOTO}inicio-movil.jpg"
"$FF" -hide_banner -loglevel error -y -sseof -0.06 -i "$ORIGEN" -frames:v 1 -vf "$BASE,$RECORTE" -q:v 2 "${FOTO}final-movil.jpg"

ls -la "$VIDEO"-*.mp4 "${FOTO}"inicio*.jpg "${FOTO}"final*.jpg | awk '{printf "  %-52s %6d KB\n", $9, $5/1024}'
