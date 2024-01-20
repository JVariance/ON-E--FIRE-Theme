import Browser from "webextension-polyfill";
type Theme = Browser.Manifest.ThemeType;
type ThemeKey = "light" | "dark";

const themes: Record<ThemeKey, Theme> = {
	light: {
		colors: {
			toolbar: "rgb(255, 255, 255)",
			toolbar_text: "rgb(0, 0, 0)",
			frame: "rgb(208, 219, 227)",
			tab_background_text: "rgb(0, 0, 0)",
			toolbar_field: "rgb(255, 255, 255)",
			toolbar_field_text: "rgb(0, 0, 0)",
			tab_line: "rgb(200, 227, 255)",
			popup: "rgb(255, 255, 255)",
			popup_text: "rgb(0, 0, 0)",
			button_background_active: "rgb(231, 237, 241)",
			button_background_hover: "rgb(214, 224, 231)",
			sidebar_highlight_text: "rgb(255, 255, 255)",
			sidebar_highlight: "rgb(80, 33, 255)",
			sidebar: "rgb(255, 255, 255)",
			tab_loading: "rgb(200, 227, 255)",
		},
	},
	dark: {
		colors: {
			toolbar: "rgb(37, 40, 53)",
			toolbar_text: "rgb(255, 255, 255)",
			frame: "rgb(3, 6, 20)",
			tab_background_text: "rgb(159, 161, 164)",
			toolbar_field: "rgb(37, 40, 53)",
			toolbar_field_text: "rgb(255, 255, 255)",
			tab_line: "rgb(255, 255, 255)",
			popup: "rgb(23, 27, 31)",
			popup_text: "rgb(255, 255, 255)",
			button_background_active: "rgb(72, 77, 101)",
			button_background_hover: "rgb(72, 77, 100)",
			sidebar_highlight_text: "rgb(255, 255, 255)",
			sidebar_highlight: "rgb(80, 33, 255)",
			sidebar_text: "rgb(255, 255, 255)",
			sidebar: "rgb(37, 40, 53)",
			tab_selected: "rgb(58, 62, 84)",
			tab_loading: "rgb(255, 255, 255)",
		},
	},
};

let currentTheme: ThemeKey;

function setTheme(theme: ThemeKey) {
	if (currentTheme === theme) return;
	currentTheme = theme;
	Browser.theme.update(themes[theme]);
}

// Browser.theme.onUpdated.addListener((updateInfo) => {
// 	let a = updateInfo.theme;
// });

const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
setTheme(darkThemeMq.matches ? "dark" : "light");
darkThemeMq.addEventListener("change", (e) => {
	const theme = e.matches ? "dark" : "light";
	setTheme(theme);
});
