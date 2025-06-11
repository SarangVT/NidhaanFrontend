// 'use client'

// import { useQuery, useMutation } from '@apollo/client';
// import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY, GET_CART_ITEMS } from "./helperFunctions"
// import { CartProduct } from '../types/def';

// export default function CartPage() {
//   const userId = 5;

//   const { data, loading, error, refetch } = useQuery(GET_CART_ITEMS, {
//     variables: { userId },
//   });

//   const [removeFromCart] = useMutation(REMOVE_FROM_CART);
//   const [updateCartQuantity] = useMutation(UPDATE_CART_QUANTITY);

//   const cartItems: CartProduct[] = data?.cart || [];

//   const updateQuantity = (id: number, delta: number) => {
//     const item = cartItems.find((item: CartProduct) => item.id === id);
//     if (!item) return;

//     const newQty = item.quantity + delta;
//     if (newQty < 1) return;

//     updateCartQuantity({
//       variables: { cartId: id, quantity: newQty },
//     }).then(() => refetch());
//   };

//   const removeItem = (id: number) => {
//     removeFromCart({ variables: { cartId: id } }).then(() => refetch());
//   };

//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + item.current_price * item.quantity,
//     0
//   );
//   const totalMRP = cartItems.reduce(
//     (acc, item) => acc + item.mrp * item.quantity,
//     0
//   );

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error loading cart.</p>;

//   return (
//     <div>
//       <div className="max-w-5xl mx-auto p-4 space-y-6">
//         <h1 className="text-2xl font-bold">Your Cart</h1>
//         {cartItems.length === 0 ? (
//           <p className="text-gray-500 text-xl">Your cart is currently empty.<br /><br />Shop now and don't miss the limited time best deals.</p>
//         ) : (
//           <div className="space-y-6 border rounded p-2">
//             {cartItems.map((item, index) => (
//               <div key={item.id} className={`flex gap-4 items-center pb-4 ${index !== cartItems.length - 1 ? 'border-b-2' : ''}`}>
//                 <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded" />
//                 <div className="flex-1">
//                   <h2 className="font-semibold">{item.title}</h2>
//                   <p className="text-gray-500 line-through">₹{item.mrp}</p>
//                   <p className="text-green-600 font-bold">₹{item.current_price}</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => updateQuantity(item.id, -1)}
//                     className="px-2 py-1 border rounded"
//                   >
//                     −
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button
//                     onClick={() => updateQuantity(item.id, 1)}
//                     className="px-2 py-1 border rounded"
//                   >
//                     +
//                   </button>
//                 </div>
//                 <button
//                   onClick={() => removeItem(item.id)}
//                   className="text-red-500 hover:underline ml-4"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//         {cartItems.length !== 0 && (
//           <div className="text-right space-y-2">
//             <p className="text-lg font-semibold">MRP : ₹{totalMRP}</p>
//             <p className="text-lg font-semibold">You Save : ₹{totalMRP - totalPrice}</p>
//             <p className="text-lg font-semibold">Total : ₹{totalPrice}</p>
//             <div className='my-8'></div>
//             <button className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 font-bold">
//               Proceed to Buy
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

'use client'

import { useState } from 'react';

type CartProduct = {
  id: number,
  title: string,
  image: string,
  mrp: number,
  current_price: number,
  quantity: number
}

export default function CartPage() {
  // Static demo data
  const [cartItems, setCartItems] = useState<CartProduct[]>([
    {
      id: 1,
      title: 'Paracetamol 500mg Tablets',
      image: 'https://res.cloudinary.com/demo/image/upload/v1710000000/paracetamol.jpg',
      mrp: 60,
      current_price: 40,
      quantity: 2,
    },
    {
      id: 2,
      title: 'Cough Syrup 100ml',
      image: 'https://res.cloudinary.com/demo/image/upload/v1710000001/cough-syrup.jpg',
      mrp: 120,
      current_price: 90,
      quantity: 1,
    },
    {
      id: 3,
      title: 'Vitamin C Chewable Tablets',
      image: 'https://res.cloudinary.com/demo/image/upload/v1710000002/vitamin-c.jpg',
      mrp: 150,
      current_price: 100,
      quantity: 3,
    },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
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
                  onClick={() => removeItem(item.id)}
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
            <button className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 font-bold">
              Proceed to Buy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

