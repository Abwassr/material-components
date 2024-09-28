<script>
	import IconButton from '$lib/action/IconButton.svelte';
	import Icon from '$lib/icons/Icon.svelte';
	import SymbolAlternateEmail from '$lib/icons/material-symbols/Symbol_alternate_email.svelte';
	import SymbolArrowLeft from '$lib/icons/material-symbols/Symbol_arrow_left.svelte';
	import SymbolCancel from '$lib/icons/material-symbols/Symbol_cancel.svelte';
	import SymbolDarkMode from '$lib/icons/material-symbols/Symbol_dark_mode.svelte';
	import SymbolFullCoverage from '$lib/icons/material-symbols/Symbol_full_coverage.svelte';
	import SymbolHome from '$lib/icons/material-symbols/Symbol_home.svelte';
	import SymbolLanguage from '$lib/icons/material-symbols/Symbol_language.svelte';
	import SymbolLightMode from '$lib/icons/material-symbols/Symbol_light_mode.svelte';
	import SymbolNewsstand from '$lib/icons/material-symbols/Symbol_newsstand.svelte';
	import SymbolScience from '$lib/icons/material-symbols/Symbol_science.svelte';
	import SymbolSearch from '$lib/icons/material-symbols/Symbol_search.svelte';
	import SymbolStars from '$lib/icons/material-symbols/Symbol_stars.svelte';
	import NavigationBar from '$lib/navigation/NavigationBar.svelte';
	import Switch from '$lib/selection/Switch.svelte';
	import Textfield from '$lib/textinput/Textfield.svelte';
	import { applyScheme, applyThemeFromColor, setSchemeBehavior } from '$lib/theme/Theme.js';
	import ThemeLoader from '$lib/theme/ThemeLoader.svelte';

	$effect(()=> {

		applyThemeFromColor("#415f91", 0);
	});

	let selected = $state(true);

	$effect(()=> {
		if(selected){
			setSchemeBehavior("dark");
			applyScheme();
		}else{
			setSchemeBehavior("light");
			applyScheme();
		}
	})
</script>

<div class="rootDiv">
	<div class="content" data-main-content-container>
		<h1>Welcome to your library project</h1>
		<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
		<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
		<ThemeLoader></ThemeLoader>
		<Icon icon={SymbolAlternateEmail} size={24} style={'filled'}></Icon>
		<IconButton tooltip={'Home'} icon={SymbolHome}></IconButton>
		<IconButton tooltip={'Back'} icon={SymbolArrowLeft}></IconButton>
		<Switch bind:selected onIcon={SymbolLightMode} offIcon={SymbolDarkMode}></Switch>
		<br/>
		<br/>
		<div style="width: 300px;">
			<Textfield leadingIcon={SymbolSearch} trailingIcon={SymbolCancel} maxlength={2000}></Textfield>
		</div>
	</div>
	<nav>
	<NavigationBar
		targets={[
			{
				icon: SymbolFullCoverage,
				label: 'News',
				smallBadge: true
			},
			{
				icon: SymbolLanguage,
				label: 'Global',
				badgeCount: 2
			},
			{
				icon: SymbolStars,
				label: 'For You',
				badgeCount: 4990
			},
			{
				icon: SymbolNewsstand,
				label: 'Trending',
				badgeCount: 27
			},
			{
				icon: SymbolScience,
				label: 'Test',
				badgeCount: 273
			}
		]}
	></NavigationBar></nav>
</div>

<style>
	.rootDiv{
		height: 100dvh;
		width: 100dvw;
		display: flex;
		flex-direction: column;
		justify-content: stretch;

	}
	.content{
flex-grow: 1;
overflow: auto;
	}
</style>