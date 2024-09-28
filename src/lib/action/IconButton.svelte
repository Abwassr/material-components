<script>
	import PlainTooltip from '$lib/communication/PlainTooltip.svelte';
	import Icon from '$lib/icons/Icon.svelte';

	let {
		selected = $bindable(),
		icon,
		disabled = false,
		tooltip,
		toggle = true,
		onclick: parentOnClick
	} = $props();
</script>

<button
	class:disabled
	class:selected
	aria-disabled={disabled}
	{disabled}
	onclick={() => {
		if (toggle) selected = !selected;
		if (parentOnClick) parentOnClick(selected);
	}}
>
	<Icon {icon} filled={selected}></Icon>

	<div class="stateLayer"></div>
	<div class="focusIndicator"></div>
	<PlainTooltip text={tooltip}></PlainTooltip>
</button>

<style>
	button {
		position: relative;
		all: unset;
		box-sizing: border-box;
		width: 48px;
		height: 48px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		z-index: 0;
		cursor: pointer;
	}
	button:focus-visible {
		border-radius: var(--circular);
		outline-style: solid;
		outline-color: var(--md-sys-secondary);
		outline-width: var(--md-sys-state-focus-indicator-thickness);
		outline-offset: var(--md-sys-state-focus-indicator-outer-offset);
	}

	.stateLayer {
		position: absolute;
		background-color: var(--md-sys-color-on-surface-variant);
		opacity: 0;
		transform: scale(0.7);
		width: 40px;
		height: 40px;
		border-radius: var(--circular);
		transition: opacity 0.1s linear;
		transition: transform 0.05s linear;
	}
	button.disabled :global(> :first-child) {
		fill: var(--md-sys-color-on-surface);
		color: var(--md-sys-color-on-surface);
		opacity: 0.38;
	}

	button.disabled {
		cursor: auto;
	}

	button :global(> :first-child) {
		width: 24px;
		height: 24px;
		fill: var(--md-sys-color-on-surface-variant);
		z-index: 5;
		pointer-events: none;
	}

	button.selected :global(> :first-child) {
		fill: var(--md-sys-color-primary);
		color: var(--md-sys-color-primary);
	}

	button.disabled :global(> :first-child) {
		fill: var(--md-sys-color-on-surface);
		color: var(--md-sys-color-on-surface);
		opacity: 0.38;
	}

	@media (hover: hover) and (pointer: fine) {
		button:not(.selected, .disabled):hover > .stateLayer,
		button:not(.selected, .disabled):focus-visible > .stateLayer {
			transform: scale(1);
			background-color: var(--md-sys-color-on-surface-variant);
			opacity: var(--md-sys-state-hover-state-layer-opacity);
		}

		button.selected:not(.disabled):hover > .stateLayer,
		button.selected:not(.disabled):focus-visible > .stateLayer {
			transform: scale(1);
			background-color: var(--md-sys-color-primary);
			opacity: var(--md-sys-state-hover-state-layer-opacity);
		}
	}

	button:not(.selected, .disabled):hover:active > .stateLayer {
		transform: scale(1);
		background-color: var(--md-sys-color-on-surface-variant);
		opacity: var(--md-sys-state-pressed-state-layer-opacity);
	}

	button.selected:not(.disabled):hover:active > .stateLayer {
		transform: scale(1);
		background-color: var(--md-sys-color-primary);
		opacity: var(--md-sys-state-pressed-state-layer-opacity);
	}
</style>
