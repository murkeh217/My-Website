import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const publicDir = resolve(root, 'public');
const buildDir = resolve(root, '.next');
const archiveSource = await readFile(resolve(root, 'src/data/archive.ts'), 'utf8');
const archivePaths = [...archiveSource.matchAll(/path: '([^']+)'/g)].map((match) => match[1]);

test('all 36 curated archive pages are included in the production build', async () => {
  assert.equal(archivePaths.length, 36);
  for (const path of archivePaths) await access(resolve(publicDir, path));
  assert.doesNotMatch(archiveSource, /personal\/(?:diary|hobbies|journal)\/index\.html/);
});

test('Next.js server routes build and archived snapshots stay out of production', async () => {
  await access(resolve(buildDir, 'BUILD_ID'));
  await access(resolve(publicDir, 'unitydev/index.html'));
  await assert.rejects(access(resolve(publicDir, 'archive')));
  await assert.rejects(access(resolve(publicDir, 'unitydev/other')));
  const route = await readFile(resolve(root, 'app/library/page.tsx'), 'utf8');
  assert.match(route, /force-dynamic/);
});
