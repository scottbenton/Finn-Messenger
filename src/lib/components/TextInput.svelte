<script lang="ts">
	interface Props {
		label: string;
		value: string;
		className?: string;
	}

	let { label, value = $bindable(''), className }: Props = $props();
</script>

<label class={`flex flex-col ${className ?? ''}`}>
	<span class="tex-sm font-semibold text-stone-600">{label}</span>
	<input
		class="border border-stone-300 px-3 py-4 focus:border-yellow-600 focus:shadow-none focus:ring-0 focus:outline-none"
		type="text"
		bind:value
	/>
</label>
