import { BlogElement } from "@/components/editor/Context";
import uniqid from 'uniqid';

export function getWithID(elements: BlogElement[], id: string): BlogElement | null {
    for (const element of elements) {
        if (element.id === id) {
            return element;
        }

        if (element.type === 'div') {
            const result = getWithID(element.content as BlogElement[], id);
            if (result) {
                return result;
            }
        }
    }

    return null;
}

export function assignIDs(elements: BlogElement[]): BlogElement[] {
    return elements.map(element => {
        if (element.type === 'div') {
            if (typeof element.content !== 'string' && element.content.length > 0) {
                return {
                    ...element,
                    id: element.id || uniqid(),
                    content: assignIDs(element.content)
                }
            }
        }

        return {
            ...element,
            id: element.id || uniqid()
        }
    });
}