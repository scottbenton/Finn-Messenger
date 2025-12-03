<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { deleteMessage, updateMessage } from '$lib/api';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import RTE from '$lib/components/RTE.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import type { PageProps } from './$types';

	let editorInstance: ReturnType<typeof RTE>;

	const { data }: PageProps = $props();
	const message = data.message;

	let recepientName = $state<string>(message.receiverName);

	function handleSave() {
		if (!editorInstance) return;
		const content = editorInstance.getText();
		updateMessage(message.id, content, recepientName)
			.then((message) => {
				console.log('Message updated:', message);
				goto(resolve('/')).catch(() => {});
			})
			.catch((e) => {
				console.error(e);
			});
	}
	function handleDelete() {
		deleteMessage(message.id).then(() => {
			goto(resolve('/')).catch(() => {});
		});
	}
</script>

<Card class="gap-6 p-6">
	<h1 class="font-display text-3xl">Create a new message</h1>
	<TextInput bind:value={recepientName} label="Recipient Name" />
	<RTE bind:this={editorInstance} content={message.content} />
	<div class="flex items-center justify-end gap-2">
		<Button href="/" variant="secondary">Cancel</Button>
		<Button onClick={handleDelete} variant="secondary">Delete</Button>
		<Button onClick={handleSave}>Save</Button>
	</div>
</Card>
