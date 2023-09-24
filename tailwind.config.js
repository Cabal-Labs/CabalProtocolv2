/** @type {import('tailwindcss').Config} */
export default {
	theme: {
		extend: {
			green: {
				50: "#DFF2EE",
				100: "#C0E4D9",
				200: "#A0D7C4",
				300: "#81C9B0",
				400: "#62BC9B",
				500: "#40AA9D",
				600: "#3A9A8C",
				700: "#32847A",
				800: "#2E7367",
				900: "#295B50",
			},
			blue: {
				50: "#B2D3E0",
				100: "#91B8D0",
				200: "#70A2C0",
				300: "#4E8DAD",
				400: "#2D77AD",
				500: "#4082AA",
				600: "#286C92",
				700: "#1C5A7E",
				800: "#123D5F",
				900: "#092542",
			},
		},
	},
	plugins: [],
	content: [
		"./src/**/*.js",
		"./src/**/*.jsx",
		"./src/**/*.ts",
		"./src/**/*.tsx",
	],
};
