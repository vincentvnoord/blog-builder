import { BlogElement, ContentData } from "@/components/editor/Context";

export function updateContent(elements: BlogElement[], id: string, updates: Partial<ContentData>): BlogElement[] {
    return elements.map(element => {
        if (element.id === id) {
            return { ...element, ...updates };
        }

        if (element.type === 'div') {
            return {
                ...element,
                content: updateContent(element.content as BlogElement[], id, updates)
            }
        }

        return element;
    });
}