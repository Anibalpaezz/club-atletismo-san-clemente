// Wrapper de Astro CLI.
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);

const astroBin = fileURLToPath(new URL('../node_modules/astro/bin/astro.mjs', import.meta.url));

const result = spawnSync(process.execPath, [astroBin, ...args], {
	stdio: 'inherit',
	env: process.env,
});

process.exit(result.status ?? 1);
