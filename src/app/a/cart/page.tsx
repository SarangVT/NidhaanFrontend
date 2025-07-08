'use client'

import { GET_CART_COUNT, useUserData } from "@/app/lib/contexts/UserContext";
import { ADD_CART_ITEM } from "@/app/pharmacy/ShopByCategory";
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const GET_USER_CART_ITEMS = gql`
  query GetUserCartItems($userId: Int!) {
    getUserCartItems(userId: $userId) {
      id
      quantity
      product {
        id
        title
        mrp
        current_price
        image
      }
    }
  }
`;

const REMOVE_CART_ITEM = gql`
  mutation RemoveCartItem($userId: Int!, $productId: Int!) {
    removeCartItem(userId: $userId, productId: $productId)
  }
`;

type CartProduct = {
  id: number;
  title: string;
  image: string;
  mrp: number;
  current_price: number;
  quantity: number;
};

export default function CartPage() {
  const router = useRouter();
  const client = useApolloClient();
  const { userId, setItemNumberCart } = useUserData();
  const { data, loading, error } = useQuery(GET_USER_CART_ITEMS, {
    variables: { userId },
    fetchPolicy: "network-only",
  });

  const [addCartItem] = useMutation(ADD_CART_ITEM);
  const [removeCartItem] = useMutation(REMOVE_CART_ITEM);

  const [cartItems, setCartItems] = useState<CartProduct[]>([]);

  useEffect(() => {
    if (data?.getUserCartItems) {
      const transformed: CartProduct[] = data.getUserCartItems.map((item: any) => ({
        id: item.product.id,
        title: item.product.title,
        image: item.product.image,
        mrp: parseFloat(item.product.mrp),
        current_price: parseFloat(item.product.current_price),
        quantity: item.quantity,
      }));
      setCartItems(transformed);
    }
  }, [data]);

  const updateQuantity = async (id: number, delta: number) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    if (delta === -1 && item.quantity === 1) return;

    try {
      await addCartItem({
        variables: {
          userId,
          productId: id,
          quantity: delta,
        },
      });

      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
      );
    } catch (err) {
      console.error("Failed to update cart quantity", err);
    }
  };

  const handleRemoveItem = async (id: number) => {
    try {
      await removeCartItem({
        variables: {
          userId,
          productId: id,
        },
      });
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      const { data: countData } = await client.query({
      query: GET_CART_COUNT,
      variables: { userId },
      fetchPolicy: "network-only",
      });
      setItemNumberCart(countData?.getUserCartCount);
    } catch (err) {
      console.error("Failed to remove cart item", err);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.current_price * item.quantity,
    0
  );
  const totalMRP = cartItems.reduce(
    (acc, item) => acc + item.mrp * item.quantity,
    0
  );

  return (
    <div>
      <div className="max-w-5xl mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-xl">Your cart is currently empty.<br /><br />Shop now and don't miss the limited time best deals.</p>
        ) : (
          <div className="space-y-6 border rounded p-2">
            {cartItems.map((item, index) => (
              <div key={item.id} className={`flex gap-4 items-center pb-4 ${index !== cartItems.length - 1 ? 'border-b-2' : ''}`}>
                <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-gray-500 line-through">₹{item.mrp}</p>
                  <p className="text-green-600 font-bold">₹{item.current_price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-2 py-1 border rounded"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:underline ml-4"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        {cartItems.length !== 0 && (
          <div className="text-right space-y-2">
            <p className="text-lg font-semibold">MRP : ₹{totalMRP}</p>
            <p className="text-lg font-semibold">You Save : ₹{totalMRP - totalPrice}</p>
            <p className="text-lg font-semibold">Total : ₹{totalPrice}</p>
            <div className='my-8'></div>
            <button className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 font-bold" onClick={() => router.push(`/pharmacy/checkout`)}>
              Proceed to Buy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
