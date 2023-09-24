import { extendTheme, ThemeConfig } from "@chakra-ui/react";

interface CustomColors {
	green: {
		50: string;
		100: string;
		200: string;
		300: string;
		400: string;
		500: string; // Base green color
		600: string;
		700: string; // Default green color
		800: string;
		900: string;
	};
	blue: {
		50: string;
		100: string;
		200: string;
		300: string;
		400: string;
		500: string; // Base blue color
		600: string;
		700: string;
		800: string;
		900: string;
	};
}

const customColors: CustomColors = {
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
};

const config: ThemeConfig = {
	initialColorMode: "light", // Set your initial color mode here
};

const theme = extendTheme({
	config,
	colors: {
		...customColors,
	},
	fonts: {
		body: "Arial, sans-serif",
		heading: "Helvetica, sans-serif",
	},
	textStyles: {
		h1: {
			// you can also use responsive styles
			fontSize: ["48px", "72px"],
			fontWeight: "bold",
			lineHeight: "110%",
			letterSpacing: "-2%",
		},
		base: {
			fontFamily: "body",
			color: "gray.100",
		},
		textSecondary: {
			color: "gray.300",
		},
		link: {
			color: "gray.200",
			_hover: {
				textDecoration: "underline",
			},
		},
		title: {
			fontSize: "44px",
			fontFamily: "heading",
			color: "gray.100",
			fontWeight: "bold",
		},
		subTitle: {
			fontSize: "28px",
			fontFamily: "heading",
			color: "gray.300",
		},
		label: {
			fontSize: "16px",
			fontFamily: "heading",
			fontWeight: "bold",
			color: "gray.100",
		},
	},
	components: {
		Button: {
			baseStyle: {
				fontWeight: "bold",
				textTransform: "uppercase",
			},
			variants: {
				primary: {
					bg: "green.500",
					color: "white",
					_hover: {
						bg: "green.600",
					},
				},
				secondary: {
					bg: "blue.500",
					color: "white",
					_hover: {
						bg: "blue.600",
					},
				},
			},
		},
		Input: {
			variants: {
				outline: {
					field: {
						borderColor: "green.200",
					},
				},
			},
		},
		Box: {
			baseStyle: {
				borderRadius: "md",
				padding: 9,
			},
		},
	},
	styles: {
		global: {
			body: {
				bg: "gray.800",
			},
		},
	},
});

export default theme;
