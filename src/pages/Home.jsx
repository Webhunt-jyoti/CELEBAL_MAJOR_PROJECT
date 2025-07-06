import { useState } from "react";
import ProductCard from "../components/ProductCard";
import productsData from "../Data/products";

function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = productsData.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 w-full md:w-1/3"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full md:w-1/4"
        >
          <option value="All">All Categories</option>
          <option value="Shoes">Shoes</option>
          <option value="Clothing">Clothing</option>
          <option value="Beauty">Beauty</option>
          <option value="Personal Care">Personal Care</option>
         
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
