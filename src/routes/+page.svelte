<script lang="ts">
	import { loginWithGoogle, logout, type AuthState } from '$lib/auth.svelte';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import { getContext } from 'svelte';
	import { getUsersMessages } from '$lib/api';
	import type { MessageDTO } from '$lib/api';

	let messages = $state<MessageDTO[]>([]);

	const authState = getContext('auth') as AuthState;

	$effect(() => {
		if (authState.user !== null) {
			getUsersMessages().then((msgs) => {
				messages = msgs;
			});
		} else {
			messages = [];
		}
	});

	function copyLinkToClipboard(id: string) {
		const link = `${window.location.origin}/message/${id}`;
		navigator.clipboard.writeText(link);
	}
</script>

{#if authState.user !== null}
	<Card class="flex items-stretch justify-center gap-6 p-6">
		<div class="flex items-baseline justify-between">
			<h1 class="font-display text-3xl">Your Messages</h1>
			<Button href="/message">Create new Message</Button>
		</div>
		<div class="border-b border-stone-300">
			{#each messages as message (message.id)}
				<div class="border-t border-stone-300 px-4 py-4">
					<p>Message sent to {message.receiverName} on {message.sentOn.toLocaleString()}</p>
					<p class="text-stone-600">{message.viewsByUserOtherThanSender} views</p>
					<div class="mt-2 flex items-center gap-4">
						<Button variant="text" href={`/message/${message.id}`}>View</Button>
						<Button variant="text" href={`/message/${message.id}/edit`}>Edit</Button>
						<Button variant="text" onClick={() => copyLinkToClipboard(message.id)}>
							Copy Link
						</Button>
					</div>
				</div>
			{/each}
		</div>
		<Button className="self-start" onClick={() => logout()}>Logout</Button>
	</Card>
{:else}
	<Card class="flex items-center justify-center gap-6 p-6">
		<h1 class="font-display text-3xl">Login or Signup</h1>
		<Button onClick={() => loginWithGoogle()}>Sign In with Google</Button>
	</Card>
{/if}
