# Motion & Three.js Interaction Plan — Jiangsu Ruizhi Petrochemical Engineering Co., Ltd.

- Aesthetic Direction: Light architectural editorial canvas inspired by antigravity.google and openai.com/index/gpt-6-astra/ (porcelain white #FFFFFF, alabaster #F7F9FC, deep engineering navy #1B3670, precision crimson #D92027; NO dark-mode page background).
- External Candidates Evaluated (3):
  1. `EXT-RZ-01` (ADOPTED): Three.js r170+ Procedural PBR Light-Studio 3D Petrochemical Vessel Cutaway Inspector (switchable Distillation Column / Helical-Baffle Heat Exchanger / Agitated Reactor / Storage Tank, interactive shell cutaway toggle, 360° orbit, DPR capped at 2, offscreen pause, static fallback under prefers-reduced-motion).
  2. `EXT-RZ-02` (ADOPTED): Native IntersectionObserver one-shot viewport reveal with zero global timeout (strictly enforces VIS-MOTION-NO-PREMATURE-COMPLETION and fail-safe visibility).
  3. `EXT-RZ-03` (REJECTED): Full-screen WebGL particle clouds / scroll hijacking — rejected to preserve crisp light editorial legibility and 390px mobile smoothness.
- Final 4 Motion Scenes:
  - Narrative (`MOT-RZ-01`): Adaptive-contrast 3-slide Hero Banner carousel with per-slide negative-space alignment, pause/resume, keyboard & touch controls.
  - Industry Signature (`MOT-RZ-02`): Light-Canvas Three.js 3D Petrochemical Equipment Cutaway Studio.
  - Content (`MOT-RZ-03`): One-shot IntersectionObserver scroll reveal (24px rise, 550ms ease-out, staggered cards 70ms) across all public routes and sections.
  - Interaction (`MOT-RZ-04`): Controlled Products dropdown dismiss, 7-category filter transitions, certificate/project lightbox zoom without scroll jump, FAQ accordion, and 4-digit image CAPTCHA RFQ form.
- Desktop / Mobile 390px / Reduced-Motion Plan: PASS (verified reduced displacement on 390px, offscreen Three.js pause, and full static readability under prefers-reduced-motion).
