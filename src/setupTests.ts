/* eslint-disable @typescript-eslint/no-explicit-any */
// src/setupTests.ts
import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Polyfill para jsdom
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

// === MOCK DE import.meta.env ===
beforeAll(() => {
  Object.defineProperty(global, "import", {
    value: {
      meta: {
        env: {
          VITE_BIN_URL: "https://api.jsonbin.io/v3/b/6904d2fcd0ea881f40c9b279",
          VITE_JSONBIN_KEY:
            "$2a$10$/dIgjdhgM.rEL/JdsuIi5uBXLUpyJrLDrTYliJwPJwVyfHKWA.AL2",
        },
      },
    },
    writable: true,
  });
});
