import { BlogElement, ContentData } from "@/components/editor/Context"
import Editor, { EditableElement } from "@/components/editor/Main"
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Blog Editor",
    description: "Blog postings about my software development projects and interests.",
};

export default function EditorPage() {
    const initialElements: BlogElement[] = [
        {
            type: 'div', style: { display: 'flex', alignItems: 'center' }, content: [
                { type: 'p', style: { fontSize: 24, fontWeight: 700 }, content: 'Welcome to the website builder!' },
                { type: 'p', style: {}, content: 'Get started by adding elements to the canvas.' }]
        },
        { type: 'h1', style: { fontSize: 48, fontWeight: 1000, alignSelf: "center" }, content: 'CREATING A WEBSITE BUILDER' },
        { type: 'p', style: {}, content: 'Building a website builder is an exciting project in the world of programming. It involves creating a tool that allows users to design and customize their own websites without the need for extensive coding knowledge. With the right set of tools and technologies, you can empower users to unleash their creativity and build stunning websites. From drag-and-drop functionality to customizable templates, a website builder offers a user-friendly interface that simplifies the website creation process. By leveraging HTML, CSS, and JavaScript, you can create a website builder that enables users to add and edit elements, customize styles, and preview their changes in real-time. Whether youre building a website builder for personal use or as a product for others, its an exciting journey that combines creativity and technical skills.' },
    ]

    return (
        <div className="w-full h-screen flex justify-center p-6">
            <Editor initialElements={initialElements} />
        </div>
    )
}