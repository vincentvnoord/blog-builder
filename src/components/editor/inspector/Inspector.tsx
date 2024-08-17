"use client";

import { CSSProperties, useEffect, useState } from "react";
import TextEditor from "./TextEditor";
import { useEditor } from "../Context"
import { getWithID } from "@/lib/stateHelpers";
import LayoutEditor, { ContainerLayoutEditor } from "./LayoutEditor";
import { XIcon } from "lucide-react";
import { motion } from 'framer-motion';

export const Inspector = () => {
    const { state, dispatch } = useEditor();
    const element = state.selectedElement;

    if (!element || !element.id) {
        return <div className="w-full max-w-[500px] p-8"></div>;
    }

    return (
        <div className={`p-8 w-full max-w-[500px]`}>
            <div className="flex w-full justify-between">
                <p className="text-lg font-bold">Inspector</p>
                <XIcon size={24} className="cursor-pointer" onClick={() => dispatch({ type: 'SELECT_ELEMENT', payload: null })} />
            </div>
            <p>Type: {element.type.toString()}</p>
            <InspectorSection title="Layout">
                {
                    element.type === 'div' && <ContainerLayoutEditor />
                }
                <LayoutEditor />
            </InspectorSection>

            <InspectorSection title="Text">
                <TextEditor />
            </InspectorSection>
        </div>
    )
}

const InspectorSection = ({ title, children }: { title: string, children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    const variants = {
        hidden: { height: 0 },
        visible: { height: "auto" }
    }

    return (
        <div className="mt-4">
            <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <p className="text-lg font-light">{title}</p>
            </div>
            <motion.div className="overflow-hidden" variants={variants} initial="hidden" animate={isOpen ? "visible" : "hidden"}>
                <div className="w-full pr-3 pl-3">
                    {children}
                </div>
            </motion.div>
        </div>
    )
}

export const InputEditOption = ({ property, defaultValue = 0, label }: { property: keyof CSSProperties, label: string, defaultValue?: number }) => {
    const { state, dispatch } = useEditor();
    const style = state.selectedElement?.style;
    const [value, setValue] = useState(style?.[property] ?? defaultValue);
    const { selectedElement } = state;

    useEffect(() => {
        setValue(selectedElement?.style[property] || defaultValue);
    }, [style, property]);

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);

        setValue(event.target.value);

        if (isNaN(value) || !state.selectedElement)
            return;

        const newStyle = { ...selectedElement?.style, [property]: value };
        dispatch({ type: "UPDATE_ELEMENT", payload: { element: state.selectedElement, updates: { style: newStyle } } });
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.value !== "")
            return

        if (!state.selectedElement)
            return;

        if (parseInt(event.target.value) >= 1)
            return;

        setValue(defaultValue);
        const newStyle = { ...style, [property]: undefined };
        dispatch({ type: 'UPDATE_ELEMENT', payload: { element: state.selectedElement, updates: { style: newStyle } } });
    }

    return (
        <div className="flex justify-between items-center gap-2">
            <label htmlFor="font-size whitespace-nowrap">{label}</label>
            <input className="border-2 w-32 rounded-md p-2" type="number" name="font-size" value={value} onInput={handleInput} onBlur={handleBlur} />
        </div>
    )
}