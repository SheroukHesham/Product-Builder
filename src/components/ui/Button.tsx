import { memo, type ButtonHTMLAttributes, type ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className: string;
  children: ReactNode;
  width?: "w-full" | "w-fit";
}

const Button = ({ className, width = "w-full", children, ...rest }: IProps) => {
  return (
    <button
      className={` font-semibold cursor-pointer rounded-md text-white p-2 ${className} ${width}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default memo(Button);
