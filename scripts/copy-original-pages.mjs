import { cp, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { relative, resolve } from 'node:path';
import { applyArchiveDarkTheme } from './archive-dark-theme.mjs';

const root = process.cwd();
const output = resolve(root, 'public');

await mkdir(output, { recursive: true });
const skipNonWeb = (source) => {
  const path = relative(root, source).replaceAll('\\', '/');
  const parts = path.split('/');
  const name = parts.at(-1)?.toLowerCase() ?? '';
  if (parts.some((part) => ['.vscode', 'other'].includes(part.toLowerCase()))) return false;
  return !/\.(?:md|txt|zip|7z|rar|psd|ai)$/i.test(name) && !['license', 'readme'].includes(name);
};

for (const folder of ['personal', 'unitydev']) {
  const destination = resolve(output, folder);
  await mkdir(destination, { recursive: true });
  await cp(resolve(root, folder), destination, { recursive: true, force: true, filter: skipNonWeb });
}

async function themeArchivePages(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      await themeArchivePages(path);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
      const html = await readFile(path, 'utf8');
      const themed = applyArchiveDarkTheme(html);
      if (themed !== html) await writeFile(path, themed, 'utf8');
    }
  }
}

await themeArchivePages(resolve(output, 'personal'));
