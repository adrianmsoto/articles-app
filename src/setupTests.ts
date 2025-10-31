/* eslint-disable @typescript-eslint/no-explicit-any */
// src/setupTests.ts
import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Polyfill para jsdom
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;
