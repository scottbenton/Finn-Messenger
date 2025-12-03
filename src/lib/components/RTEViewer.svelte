<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import { StarterKit } from '@tiptap/starter-kit';
	import { TrailingNode } from '@tiptap/extensions';

	interface Props {
		content: string;
	}

	const { content = '' }: Props = $props();

	let element = $state<HTMLElement | undefined>();
	let editorState = $state<{ editor: Editor | null }>({ editor: null });

	onMount(() => {
		editorState.editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				TrailingNode.configure({
					notAfter: ['paragraph', 'heading']
				})
			],
			editable: false,
			content: content,
			editorProps: {
				attributes: {
					class: 'prose prose-sm sm:prose mx-auto'
				}
			}
		});
	});
	onDestroy(() => {
		editorState.editor?.destroy();
	});
</script>

<div bind:this={element}></div>
