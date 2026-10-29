# Wizualizacje koncepcyjne


## Dopracowanie zatwierdzonej wersji 4

Wbudowany ImageGen. Bardziej naturalna fotografia i przezroczysty pierwszy plan, oba 1672 × 941 px.

### Realism refinement / assets/hero-scene-v4b.webp

Use case: lighting-weather / photorealism refinement. Edit the supplied house image into a convincing real architectural photograph, not a polished CGI render. Preserve the exact house design, perfectly front-facing camera, composition, framing and all geometry. Keep the SAME 1672x941 full canvas, house pixel location, roof apex location, facade width, terrace location and tree placement so the existing website layout will match. Refine only realism: naturally irregular concrete grain and subtle joint imperfections; realistic dark timber with fine grain and tonal variations; believable restrained glass reflections and transparency (less smeared golden reflection, visible detailed interior); soft photographic dynamic range; coherent natural daylight, accurate soft shadows; realistic individual grass blades and varied foliage, slightly less oversaturated yellow-green highlights; fine detail without crunchy oversharpening or synthetic glow. Premium editorial architecture photograph on a sunny Polish garden afternoon, 35mm architectural lens with straight verticals. Keep rich real green garden and clear blue sky; no clouds, mountains, mist, people, text, logos or watermark. Do not add or remove architectural elements, do not change perspective, do not invent a different house. The goal is a tasteful more realistic version of THIS same hero.

### Foreground / assets/hero-foreground-v4b.webp

Use case: background-extraction. Remove background from this EXACT refined house photograph. Keep canvas 1672x941, exact framing, scale and house pixel coordinates. Keep entire house, roof rim, facade, windows, side extension, terrace, ALL foreground garden and ground across full width to the bottom. Remove only sky and distant trees/garden behind the house, making those truly transparent. Precise clean alpha edge, no colored halo at roof, no re-rendering or alteration of house pixels. Do not change lighting or texture or sharpen. The result will overlay this exact photograph to place website lettering behind the house, so exact alignment and unchanged house pixels are essential. No crop, shift, text or added objects.


## Koncepcja 4 — front domu i jasne wnętrze

Wbudowany ImageGen. Hero na podstawie referencji klienta przedstawiającej dom w Sokolnikach. Trzy warstwy hero i wnętrze mają 1672 × 941 px. Pierwszy plan zachowuje przezroczystość RGBA.

### Hero / assets/hero-scene-v4.webp

Use case: sketch-to-render. Re-render the attached real ArchiSfera project as a very high quality photoreal architectural image. Preserve the house design: steep pitched gable volume with pale narrow concrete roof rim, completely glazed double-height triangular front facade with black metal mullions, dark timber sides, wood soffit and low right side extension. Camera MUST be perfectly FRONT ON, lens perpendicular to the triangular facade, centered on the middle vertical mullion, architectural elevation perspective, symmetrical roof pitches, no receding side wall, NO three-quarter angle. Whole front facade centered, entire building visible including side extension. Large landscape 16:9 composition, 1672x941 framing; apex at 30 percent of canvas height, building base at 78 percent, main house spans 25-75 percent of canvas width. Setting: real Polish pine garden like source, vivid fresh green lawn, lush rich green trees on both edges, flowers and natural grasses, warm sunshine and believable material colors, subtle warm oak interior, clear pale blue sky behind and above roof. More color and life than a grey minimalist render, clean natural editorial photography. No mountains, NO clouds, no mist, no dramatic blue hour, no people or vehicles. Keep foreground trees from obstructing facade. The central upper sky must be open so website wordmark can be placed there later. No text, no logo, no UI or watermark.

### Foreground / assets/hero-foreground-v4.webp

Use case: background-extraction. Exact background removal of supplied final house image, for a layered website hero. Keep the image canvas EXACTLY 1672x941 and preserve every foreground pixel's position, scale, lighting, framing and materials. Keep the whole house, concrete triangular roof rim, all facade and windows, side extension, terrace and ALL grass/plants/ground below the building across entire width to bottom. Make the sky, ALL background pine trees above and to either side of the house, and distant garden behind it fully TRANSPARENT. Exact clean alpha roof and wall boundaries, accurate transparency, no re-rendering, no changed architecture, no crop or shift. Tree trunks and foliage in background must be removed so a white website wordmark can sit between background and this house layer. Keep foreground shrubs close to house and terrace. Actual transparent alpha output, no text.

