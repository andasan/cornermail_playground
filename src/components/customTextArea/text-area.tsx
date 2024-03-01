/* eslint-disable newline-per-chained-call */

import { Color } from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import { TextStyle, TextStyleOptions } from '@tiptap/extension-text-style';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { Separator } from '@/components/ui/separator';

import { cn } from '@/lib/utils';
import { Box, Button, Divider, Group, Modal, TextInput } from '@mantine/core';
import {
	IconArrowBackUp,
	IconArrowForwardUp,
	IconBlockquote,
	IconBold,
	IconBrandHtml5,
	IconClearFormatting,
	IconCornerDownLeft,
	IconH1,
	IconH2,
	IconH3,
	IconH4,
	IconH5,
	IconH6,
	IconIndentIncrease,
	IconItalic,
	IconLink,
	IconList,
	IconListNumbers,
	IconSeparatorHorizontal,
	IconStrikethrough,
} from '@tabler/icons-react';

type FormValues = {
	id: number;
	header: string;
	body: string;
	footer: string;
};

interface MenuBarProps {
	editor: Editor;
	setToggleHtml: Dispatch<SetStateAction<boolean>>;
}

const MenuBar = ({ editor, setToggleHtml }: MenuBarProps) => {
	const [url, setUrl] = useState<string>('');
	const [modalIsOpen, setIsOpen] = useState(false);

	const openModal = useCallback(() => {
		setUrl(editor.getAttributes('link').href || '');
		setIsOpen(true);
	}, [editor]);

	const closeModal = useCallback(() => {
		setIsOpen(false);
		setUrl('');
	}, []);

	const saveLink = useCallback(() => {
		if (url) {
			editor
				.chain()
				.focus()
				.extendMarkRange('link')
				.setLink({ href: url, target: '_blank' })
				.run();
		} else {
			editor.chain().focus().extendMarkRange('link').unsetLink().run();
		}
		closeModal();
	}, [editor, url, closeModal]);

	const removeLink = useCallback(() => {
		editor.chain().focus().extendMarkRange('link').unsetLink().run();
		closeModal();
	}, [editor, closeModal]);

	if (!editor) {
		return null;
	}

	return (
		<>
			<Modal
				opened={modalIsOpen}
				onClose={() => setIsOpen(false)}
				centered
				title="Enter a link"
			>
				<Box p="md">
					<TextInput
						py={20}
						value={url}
						onChange={(e) => setUrl(e.currentTarget.value)}
					/>
					<Button mx={5} onClick={saveLink}>
						Save
					</Button>
					<Button mx={5} onClick={removeLink} color="red">
						Remove
					</Button>
				</Box>
			</Modal>

			<Group align="stretch">
				<Button
					onClick={() => editor.chain().focus().toggleBold().run()}
					disabled={!editor.can().chain().focus().toggleBold().run()}
					className={editor.isActive('bold') ? 'is-active' : ''}
				>
					<IconBold size={18} />
				</Button>
				<Button
					onClick={() => editor.chain().focus().toggleItalic().run()}
					disabled={!editor.can().chain().focus().toggleItalic().run()}
					className={editor.isActive('italic') ? 'is-active' : ''}
				>
					<IconItalic size={18} />
				</Button>
				<Button
					onClick={() => editor.chain().focus().toggleStrike().run()}
					disabled={!editor.can().chain().focus().toggleStrike().run()}
					className={editor.isActive('strike') ? 'is-active' : ''}
				>
					<IconStrikethrough size={18} />
				</Button>
				<Button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
					<IconClearFormatting size={18} />
				</Button>
				<Button
					onClick={() => editor.chain().focus().setParagraph().run()}
					className={editor.isActive('paragraph') ? 'is-active' : ''}
				>
					<IconIndentIncrease size={18} />
				</Button>
				<Button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 1 }).run()
					}
					className={
						editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
					}
				>
					<IconH1 size={18} />
				</Button>
				<Button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 2 }).run()
					}
					className={
						editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
					}
				>
					<IconH2 size={18} />
				</Button>
				<Button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 3 }).run()
					}
					className={
						editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
					}
				>
					<IconH3 size={18} />
				</Button>
				<Button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 4 }).run()
					}
					className={
						editor.isActive('heading', { level: 4 }) ? 'is-active' : ''
					}
				>
					<IconH4 size={18} />
				</Button>
				<Button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 5 }).run()
					}
					className={
						editor.isActive('heading', { level: 5 }) ? 'is-active' : ''
					}
				>
					<IconH5 size={18} />
				</Button>
				<Button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 6 }).run()
					}
					className={
						editor.isActive('heading', { level: 6 }) ? 'is-active' : ''
					}
				>
					<IconH6 size={18} />
				</Button>
				<Button
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					className={editor.isActive('bulletList') ? 'is-active' : ''}
				>
					<IconList size={18} />
				</Button>
				<Button
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					className={editor.isActive('orderedList') ? 'is-active' : ''}
				>
					<IconListNumbers size={18} />
				</Button>
				<Button
					onClick={() => editor.chain().focus().toggleBlockquote().run()}
					className={editor.isActive('blockquote') ? 'is-active' : ''}
				>
					<IconBlockquote size={18} />
				</Button>
				<Button
					onClick={() => editor.chain().focus().setHorizontalRule().run()}
				>
					<IconSeparatorHorizontal size={18} />
				</Button>
				<Button onClick={() => editor.chain().focus().setHardBreak().run()}>
					<IconCornerDownLeft size={18} />
				</Button>
				<Button onClick={openModal}>
					<IconLink size={18} />
				</Button>
				<Button
					onClick={() => editor.chain().focus().undo().run()}
					disabled={!editor.can().chain().focus().undo().run()}
				>
					<IconArrowBackUp size={18} />
				</Button>
				<Button
					onClick={() => editor.chain().focus().redo().run()}
					disabled={!editor.can().chain().focus().redo().run()}
				>
					<IconArrowForwardUp size={18} />
				</Button>
				<Button onClick={() => setToggleHtml((t) => !t)}>
					<IconBrandHtml5 size={18} />
				</Button>
			</Group>
		</>
	);
};

interface CustomTextAreaProps {
	label: string;
	templateState: FormValues;
	setTemplateState: Dispatch<SetStateAction<FormValues>>;
	className: string;
}

interface CustomTextStyleOptions extends TextStyleOptions {
	types: string[];
}

export default function CustomTextArea({
	templateState,
	setTemplateState,
	className,
}: CustomTextAreaProps) {
	const [toggleHtml, setToggleHtml] = useState(false);
	const customTextStyleOptions: CustomTextStyleOptions = {
		types: [ListItem.name],
		HTMLAttributes: {},
	};

	const editor = useEditor({
		onUpdate: (val) => {
			const updatedBody = val.editor.getHTML();
			setTemplateState((prev) => ({ ...prev, body: updatedBody }));
		},
		extensions: [
			Color.configure({ types: [TextStyle.name, ListItem.name] }),
			TextStyle.configure(customTextStyleOptions),
			StarterKit,
			Link.configure({
				openOnClick: false,
			}),
		],
		content: templateState.body,
	}) as Editor;

	return (
		<>
			<Box
				className={cn(
					'flex flex-col min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
					className,
				)}
			>
				<MenuBar editor={editor} setToggleHtml={setToggleHtml} />
				<Separator className="my-3" />
				{editor && toggleHtml ? (
					<Box>{editor.getHTML()}</Box>
				) : (
					<EditorContent editor={editor} />
				)}
			</Box>
		</>
	);
}
