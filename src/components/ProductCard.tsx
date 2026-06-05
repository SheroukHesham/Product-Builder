import type { IProduct } from "../interfaces";
import { numberWithCommas, txtSlicer } from "../utils/functions";
import ColorCircle from "./ColorCircle";
import Image from "./Image";
import Button from "./ui/Button";

interface IProps {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openEditModal: () => void;
  openRemoveModal: () => void;
  productIdx: number;
  setProductIdx: (idx: number) => void;
}

const ProductCard = ({
  product,
  setProductToEdit,
  openEditModal,
  openRemoveModal,
  productIdx,
  setProductIdx,
}: IProps) => {
  const { title, imageURL, description, price, colors, category } = product;

  //** RENDERS */
  const renderColors = colors.map((color) => (
    <ColorCircle key={color} color={color} />
  ));

  //** HANDLERS */
  const onEdit = () => {
    openEditModal();
    setProductToEdit(product);
    setProductIdx(productIdx);
  };

  const onDelete = () => {
    openRemoveModal();
    setProductToEdit(product);
    setProductIdx(productIdx);
  };

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
        {colors.length ? (
          renderColors
        ) : (
          <p className="min-h-[20px]"> No available colors.</p>
        )}
      </div>
      <div className="flex items-center justify-between my-2">
        <span className="text-indigo-600 font-semibold">
          ${numberWithCommas(price)}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold">{category.name}</span>
          <Image
            imageURL={category.imageURL}
            alt={category.name}
            className="w-10 h-10 rounded-full object-center"
          />
        </div>
      </div>
      <div className="flex space-x-2 mt-4 my-2">
        <Button
          className=" bg-indigo-700 hover:bg-indigo-800"
          onClick={() => onEdit()}
        >
          EDIT
        </Button>
        <Button
          className="bg-red-600 hover:bg-red-800"
          onClick={() => onDelete()}
        >
          DELETE
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
