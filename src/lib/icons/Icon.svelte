<script>
	import SymbolDisabledByDefault from './material-symbols/Symbol_disabled_by_default.svelte';


	let { filled = false, size = 24, icon: PathIcon = SymbolDisabledByDefault, badge } = $props();

	let s = $derived(size <= 22 ? 20 : size <= 32 ? 24 : size <= 44 ? 40 : 48);
</script>

<div style="--icon-size: {size}px">
	{#if PathIcon}
		<PathIcon f={filled} {s}></PathIcon>
	{/if}
	{#if badge}
		{@render badge()}
	{/if}
</div>

<style>
	div {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		isolation: isolate;
		width: var(--icon-size);
		height: var(--icon-size);
	}
	div :global(> svg) {
		width: var(--icon-size);
		height: var(--icon-size);
	}
</style>
