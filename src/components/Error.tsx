interface IProps {
  msg: string;
}

const Error = ({ msg }: IProps) => {
  return msg ? (
    <span className="text-red-800 font-medium text-sm">{msg}</span>
  ) : null;
};

export default Error;
