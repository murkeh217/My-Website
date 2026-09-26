import { cp, mkdir } from 'node:fs/promises';
import { relative, resolve } from 'node:path';

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
