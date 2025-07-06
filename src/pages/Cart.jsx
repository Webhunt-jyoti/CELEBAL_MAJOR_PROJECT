import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, dispatch } = useCart();

  const handleQuantityChange = (id, quantity) => {
    if (quantity <= 0) {
      dispatch({ type: "REMOVE_FROM_CART", payload: id });
      // dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
      // dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, quantity: newQuantity }})
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🛒 Your Cart
      </h2>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white shadow-md rounded-lg p-4"
            >
              <div className="flex flex-col">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-500">₹{item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                  className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="px-3 py-1 border rounded">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                  className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                >
                  +
                </button>
                <button
                  onClick={() =>
                    dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
                  }
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
          <div className="text-right font-bold text-2xl text-indigo-600">
            Total: ₹{total}
          </div>

          <div className="text-right">
            <Link
              to="/checkout"
              className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
