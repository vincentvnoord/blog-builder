import React, { CSSProperties, useState } from 'react';
import { InputEditOption } from '../inspector/Inspector';
import { useEditor } from '../Context';

const LayoutEditor = () => {

    return (
        <div className="flex flex-col w-full gap-2">
            <InputEditOption label='Padding' property="padding" />
            <InputEditOption label='Display' property="display" />
            <InputEditOption label='Left' property="paddingLeft" />
            <InputEditOption label='Margin' property="margin" />
            <InputEditOption label='Width' property="width" />
            <InputEditOption label='Max width' property="maxWidth" />
        </div>
    )
}

export const ContainerLayoutEditor = () => {
    const { state, dispatch } = useEditor();
    const selectedElement = state.selectedElement;
    const style = state.selectedElement?.style;
    console.log(style?.display);

    const [selectedDisplay, setSelectedDisplay] = useState(style?.display || 'block');

    console.log(selectedDisplay);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedDisplay(value);

        if (!state.selectedElement)
            return;

        const newStyle = { ...selectedElement?.style, display: value };
        dispatch({ type: "UPDATE_ELEMENT", payload: { element: state.selectedElement, updates: { style: newStyle } } });
    }

    return (
        <div className="flex flex-col w-full">
            <div className='flex justify-between w-full'>
                <label htmlFor="display" className=''>Display:</label>
                <select className='' onChange={handleChange} name="display" id='display-selector' value={selectedDisplay}>
                    <option value={undefined}>Block</option>
                    <option value="flex">Flex</option>
                    <option value="grid">Grid</option>
                </select>
            </div>
        </div>
    )
}


export default LayoutEditor;