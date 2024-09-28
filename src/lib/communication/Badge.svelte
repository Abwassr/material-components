<script>
/** @type {{count: [Number | null], inline: Boolean}}*/
    let {count = null, inline = false} = $props();
</script>

<div
class:inline
	class:simple-badge={!count}
	aria-label={!count ? 'new notification' : `${count} new notification${count != 1 ? 's' : ''}`}
>
	<span>{count ? (count > 999 ? '999+' : count) : ''}</span>
</div>

<style>
	div:not(.inline) {
		position: absolute;
		background-color: var(--md-sys-color-error);
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--md-sys-color-on-error);
		font-family: var(--md-sys-typescale-label-small-font);
		font-weight: var(--md-sys-typescale-label-small-weight);
		font-size: var(--md-sys-typescale-label-small-size);
		line-height: var(--md-sys-typescale-label-small-line-height);
		letter-spacing: var(--md-sys-typescale-label-small-tracking);
        padding: 4px;
	}
    div.inline{
        position: relative;
        background-color: var(--md-sys-color-error);
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--md-sys-color-on-error);
		font-family: var(--md-sys-typescale-label-small-font);
		font-weight: var(--md-sys-typescale-label-small-weight);
		font-size: var(--md-sys-typescale-label-small-size);
		line-height: var(--md-sys-typescale-label-small-line-height);
		letter-spacing: var(--md-sys-typescale-label-small-tracking);
        padding: 4px;
    }
	.simple-badge:not(.inline) {
		top: 0;
		right: 0;
	}
	div:not(.simple-badge):not(.inline) {
		top: -2px;
		left: 12px;
	}
	.simple-badge {
		width: 6px;
		height: 6px;
		border-radius: var(--circular);
	}
	div:not(.simple-badge) {
		height: 16px;
		min-width: 16px;
		max-width: 34px;
		border-radius: var(--circular);
	}
</style>
