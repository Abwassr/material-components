import {
	Hct,
	argbFromHex,
	SchemeTonalSpot,
	DynamicScheme,
	hexFromArgb
} from '@material/material-color-utilities';

let defaultLight =
	'{"--md-sys-color-primary":"#415f91","--md-sys-color-surface-tint":"#415f91","--md-sys-color-on-primary":"#ffffff","--md-sys-color-primary-container":"#d6e3ff","--md-sys-color-on-primary-container":"#284777","--md-sys-color-secondary":"#565f71","--md-sys-color-on-secondary":"#ffffff","--md-sys-color-secondary-container":"#dae2f9","--md-sys-color-on-secondary-container":"#3e4759","--md-sys-color-tertiary":"#705575","--md-sys-color-on-tertiary":"#ffffff","--md-sys-color-tertiary-container":"#fad8fd","--md-sys-color-on-tertiary-container":"#573e5c","--md-sys-color-error":"#ba1a1a","--md-sys-color-on-error":"#ffffff","--md-sys-color-error-container":"#ffdad6","--md-sys-color-on-error-container":"#93000a","--md-sys-color-background":"#f9f9ff","--md-sys-color-on-background":"#191c20","--md-sys-color-surface":"#f9f9ff","--md-sys-color-on-surface":"#191c20","--md-sys-color-surface-variant":"#e0e2ec","--md-sys-color-on-surface-variant":"#44474e","--md-sys-color-outline":"#74777f","--md-sys-color-outline-variant":"#c4c6d0","--md-sys-color-shadow":"#000000","--md-sys-color-scrim":"#000000","--md-sys-color-inverse-surface":"#2e3036","--md-sys-color-inverse-on-surface":"#f0f0f7","--md-sys-color-inverse-primary":"#aac7ff","--md-sys-color-primary-fixed":"#d6e3ff","--md-sys-color-on-primary-fixed":"#001b3e","--md-sys-color-primary-fixed-dim":"#aac7ff","--md-sys-color-on-primary-fixed-variant":"#284777","--md-sys-color-secondary-fixed":"#dae2f9","--md-sys-color-on-secondary-fixed":"#131c2b","--md-sys-color-secondary-fixed-dim":"#bec6dc","--md-sys-color-on-secondary-fixed-variant":"#3e4759","--md-sys-color-tertiary-fixed":"#fad8fd","--md-sys-color-on-tertiary-fixed":"#28132e","--md-sys-color-tertiary-fixed-dim":"#ddbce0","--md-sys-color-on-tertiary-fixed-variant":"#573e5c","--md-sys-color-surface-dim":"#d9d9e0","--md-sys-color-surface-bright":"#f9f9ff","--md-sys-color-surface-container-lowest":"#ffffff","--md-sys-color-surface-container-low":"#f3f3fa","--md-sys-color-surface-container":"#ededf4","--md-sys-color-surface-container-high":"#e7e8ee","--md-sys-color-surface-container-highest":"#e2e2e9"}';

