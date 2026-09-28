# Regalo para mi Abejita 🐝

## Estructura
```
regalo-abejita/
├── index.html      (estructura + la carta completa)
├── style.css       (colores y animaciones)
├── script.js       (elogios, fotos de galería, tarjetas, lógica)
└── assets/
    ├── music.mp3   ← TÚ lo agregas (ver abajo)
    └── photos/     (tus 10 fotos, con sus nombres reales)
```

## Cómo ejecutarla
Doble clic en `index.html` (funciona sin servidor). Para probarla como en el celular: `python3 -m http.server 8000` dentro de la carpeta y abre `http://TU-IP:8000` desde el teléfono (misma wifi).
Para publicarla: arrastra la carpeta completa a Netlify Drop, o súbela a GitHub Pages / Vercel.

## Fotos
Van en `assets/photos/`. Portada = `35013.jpg`. Cierre = `168080.jpg` (en `index.html`, atributo `src`). La galería se define en `script.js`, arreglo `GALLERY` (archivo, texto alternativo, frase opcional `cap`). Para cambiar una foto, reemplaza el archivo con el mismo nombre o cambia `f:`.

## Música
Copia tu canción como `assets/music.mp3` (exactamente ese nombre). Si el archivo no existe, el botón 🎵 se oculta solo. Empieza con el primer toque a la planta.

## Textos
- Elogios y tarjetas: arreglos `PRAISES` y `CARDS` al inicio de `script.js`.
- Carta: dentro de `<script id="letter-src">` en `index.html`. Línea en blanco = nuevo párrafo.
- Encabezado, sección coqueta, futuro y cierre: directo en `index.html`.
