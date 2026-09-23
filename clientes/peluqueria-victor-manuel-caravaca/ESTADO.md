# Peluquería de Caballeros Víctor Manuel (Caravaca de la Cruz) — estado del trabajo

Última actualización: 23/09/2026. Para retomar en otra sesión: leer este archivo, `CLAUDE.md`,
`rotacion.md` (fila 5), `ficha.json` e `investigacion.md`.

**Lead 03.** Hechos los 10 pasos de §2. Demo desplegada y comprobada en vivo, en el Worker de
todas las demos:
**https://webs-locales-demo.webs-locales.workers.dev/peluqueria-victor-manuel-caravaca-3fqkz5/**

## Dónde está publicada
- Primero se desplegó en un **Worker aparte** (`webs-locales-demo-peluqueria`), porque `dist/demo`
  tenía una versión del taller construida y sin aprobar, y subir `dist/demo` la habría publicado.
- Después la sesión del taller publicó el Worker compartido con `dist/demo` entero, que ya llevaba
  esta demo: desde entonces está también en la dirección de arriba. Comprobado el 23/09 a las 16:45:
  las dos sirven el mismo `index.html` (mismo sha1) con `noindex`.
- El Worker aparte sobra: se puede borrar cuando Eugenio quiera
  (`npx wrangler delete --name webs-locales-demo-peluqueria`).
- Para volver a publicar: `node scripts/demo.mjs peluqueria-victor-manuel-caravaca` solo si ninguna
  otra sesión tiene trabajo sin publicar en `dist/demo`; si no, construir solo esta
  (`CLIENTE=peluqueria-victor-manuel-caravaca DEMO=true PRODUCCION= npx astro build`) y comparar las
  demás rutas con lo publicado antes de `npx wrangler deploy`.

## La dirección: el escaparate
La web es su fachada vista desde la acera, sacada de la foto de su fachada en Google (solo para
los colores; esa foto es de un cliente y no se usa):
- **El rótulo** (`Rotulo.astro`): su caja de luz azul noche con el filete blanco, «Víctor Manuel» en
  letra de pincel (Satisfy; la primera candidata, Mr Dafoe, escondía la tilde de la í bajo la V) y
  «PELUQUERÍA MASCULINA» debajo. En HTML, no imagen. Es la cabecera y se queda arriba; en el móvil
  lleva el teléfono a la derecha. El rótulo real dice también «Desde 2007»: no va, porque no está
  confirmado (`anio_apertura: null`).
- **La cristalera** (`Cristalera.astro`): rejilla de perfiles azules (4 × 3 en escritorio, con la
  primera fila baja como un montante; 2 × 3 en móvil). Los paños claros dejan ver el vídeo; los de
  vinilo esmerilado (color sólido con luz de techo, sin `backdrop-filter`) llevan el texto. Manda la
  frase de Víctor, «Corto a tijera, como los de antes.»; el h1 (tipo de negocio y pueblo) va como el
  vinilo pequeño de encima. En el montante de la puerta, el número de la calle.
- **La puerta**: el paño alto de la derecha es WhatsApp: hoja con marco y tirador, que al pasar el
  ratón se abre un poco desde la bisagra, y el vinilo del horario como la puerta de verdad. En el
  móvil es la barra fija de abajo (`PuertaMovil.astro`), con «Llamar» al lado. En las dos: «Abierto
  ahora, hasta las 13:30» / «Ahora cerrado, abrimos a las 16:30» con la hora de Madrid
  (`Estado.astro`; versión corta en la barra) y el cartel colgado de «abierto», lleno o en contorno.
- **El resto** sigue la misma rejilla, con un travesaño más grueso entre bloques: servicios como
  lista de precios (puntos guía y el hueco `[PRECIO]` en gris) y «Solo efectivo.» en grande;
  horario partido en mañana y tarde (como el vinilo de su puerta) con la fila de hoy encendida y
  un «hoy» en rojo; las 7 reseñas tal cual; seis dudas y «¿Te guardo hora?»; dónde está, con un
  **plano propio** de OpenStreetMap (`mapa/plano.mjs`, sin iframe ni cookies) y la peluquería
  marcada con su rótulo en pequeño; pie con el rótulo encendido.
- Las fotos B y C van detrás de varios paños de cristal cruzados por perfiles, como la portada. La
  D (manos) va entera: un perfil caía justo sobre el peine.

## El gesto: encender
- Al cargar: el halo del rótulo crece (760 ms, salida suave, sin parpadeo), se ilumina la cara de
  la caja y las letras; a los 0,78 s se enciende la luz de dentro (la cristalera sale de la
  penumbra) y el peluquero se pone a cortar. El nombre y el titular se ven desde el primer
  fotograma.
