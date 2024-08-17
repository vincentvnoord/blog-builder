import { getPost } from "@/actions/editor"
import { BlogElement, ContentData } from "@/components/editor/Context";

export default async function BlogPost() {
    const elements = await getPost();

    console.log(elements);

    return (
        <main className="flex w-full justify-center p-8">
            <div className="flex flex-col max-w-screen-md">
                {elements.map((element, index) => (
                    <BlogComponent key={index} element={element} />
                ))}
            </div>
        </main>
    )
}

const BlogComponent = ({ element }: { element: BlogElement }) => {
    const { type: Element, style, content } = element;

    return (
        <Element style={style}>
            {typeof content === 'string' ? (
                content
            ) : (
                content.map((element, index) => (
                    <BlogComponent key={index} element={element} />
                ))
            )}
        </Element>
    )
}