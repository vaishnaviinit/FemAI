import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = 'http://localhost:3000';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
});

const page = await browser.newPage();
await page.setViewportSize({ width: 1400, height: 900 });

const shots = [
  { url: '/', name: 'landing' },
  { url: '/assessment/quick', name: 'quick_assessment' },
  { url: '/assessment/detailed', name: 'detailed_wizard' },
  { url: '/about', name: 'about' },
];

for (const { url, name } of shots) {
  console.log(`Capturing ${url}...`);
  await page.goto(BASE + url, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(2500);
  const file = path.join(__dirname, `screenshot_${name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log(`  → ${file}`);
}

// Simulate filling and submitting quick form, then capture result
console.log('Filling quick assessment form...');
await page.goto(BASE + '/assessment/quick', { waitUntil: 'domcontentloaded', timeout: 20000 });
await page.waitForTimeout(2500);

// Fill number fields
await page.fill('input[placeholder="25"]', '27');
await page.fill('input[placeholder="60.0"]', '65.0');
await page.fill('input[placeholder="22.0"]', '24.5');
await page.fill('input[placeholder="3.0"]', '4.2');
await page.fill('input[placeholder="5"]:first-of-type', '8');
await page.locator('input[placeholder="5"]').last().fill('9');

// Click "Yes" for Weight Gain, Hair Growth
const yesButtons = await page.locator('button:has-text("Yes")').all();
for (const btn of yesButtons.slice(0, 3)) {
  await btn.click();
}

await page.screenshot({ path: path.join(__dirname, 'screenshot_quick_filled.png'), fullPage: false });
console.log('  → screenshot_quick_filled.png');

await browser.close();
console.log('\nAll screenshots captured!');
