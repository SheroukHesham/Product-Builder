import ProductCard from "./components/ProductCard";
import { productList } from "./data";

function App() {
  //** Renders */
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  return (
    <main className="container mx-auto ">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-12 md:gap-5">
        {renderProductList}
      </div>
    </main>
  );
}

export default App;
