import React, { createContext, CSSProperties, useContext, useReducer } from "react";
import { updateContent } from "@/lib/reducerActions";
import { assignIDs, getWithID } from "@/lib/stateHelpers";

export type BlogElement = ContainerData | ContentData;

export type ElementType = keyof JSX.IntrinsicElements | React.ElementType;

export type ContainerData = {
    id: string;
    type: 'div';
    style: CSSProperties;
    content: BlogElement[];
};

export type ContentData = {
    id?: string;
    type: ElementType;
    style: CSSProperties;
    content: string | BlogElement[];
}

type EditorState = {
    elements: BlogElement[];
    selectedElement: BlogElement | null;
}

type EditorAction =
    | { type: 'SET_ELEMENTS'; payload: BlogElement[] }
    | { type: 'UPDATE_ELEMENT'; payload: { element: BlogElement; updates: Partial<BlogElement> } }
    | { type: 'SELECT_ELEMENT'; payload: BlogElement | null };

const initialState: EditorState = {
    elements: [],
    selectedElement: null
};

const editorReducer = (state: EditorState, action: EditorAction): EditorState => {
    switch (action.type) {
        case 'SET_ELEMENTS':
            return { ...state, elements: action.payload };
        case 'UPDATE_ELEMENT':
            const element = action.payload.element;
            if (!element.id) {
                return state;
            }

            const elements = updateContent(state.elements, element.id, action.payload.updates);
            const selectedElement = getWithID(elements, state.selectedElement?.id || "");

            return { ...state, elements, selectedElement };
        case 'SELECT_ELEMENT':
            return { elements: state.elements, selectedElement: action.payload };
        default:
            return state;
    }
}

const EditorContext = createContext<{
    state: EditorState;
    dispatch: React.Dispatch<EditorAction>;
}>({ state: initialState, dispatch: () => null });


export const EditorProvider = ({ children, initialElements = [] }: Readonly<{ children: React.ReactNode, initialElements?: BlogElement[] }>) => {
    const elementsWithIds = assignIDs(initialElements);

    const [state, dispatch] = useReducer<React.Reducer<EditorState, EditorAction>>(editorReducer, {
        ...initialState,
        elements: elementsWithIds
    }, undefined);

    console.log(state);

    return (
        <EditorContext.Provider value={{ state, dispatch }}>
            {children}
        </EditorContext.Provider>
    )
}

export const useEditor = () => useContext(EditorContext);