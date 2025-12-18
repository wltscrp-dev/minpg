// script.js
(() => {
  // External URL for Vixel (set this to your real destination)
  const VIXEL_URL = "https://vixelhomecraft.com/"; // <-- change me

  const link = document.getElementById("vixelLink");
  if (link) link.href = VIXEL_URL;

  // Respect reduced motion
  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (prefersReduced) return;

  // Faster + more frequent planet shimmer, everything else unchanged
  const style = document.createElement("style");
  style.textContent = `
    /* Orbit rotation (unchanged) */
    .orbit{
      transform-origin: 50% 50%;
      animation: orbitSpin 12.5s linear infinite;
    }

    /* Moon position (unchanged) */
    .orbit .moon{
      transform: translate(-50%, -50%) translateX(calc((min(640px, 88vw) * 0.74 / 2) - 26px));
    }

    /* Planet subtle drift (unchanged) */
    .planet{
      animation: planetFloat 6.8s ease-in-out infinite;
    }

    /* Rings breathing (unchanged) */
    .ring{
      animation: ringBreath 7.4s ease-in-out infinite;
    }

    /* 🔥 UPDATED: planet shimmer is faster & more frequent */
    .planet::after{
      animation: planetScan 3.2s ease-in-out infinite;
    }

    /* Text glow remains subtle */
    .tagline__text{
      animation: textGlow 4.8s ease-in-out infinite;
    }

    /* Keyframes */
    @keyframes orbitSpin{
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }

    @keyframes planetFloat{
      0%,100% { transform: translateY(0px); }
      50%     { transform: translateY(6px); }
    }

    @keyframes ringBreath{
      0%,100% { opacity: 0.78; }
      50%     { opacity: 0.92; }
    }

    @keyframes textGlow{
      0%,100% { opacity: 0.70; letter-spacing: 0.16em; }
      50%     { opacity: 0.95; letter-spacing: 0.18em; }
    }

    /* Faster, tighter scan cycle */
    @keyframes planetScan{
      0%   { transform: translateX(-150%) rotate(-12deg); opacity: 0; }
      10%  { opacity: 0.95; }
      55%  { opacity: 0.80; }
      100% { transform: translateX(150%) rotate(-12deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
})();
