<script>
	import { onMount } from 'svelte';
	import { applyScheme } from './Theme.js';

	/** @type {{loading: Snippet<Any>}}*/
	let { loading } = $props();

	var themeLoad = $state(null);
	onMount(() => {
		themeLoad = applyScheme();
	});
</script>

{#if themeLoad == null}
	{#if !loading}
		<div></div>
	{:else}
		{@render loading()}
	{/if}
{/if}

<style>
	div {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgb(0, 0, 0);
		z-index: 10000;
		color: #fff;
	}
	:global(:root, body, *) {
		box-sizing: border-box !important;
		-webkit-tap-highlight-color: transparent;
	}
	:global(body) {
		overflow: hidden;
		background-color: var(--md-sys-color-surface-container-lowest);
		color: var(--md-sys-color-on-surface);
		font-family: var(--md-sys-typescale-label-medium-font);
		user-select: none;
		margin: 0;
		fill: var(--md-sys-color-on-surface);
	}

	/* width */
	:global(::-webkit-scrollbar) {
		width: 4px;
	}

	/* Track */
	:global(::-webkit-scrollbar-track) {
		background: transparent;
	}

	/* Handle */
	:global(::-webkit-scrollbar-thumb) {
		background: var(--md-sys-color-primary);
		border-radius: 2px;
	}

	/* Handle on hover */
	:global(::-webkit-scrollbar-thumb:hover) {
		background: var(--md-sys-color-primary);
	}
	:global(a){
		color: var(--md-sys-color-tertiary);
	}
</style>
