# CLAUDE.md — Webs para negocios locales (Región de Murcia)

Este repo produce webs de una página para negocios locales **sin web** (bares, barberías, talleres, fisios, casas rurales…). Cada web se construye **antes** de contactar al negocio y se le enseña ya terminada. El objetivo es que parezca hecha a mano por un estudio, nunca una plantilla.

Idioma de todo el contenido: **español de España**. Tono cercano, frases cortas, sin jerga de marketing.

---

## 1. Stack

- **Astro + Tailwind**, salida estática.
- **Cloudflare Pages** para el despliegue (`wrangler`).
- **GSAP** (gratis, incluidos SplitText y ScrollTrigger), solo donde CSS no llegue (ver §5).
- **Formularios:** Web3Forms. Sin backend propio.
- **Analítica:** Cloudflare Web Analytics (sin cookies). Sin Google Analytics salvo que el cliente lo pida.

Estructura:
```
/plantilla            ← componentes base (Hero, Precios, Horario, Galeria, Resenas, Mapa, Footer, Legal)
/clientes/<slug>/     ← una carpeta por negocio
    ficha.json        ← datos reales del negocio (§8)
    fotos/            ← fotos reales cedidas o generadas con Higgsfield
    src/              ← web del cliente, generada desde /plantilla
```

## 2. Plugins y orden de trabajo

Instalados: frontend-design, impeccable, gsap-skills, chrome-devtools-mcp, claude-seo, cloudflare, astro-docs MCP, Higgsfield MCP. No instalar otros skills de diseño: se pisan entre ellos.

Orden para cada web (`/nuevo-negocio <slug>`):
1. Leer `clientes/<slug>/ficha.json`.
2. **frontend-design**: decidir dirección visual (§3) y montar la página desde `/plantilla`.
3. **Higgsfield**: generar las fotos que falten (§4).
4. **gsap-skills**: añadir el momento de animación del hero y los reveals (§5).
5. **impeccable**: pasada de `critique` y luego `polish`.
6. **claude-seo**: schema LocalBusiness, títulos, metadatos (§7).
7. **chrome-devtools**: capturas en móvil 390 px y escritorio 1440 px, Lighthouse y traza de rendimiento (§6). Corregir hasta cumplir.
8. **cloudflare**: desplegar como demo (§9).

Nunca saltarse el paso 7.

## 3. Dirección visual

### Qué funciona (y por qué)
- **Tipografía grande y con carácter.** Un titular claro y bien dimensionado es de lo que más influye en que alguien se quede. Una fuente de display distintiva + una de texto sobria.
- **Estructura simple.** Pocas secciones, un solo objetivo por página, una llamada a la acción obvia. La causa n.º 1 de que una web local no convierta es que el visitante no sabe qué hacer después.
- **Fotos reales del sitio y la gente.** Transmiten más confianza que cualquier recurso gráfico. Las fotos de banco genéricas restan.
- **Prueba social visible:** reseñas reales de Google, años en el pueblo, dirección.
- **Móvil primero.** La mayoría de visitas llegan desde el móvil, y el cliente verá la demo en WhatsApp.

### Cómo elegir la dirección de cada negocio
Sacar la estética del **mundo físico del propio negocio**, no de una tendencia:
- Barbería clásica → rótulo de escaparate en pan de oro, pizarra de precios, azulejo, cuero.
- Bar de tapas → pizarra de tiza, servilleta de papel, barra de mármol, carta escrita a mano.
- Taller mecánico → placa de chapa esmaltada, grasa, señalética industrial, números de pieza.
- Casa rural → piedra, cal, esparto, mapa topográfico de la sierra.
- Pueblo concreto → un detalle local real (río, fiesta, monumento) en el copy, no como decoración.

Cada web tiene **un solo elemento memorable** (el rótulo, la pizarra, una foto enorme) y todo lo demás callado y ordenado.

### Prohibido (delata que es IA)
- Fondo crema + serif + acento terracota; negro + un único acento verde ácido o bermellón.
- Degradados decorativos, tarjetas idénticas con la misma sombra gris, bordes de color a la izquierda.
- Etiquetas en MAYÚSCULAS espaciadas encima de cada título; numeración 01/02/03 si no es una secuencia real.
- Poner en otro color o cursiva una sola palabra del titular.
- Inter, Roboto, Arial, Poppins como fuente principal.
- Emojis como iconos. Usar SVG de trazo.
- Flechas "→" pegadas a los botones.
- Estadísticas o reseñas inventadas.

## 4. Fotografía

Prioridad: **1)** fotos reales cedidas por el cliente → **2)** fotos de Higgsfield → **3)** hueco marcado con la etiqueta de lo que va.

Nunca usar fotos de su Instagram o de Google Maps sin permiso escrito.

### Reglas para Higgsfield
- Fotografía realista, luz natural, lugar creíble de un pueblo de Murcia (no un loft de Nueva York).
- Sin texto ni logos dentro de la imagen.
- Sin caras en primer plano: manos trabajando, herramientas, detalles, espacios, personas de espaldas o desenfocadas. Las caras generadas son lo que antes se nota falso.
- Misma paleta y misma luz en todas las fotos de una web.
- Hero horizontal 16:9 para escritorio y recorte vertical 4:5 para móvil.
- Registrar el prompt usado en `clientes/<slug>/fotos/prompts.md`.

