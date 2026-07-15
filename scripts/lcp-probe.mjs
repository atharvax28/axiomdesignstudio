import { launch } from "chrome-launcher";
import CDP from "chrome-remote-interface";

const URL = process.argv[2] || "http://localhost:3400/";
const chrome = await launch({ chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"] });
const client = await CDP({ port: chrome.port });
const { Page, Runtime, Emulation } = client;
await Page.enable();
await Runtime.enable();
// Emulate a mid-tier phone: 4x CPU slowdown + slow-4G-ish
await Emulation.setCPUThrottlingRate({ rate: 4 });
await Emulation.setDeviceMetricsOverride({ width: 412, height: 915, deviceScaleFactor: 2.6, mobile: true });

await Page.addScriptToEvaluateOnNewDocument({
  source: `
    window.__lcp = [];
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) {
        window.__lcp.push({
          t: Math.round(e.startTime),
          tag: e.element ? e.element.tagName : null,
          cls: e.element ? (e.element.className || "").toString().slice(0,40) : null,
          text: e.element ? (e.element.innerText||"").slice(0,24) : null,
          size: e.size,
          url: e.url || null,
        });
      }
    }).observe({ type: "largest-contentful-paint", buffered: true });
  `,
});

await Page.navigate({ url: URL });
await Page.loadEventFired();
await new Promise((r) => setTimeout(r, 4000)); // let LCP settle

const { result } = await Runtime.evaluate({ expression: "JSON.stringify(window.__lcp)", returnByValue: true });
const entries = JSON.parse(result.value || "[]");
console.log("LCP candidate chain (each entry = a new largest element as the page rendered):");
entries.forEach((e, i) =>
  console.log(`  #${i} @${e.t}ms  size=${e.size}  <${e.tag} class="${e.cls}">  ${e.url ? "img:" + e.url.split("/").pop().slice(0,30) : 'text:"' + (e.text||"").trim() + '"'}`)
);
console.log("FINAL LCP:", entries.length ? JSON.stringify(entries[entries.length - 1]) : "none");

await client.close();
await chrome.kill();
