<script lang="ts">
	import FinnGif from '$lib/assets/finn_message.webp';
	import { fly } from 'svelte/transition';
	import Card from '$lib/components/Card.svelte';
	import { cubicOut } from 'svelte/easing';
	import RTEViewer from '$lib/components/RTEViewer.svelte';
	import TextDivider from '$lib/components/TextDivider.svelte';
	import { getContext, onMount } from 'svelte';
	import type { AuthState } from '$lib/auth.svelte';
	import { updateReadCount } from '$lib/api/updateReadCount';
	import { readMessage } from '$lib/api';
	import type { MessageDTO } from '$lib/api';
	import type { PageProps } from './$types';

	const { params }: PageProps = $props();
	const id = params.id;

	let message = $state<MessageDTO | null>(null);
	let loading = $state(true);

	const uid = (getContext('auth') as AuthState).user?.uid;
	onMount(() => {
		readMessage(id)
			.then((msg) => {
				message = msg;
				loading = false;

				if (msg && uid !== msg.senderId) {
					updateReadCount(msg.id).catch(() => {});
				}
			})
			.catch(() => {
				loading = false;
			});
	});

	// The message is hidden at first, lets add a state for that
	let isHidden = $state(true);
	let isOutroed = $state(false);

	const transitionY = 150;
</script>

<svelte:head>
	<title>A message for you</title>
</svelte:head>

{#if message}
	{#if isHidden}
		<Card
			out={(node) => fly(node, { y: -transitionY, duration: 750, easing: cubicOut })}
			onOutroEnd={() => (isOutroed = true)}
		>
			<div class="flex flex-col items-center justify-center p-6">
				<h1 class="py-2 font-display text-4xl">Finn has a message for you</h1>
				<img src={FinnGif} alt="Finn wagging his tail holding a letter" />
				<button
					class="cursor-pointer border-2 border-yellow-600 px-5 py-3 text-xl font-semibold text-stone-700 outline-yellow-600 transition-all duration-150 ease-in-out hover:outline-2"
					onclick={() => (isHidden = false)}>Open the Letter</button
				>
			</div>
		</Card>
	{:else if isOutroed}
		<Card in={(node) => fly(node, { y: transitionY, duration: 500, delay: 750, easing: cubicOut })}>
			<div class="flex flex-col items-start justify-center gap-8 p-6 pb-10">
				<TextDivider className="text-yellow-600 max-w-sm mx-auto" />
				<RTEViewer content={message.content} />
			</div>
		</Card>
	{/if}
{:else if !loading}
	<Card class="p-6">
		<h1 class="py-2 font-display text-4xl">Failed to load message</h1>
	</Card>
{/if}
