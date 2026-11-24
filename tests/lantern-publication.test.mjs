import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { test } from "node:test";

const output = new URL("../docs/", import.meta.url);
const read = (file) => readFile(new URL(file, output), "utf8");
const formerPlayers = ["play/tideglass-observatory", "lantern-studio/games/velvet-cloak"];
const languages = ["en", "zh"];

for (const lang of languages) {
  test(`${lang} portfolio launches the editor and shows its authoring tools`, async () => {
    const prefix = lang === "zh" ? "zh/" : "";
    const pages = await Promise.all([read(prefix + "index.html"), read(prefix + "projects/indie-games/index.html")]);
    for (const html of pages) {
      assert.doesNotMatch(html, /tideglass|潮镜天文台|velvet-cloak|href="[^"]*(?:\/play\/|#play\/)/i);
      assert.ok(html.includes(`src="/assets/showcase/lantern-editor-${lang}.webp"`));
      const launches = html.match(new RegExp(`href="/lantern-studio/\\?lang=${lang}"`, "g"));
      assert.equal(launches?.length, 3);
    }
    assert.ok(pages[1].includes(`src="/assets/showcase/lantern-writing-${lang}.webp"`));
    const data = await read("assets/showcase/sources.json");
    const illustrations = JSON.parse(data).exports;
    for (const view of ["editor", "writing"]) {
      const name = `lantern-${view}-${lang}.webp`;
      const entry = illustrations.find(item => item.file === name);
      const bytes = await readFile(new URL("assets/showcase/" + name, output));
      assert.equal(entry.bytes, bytes.length);
    }
  });
}

test("previous player bookmarks forward to the localized editor without serving gameplay", async () => {
  for (const group of formerPlayers) {
    for (const lang of languages) {
      const html = await read(`${group}/${lang}.html`);
      const target = `/lantern-studio/?lang=${lang}`;
      assert.ok(html.includes(`http-equiv="refresh" content="0; url=${target}"`));
      assert.ok(html.includes(`<a href="${target}">`));
      assert.match(html, /content="noindex,follow"/);
      assert.doesNotMatch(html, /<(?:script|iframe|canvas|audio|video)\b|data:image/i);
    }
  }
});

test("the site publishes the Studio runtime, callback, and editable lessons", async () => {
  const html = await read("lantern-studio/index.html");
  assert.match(html, /<title>Lantern Studio/);
  assert.match(html, /<script type="module"/);
  const published = await readdir(new URL("lantern-studio/", output), { recursive: true });
  const htmlFiles = published.filter(file => /\.html?$/i.test(file)).map(file => file.replaceAll("\\", "/")).sort();
  assert.deepEqual(htmlFiles, ["games/velvet-cloak/en.html", "games/velvet-cloak/zh.html", "index.html", "lantern-connect.html"]);
  const retired = await readdir(new URL("play/", output), { recursive: true });
  assert.deepEqual(retired.filter(file => /\.html?$/i.test(file)).map(file => file.replaceAll("\\", "/")).sort(),
    ["tideglass-observatory/en.html", "tideglass-observatory/zh.html"]);
  assert.ok(JSON.parse(await read("lantern-studio/games/velvet-cloak/project.lantern.json")).scenes.length > 0);
  const sitemap = await read("sitemap.xml");
  assert.match(sitemap, /\/lantern-studio\/<\/loc>/);
  assert.doesNotMatch(sitemap, /tideglass|velvet-cloak/);
});
