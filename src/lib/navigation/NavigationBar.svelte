<script>
	import Badge from '$lib/communication/Badge.svelte';
	import Icon from '$lib/icons/Icon.svelte';
	import { onMount } from 'svelte';

	/** @type {HTMLDivElement}*/
	let navbar;

	/**
	 * @typedef {Object} NavTarget
	 * @property {Icon} icon
	 * @property {String} label
	 * @property {Number | null} [badgeCount = null]
	 * @property {Boolean} [smallBadge = false]
	 * @property {((label: String) => any)} callback
	 *
	 * @typedef {Array<NavTarget>} NavTargets
	 *
	 * @type {{targets: NavTargets, hideOnScroll: Boolean, hideLabels: Boolean}}
	 */
	let { targets, hideOnScroll, hideLabels, selected = $bindable(0) } = $props();

	onMount(() => {
		navbar.style.setProperty('--navbarChildrenCount', `${navbar.childElementCount}`);
		navbar.classList.remove('hide');

		if (targets.length < 3) {
			console.warn("Navbars shouldn't be used for less than 3 destinations!");
		}
		if (targets.length > 5) {
			console.warn("Navbars shouldn't be used for more than 5 destinations!");
		}

		if (hideOnScroll) {
			let prevScrollpos = window.screenY;
			let lastUpScroll = 0;
			/** @type {HTMLDivElement | null} */
			let scrollDiv = document.querySelector('[data-main-content-container]');
			if (scrollDiv != null)
				scrollDiv.onscroll = function () {
					var currentScrollPos = scrollDiv.scrollTop;
					if (prevScrollpos < currentScrollPos) {
						navbar.style.bottom = '';
						navbar.parentElement.style.height = '80';
					} else {
						navbar.style.bottom = '-100px';
						navbar.parentElement.style.height = '0px';
					}
					prevScrollpos = currentScrollPos;
				};
		}
	});

	/**
	 * @param {MouseEvent & { currentTarget: HTMLButtonElement; }} e
	 * @param {String} label
	 * @param {((label: String) => any)} callback
	 */
	var handleClick = (e, label, callback) => {
		/** @type {HTMLButtonElement} clickedEl*/
		navbar
			.querySelectorAll('[data-navbar-element].active')
			.forEach((el) => el.classList.remove('active'));

		selected = targets.map((t) => t.label).indexOf(label);
		e.currentTarget.classList.add('active');
		if (callback) callback(label);
	};
</script>

<div style="position: relative;height: 80px; transition: height 0.2s ease-out;">
	<div bind:this={navbar} class="container hide" role="tab">
		{#each targets as target, i}
			<button
				onclick={(e) => handleClick(e, target.label, target.callback)}
				class:active={selected == i}
				data-navbar-element
				aria-label={`[${target.label}]`}
			>
				<div class="icon_container">
					<div class="active_indicator"></div>
					<div class="state_layer"></div>
					<div style="z-index: 1;display:flex; justify-content:center; align-items: center;">
						<Icon filled={selected == i} icon={target.icon}>
							{#snippet badge()}
								{#if target.smallBadge || target.badgeCount != null}
									<Badge count={target.smallBadge ? null : target.badgeCount}></Badge>
								{/if}
							{/snippet}
						</Icon>
					</div>
				</div>
				<span>
					{#if !hideLabels}
						{target.label}
					{/if}
				</span>
			</button>
		{/each}
	</div>
</div>

<style>
	button {
		all: unset;
		box-sizing: border-box;
	}
	button:focus-visible {
		border-radius: 5px;
		outline-style: solid;
		outline-color: var(--md-sys-secondary);
		outline-width: var(--md-sys-state-focus-indicator-thickness);
		outline-offset: var(--md-sys-state-focus-indicator-inner-offset);
	}
	.container {
		position: absolute;
		bottom: 0px;
		background-color: var(--md-sys-color-surface-container);
		height: 80px;
		width: 100dvw;
		z-index: 2;

		display: grid;
		grid-template-columns: repeat(var(--navbarChildrenCount), 1fr);
		column-gap: 8px;

		transition: bottom 0.2s ease-out;
	}
	.container > button {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1 1 0px;
		height: 80px;
		isolation: isolate;
	}
	span {
		text-align: center;
		font: var(--md-sys-typescale-label-medium-font);
		font-size: var(--md-sys-typescale-label-medium-size);
		line-height: var(--md-sys-typescale-label-medium-line-height);
		font-weight: var(--md-sys-typescale-label-medium-weight);
		letter-spacing: var(--md-sys-typescale-label-medium-tracking);
		color: var(--md-sys-color-on-surface-variant);
		margin-bottom: 16px;
	}
	.active > span {
		font-weight: var(--md-sys-typescale-label-medium-weight-prominent);
		color: var(--md-sys-color-on-surface);
	}
	.icon_container {
		position: relative;
		fill: var(--md-sys-color-on-surface-variant);
		width: 64px;
		border-radius: var(--circular);
		height: 32px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 4px;
		margin-top: 12px;
	}
	.active_indicator {
		position: absolute;
		color: var(--md-sys-color-on-surface-variant);
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		border-radius: var(--circular);
		transform: scaleX(0.5);
		transition: opacity 0.05s ease-out;
		transition: transform 0.1s ease-out 0.02s;
	}
	.active > div > .active_indicator {
		background-color: var(--md-sys-color-secondary-container);
		color: var(--md-sys-color-on-secondary-container);
		transform: scaleX(1);
	}

	.state_layer {
		position: absolute;
		border-radius: var(--circular);
		background-color: var(--md-sys-color-on-surface);
		opacity: 0;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		transform: scaleX(0.5);
		transition: opacity 0.05s ease-out;
		transition: transform 0.1s ease-out 0.02s;
	}
	button:hover > .icon_container > .state_layer {
		opacity: var(--md-sys-state-hover-state-layer-opacity);
		transform: scaleX(1);
	}
	button:focus-visible > .icon_container > .state_layer {
		opacity: var(--md-sys-state-focus-state-layer-opacity);
		transform: scaleX(1);
	}
	button:active > .icon_container > .state_layer {
		opacity: var(--md-sys-state-pressed-state-layer-opacity);
		transform: scaleX(1);
	}
	.hide {
		display: none;
	}
</style>
