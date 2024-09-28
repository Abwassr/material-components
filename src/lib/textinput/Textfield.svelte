<script>
	import Icon from '$lib/icons/Icon.svelte';
	import { onMount } from 'svelte';
	import TextfieldHelper from './TextfieldHelper.svelte';

	let {
		value = $bindable(''),
		leadingIcon = null,
		trailingIcon = null,
		maxlength = null,
		disabled = false,
		prefix = '',
		suffix = '',
		supportingText = '',
		type = 'text',
		rightAligned = false,
		label = '',
		readonly
	} = $props();

	/** @type {HTMLInputElement}*/
	let inputField;
	/** @type {HTMLDivElement}*/
	let containerDiv;

	let bigLabel = $state(value == '');
	let focused = $state(false);
	let charCount = $state(0);
	let error = $state(true);
	$inspect(bigLabel);

	onMount(() => {
		inputField.addEventListener('focusout', (e) => {
			setTimeout(() => {
				if (
					!(document.activeElement == containerDiv || containerDiv.contains(document.activeElement))
				) {
					if (inputField.value == '') {
						bigLabel = true;
					}
					focused = false;
				} else {
					bigLabel = false;
				}
			}, 200);
		});
		inputField.addEventListener('focusin', (e) => {
			bigLabel = false;
			focused = true;
		});
		inputField.addEventListener('input', (e) => {
			charCount = inputField.value.length;
			label_pop.classList.remove('hidden');
			label_unpop.classList.add('hidden');

			if (inputField.scrollHeight > inputField.clientHeight)
				inputField.style.height = inputField.scrollHeight + 'px';
		});
	});

	/** @type {HTMLElement} */
	let label_pop, label_unpop;
	$effect(() => {
		if (bigLabel) {
			label_pop.classList.add('transform-start');
			setTimeout(() => {
				label_pop.classList.add('hidden');
				label_unpop.classList.remove('hidden');
			}, 100);
		} else {
			label_pop.classList.remove('hidden');
			label_unpop.classList.add('hidden');
		}
	});
</script>

