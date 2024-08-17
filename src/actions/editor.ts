"use server";

import { BlogElement } from "@/components/editor/Context";

declare global {
    var elements: BlogElement[];
}

globalThis.elements = [];

export const savePostAction = async (newElements: BlogElement[]) => {
    globalThis.elements = newElements;
    console.log(elements);
}

export const getPost = async () => {
    return globalThis.elements;
}