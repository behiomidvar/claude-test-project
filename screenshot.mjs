// usage: node screenshot.mjs http://localhost:3000 [label] [--full] [--w=1440] [--h=900]
import { chromium } from 'playwright';
import { mkdirSync, readdirSync } from 'fs';

const args = process.argv.slice(2);
const url = args.find(a => a.startsWith('http'));
const label = args.find(a => !a.startsWith('http') && !a.startsWith('--'));
const flag = n => (args.find(a => a.startsWith(`--${n}=`)) || '').split('=')[1];
const w = +flag('w') || 1440, h = +flag('h') || 900;
const dir = 'temporary screenshots';
mkdirSync(dir, { recursive: true });
const n = readdirSync(dir).filter(f => /^screenshot-\d+/.test(f)).length + 1;
const out = `${dir}/screenshot-${n}${label ? '-' + label : ''}.png`;

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
const page = await browser.newPage({ viewport: { width: w, height: h } });
await page.goto(url, { waitUntil: 'load' });
await page.addStyleTag({ content: '.reveal{opacity:1!important;transform:none!important}' });
await page.waitForTimeout(1800);
await page.screenshot({ path: out, fullPage: args.includes('--full') });
await browser.close();
console.log(out);