<div class="wrapper" class:disabled>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		bind:this={containerDiv}
		class="container"
		class:error
		class:focused
		{disabled}
		onclick={(e) => {
			e.preventDefault();
			inputField.focus();
		}}
	>
		<div class="stateLayer"></div>
		<div class="focusIndicator" class:focused></div>
		{#if leadingIcon}
			<div class="icon left">
				<Icon icon={leadingIcon}></Icon>
			</div>
		{/if}
		<div class="text">
			<div class="labelarea">
				<div
					bind:this={label_pop}
					class:focused
					class="label populated"
					class:transform-start={bigLabel}
				>
					{label}
				</div>
			</div>

			<span bind:this={label_unpop} class="label unpopulated">{label}</span>

			<div class="inputarea" class:hidden={bigLabel}>
				{#if prefix}
					<span class="prefix">{prefix}</span>
				{/if}
				<input
                    width="100%"
					aria-disabled={disabled}
					{disabled}
					{maxlength}
                    {readonly}
                    style={rightAligned ? "text-align: right;" :""}
					bind:value
					bind:this={inputField}
					{type}
				/>	
                <!-- <div
                width="100%"
                multiple
				rows="1"
                aria-disabled={disabled}
                {disabled}
                {maxlength}
                {readonly}
				contenteditable
                bind:this={inputField}
				
                {type}
            >
			</div> -->
			<!-- <TextfieldHelper></TextfieldHelper> -->
				{#if suffix}
					<span class="suffix">{suffix}</span>
				{/if}
			</div>
		</div>
		{#if trailingIcon}
			<div class="icon right">
				<Icon icon={trailingIcon}></Icon>
			</div>
		{/if}
	</div>
	<div class="under" class:error>
		<div class="supportingText">{supportingText}</div>
		{#if maxlength}
			<div class="charLimit">{charCount}/{maxlength}</div>
		{/if}
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
	}
	.under {
		display: flex;
		flex-direction: row;
		justify-content: stretch;

		font-family: var(--md-sys-typescale-body-small-font);
		line-height: var(--md-sys-typescale-body-small-line-height);
		font-size: var(--md-sys-typescale-body-small-size);
		font-weight: var(--md-sys-typescale-body-small-weight);
		letter-spacing: var(--md-sys-typescale-body-small-tracking);
		color: var(--md-sys-color-on-surface-variant);
	}
	.supportingText {
		word-break: normal;
		flex-grow: 1;
		margin-inline: 16px;
	}
	.error > .supportingText {
		color: var(--md-sys-color-error);
	}
	.charLimit {
		margin-right: 16px;
	}
	.hidden {
		opacity: 0;
	}
	input,
	textarea {
		all: unset;
		box-sizing: border-box;
	}
	.container {
		position: relative;
		background-color: var(--md-sys-color-surface-container-highest);
		min-height: 56px;
		word-break: break-all;
		border-radius: var(--md-sys-shape-corner-extra-small-top);
		display: flex;
		flex-direction: row;
		justify-content: stretch;
		align-items: center;
		cursor: text;
	}
	.disabled > .container {
		cursor: default;
	}
	.disabled {
		opacity: 0.7;
	}
	.container:focus-visible {
		outline: 0px solid #fff;
	}
	.focusIndicator {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 1px;
		background-color: var(--md-sys-color-on-surface-variant);
		transition: height 0.1s linear;
	}
	.container:hover > .focusIndicator {
		background-color: var(--md-sys-color-on-surface);
	}
	.focusIndicator.focused {
		height: 3px;
		background-color: var(--md-sys-color-primary);
	}
	.error > .focusIndicator {
		background-color: var(--md-sys-color-error);
	}
	.error:hover > .focusIndicator {
		background-color: var(--md-sys-color-on-error-container);
	}
	.stateLayer {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	:not(.disabled) > .container:hover > .stateLayer {
		background-color: var(--md-sys-color-on-surface);
		opacity: var(--md-sys-state-hover-state-layer-opacity);
	}
	.label {
		font-family: var(--md-sys-typescale-body-large-font);
		font-size: var(--md-sys-typescale-body-large-size);
		line-height: var(--md-sys-typescale-body-large-line-height);
		font-weight: var(--md-sys-typescale-body-large-weight);
		letter-spacing: var(--md-sys-typescale-body-large-tracking);
		transition: transform 0.1s ease-in-out;
	}
	.label.unpopulated {
		position: absolute;
		left: 0;
		top: 8px;
	}
	.label.populated {
		line-height: var(--md-sys-typescale-body-small-line-height);
		font-size: var(--md-sys-typescale-body-small-size);
		transform-origin: top left;
		transform: translateX(0) translateY(0px) scale(1);
	}
	.label.transform-start {
		transform-origin: top left;
		transform: scale(1.3) translateY(7px);
	}
	.label.focused {
		color: var(--md-sys-color-primary);
	}
	.error > div > .label,
	.error > div > div > .label {
		color: var(--md-sys-color-error);
	}
	.error:hover > div > .label,
	.error:hover > div > div > .label {
		color: var(--md-sys-color-on-error-container);
	}
	.text {
		position: relative;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		margin-inline: 16px;
		margin-block: 8px;
	}
	input,
	textarea {
		width: 100%;
		caret-color: var(--md-sys-color-primary);
		color: var(--md-sys-color-on-surface);
		font-family: var(--md-sys-typescale-body-large-font);
		font-size: var(--md-sys-typescale-body-large-size);
		line-height: var(--md-sys-typescale-body-large-line-height);
		font-weight: var(--md-sys-typescale-body-large-weight);
		letter-spacing: var(--md-sys-typescale-body-large-tracking);
	}
	.error > div > div > input,
	.error > div > div > textarea {
		caret-color: var(--md-sys-color-error);
	}
	.icon {
		fill: var(--md-sys-color-on-surface-variant);
	}
	.icon.left {
		margin-left: 12px;
	}
	.icon.right {
		margin-right: 12px;
	}
	.error > .icon.right {
		fill: var(--md-sys-color-error);
	}
	.error:hover > .icon.right {
		fill: var(--md-sys-color-on-error-container);
	}
	.inputarea {
		display: flex;
		flex-direction: row;
		align-items: center;
		transition: opacity 0.1s ease-in-out;
	}
	.prefix {
		margin-right: 2px;
	}
	.suffix {
		margin-left: 2px;
	}
</style>
