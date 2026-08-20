import {
  useCallback,
  useRef,
  useState,
  type ChangeEvent,
  type SubmitEvent,
} from "react";
import { v4 as uuid } from "uuid";
import ProductCard from "./components/ProductCard";
import { categories, colors, formInputsList, productList } from "./data";
import Modal from "./components/ui/Modal";
import Button from "./components/ui/Button";
import Input from "./components/Input";
import type { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import Error from "./components/Error";
import ColorCircle from "./components/ColorCircle";
import Select from "./components/ui/Select";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const defaultProduct = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };

  //** ---- STATES ---- **//

  const inputRef = useRef<null | HTMLInputElement>(null);
  //** products render states */
  const [productListRender, setProductListRender] = useState(productList);

  //** add , edit & remove modal states */
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [product, setProduct] = useState<IProduct>(defaultProduct);
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProduct);
  const [productIdx, setProductIdx] = useState(0);

  //** general modal states */
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  //** ---- FUNCTIONS ---- **//

  //** Upload Modal*/
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // const onChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setProduct((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));

  //   //**TODO: error disappears only when validation is passed
  //   setErrors((prev) => ({ ...prev, [name]: "" }));
  // };

  const onCancel = () => {
    setProduct(defaultProduct);
    closeModal();
  };

  console.log(productToEdit);

  const submitHandler = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, imageURL, price } = product;
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });
    const hasError = Object.values(errors).some((value) => value !== "");

    if (hasError) {
      setErrors(errors);

      return;
    }
    setProductListRender((prev) => [
      {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    setTempColors([]);
    onCancel();
    toast("Product has been added successfully", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  };

  //** Edit Modal */
  const openEditModal = useCallback(() => {
    setIsEditOpen(true);
  }, []);

  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  const onEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });

    //**TODO: error disappears only when validation is passed
    setErrors({ ...errors, [name]: "" });
  };

  const onEditCancel = () => {
    setProductToEdit(defaultProduct);
    closeEditModal();
  };

  const submitEditHandler = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, imageURL, price } = productToEdit;
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });
    const hasError = Object.values(errors).some((value) => value !== "");
    if (hasError) {
      setErrors(errors);

      return;
    }
    const updatedProducts = [...productListRender];
    updatedProducts[productIdx] = {
      ...productToEdit,
      colors: tempColors.concat(productToEdit.colors),
    };
    setProductListRender(updatedProducts);
    setTempColors([]);
    onEditCancel();
    toast("Product has been edited successfully", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  };

  // ** Remove Modal ** //
  const openRemoveModal = useCallback(() => {
    setIsRemoveOpen(true);
  }, []);

  const closeRemoveModal = () => {
    setIsRemoveOpen(false);
  };

  const onRemoveCancel = () => {
    setProductToEdit(defaultProduct);
    closeRemoveModal();
  };

  const submitRemoveHandler = (): void => {
    const filtered = productListRender.filter(
      (product) => product.id !== productToEdit.id,
    );
    setProductListRender(filtered);
    onRemoveCancel();
    toast("Product has been deleted successfully", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  };

  //** ---- RENDERS ---- **//

  //** render products */
  const renderProductList = productListRender.map((product, idx) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEditModal={openEditModal}
      productIdx={idx}
      setProductIdx={setProductIdx}
      openRemoveModal={openRemoveModal}
    />
  ));

  // **  render edit form
  const renderFormEditInput = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label
        className="text-gray-700 mb-1 font-medium text-sm"
        htmlFor={input.id}
      >
        {input.label}
      </label>
      <Input
        type={input.type}
        id={input.id}
        name={input.name}
        onChange={onEditChange}
        value={productToEdit[input.name]}
      />
      <Error msg={errors[input.name]} />
    </div>
  ));

  // ** render upload form
  const renderFormInput = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label
        className="text-gray-700 mb-1 font-medium text-sm"
        htmlFor={input.id}
      >
        {input.label}
      </label>
      <Input type={input.type} id={input.id} name={input.name} ref={inputRef} />
      <Error msg={errors[input.name]} />
    </div>
  ));

  const renderColors = colors.map((color) => (
    <ColorCircle
      key={color}
      color={color}
      onClick={() => {
        setTempColors((prev) => [...prev, color]);
        if (tempColors.includes(color)) {
          setTempColors(tempColors.filter((item) => item !== color));
        }
        if (tempColors.concat(productToEdit.colors).includes(color)) {
          setTempColors(tempColors.filter((item) => item !== color));
          setProductToEdit({
            ...productToEdit,
            colors: productToEdit.colors.filter((item) => item !== color),
          });
        }
      }}
    />
  ));

  return (
    <main className="container mx-auto ">
      <div className="flex justify-center mt-5">
        <Button
          width="w-fit"
          className="bg-blue-700 hover:bg-blue-800"
          onClick={() => openModal()}
        >
          Add Product
        </Button>
      </div>
      <div className="grid my-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-12 md:gap-5">
        {renderProductList}
      </div>
      {/* Add Product */}
      <Modal title="Add Product" close={closeModal} isOpen={isOpen}>
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInput}
          <div className="flex flex-wrap gap-2 items-center">
            {renderColors}
          </div>
          <div className="flex flex-wrap gap-2">
            {tempColors.map((color) => (
              <span
                className=" rounded-md text-sm text-white p-1"
                style={{ backgroundColor: color }}
                key={color}
              >
                {color}
              </span>
            ))}
          </div>
          <Select
            selected={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <div className="flex space-x-3">
            <Button className="bg-blue-700 hover:bg-blue-800">Submit</Button>
            <Button
              className="bg-gray-400 hover:bg-gray-500"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Product */}
      <Modal title="Edit Product" close={closeEditModal} isOpen={isEditOpen}>
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderFormEditInput}

          <div className="flex flex-wrap gap-2 items-center">
            {renderColors}
          </div>

          <div className="flex flex-wrap gap-2">
            {tempColors.concat(productToEdit.colors).map((color) => (
              <span
                className=" rounded-md text-sm text-white p-1"
                style={{ backgroundColor: color }}
                key={color}
              >
                {color}
              </span>
            ))}
          </div>

          {/* //**TODO: fix the type error */}
          <Select
            selected={productToEdit.category}
            setSelectedCategory={(value) => {
              setProductToEdit({ ...productToEdit, category: value });
            }}
          />

          <div className="flex space-x-3">
            <Button className="bg-blue-700 hover:bg-blue-800">Submit</Button>
            <Button
              className="bg-gray-400 hover:bg-gray-500"
              onClick={onEditCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Remove Product */}
      <Modal
        title="Are you sure you want to remove this item from your store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
        close={closeRemoveModal}
        isOpen={isRemoveOpen}
      >
        <div className="flex space-x-3">
          <Button
            className="bg-blue-700 hover:bg-blue-800"
            onClick={() => submitRemoveHandler()}
          >
            Yes, remove
          </Button>
          <Button
            className="bg-gray-400 hover:bg-gray-500"
            onClick={onRemoveCancel}
          >
            Cancel
          </Button>
        </div>
      </Modal>
      <Toaster />
    </main>
  );
}

export default App;
