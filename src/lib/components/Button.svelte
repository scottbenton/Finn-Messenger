<script lang="ts">
	import type { Snippet } from 'svelte';

	type ButtonVariant = 'primary' | 'secondary' | 'text';

	interface Props {
		onClick?: () => void;
		href?: string;
		children: string | Snippet;
		variant?: ButtonVariant;
		className?: string;
	}

	const { onClick, href, children, className, variant = 'primary' }: Props = $props();

	const variantClasses: Record<ButtonVariant, string> = {
		primary:
			'border-2 border-yellow-600  px-4 py-3 text-lg font-semibold outline-0 outline-yellow-600  hover:outline-2',
		secondary: 'px-4 py-3 text-lg font-semibold hover:bg-stone-100',
		text: 'text-blue-700 hover:underline font-semibold'
	};

	const element = href ? 'a' : 'button';
</script>

<svelte:element
	this={element}
	class={`cursor-pointer transition-all duration-150 ease-in-out ${variantClasses[variant]} ${className ?? ''}`}
	onclick={onClick}
	role={href ? 'link' : 'button'}
	{href}
>
	{#if typeof children === 'string'}
		{children}
	{:else}
		{@render children()}
	{/if}
</svelte:element>
