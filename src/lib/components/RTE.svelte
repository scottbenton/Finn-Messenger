<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import { StarterKit } from '@tiptap/starter-kit';
	import ToggleButton from './ToggleButton.svelte';
	import Icon from './Icon.svelte';

	interface Props {
		content?: string;
	}

	const { content = '' }: Props = $props();

	let element = $state<HTMLElement | undefined>();
	let editorState = $state<{ editor: Editor | null }>({ editor: null });

	onMount(() => {
		editorState.editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content: content,
			editorProps: {
				attributes: {
					class: 'prose prose-sm sm:prose mx-auto focus:outline-none'
				}
			},
			onTransaction: ({ editor }) => {
				// Increment the state signal to force a re-render
				editorState = { editor };
			}
		});
	});
	onDestroy(() => {
		editorState.editor?.destroy();
	});

	export function getText() {
		return editorState.editor?.getHTML() ?? '';
	}
</script>

<div class="relative border border-stone-300 focus-within:border-yellow-600">
	{#if editorState.editor}
		<div class="flex items-center gap-2 bg-stone-100 px-2 py-2">
			<ToggleButton
				onToggle={() => editorState.editor?.chain().focus().toggleHeading({ level: 3 }).run()}
				toggled={editorState.editor.isActive('heading', { level: 3 })}
			>
				<Icon name="icon-[lucide--heading-1]" label="Heading 1" />
			</ToggleButton>
			<ToggleButton
				onToggle={() => editorState.editor?.chain().focus().toggleHeading({ level: 4 }).run()}
				toggled={editorState.editor.isActive('heading', { level: 4 })}
			>
				<Icon name="icon-[lucide--heading-2]" label="Heading 2" />
			</ToggleButton>
			<div class="w-1 self-stretch rounded-full bg-stone-300"></div>
			<ToggleButton
				onToggle={() => editorState.editor?.chain().focus().toggleBold().run()}
				toggled={editorState.editor.isActive('bold')}
			>
				<Icon name="icon-[lucide--bold]" label="Bold" />
			</ToggleButton>
			<ToggleButton
				onToggle={() => editorState.editor?.chain().focus().toggleItalic().run()}
				toggled={editorState.editor.isActive('italic')}
			>
				<Icon name="icon-[lucide--italic]" label="Italic" />
			</ToggleButton>
			<ToggleButton
				onToggle={() => editorState.editor?.chain().focus().toggleUnderline().run()}
				toggled={editorState.editor.isActive('underline')}
			>
				<Icon name="icon-[lucide--underline]" label="Underline" />
			</ToggleButton>
		</div>
	{/if}

	<div class="p-4 indent-1" bind:this={element}></div>
</div>
