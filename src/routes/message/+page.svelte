<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { createMessage } from '$lib/api';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import RTE from '$lib/components/RTE.svelte';
	import TextInput from '$lib/components/TextInput.svelte';

	let editorInstance: ReturnType<typeof RTE>;

	let recepientName = $state<string>('');

	function handleSave() {
		if (!editorInstance) return;
		const content = editorInstance.getText();
		createMessage(content, recepientName)
			.then((message) => {
				console.log('Message created:', message);
				goto(resolve('/')).catch(() => {});
			})
			.catch((e) => {
				console.error(e);
			});
	}
</script>

<Card class="gap-6 p-6">
	<h1 class="font-display text-3xl">Create a new message</h1>
	<TextInput bind:value={recepientName} label="Recipient Name" />
	<RTE bind:this={editorInstance} />
	<div class="flex items-center justify-end gap-2">
		<Button href="/" variant="secondary">Cancel</Button>
		<Button onClick={handleSave}>Save</Button>
	</div>
</Card>
