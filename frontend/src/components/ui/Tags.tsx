interface TagDesign {
    title: string
}

export const Tag = (props: TagDesign) => {
    return (
        <span className="bg-prple-50 text-prple-500 font-normal py-0.5 px-2 rounded-2xl">
            #{props.title}
        </span>
    )
}