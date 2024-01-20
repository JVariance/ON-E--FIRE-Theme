import { defineConfig } from "vite";
import webExtension, { readJsonFile } from "vite-plugin-web-extension";

function generateManifest() {
	const manifest = readJsonFile("src/manifest.json");
	const pkg = readJsonFile("package.json");
	return {
		name: pkg.name,
		description: pkg.description,
		version: pkg.version,
		...manifest,
	};
}

// https://vitejs.dev/config/
export default defineConfig({
	esbuild: {
		drop: ["console", "debugger"],
	},
	plugins: [
		svelte(),
		webExtension({
			manifest: generateManifest,
			browser: "firefox",
			watchFilePaths: ["package.json", "manifest.json"],
		}),
	],
});
