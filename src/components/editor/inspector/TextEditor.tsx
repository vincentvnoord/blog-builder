import React, { CSSProperties } from 'react';
import { InputEditOption } from '../inspector/Inspector';

const TextEditor = () => {

    return (
        <div className="flex flex-col w-full">
            <InputEditOption defaultValue={16} label='Size' property="fontSize" />
            <InputEditOption defaultValue={1} label='Weight' property="fontWeight" />
        </div>
    )
}


export default TextEditor;