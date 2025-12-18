// script.js
(() => {
  // External URL for Vixel (set this to your real destination)
  const VIXEL_URL = "https://vixelhomecraft.com/";

  const link = document.getElementById("vixelLink");
  if (link) link.href = VIXEL_URL;

  // Respect reduced motion
  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (prefersReduced) return;

  /*
    Smoothness fix:
    - Use a single, constant-speed translateX + separate opacity envelope (via keyframes)
    - Avoid “linger” keyframes that cause easing stalls/jank on mobile GPUs
    - Force GPU compositing for the pseudo-element on iOS/WebKit
    - Use linear motion for the sweep; keep ease only on opacity
  */
  const style = document.createElement("style");
  style.textContent = `
    /* Orbit rotation (unchanged) */
    .orbit{
      transform-origin: 50% 50%;
      animation: orbitSpin 12.5s linear infinite;
      will-change: transform;
      transform: translateZ(0);
    }

    /* Moon position (unchanged) */
    .orbit .moon{
      transform: translate(-50%, -50%)
        translateX(calc((min(640px, 88vw) * 0.74 / 2) - 26px));
      will-change: transform;
    }

    /* Planet subtle drift (unchanged) */
    .planet{
      animation: planetFloat 6.8s ease-in-out infinite;
      will-change: transform, filter;
      transform: translateZ(0);
    }

    /* Rings breathing (unchanged) */
    .ring{
      animation: ringBreath 7.4s ease-in-out infinite;
      will-change: opacity;
      transform: translateZ(0);
    }

    /* ✅ UPDATED: smooth sweep
       - One linear transform animation for movement (no stalls)
       - One eased opacity animation for fade in/out
       - More frequent by using a shorter duration
    */
    .planet::after{
      animation:
        sweepMove 4.6s linear infinite,
        sweepFade 4.6s ease-in-out infinite;
      will-change: transform, opacity;
      backface-visibility: hidden;
      transform: translateZ(0);
    }

    /* Text glow remains subtle */
    .tagline__text{
      animation: textGlow 4.8s ease-in-out infinite;
      will-change: opacity, letter-spacing;
    }

    /* Keyframes */
    @keyframes orbitSpin{
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }

   

    @keyframes ringBreath{
      0%,100% { opacity: 0.78; }
      50%     { opacity: 0.92; }
    }

    @keyframes textGlow{
      0%,100% { opacity: 0.70; letter-spacing: 0.16em; }
      50%     { opacity: 0.95; letter-spacing: 0.18em; }
    }

    /* ✅ Movement: always constant-speed across the planet */
    @keyframes sweepMove{
      from { transform: translateX(-150%) rotate(-12deg) translateZ(0); }
      to   { transform: translateX(150%)  rotate(-12deg) translateZ(0); }
    }

    /* ✅ Opacity: fade in, hold, fade out (no transform changes) */
    @keyframes sweepFade{
      0%   { opacity: 0; }
      10%  { opacity: 0.95; }
      75%  { opacity: 0.78; }
      100% { opacity: 0; }
    }
  `;
  document.head.appendChild(style);
})();
