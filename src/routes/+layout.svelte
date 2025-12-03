<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import '@fontsource-variable/outfit';
	import '@fontsource-variable/playwrite-us-trad';
	import '@fontsource-variable/playfair-display';
	import '@fontsource-variable/lora';
	import { onDestroy, setContext } from 'svelte';
	import { listenToAuthState, createAuthState } from '$lib/auth.svelte';

	let { children } = $props();

	const authState = createAuthState();
	setContext('auth', authState);

	console.debug('SUBSCRIBING TO AUTH STATE');
	const unsubscribeFromAuth: (() => void) | undefined = listenToAuthState((state) => {
		authState.loading = state.loading;
		authState.user = state.user;
	});

	onDestroy(() => {
		console.debug('UNSUBSCRIBING');
		unsubscribeFromAuth?.();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Finn's Messages</title>
	<meta
		name="description"
		content="An e-letter service that sends messages from the dog Finnegan"
	/>
</svelte:head>

<div class="flex min-h-lvh flex-col items-center justify-center p-3">
	{#if !authState.loading}
		{@render children()}
	{/if}
</div>
