type variantTypes = "primary" | "secondary";
type sizeTypes = "sm" | "md" | "lg";

interface ButtonProps {
  variant: variantTypes;
  size?: sizeTypes;
  text: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onclick?: () => void;
  className?: string;
}

type variantStyles = Record<variantTypes, string>;

const variantDesign: variantStyles = {
  primary:
    "bg-prple-50 text-btn_txt1-100 hover:bg-prple-100 active:bg-prple-200",
  secondary:
    "bg-prple-500 text-btn_txt2-100 hover:bg-prple-600 active:bg-prple-700",
};

type sizeStyles = Record<sizeTypes, string>;

const sizeDesign: sizeStyles = {
  sm: "px-4 py-2",
  md: "px-5 py-2",
  lg: "px-6 py-3",
};

const defaultDesign =
  "rounded-lg m-1 flex gap-1 justify-center items-center cursor-pointer hover:scale-101 active:scale-99 font-normal";

export const Button = (props: ButtonProps) => {
  const chosenSize = props.size || "md";
  const style = `${variantDesign[props.variant]} ${sizeDesign[chosenSize]} ${defaultDesign} ${props.className}`;
  return (
    <>
      <button className={style} onClick={props.onclick}>
        {props.startIcon} {props.text} {props.endIcon}
      </button>
    </>
  );
};
