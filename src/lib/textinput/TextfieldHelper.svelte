<script>
	let { value = $bindable(''), multiline = false } = $props();
</script>

{#if multiline}
	<div style="width: 100%;" contenteditable role="textbox"></div>
{:else}
	<input style="width: 100%;" />
{/if}

<style>
    
</style>
