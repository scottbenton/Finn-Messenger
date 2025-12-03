<script lang="ts">
	interface Props {
		name: string;
		label: string;
		className?: string;
	}

	const { name, label, className }: Props = $props();
</script>

<span aria-label={label} class={`${name} h-6 w-6 ${className ?? ''}`}></span>
