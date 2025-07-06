import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="mt-3 text-xl font-semibold text-gray-800">{product.name}</h2>
      <p className="text-green-600 font-medium text-lg">₹{product.price}</p>
      <p className="text-sm text-gray-500">{product.category}</p>
      <button
        onClick={handleAddToCart}
        className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded w-full"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
