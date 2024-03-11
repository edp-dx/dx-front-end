import { createTheme, responsiveFontSizes } from '@mui/material';

declare module '@mui/material/styles/createTypography' {
	interface FontStyle {
		fontFamilySecondary?: string;
		fontFamilyThirdly?: string;
	}
}

declare module '@mui/material/Button' {
	interface ButtonPropsSizeOverrides {
		extraSmall: true;
	}
}

declare module '@mui/material/styles' {
	interface BreakpointOverrides {
		lgDefault: true;
		lgHeader: true;
	}
}

declare module '@mui/material/styles/createPalette' {
	interface PaletteColor {
		main: string;
		dark: string;
		light: string;
		contrast?: string;
		hover?: string;
		selected?: string;
		focus?: string;
		focusVisible?: string;
		outlineBorder?: string;
	}
}

const commonThemeOptions = {
	spacing: 4,
	palette: {
		primary: {
			main: '#2196F3',
			dark: '#1E88E5',
			light: '#42A5F5',
			hover: 'rgba(33, 150, 243, 0.04)',
			selected: 'rgba(33, 150, 243, 0.08)',
			focus: 'rgba(33, 150, 243, 0.12)',
			focusVisible: 'rgba(33, 150, 243, 0.3)',
			outlineBorder: 'rgba(33, 150, 243, 0.5)',
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lgDefault: 1200,
			lg: 1260,
			lgHeader: 1392,
			xl: 1536,
		},
	},
	typography: {
		fontFamilySecondary: '"Open Sans", "Roboto", "Helvetica", "Arial", sans-serif',
		fontFamilyThirdly: '"IBM Plex Mono", "Roboto", "Helvetica", "Arial", sans-serif',
	},
};

export const basicTheme = createTheme(commonThemeOptions);

export const themeOptionsWithComponentOverrides = {
	components: {
		MuiTab: {
			styleOverrides: {
				root: {
					justifyContent: 'flex-start',
					padding: `${basicTheme.spacing(2)} ${basicTheme.spacing(4)}`,
					minHeight: 'initial',
					textTransform: 'capitalize',

					'&.Mui-selected': {
						backgroundColor: basicTheme.palette.primary.selected,
						color: basicTheme.palette.text.primary,
						borderRadius: basicTheme.spacing(1),
					},
				},
			},
		},
		MuiButton: {
			variants: [
				{
					props: { size: 'extraSmall' },
					style: {
						fontSize: 12,
						padding: '1px 10px',
						height: 22,

						'.MuiButton-iconSizeExtraSmall': {
							svg: {
								fontSize: 18,
							},
						},
					},
				},
			],
		},
	},
};
export const theme = responsiveFontSizes(
	createTheme(basicTheme, themeOptionsWithComponentOverrides),
);
