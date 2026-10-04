RED DE MUSEOS UNLP — V1 FUNCIONAL

Qué incluye
- Navegación entre las pantallas entregadas del prototipo.
- Splash con avance automático.
- Barra inferior funcional.
- Accesos de Home a Mapa, Agenda y Descubrir.
- Mapa con vista de museo seleccionado y vista de recorridos.
- Recorrido Arte y cultura con favoritos e inicio de recorrido.
- Perfil y Puntos con modales interactivos.
- Cámara real del dispositivo (si el navegador concede permiso).
- Captura de foto y suma de puntos de demostración.
- PWA básica con caché offline de los archivos principales.

Cómo probarla
1. Descomprimí la carpeta.
2. Abrí una terminal dentro de la carpeta.
3. Ejecutá: python -m http.server 8000
4. Abrí: http://localhost:8000

Para usar la cámara, probala desde localhost o desde un sitio HTTPS y concedé permiso al navegador.

Nota
Las pantallas visuales se basan en los exports entregados para mantener el diseño original con máxima fidelidad durante esta primera etapa. Los puntos de interacción están construidos como HTML/JS para que el prototipo sea navegable. En una siguiente iteración se pueden reemplazar los fondos de pantalla por componentes HTML individuales sin perder la lógica.


CÁMARA / EXPERIENCIA AR
La cámara central de la app abre directamente la experiencia AR externa:
https://thomascons-boop.github.io/ar-magic-creator/?ar=true&id=fb5b2cdd-0bf0-4251-973d-c56b9fe58a3b
Se abre en la misma pestaña; para volver a Red de Museos UNLP usá Atrás en el navegador.
