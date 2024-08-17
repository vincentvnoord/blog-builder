"use client";

import React, { CSSProperties, useEffect, useState } from "react";
import uniqid from 'uniqid';
import { EditorProvider, useEditor, ContentData, BlogElement } from "./Context";
import { createClass } from "@/lib/styleConstructor";
import { Inspector } from "./inspector/Inspector";
import { savePostAction } from "@/actions/editor";
export default function Editor({ initialElements }: { initialElements?: BlogElement[] }) {
    return (
        <EditorProvider initialElements={initialElements}>
            <div className="w-full"></div>
            <EditorState />
            <Inspector />
        </EditorProvider>
    )
}

const EditorState = () => {
    const { state, dispatch } = useEditor();
    const { elements } = state;

    const savePost = async () => {
        await savePostAction(elements);
    }

    console.log(elements);

    return (
        <div className="flex flex-col items-end gap-2">
            <button className="p-2 bg-blue-500 text-white" onClick={savePost}>Save</button>
            <main className="p-8 border-2 max-h-screen overflow-scroll">
                <div className="outline-dotted outline-2 outline-gray-300 p-1 flex flex-col gap-0.5 w-[1024px] max-w-screen-md h-fit">
                    {elements.map((element) => (
                        <EditableElement key={element.id} element={element} />
                    ))}
                </div>
            </main>
        </div>
    )
}

const EditableElement = ({ element }: { element?: BlogElement }) => {
    if (!element) {
        return null;
    }

    const { state, dispatch } = useEditor();

    const [hovered, setHovered] = useState(false);

    const { type, style, content, id } = element;

    if (!id)
        return null;

    const Element = type as any;
    const outline = element.type === 'div' ? 'outline-1 outline-purple-300' : 'outline-1 outline-blue-500';
    const className = `transition-all border-spacing-0 duration-200 ease-in-out focus:bg-gray-200/50 outline-offset-0 outline-none ${id === state.selectedElement?.id || hovered ? outline : ''}`;

    const handleMouseDown = (event: React.MouseEvent<any>) => {
        event.stopPropagation();
        dispatch({ type: 'SELECT_ELEMENT', payload: element });
    };

    const handleInput = (event: React.ChangeEvent<any>) => {
        event.preventDefault();
        if (type === 'div')
            return;

        dispatch({ type: 'UPDATE_ELEMENT', payload: { element, updates: { content: event.target.innerText } } });
    }

    return (
        <Element
            contentEditable={type !== 'div'}
            suppressContentEditableWarning
            className={className}
            style={style}
            onMouseDown={handleMouseDown}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onBlur={handleInput}
        >
            {typeof content === 'string' ? content : content.map((element, index) => (
                <EditableElement key={element.id} element={element} />
            ))}
        </Element>
    )
}


export { EditableElement }