// screenshot.mjs
import { spawn } from "child_process";
import puppeteer, { KnownDevices } from "puppeteer";
import fs from "fs";
import path from "path";

const urls = [
    "/",
    "/vote",
];


// Devices to simulate
const deviceProfiles = [
    {
        name: "iphone_light", device: KnownDevices['iPhone 15 Pro'], mediaFeatures: [{
            name: 'prefers-color-scheme', value: 'light'
        }]
    },
    {
        name: "iphone_dark", device: KnownDevices['iPhone 15 Pro'], mediaFeatures: [{
            name: 'prefers-color-scheme', value: 'dark'
        }]
    },
    {
        name: "ipad_light", device: KnownDevices["iPad Pro"], mediaFeatures: [{
            name: 'prefers-color-scheme', value: 'light'
        }]
    },
    {
        name: "ipad_dark", device: KnownDevices["iPad Pro"], mediaFeatures: [{
            name: 'prefers-color-scheme', value: 'dark'
        }]
    },
];

function runDevServer() {
    return spawn("npm", ["run", "dev"], { stdio: "inherit", shell: true });
}

async function takeScreenshots(baseUrl) {
    const browser = await puppeteer.launch();

    for (const { name, device, mediaFeatures } of deviceProfiles) {
        const page = await browser.newPage();
        await page.emulate(device);

        const v = page.viewport();

        const dir = path.join("public", "screenshots");
        fs.mkdirSync(dir, { recursive: true });
        const deviceSlug = name.replace(/\s+/g, "_");

        for (const url of urls) {

            let cleanName = url.replace(/\//g, "_") || "home";
            if (cleanName == "_") {
                cleanName = "_home";
            }
            const filePath = path.join(dir, `${deviceSlug}${cleanName}_${v.width}x${v.height}.png`);
            await page.emulateMediaFeatures(mediaFeatures);
            await page.goto(`${baseUrl}${url}`, { waitUntil: "networkidle0" });
            await page.screenshot({ path: filePath, captureBeyondViewport: false });
            console.log(`Saved screenshot: ${filePath}`);
        }

        await page.close();
    }

    await browser.close();
}

(async () => {

    // Start dev server
    const dev = runDevServer();

    // Wait for dev server to start (adjust if your app needs longer)
    await new Promise(res => setTimeout(res, 8000));

    try {
        await takeScreenshots("http://localhost:3000"); // adjust port if needed
    } finally {
        dev.kill("SIGINT");
    }
})();