- Al bajar: cada paño entra con un velo azul tenue (0,18; nunca invisible) y se enciende cuando ya
  ha subido un 18 % de la pantalla (750 ms), de izquierda a derecha, 70 ms entre uno y otro. En el
  horario se enciende la fila de hoy.
- Movimiento reducido: sin penumbra, sin vídeo y el halo solo se funde. Los fundidos de los paños,
  el hover de la puerta y el de los botones siguen vivos (§7). Sin JS: todo encendido y legible.
- El vídeo se puede parar con el botón de abajo a la izquierda del cristal (WCAG 2.2.2).
- Sin GSAP: nada lo necesitaba. JS total en línea: ~2 KB comprimido.

## Fotos y vídeo (Higgsfield) — detalle en `fotos/prompts.md`
- **Foto A**: 3 rondas de 4. La elegida es la única con la tijera sobre peine bien hecha; asomaba
  el mentón del peluquero y se recortó por arriba manteniendo el 16:9.
- **B, C, D**: con A de referencia, 4:5. B se repitió (salió con un espejo) y se retocó una marca
  ilegible en la hoja de la tijera.
- **Vídeo**: Kling 3.0 pro, 8 s. En los dos intentos se asomaba un hombre con la cara a la vista
  por la ventana del fondo. El bucle se montó con los tramos limpios del segundo
  (`fotos/video/montar.py` + `procesar.sh`): 4 s, 619 KB en escritorio y 197 KB en móvil (4:5).
- Gasto: 60 créditos justos, el tope.

## Comprobaciones (23/09/2026)
- **Datos**: Google coincide con la ficha (horario, teléfono, 4,8 con 103 reseñas).
- **Lighthouse en vivo, móvil**: rendimiento 100, accesibilidad 100, buenas prácticas 100 (SEO 66
  solo por el `noindex`). LCP 1,5 s, CLS 0, TBT 0. En local, escritorio 100/100/100.
- **Con el vídeo en marcha** (Chrome, 390 × 844, red lenta y CPU × 4): LCP 0,74 s (la frase y la
  foto, no el vídeo), CLS 0, INP 16 ms.
- **Texto (§5)**: cero palabras y construcciones prohibidas; el único «—» es el del `<title>` (§9).
- **Adversarial (§13)**: sin scroll horizontal a 320, 390, 768, 1024, 1280, 1440, 1920, 844 × 390
  y zoom 200 %, ni con nombres, precios y calles larguísimos; consola limpia; sin enlaces muertos;
  sin JS se lee todo; sin imágenes, los `alt` cuentan qué había; al recargar a media página no
  queda nada en blanco; con movimiento reducido no hay vídeo y el hover de la puerta sigue.
- **Estado de la puerta** probado a 11 horas de la semana y con el teléfono en otra zona horaria.
- **impeccable critique** (dos agentes): 25/32 antes del pulido. Arreglados sus 2 P1 y 3 P2 (rejilla
  uniforme, jerarquía, perfil sobre la tijera, puerta poco distinguible, dirección y final) y los
  menores. Copia en `.impeccable/critique/`.
- **En vivo**: `X-Robots-Tag: noindex` y meta `noindex`; vídeo con peticiones parciales (206).

## Decisiones que conviene no deshacer
- **El encuadre depende de la orientación**: toda pantalla vertical usa el vídeo 4:5.
- **Parado, el vídeo se oculta y se ve la foto** (primer fotograma del bucle); al volver a la vista
  arranca desde el principio, que es el mismo fotograma: el cambio no se ve.
- **El vídeo se pide tras la carga** (`requestIdleCallback`) y no arranca antes de que se encienda
  la luz de dentro. Sin vídeo con movimiento reducido, ahorro de datos o 2G.
- **El rojo va en segundo plano**: solo el «hoy» del horario y el anillo de foco. La web
  anterior (el taller) lleva el rojo de su marca; por eso el «abierto» es un cartel colgado y no un
  piloto rojo (el taller usa pilotos). Ver la comprobación de la fila 5 en `rotacion.md`.
- **Sin priceRange ni imágenes en el schema**: no hay precios y las fotos son de muestra.
- **El estado dice «abrimos»** aunque el resto hable en primera persona del singular: es la frase
  que pidió Eugenio.

## Pendiente
- **Precios**: los cuatro servicios llevan `[PRECIO]`. Google enseña una franja de 1 a 20 € que no
  es un precio suyo y no se usa.
- **Año de apertura**: el rótulo real parece decir «Desde 2007»; si lo confirma, puede ir en el
  rótulo de la web.
- **Fotos reales** del local cuando las ceda (§6): las de ahora y el vídeo son de muestra y la web
  lo dice.
- Producción (§11): dominio, quitar `noindex`, sitemap y robots, aviso legal con titular y NIF.
- Borrar el Worker aparte `webs-locales-demo-peluqueria` (ya no hace falta).
- Nada guardado en git todavía.
