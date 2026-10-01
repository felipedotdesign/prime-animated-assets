# Prime Animated Assets

Interactive gallery of Prime Lab diagram animations and UI motion studies.

[View the live gallery](https://prime-lab-motion-studies.f00.chatgpt.site/)

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by the development server.

## Build

```bash
npm run build
```

## Source structure

- `app/page.tsx` defines the gallery order and Play controls.
- `components/` contains each diagram and UI study.
- `components/motionTiming.js` contains the shared 20ms motion timing system.
- `assets/` contains the source SVG and image assets.

Animations render in their completed state by default and replay independently from their Play actions. Reduced-motion preferences are supported.
