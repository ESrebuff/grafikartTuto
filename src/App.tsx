import { Input } from "./components/forms/Input";
import { Checkbox } from "./components/forms/Checkbox";
import { ProductCategoryRow } from "./components/products/ProductCategoryRow";
import { ProductRow } from "./components/products/ProductRow";
import { useState } from "react";
import { Timer } from "./components/exercices/Timer";
import { useIncrement } from "./components/hooks/useIncrement";

interface Product {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
}

interface ProductTableProps {
  products: Product[];
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

function App() {
  const [showStockedOnly, setShowStockedOnly] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");

  const [count, increment, decrement] = useIncrement(0);

  const filteredProductsList = PRODUCTS.filter((product) => {
    if (showStockedOnly && !product.stocked) {
      return false;
    }

    if (searchProduct && !product.name.toLocaleLowerCase()!.includes(searchProduct.toLocaleLowerCase())) {
      return false;
    }

    return true;
  });

  return (
    <div className="container my-3">
      <SearchBar
        showsStockedOnly={showStockedOnly}
        onStockedOnlyChange={setShowStockedOnly}
        searchProduct={searchProduct}
        onSetSearchProduct={setSearchProduct}
      />
      <ProductTable products={filteredProductsList} />
      <Timer />
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
      <div>Compteur {count}</div>
    </div>
  );
}

function SearchBar({
  showsStockedOnly,
  onStockedOnlyChange,
  searchProduct,
  onSetSearchProduct,
}: {
  showsStockedOnly: boolean;
  onStockedOnlyChange: React.Dispatch<React.SetStateAction<boolean>>;
  searchProduct: string;
  onSetSearchProduct: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div>
      <div className="mb-3">
        <Input
          value={searchProduct}
          onChange={onSetSearchProduct}
          placeholder="Recherche..."
        />
        <Checkbox
          id="stocked"
          checked={showsStockedOnly}
          onChange={onStockedOnlyChange}
          label="N'afficher que les produit en stock"
        />
      </div>
    </div>
  );
}

function ProductTable({ products }: ProductTableProps) {
  const rows = [];
  let lastCategory = null;

  for (const product of products) {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow key={product.category} name={product.category} />
      );
    }
    lastCategory = product.category;
    rows.push(<ProductRow product={product} key={product.name} />);
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prix</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default App;