### Background / assets/hero-background-v4.webp

Use case: precise-object-edit. Produce an exact BACKGROUND PLATE of this house photograph. Remove the entire foreground house and its terrace, and restore their area seamlessly with green lawn, shrubs and pine garden. Keep canvas exactly 1672x941. Preserve the clear blue sky, pine trees and garden at left and right edges EXACTLY unchanged in position, scale, lighting and color. Fill former house area naturally with more trees and a softly sunlit garden in same setting. Do NOT recompose, change lighting or add clouds, mountains, mist or text. This plate goes behind a precise alpha cutout of the original house.

### Interior / assets/interior-v4.webp

Use case: photorealistic-natural. Asset type: wide architectural interior image used as a website section background behind white frosted glass cards. Create an editorial photoreal photograph of a bright carefully designed contemporary home interior: large floor-to-ceiling windows showing a lush green Polish garden, light grey plaster walls, natural oak floor and built-in storage, light linen sofa, sculptural cream armchairs, a simple stone coffee table, a single leafy indoor plant, thin black window frames. Warm natural daylight, neutral light-grey/white/graphite dominant palette with rich real green garden and honey oak accents. Spacious architectural perspective with seating on the right and clean wall/window negative space on left, high-quality believable details and materials, serene premium studio presentation, no people, text, logos or watermark. Landscape 16:9. Do not add mountains or cloudy drama.


## Koncepcja 3 — dom w Sokolnikach

Wbudowany ImageGen. Referencja: prawdziwa wizualizacja z archisfera.net, zapisana jako `assets/project-bf8f4858e0ba.webp`. Wszystkie wygenerowane warstwy mają 1672 × 941 px. Przezroczystość pierwszego planu zachowano w WebP.

### Scene / assets/hero-scene-v3.webp

Use case: sketch-to-render. Edit target: attached architectural rendering of the real Sokolniki house from ArchiSfera's portfolio. Preserve its architectural identity: single long simple pitched gable volume, steep triangular fully glazed double-height front facade in black slim metal frames, dark charred timber siding, thin pale concrete roof rim wrapping gable, low attached dark rectangular side volume. Re-render it as an exquisitely realistic architectural editorial photograph. Reposition the camera to a straight centered FRONT view of the SAME building with only a little of the right side wing visible. Landscape 16:9 full canvas 2400x1350. Whole house centered in lower-middle image: roof apex at 30 percent of image height, facade base at 76 percent, building extends from 18 to 82 percent of width. Calm late-blue-hour mountain landscape replaces the suburban forest: distant dark rugged mountains on both sides, dramatic soft cloudy blue-grey sky across the top half, subtle wisps of low mist, dry meadow grasses and a stone terrace in foreground, warm understated interior light. No snow, no palm trees. Remove all people and foreground tree trunks obscuring the house. Refined moody cool slate exterior with amber interior. Wide generous open sky above and to sides of the building is essential: native website wordmark will later be placed behind roof. Do not add text, logos, website UI, watermarks, other buildings. Maintain exact original distinctive house geometry, do not substitute an unrelated chalet.

### Foreground / assets/hero-foreground-v3.webp

Use case: background-extraction. Edit target: the provided final mountain house image. Produce a PIXEL-ALIGNED foreground layer for a website composition. Keep the canvas exactly the same 1672x941 aspect ratio and framing as the supplied image. Preserve the EXACT house location, size, roof shape, every material, window, lighting and foreground ground. Keep ONLY the whole building, its entire visible terrace, retaining wall, and ALL foreground vegetation/ground below the terrace all the way to the bottom and both side edges. Make the entire sky and all distant mountains/forest behind the house fully transparent, with a precise clean alpha edge on the roof and walls. The front house apex must stay at the EXACT original coordinate. Do not center, enlarge, crop, re-render or shift the house, do not add or modify anything. This is an exact background removal, not a new image. Around the building's left and right edges, keep foreground plants where they belong, remove only distant mountains and sky. Output actual transparency.

