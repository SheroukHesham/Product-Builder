import type { IProduct } from "../interfaces";
import { txtSlicer } from "../utils/functions";
import Image from "./Image";
import Button from "./ui/Button";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  const { title, imageURL, description, price } = product;
  return (
    <div className="border border-gray-400 my-2 rounded-md p-2 max-w-sm md:max-w-lg mx-auto md:mx-0">
      <Image
        imageURL={imageURL}
        alt={title}
        className="mb-2 rounded-md h-52 w-full lg:object-cover "
      />
      <h3 className="font-bold mb-4">{title}</h3>
      <p className="mb-3 text-gray-500 text-sm">{txtSlicer(description)}</p>
      <div className="flex space-x-2">
        <span className="w-5 h-5 bg-red-700 rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-blue-700 rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-green-700 rounded-full cursor-pointer" />
      </div>
      <div className="flex items-center justify-between my-2">
        <span className="text-indigo-600 font-semibold">${price}</span>

        <Image
          imageURL={imageURL}
          alt={title}
          className="w-10 h-10 rounded-full object-center"
        />
      </div>
      <div className="flex space-x-2 mt-4 my-2">
        <Button className="bg-blue-700" onClick={() => console.log("clicked")}>
          EDIT
        </Button>
        <Button className="bg-red-700">DELETE</Button>
      </div>
    </div>
  );
};

export default ProductCard;
