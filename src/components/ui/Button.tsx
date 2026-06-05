import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className: string;
  children: ReactNode;
  width?: "w-full" | "w-fit";
}

const Button = ({ className, width = "w-full", children, ...rest }: IProps) => {
  return (
    <button
      className={`${className} ${width} font-semibold cursor-pointer rounded-md text-white p-2`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
