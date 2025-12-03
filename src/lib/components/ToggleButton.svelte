<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		className?: string;
		toggled: boolean;
		onToggle: (value: boolean) => void;
		children: Snippet;
	}

	const { className, toggled, onToggle, children }: Props = $props();
</script>

<button
	class={`${className ?? ''} ${toggled ? 'bg-blue-200' : 'bg-transparent'} flex cursor-pointer items-center justify-center p-2 text-stone-600 transition-colors duration-150 ease-in-out hover:bg-stone-100`}
	onclick={() => onToggle(!toggled)}
>
	{@render children()}
</button>
