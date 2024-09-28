<script>
	import Icon from '$lib/icons/Icon.svelte';

	let {
		selected = $bindable(false),
		disabled = false,
		offIcon = null,
		onIcon = null,
		onclick: parentOnClick = null
	} = $props();
	let icon = $state(onIcon);

	$effect(() => {
		icon = selected ? onIcon : offIcon;
	});

	var click = () => {
		if (!disabled) {
			selected = !selected;
			if (parentOnClick) parentOnClick(selected);
		}
	};
	/*
TODO

Add transparency to switch track
-finish disable functionality 
=> Continue work on chips

*/
</script>

<button
	onclick={click}
	class:disabled
	class:selected
	class="track"
	role="switch"
	aria-checked={selected}
>
	<div class="handle-wrapper">
		<div class="handle" class:icon={icon != null}>
			{#if icon}
				<Icon size={16} {icon}></Icon>
			{/if}
			<div class="state-layer"></div>
		</div>
	</div>
</button>

<style>
	button {
		all: unset;
		box-sizing: border-box;
	}
	button:focus-visible {
		outline-color: var(--md-sys-color-secondary);
		outline-width: var(--md-sys-state-focus-indicator-thickness);
		outline-offset: var(--md-sys-state-focus-indicator-outer-offset);
		outline-style: solid;
	}
	.track {
		height: 32px;
		width: 52px;
		border-color: var(--md-sys-color-outline);
		border-width: 2px;
		border-style: solid;
		border-radius: var(--circular);
		background-color: var(--md-sys-color-surface-container-highest);
		transition: all 0.2s ease-out;
		color: var(--md-sys-color-surface-container-highest);
	}

	.track.selected {
		background-color: var(--md-sys-color-primary);
		border-color: var(--md-sys-color-primary);
		color: var(--md-sys-color-on-primary-container);
	}
	.handle-wrapper {
		width: 28px;
		height: 28px;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.4s cubic-bezier(0.33, 1.45, 0.58, 1.01);
	}
	.track.selected > .handle-wrapper {
		transform: translateX(20px);
	}

	.handle {
		height: 16px;
		width: 16px;
		border-radius: var(--circular);
		background-color: var(--md-sys-color-outline);
		position: relative;

		display: flex;
		justify-content: center;
		align-items: center;
		transition: width 0.4s cubic-bezier(0.33, 1.45, 0.67, 1.73);
		transition: height 0.4s cubic-bezier(0.33, 1.45, 0.67, 1.73);
		transition: background-color 0.2s linear;
	}

	.track.selected > div > .handle,
	.handle.icon {
		height: 24px;
		width: 24px;
	}
	.track:not(.disabled):active > div > .handle {
		height: 29px;
		width: 29px;
	}

	.track.selected > div > .handle {
		background-color: var(--md-sys-color-on-primary);
	}

	.track:not(.disabled):hover:not(.selected) > div > .handle {
		background-color: var(--md-sys-color-on-surface-variant);
	}

	.state-layer {
		position: absolute;
		height: 40px;
		width: 40px;
		background-color: var(--md-sys-color-on-surface);
		opacity: 0;
		border-radius: var(--circular);
		transform: scale(0.5);
		transition: opacity 0.1s linear;
		transition: transform 0.05s linear;
	}

	.track.selected > div > .handle > .state-layer {
		background-color: var(--md-sys-color-primary);
	}

	.track:not(.disabled):hover > div > .handle > .state-layer {
		opacity: var(--md-sys-state-hover-state-layer-opacity);
		transform: scale(1);
	}
	.track:not(.disabled):focus-visible > div > .handle > .state-layer {
		opacity: var(--md-sys-state-focus-state-layer-opacity);
		transform: scale(1);
	}
	.track:not(.disabled):active > div > .handle > .state-layer {
		opacity: var(--md-sys-state-pressed-state-layer-opacity);
		transform: scale(1);
	}

	.track.disabled > div > .icon > :global(:first-child) {
		color: var(--md-sys-color-surface-container-highest);
		opacity: 0.38;
	}

	.track.disabled.selected > div > .icon > :global(:first-child) {
		color: var(--md-sys-color-on-surface);
		opacity: 0.38;
	}

	.track.disabled {
		background-color: var(--md-sys-color-surface-container-highest);
		border-color: var(--md-sys-color-on-surface);
		opacity: 0.80;
	}
</style>
