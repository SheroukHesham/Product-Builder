import { useState } from "react";
import ProductCard from "./components/ProductCard";
import { formInputsList, productList } from "./data";
import Modal from "./components/ui/Modal";
import Button from "./components/ui/Button";
import Input from "./components/Input";

function App() {
  //** STATES */
  const [isOpen, setIsOpen] = useState(true);

  //** FUNCTIONS */
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  //** RENDERS */
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  const renderFormInput = formInputsList.map((field) => (
    <div className="flex flex-col">
      <label
        className="text-gray-700 mb-1 font-medium text-sm"
        htmlFor={field.id}
      >
        {field.label}
      </label>
      <Input type={field.type} id={field.id} name={field.name} />
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
        <form className="space-y-3">
          {renderFormInput}
          <div className="flex space-x-3">
            <Button className="bg-blue-700 hover:bg-blue-800">Submit</Button>
            <Button className="bg-gray-400 hover:bg-gray-500">Cancel</Button>
          </div>
        </form>
      </Modal>
    </main>
  );
}

export default App;