### Técnica
- Formatos AVIF/WebP con `<Image>` de Astro; `width` y `height` siempre (evita saltos de maquetación).
- Imagen del hero: `loading="eager"` y `fetchpriority="high"`. Todas las demás: `loading="lazy"`.
- Hero ≤ 200 KB en móvil.

## 5. Animación

Principio: **un solo momento orquestado** (la entrada del hero) y reveals discretos al hacer scroll. Nada de animar cada tarjeta ni poner hover en todo.

- **Reveals al scroll y parallax suave:** CSS nativo con `animation-timeline: view()` / `scroll()`. Funciona en Chrome/Edge y en Safari desde la versión 26; Firefox todavía lo tiene tras un flag. Envolver siempre en `@supports (animation-timeline: view())`: si no hay soporte, el contenido se ve sin animar.
- **GSAP solo para:** la secuencia del hero (timeline), SplitText en el titular y efectos que CSS no pueda hacer. Cargarlo solo en la página que lo use.
- Animar únicamente `transform` y `opacity`.
- El titular y la imagen del hero **se ven desde el primer frame**: la animación no puede retrasar el LCP. Nada de empezar con `opacity: 0` en el elemento LCP.
- Todo dentro de `@media (prefers-reduced-motion: no-preference)`.
- Duraciones de 400–900 ms, `ease-out`. Nada de rebotes.

## 6. Rendimiento (obligatorio antes de enseñar la demo)

Medido en móvil con chrome-devtools:
- **LCP < 2,5 s**, **INP < 200 ms**, **CLS < 0,1**.
- Lighthouse: Rendimiento, Accesibilidad, Buenas prácticas y SEO ≥ 95.
- JavaScript total ≤ 50 KB comprimido (sin contar GSAP si se usa).
- Máximo 2 familias tipográficas, `font-display: swap`, solo los pesos que se usan.
- Contraste de texto ≥ 4,5:1. Objetivos táctiles ≥ 44 px.

## 7. SEO local

- Un solo `<h1>` con el tipo de negocio y el pueblo.
- `<title>`: `Nombre — Tipo de negocio en Pueblo`. Meta description con lo que ofrece y cómo contactar.
- Schema `LocalBusiness` (o el subtipo: `BarberShop`, `Restaurant`, `AutoRepair`…) con dirección, teléfono, coordenadas, horario, `areaServed` y enlace a Google Maps.
- Nombre, dirección y teléfono **idénticos** a su ficha de Google Business.
- Enlace a su ficha de Google y botón "Cómo llegar".
- Sitemap y `robots.txt` solo en producción (ver §9).

## 8. Estructura de página y `ficha.json`

Orden por defecto (adaptar si el negocio lo pide):
1. **Hero:** qué es + dónde + botón principal (WhatsApp o llamar).
2. **Servicios/carta con precios.**
3. **Horario.**
4. **Fotos del local.**
5. **Reseñas reales de Google** (copiadas tal cual, con nombre).
6. **Dónde estamos:** mapa + dirección + "Cómo llegar".
7. **Pie:** contacto + aviso legal, privacidad y cookies.

En móvil, botón de WhatsApp fijo abajo a partir de la primera pantalla.

`ficha.json` mínimo:
```json
{
  "slug": "barberia-argos-caravaca",
  "nombre": "", "tipo": "BarberShop", "pueblo": "", "direccion": "", "cp": "",
  "telefono": "", "whatsapp": "", "maps_url": "", "coordenadas": [0, 0],
  "horario": [{ "dias": "", "horas": "" }],
  "servicios": [{ "nombre": "", "precio": "" }],
  "resenas": [{ "texto": "", "autor": "", "estrellas": 5 }],
  "anio_apertura": null,
  "fotos_cedidas": false,
  "notas": ""
}
```
Si un dato falta, se deja un hueco visible `[TELÉFONO]`. **Nunca inventar** direcciones, teléfonos, reseñas ni años.

## 9. Demo vs. producción

**Demo** (antes de vender):
- URL no adivinable: `demo.[MARCA].es/<slug>-<6 caracteres aleatorios>`.
- `<meta name="robots" content="noindex, nofollow">` y cabecera `X-Robots-Tag: noindex`.
- Sin sitemap. Sin formulario activo.

**Producción** (tras el pago):
- Dominio del cliente, quitar `noindex`, generar sitemap y `robots.txt`.
- Activar formulario y analítica.
- Rellenar aviso legal con los datos del cliente (titular, NIF, dirección).

## 10. Marca

- Firmar las webs como **[MARCA]**, nunca con nombre personal.
- No mencionar ni enlazar ningún otro negocio del autor.
- Crédito en el pie: "Web hecha por [MARCA]" con enlace, solo en producción y si el cliente lo acepta.

## 11. Checklist final (no enviar la demo si falla algo)

- [ ] Capturas revisadas en 390 px y 1440 px.
- [ ] LCP, INP y CLS en verde en móvil.
- [ ] Lighthouse ≥ 95 en las cuatro categorías.
- [ ] Ningún rasgo de la lista "Prohibido" (§3).
- [ ] Botón de WhatsApp y teléfono funcionan.
- [ ] Datos iguales a su ficha de Google.
- [ ] `noindex` activo.
- [ ] Ningún dato inventado.
