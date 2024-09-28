<script module>
	let current = $state(0);
</script>

<script>
	import { onMount } from 'svelte';

	/** @type {{text: String}}*/
	let  {text} = $props();

	let shown = $state(false);
	let hidden = $state(false);
	let calcPos = $state(false);

	let tooltipID = -1;

	$effect(()=>{
		if(current != tooltipID)
		hide();
	})

	/** @type {HTMLDivElement}*/
	let tooltipEl;

	let hoverTimeout = -1;
	let unhoverTimer = -1;

	onMount(() => {
		calcNewPosition();
		let targetEl = tooltipEl.parentElement;
		if (targetEl == null) {
			return;
		}
		if (matchMedia('(pointer:fine)').matches) {
			targetEl.addEventListener('mouseover', () => {
				calcPos = true;
				hoverTimeout = setTimeout(() => {
					show();
					calcPos = false;
				}, 500);
				if (unhoverTimer != -1) {
					clearTimeout(unhoverTimer);
					unhoverTimer = -1;
				}
			});
			targetEl.addEventListener('mouseout', () => {
				calcPos = false;
				if (shown) {
					unhoverTimer = setTimeout(() => {
						hide();
					}, 1500);
				}
				if (hoverTimeout != -1) {
					clearTimeout(hoverTimeout);
					hoverTimeout = -1;
				}
			});
		} else {
			targetEl.addEventListener('touchstart', () => {
				calcPos = true;
				hoverTimeout = setTimeout(() => {
					show();
					calcPos = false;
				}, 500);
				if (unhoverTimer != -1) {
					clearTimeout(unhoverTimer);
					unhoverTimer = -1;
				}
			});
			targetEl.addEventListener('touchend', () => {
				calcPos = false;
				if (shown) {
					unhoverTimer = setTimeout(() => {
						hide();
					}, 1500);
				}
				if (hoverTimeout != -1) {
					clearTimeout(hoverTimeout);
					hoverTimeout = -1;
				}
			});
		}
	});

	

	export function show() {
		shown = true;
		hidden = false;
		calcNewPosition();
		tooltipID = Math.random();
		current =tooltipID;
	}

	export function hide() {
		shown = false;
		hidden = true;
		setTimeout(() => {
			hidden = false;
		}, 150);
	}

	function calcNewPosition() {
		let bcr = tooltipEl.getBoundingClientRect();
		if (bcr.left < 2) {
			tooltipEl.style.left = '2px';
			tooltipEl.style.removeProperty('right');
		}
		if (bcr.right > document.documentElement.clientWidth - 2) {
			tooltipEl.style.right = '2px';
			tooltipEl.style.removeProperty('left');
		}

		if (bcr.top < 20) {
			tooltipEl.style.top = '40px';
			tooltipEl.style.removeProperty('bottom');
		}
		if (bcr.bottom > document.documentElement.clientHeight - 20) {
			tooltipEl.style.removeProperty('top');
			tooltipEl.style.bottom = '40px';
		}
	}
</script>

<div
	bind:this={tooltipEl}
	role="tooltip"
	class:displayNone={!shown && !hidden && !calcPos}
	class:show={shown}
	class:hide={hidden}
>
	<span>{text}</span>
</div>

<style>
	div {
		cursor: auto;
		position: absolute;
		bottom: 40px;

		background-color: var(--md-sys-color-inverse-surface);
		border-radius: var(--md-sys-shape-corner-extra-small);
		line-height: var(--md-sys-typescale-body-small-line-height);
		font-size: var(--md-sys-typescale-body-small-size);
		font-weight: var(--md-sys-typescale-body-small-weight);
		letter-spacing: var(--md-sys-typescale-body-small-tracking);
		color: var(--md-sys-color-inverse-on-surface);
		min-height: 24px;
		width: fit-content;
		padding-inline: 8px;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		vertical-align: middle;
		white-space: nowrap;
		z-index: 5;

		opacity: 0;
		transform: scaleX(0.7);
		transition: opacity 0.075s ease-out;
	}
	span {
		opacity: 0;
		transition: all 0.1s ease-in-out 0.075s;
	}
	.show {
		opacity: 1;
		transform: scaleX(1);
		transition: transform 0.1s ease-out;
	}

	.hide {
		opacity: 0;
		transition: opacity 0.2s ease-out;
		transform: scaleX(1);
	}
	.displayNone {
		display: none;
	}
	.show > span {
		opacity: 1;
	}
</style>
