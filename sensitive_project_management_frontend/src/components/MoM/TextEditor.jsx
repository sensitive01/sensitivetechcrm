import React, { useState, useMemo, useCallback } from 'react';
import { createEditor, Editor, Transforms, Element as SlateElement } from 'slate';
import { Slate, Editable, withReact, useSlate } from 'slate-react';
import { withHistory } from 'slate-history';
import { Bold, Italic, Underline, List, ListOrdered } from 'lucide-react';

// 🎯 Custom Editor Functions
const CustomEditor = {
    toggleMark(editor, format) {
        const isActive = Editor.marks(editor)?.[format] === true;
        if (isActive) {
            Editor.removeMark(editor, format);
        } else {
            Editor.addMark(editor, format, true);
        }
    },
    toggleBlock(editor, format) {
        const isActive = CustomEditor.isBlockActive(editor, format);
        Transforms.unwrapNodes(editor, {
            match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && ['numbered-list', 'bulleted-list'].includes(n.type),
            split: true,
        });

        const newProperties = {
            type: isActive ? 'paragraph' : format,
        };
        Transforms.setNodes(editor, newProperties);

        if (!isActive) {
            const block = { type: format, children: [] };
            Transforms.wrapNodes(editor, block);
        }
    },
    isBlockActive(editor, format) {
        const [match] = Editor.nodes(editor, {
            match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
        });
        return !!match;
    },
};

// 🎯 Toolbar Button Component
const ToolbarButton = ({ format, icon: Icon, isList }) => {
    const editor = useSlate();
    const isActive = isList
        ? CustomEditor.isBlockActive(editor, format)
        : Editor.marks(editor)?.[format] === true;

    return (
        <button
            className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            onMouseDown={(event) => {
                event.preventDefault();
                isList ? CustomEditor.toggleBlock(editor, format) : CustomEditor.toggleMark(editor, format);
            }}
        >
            <Icon className="w-4 h-4 text-gray-600" />
        </button>
    );
};

// 🎯 Custom Elements and Leaves
const Element = ({ attributes, children, element }) => {
    switch (element.type) {
        case 'bulleted-list':
            return <ul className="list-disc pl-6" {...attributes}>{children}</ul>;
        case 'numbered-list':
            return <ol className="list-decimal pl-6" {...attributes}>{children}</ol>;
        case 'list-item':
            return <li {...attributes}>{children}</li>;
        default:
            return <p {...attributes}>{children}</p>;
    }
};

const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) children = <strong>{children}</strong>;
    if (leaf.italic) children = <em>{children}</em>;
    if (leaf.underline) children = <u>{children}</u>;
    return <span {...attributes}>{children}</span>;
};

// 🎯 Main TextEditor Component
const TextEditor = ({ value = [{ type: 'paragraph', children: [{ text: '' }] }], onChange, placeholder }) => {
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

    return (
        <div className="border rounded-lg">
            <Slate
                editor={editor}
                value={value}
                onChange={onChange}
            >
                <div className="border-b p-2 flex items-center gap-2 flex-wrap bg-gray-50">
                    <ToolbarButton format="bold" icon={Bold} />
                    <ToolbarButton format="italic" icon={Italic} />
                    <ToolbarButton format="underline" icon={Underline} />
                    <ToolbarButton format="bulleted-list" icon={List} isList />
                    <ToolbarButton format="numbered-list" icon={ListOrdered} isList />
                </div>
                <Editable
                    className="min-h-[200px] p-4 focus:outline-none"
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    placeholder={placeholder}
                />
            </Slate>
        </div>
    );
};


export default TextEditor;
