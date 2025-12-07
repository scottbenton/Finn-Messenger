<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { deleteMessage, readMessage, updateMessage, type MessageDTO } from '$lib/api';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import RTE from '$lib/components/RTE.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';

	const { params }: PageProps = $props();
	const messageId = params.id;

	let message = $state<MessageDTO | null>(null);
	let loading = $state(true);

	let recepientName = $state<string>('');
	let editorInstance: ReturnType<typeof RTE>;

	onMount(() => {
		readMessage(messageId)
			.then((msg) => {
				message = msg;
				recepientName = msg.receiverName;
				loading = false;
			})
			.catch(() => {
				loading = false;
			});
	});

	function handleSave() {
		if (!editorInstance || !message) return;
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
		if (!message) return;
		deleteMessage(message.id).then(() => {
			goto(resolve('/')).catch(() => {});
		});
	}
</script>

{#if message}
	<Card class="gap-6 p-6">
		<h1 class="font-display text-3xl">Edit your message</h1>
		<TextInput bind:value={recepientName} label="Recipient Name" />
		<RTE bind:this={editorInstance} content={message.content} />
		<div class="flex items-center justify-end gap-2">
			<Button href="/" variant="secondary">Cancel</Button>
			<Button onClick={handleDelete} variant="secondary">Delete</Button>
			<Button onClick={handleSave}>Save</Button>
		</div>
	</Card>
{:else if !loading}
	<Card class="gap-6 p-6">
		<h1 class="font-display text-3xl">Failed to load message</h1>
	</Card>
{/if}
