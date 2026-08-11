// Wrapper de Astro CLI.
// En Windows, si el binding nativo del compilador está bloqueado por la
// política de seguridad del sistema, fuerza el fallback WASM (NAPI_RS_FORCE_WASI).
// En el resto de plataformas (p. ej. Vercel) se usa el binding nativo normal.
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const env = { ...process.env };

if (process.platform === 'win32' && !env.NAPI_RS_FORCE_WASI) {
	env.NAPI_RS_FORCE_WASI = '1';
}

const astroBin = fileURLToPath(new URL('../node_modules/astro/bin/astro.mjs', import.meta.url));

const result = spawnSync(process.execPath, [astroBin, ...args], {
	stdio: 'inherit',
	env,
});

process.exit(result.status ?? 1);