let defaultDark =
	'{"--md-sys-color-primary":"#aac7ff","--md-sys-color-surface-tint":"#aac7ff","--md-sys-color-on-primary":"#0a305f","--md-sys-color-primary-container":"#284777","--md-sys-color-on-primary-container":"#d6e3ff","--md-sys-color-secondary":"#bec6dc","--md-sys-color-on-secondary":"#283141","--md-sys-color-secondary-container":"#3e4759","--md-sys-color-on-secondary-container":"#dae2f9","--md-sys-color-tertiary":"#ddbce0","--md-sys-color-on-tertiary":"#3f2844","--md-sys-color-tertiary-container":"#573e5c","--md-sys-color-on-tertiary-container":"#fad8fd","--md-sys-color-error":"#ffb4ab","--md-sys-color-on-error":"#690005","--md-sys-color-error-container":"#93000a","--md-sys-color-on-error-container":"#ffdad6","--md-sys-color-background":"#111318","--md-sys-color-on-background":"#e2e2e9","--md-sys-color-surface":"#111318","--md-sys-color-on-surface":"#e2e2e9","--md-sys-color-surface-variant":"#44474e","--md-sys-color-on-surface-variant":"#c4c6d0","--md-sys-color-outline":"#8e9099","--md-sys-color-outline-variant":"#44474e","--md-sys-color-shadow":"#000000","--md-sys-color-scrim":"#000000","--md-sys-color-inverse-surface":"#e2e2e9","--md-sys-color-inverse-on-surface":"#2e3036","--md-sys-color-inverse-primary":"#415f91","--md-sys-color-primary-fixed":"#d6e3ff","--md-sys-color-on-primary-fixed":"#001b3e","--md-sys-color-primary-fixed-dim":"#aac7ff","--md-sys-color-on-primary-fixed-variant":"#284777","--md-sys-color-secondary-fixed":"#dae2f9","--md-sys-color-on-secondary-fixed":"#131c2b","--md-sys-color-secondary-fixed-dim":"#bec6dc","--md-sys-color-on-secondary-fixed-variant":"#3e4759","--md-sys-color-tertiary-fixed":"#fad8fd","--md-sys-color-on-tertiary-fixed":"#28132e","--md-sys-color-tertiary-fixed-dim":"#ddbce0","--md-sys-color-on-tertiary-fixed-variant":"#573e5c","--md-sys-color-surface-dim":"#111318","--md-sys-color-surface-bright":"#37393e","--md-sys-color-surface-container-lowest":"#0c0e13","--md-sys-color-surface-container-low":"#191c20","--md-sys-color-surface-container":"#1d2024","--md-sys-color-surface-container-high":"#282a2f","--md-sys-color-surface-container-highest":"#33353a"}';

let otherVars = {
	'--md-sys-state-dragged-state-layer-opacity': 0.1599999964237213,
	'--md-sys-state-pressed-state-layer-opacity': 0.11999999731779099,
	'--md-sys-state-focus-state-layer-opacity': 0.11999999731779099,
	'--md-sys-state-hover-state-layer-opacity': 0.07999999821186066,
	'--md-sys-state-focus-indicator-thickness': '3px',
	'--md-sys-state-focus-indicator-outer-offset':
		'calc(2px - var(--md-sys-state-focus-indicator-thickness))',
	'--md-sys-state-focus-indicator-inner-offset':
		'calc(0px - var(--md-sys-state-focus-indicator-thickness))',
	'--md-sys-typescale-body-small-font':
		"'Roboto', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
	'--md-sys-typescale-body-small-line-height': '16px',
	'--md-sys-typescale-body-small-size': '12px',
	'--md-sys-typescale-body-small-weight': '400',
	'--md-sys-typescale-body-small-tracking': '0.4pt',
	'--md-sys-typescale-label-large-font':
		"'Roboto', system-ui, -apple-system, BlinkMacSystemFont,'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
	'--md-sys-typescale-label-large-line-height': '20px',
	'--md-sys-typescale-label-large-size': '14px',
	'--md-sys-typescale-label-large-weight': '500',
	'--md-sys-typescale-label-large-tracking': '0.1pt',
	'--md-sys-typescale-label-medium-font':
		"'Roboto', system-ui, -apple-system, BlinkMacSystemFont,'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
	'--md-sys-typescale-label-medium-line-height': '16px',
	'--md-sys-typescale-label-medium-size': '12px',
	'--md-sys-typescale-label-medium-weight': '500',
	'--md-sys-typescale-label-medium-weight-prominent': '700',
	'--md-sys-typescale-label-medium-tracking': '0.5pt',
	'--md-sys-typescale-label-small-font':
		"'Roboto', system-ui, -apple-system, BlinkMacSystemFont,'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
	'--md-sys-typescale-label-small-line-height': '16px',
	'--md-sys-typescale-label-small-size': '11px',
	'--md-sys-typescale-label-small-weight': '500',
	'--md-sys-typescale-label-small-tracking': '0.5pt',
	'--md-sys-shape-corner-full': '1000000000dvw',
	'--md-sys-shape-corner-extra-small': ' 4px',
	'--md-sys-shape-corner-small': ' 8px',
	'--circular': ' var(--md-sys-shape-corner-full)',
	'--md-sys-shape-corner-extra-small-top': "4px 4px 0 0",
	'--md-sys-typescale-body-large-font':
		"'Roboto', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
	'--md-sys-typescale-body-large-line-height': '24px',
	'--md-sys-typescale-body-large-size': '16px',
	'--md-sys-typescale-body-large-weight': '400',
	'--md-sys-typescale-body-large-tracking': '0.5pt',
};

