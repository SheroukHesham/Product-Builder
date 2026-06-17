import { forwardRef, type InputHTMLAttributes, type Ref } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef(({ ...rest }: IProps, ref: Ref<HTMLInputElement>) => {
  return (
    <input
      ref={ref}
      className="border shadow-md rounded-md border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      {...rest}
    />
  );
});

export default Input;
