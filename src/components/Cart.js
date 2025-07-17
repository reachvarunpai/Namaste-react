// src/components/Cart.js
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  clearCart,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "../utils/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { CDN_URL } from "../utils/constant";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
  }, [cartItems, navigate]);

  // Price Calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = subtotal > 0 ? 40 : 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h2>

      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 border rounded shadow-sm bg-white"
          >
            <div className="flex gap-4">
              <img
                src={CDN_URL + item.imageId}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">₹{item.price / 100}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="px-2 bg-gray-200 hover:bg-gray-300 rounded"
                    onClick={() => dispatch(decreaseItemQuantity(item))}
                  >
                    -
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    className="px-2 bg-gray-200 hover:bg-gray-300 rounded"
                    onClick={() => dispatch(increaseItemQuantity(item))}
                  >
                    +
                  </button>
                  <button
                    className="ml-4 px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
            <div className="text-right text-gray-700 font-semibold">
              ₹{(item.price * item.quantity) / 100}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="mt-8 p-4 bg-gray-100 rounded shadow-md text-right">
        <div className="mb-2">Subtotal: ₹{subtotal / 100}</div>
        <div className="mb-2">Delivery Fee: ₹{deliveryFee}</div>
        <div className="mb-2">Tax (5%): ₹{tax / 100}</div>
        <div className="text-xl font-bold">Total: ₹{total / 100}</div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-between">
        <Link
          to="/"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded"
        >
          ⬅️ Continue Shopping
        </Link>
        <button
          onClick={() => dispatch(clearCart())}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
