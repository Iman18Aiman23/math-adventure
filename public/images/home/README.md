# Homepage robot artwork

`robots.webp` is a transparent 4-column, 2-row sprite sheet, adapted from the
user's supplied ImanAI homepage reference. One shared 320 KB image supplies the
seven subject illustrations and welcome-banner character. No animation runtime
or additional rendering library is needed.

Cell order, left to right:

1. Reading, speaking, mathematics, Islamic education.
2. KSSR mathematics, KSSR Malay, robot/code, waving welcome portrait.

The `RobotArt` component in HomePage.jsx selects cells with CSS background-position.
Keep the sheet's 2:1 aspect ratio, equal cells, and transparent background when
replacing it. The delivery image is 1774 × 887 pixels. Re-encoding is documented
in `scripts/prepare-home-art.mjs`; the original artwork was generated from
ChatGPT Image Sep 19, 2026, 09_40_42 AM.png with the image generation skill.
