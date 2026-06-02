import { useState, type ChangeEvent, type SubmitEvent } from "react";
import ProductCard from "./components/ProductCard";
import { formInputsList, productList } from "./data";
import Modal from "./components/ui/Modal";
import Button from "./components/ui/Button";
import Input from "./components/Input";
import type { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import Error from "./components/Error";

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

  //** STATES */
  const [isOpen, setIsOpen] = useState(true);
  const [product, setProduct] = useState<IProduct>(defaultProduct);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });

  //** FUNCTIONS */
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });

    //**TODO: error disappears only when validation is passed
    setErrors({ ...errors, [name]: "" });
  };

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
    console.log(hasError);

    if (hasError) {
      setErrors(errors);
      console.log(errors);
      return;
    }
    console.log("Send data to server.");
  };

  const onCancel = () => {
    setProduct(defaultProduct);
    closeModal();
  };

  //** RENDERS */
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  const renderFormInput = formInputsList.map((input) => (
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
        value={product[input.name]}
        onChange={onChange}
      />
      <Error msg={errors[input.name]} />
    </div>
  ));

  return (
    <main className="container mx-auto ">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-12 md:gap-5">
        {renderProductList}
      </div>
      <Button
        className="bg-blue-700 hover:bg-blue-800"
        onClick={() => openModal()}
      >
        Add Product
      </Button>
      <Modal title="Add Product" close={closeModal} isOpen={isOpen}>
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInput}
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
    </main>
  );
}

export default App;
