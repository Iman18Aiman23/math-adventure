# ImanAI sidebar identity

The active identity follows the horizontal Alternative logo in the user's
supplied brand reference (ChatGPT Image Sep 19, 2026, 09_35_22 AM.png).

`imanai-horizontal.png` is a transparent raster adaptation: smiling white-and-blue
robot head, mint halo, navy-and-blue rounded wordmark, yellow star, and the
LEARN / PLAY / GROW signature. It is generated from the reference, not an exact
pixel crop. The English signature remains part of the artwork in both languages.

`imanai-horizontal.webp` is the 46 KB delivery version; the PNG remains the source.
`src/components/_shared/ImanAILogo.jsx` renders the WebP at the available sidebar or
mobile-header width with a localised accessible description. The asset uses Vite's base
URL so it also works under the GitHub Pages project path. Intrinsic dimensions
reserve space while loading. No external font is needed for the logo itself.

The component's optional `variant="mono"` renders a grayscale version; printing
also uses grayscale. This is a tonal raster treatment, not a one-ink vector master.

The earlier `imanai-mark*.svg` files are archived concept assets and are no longer
used by the sidebar.