/**
 * @param {String} hexCode
 * @param {Number} contrast
 */
export var applyThemeFromColor = async (hexCode, contrast) => {
	let lightScheme = new SchemeTonalSpot(Hct.fromInt(argbFromHex(hexCode)), false, contrast);
	let darkScheme = new SchemeTonalSpot(Hct.fromInt(argbFromHex(hexCode)), true, contrast);
	saveScheme(lightScheme, 'scheme_light');
	saveScheme(darkScheme, 'scheme_dark');

	applyScheme();
};

/**
 * @typedef { "dark" | "light" | "auto" | null} ThemeBehavior
 * @param {ThemeBehavior} behavior
 */
export var setSchemeBehavior = async (behavior) => {
	localStorage.setItem('scheme_behavior', behavior);
};

export var applyScheme = () => {
	let scheme_behavior = localStorage.getItem('scheme_behavior');
	/** @type {String | null} */
	let json;
	if (scheme_behavior != null && scheme_behavior != 'auto') {
		json = localStorage.getItem(`scheme_${scheme_behavior}`);
		if (json == null) {
			localStorage.setItem('scheme_light', defaultLight);
			localStorage.setItem('scheme_dark', defaultDark);
			if (scheme_behavior == 'dark') json = defaultDark;
			else json = defaultLight;
		}
	} else {
		json = localStorage.getItem(
			window.matchMedia('(prefers-color-scheme: dark)').matches ? 'scheme_dark' : 'scheme_light'
		);
		if (json == null) {
			localStorage.setItem('scheme_light', defaultLight);
			localStorage.setItem('scheme_dark', defaultDark);
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) json = defaultDark;
			else json = defaultLight;
		}
	}

	let colors = JSON.parse(json);

	/**
	 * @param {String} prop
	 * @param {String} value
	 */
	let setCssProp = (prop, value) => {
		document.body.style.setProperty(prop, value);
	};

	for (let key in colors) {
		setCssProp(key, colors[key]);
	}
	for (let key in otherVars) {
		setCssProp(key, otherVars[key]);
	}
   return true;
};
var saveScheme = (/** @type {DynamicScheme} */ scheme, /** @type {String} */ name) => {
	let colors = {
		'--md-sys-color-primary': hexFromArgb(scheme.primary),
		'--md-sys-color-surface-tint': hexFromArgb(scheme.surfaceTint),
		'--md-sys-color-on-primary': hexFromArgb(scheme.onPrimary),
		'--md-sys-color-primary-container': hexFromArgb(scheme.primaryContainer),
		'--md-sys-color-on-primary-container': hexFromArgb(scheme.onPrimaryContainer),
		'--md-sys-color-secondary': hexFromArgb(scheme.secondary),
		'--md-sys-color-on-secondary': hexFromArgb(scheme.onSecondary),
		'--md-sys-color-secondary-container': hexFromArgb(scheme.secondaryContainer),
		'--md-sys-color-on-secondary-container': hexFromArgb(scheme.onSecondaryContainer),
		'--md-sys-color-tertiary': hexFromArgb(scheme.tertiary),
		'--md-sys-color-on-tertiary': hexFromArgb(scheme.onTertiary),
		'--md-sys-color-tertiary-container': hexFromArgb(scheme.tertiaryContainer),
		'--md-sys-color-on-tertiary-container': hexFromArgb(scheme.onTertiaryContainer),
		'--md-sys-color-error': hexFromArgb(scheme.error),
		'--md-sys-color-on-error': hexFromArgb(scheme.onError),
		'--md-sys-color-error-container': hexFromArgb(scheme.errorContainer),
		'--md-sys-color-on-error-container': hexFromArgb(scheme.onErrorContainer),
		'--md-sys-color-background': hexFromArgb(scheme.background),
		'--md-sys-color-on-background': hexFromArgb(scheme.onBackground),
		'--md-sys-color-surface': hexFromArgb(scheme.surface),
		'--md-sys-color-on-surface': hexFromArgb(scheme.onSurface),
		'--md-sys-color-surface-variant': hexFromArgb(scheme.surfaceVariant),
		'--md-sys-color-on-surface-variant': hexFromArgb(scheme.onSurfaceVariant),
		'--md-sys-color-outline': hexFromArgb(scheme.outline),
		'--md-sys-color-outline-variant': hexFromArgb(scheme.outlineVariant),
		'--md-sys-color-shadow': hexFromArgb(scheme.shadow),
		'--md-sys-color-scrim': hexFromArgb(scheme.scrim),
		'--md-sys-color-inverse-surface': hexFromArgb(scheme.inverseSurface),
		'--md-sys-color-inverse-on-surface': hexFromArgb(scheme.inverseOnSurface),
		'--md-sys-color-inverse-primary': hexFromArgb(scheme.inversePrimary),
		'--md-sys-color-primary-fixed': hexFromArgb(scheme.primaryFixed),
		'--md-sys-color-on-primary-fixed': hexFromArgb(scheme.onPrimaryFixed),
		'--md-sys-color-primary-fixed-dim': hexFromArgb(scheme.primaryFixedDim),
		'--md-sys-color-on-primary-fixed-variant': hexFromArgb(scheme.onPrimaryFixedVariant),
		'--md-sys-color-secondary-fixed': hexFromArgb(scheme.secondaryFixed),
		'--md-sys-color-on-secondary-fixed': hexFromArgb(scheme.onSecondaryFixed),
		'--md-sys-color-secondary-fixed-dim': hexFromArgb(scheme.secondaryFixedDim),
		'--md-sys-color-on-secondary-fixed-variant': hexFromArgb(scheme.onSecondaryFixedVariant),
		'--md-sys-color-tertiary-fixed': hexFromArgb(scheme.tertiaryFixed),
		'--md-sys-color-on-tertiary-fixed': hexFromArgb(scheme.onTertiaryFixed),
		'--md-sys-color-tertiary-fixed-dim': hexFromArgb(scheme.tertiaryFixedDim),
		'--md-sys-color-on-tertiary-fixed-variant': hexFromArgb(scheme.onTertiaryFixedVariant),
		'--md-sys-color-surface-dim': hexFromArgb(scheme.surfaceDim),
		'--md-sys-color-surface-bright': hexFromArgb(scheme.surfaceBright),
		'--md-sys-color-surface-container-lowest': hexFromArgb(scheme.surfaceContainerLowest),
		'--md-sys-color-surface-container-low': hexFromArgb(scheme.surfaceContainerLow),
		'--md-sys-color-surface-container': hexFromArgb(scheme.surfaceContainer),
		'--md-sys-color-surface-container-high': hexFromArgb(scheme.surfaceContainerHigh),
		'--md-sys-color-surface-container-highest': hexFromArgb(scheme.surfaceContainerHighest)
	};
	localStorage.setItem(name, JSON.stringify(colors));
};