### Background / assets/hero-background-v3.webp

Use case: precise-object-edit. Edit target: provided mountain house scene. Create the BACKGROUND PLATE of this EXACT scene for a layered website hero. Remove the entire house, its terrace and retaining wall, filling their former area plausibly with distant forest, natural meadow slopes and mountains consistent with surroundings. Keep the exact same full canvas size and 16:9 framing. All existing sky, clouds, mountains on both edges, horizon placement, lighting and color grading MUST remain unchanged and in exactly the same pixel coordinates. Do not recompose. The top 50 percent and outer mountains must be identical to the original; only remove the foreground building. No text, no watermarks. This plate will be behind an exact cutout of the original house. Seamless realistic landscape restoration, no remaining house fragments.

## Hero — koncepcja 2

Plik `assets/hero-v2.webp`, wygenerowany wbudowanym ImageGen.

Use case: photorealistic-natural. Asset type: wide architectural website hero photograph 16:9. A restrained beautifully crafted contemporary single family home in a Polish countryside garden, front three-quarter perspective. Two elongated simple gabled volumes clad in warm pale textured limestone and natural vertical oak slats, black slender metal roof, full height windows reflecting greenery, a quiet wooden terrace. Single mature pine and tall soft grasses, forest edge background, no pool or flowering cherry trees. The home sits toward the right side and middle of the wide composition, darker shaded natural trees and greenery on left provide quiet space for website headline overlay. Soft overcast summer morning, gentle hazy sky, tactile believable material surfaces, high end European architectural editorial photography, neutral realistic color grading, no people, no text, no watermarks, no cars, no ostentatious luxury. Emphasize thoughtful livable architecture, landscape integration, natural light.

Wygenerowane wbudowanym narzędziem ImageGen. Lokalizacje: `assets/hero.webp` i `assets/pracownia.webp`.

## Hero

Use case: photorealistic-natural. Asset type: wide architectural website hero, 2400x1350 composition. Create a premium editorial architectural photograph of a refined single-storey contemporary Polish courtyard home: pale warm limestone and ivory plaster, floor-to-ceiling dark bronze glazing, warm oak interior subtly visible, a long shallow reflecting pool in foreground. Two airy flowering cherry trees frame the house, clipped sculptural shrubs, natural meadow grasses, stone paths. Perfectly calm restrained European architecture magazine aesthetic, frontal balanced perspective, late afternoon sun and gentle shadows, quiet muted olive cream taupe pale pink palette, credible materials, restrained luxury, no people, no text, no logos. House fills middle composition; foliage frames edges. Not tropical, not palatial, no artificial orange glow.

## Sekcja o pracowni

Use case: photorealistic-natural. Asset type: vertical photograph for about section of premium Polish architecture studio website, portrait 2:3. Architectural detail of the same serene contemporary courtyard residence aesthetic: warm limestone wall on left, beautifully weathered oak soffit overhead, slim bronze-framed glazing right, quiet stone terrace and one sculptural multi-stem tree in a small planted garden. View through a shaded passage into sunlit garden, strong clean geometries, generous negative space in upper stone wall, pale travertine ivory and muted olive palette. True high-end architecture magazine photography, soft morning sun, tactile material grain, realistic shadows, no people, no text or logos, no cactus or tropical plants.

## Compact subpage banner — 2026-10-30
Asset: assets/subpage-house-banner.webp. AI interpretation of hero-scene-v4b.webp, not a photograph of a completed building.
Prompt: Photorealistic panoramic 3:1 architectural photograph of the same concrete gabled house, slim dark window frames, timber soffits and pine garden. Close view toward the right; green foliage negative space on the left for page titles. Natural afternoon light, no people, text, logos, mountains or clouds.

## Subpage interior dividers — 2026-10-30
- assets/offer-dining-divider.webp: AI-generated panoramic photorealistic dining room, travertine, oak table, linen chairs and pine garden; neutral plaster on the left for text. No text, people or logos.
- assets/contact-foyer-divider.webp: AI-generated panoramic entry foyer with oak bench, warm plaster, limestone, ceramic vase and sunlit pine garden doorway. No text, people or logos.
Both are illustrative concepts, not photographs of completed ArchiSfera projects.
