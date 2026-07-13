type sizes = 'sm' | 'md' | 'lg';

type sizeValue = Record<sizes, string>;

const sizeStyle : sizeValue = {
    sm: "size-4",
    md: "size-5",
    lg: "size-6"
}

export type { sizes };
export { sizeStyle };