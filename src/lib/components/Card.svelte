<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade, type TransitionConfig } from 'svelte/transition';

	function noopTransition(node: Element): TransitionConfig {
		return fade(node, { duration: 0 });
	}

	let {
		children,
		class: className = '',
		in: inTransition = noopTransition,
		out: outTransition = noopTransition,
		onOutroEnd
	}: {
		children: Snippet;
		class?: string;
		in?: typeof noopTransition;
		out?: typeof noopTransition;
		onOutroEnd?: () => void;
	} = $props();
</script>

<main
	class="mx-auto flex w-full max-w-2xl flex-col bg-white text-stone-800 shadow-xl {className}"
	in:inTransition
	out:outTransition
	on:outroend={onOutroEnd}
>
	{@render children?.()}
</main>
