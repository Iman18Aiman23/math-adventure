# Welcome artwork

Generated with the built-in image generation tool from the user-provided desktop and mobile welcome references. These are reference-based recreations, not pixel-identical crops. The existing ImanAI logo is rendered separately by ImanAILogo.

- `graduate-desktop.png`: full-body graduation robot, waving and holding a green maths book.
- `graduate-mobile.png`: compact graduation robot holding the book, with floating maths symbols.

Both PNG files preserve their generated alpha channels. The CSS renders the background, forms, text and navigation separately.

## Desktop prompt

Use case: background-extraction. Extract the exact graduation robot illustration from the supplied desktop welcome page reference as a standalone transparent PNG asset. Preserve its white and blue 3D robot identity, happy closed eyes, pink cheeks, dark navy graduation cap and yellow tassel, waving left hand, green book with white plus, full body and dark feet. Include the floating blue division tile upper left, coral plus tile above, mint multiplication tile lower left, yellow small excitement marks and soft blue oval ground shadow. Keep exact relative positions, pose, rendering, colours, proportions. Remove ALL page text, handwritten slogan, logo, forms, navigation, background blobs and white background. Transparent background with clean alpha. Tight portrait bounding box around illustration, no clipping. Do not redesign or change character.

## Mobile final prompt

Extract only the robot illustration and the four floating symbols (star, division, plus, multiplication) from this mobile page, unchanged. Deliver a clean transparent PNG cutout on a genuinely transparent alpha background. Exactly match original soft matte 3D rendering and original pose and framing. No glow, no bloom, no aura, no haze, no coloured light spill, no black background, no gradients surrounding objects. All pixels outside the solid robot and symbols must be fully transparent. No text, logo, UI, or page background. Original hero is between y=192 and y=579, x=202 and x=852 in the reference; reproduce only this isolated hero. Landscape 3:2 composition, tight margins.
