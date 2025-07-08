"use client";
import { gql, useApolloClient, useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { GET_CART_COUNT, useUserData } from "../lib/contexts/UserContext";

type Product = {
  id: string;
  title: string;
  product_details: string;
  tags: string[];
  image: string;
  mrp: number;
  current_price: number;
};

type GetProductsPaginatedResponse = {
  getProductsPaginated: {
    items: Product[];
    nextCursor: number | null;
  };
};

const GET_PRODUCTS_PAGINATED = gql`
  query GetProductsPaginated($cursor: Int, $limit: Int!) {
    getProductsPaginated(cursor: $cursor, limit: $limit) {
      items {
        id
        title
        product_details
        tags
        image
        mrp
        current_price
      }
      nextCursor
    }
  }
`;

export const ADD_CART_ITEM = gql`
  mutation AddCartItem($userId: Int!, $productId: Int!, $quantity: Int) {
    addCartItem(userId: $userId, productId: $productId, quantity: $quantity)
  }
`;

export default function ShopByCategoryComp() {
  const router = useRouter();
  const client = useApolloClient();
  const { setItemNumberCart, userId} = useUserData();
  const [productsByTag, setProductsByTag] = useState<Record<string, Product[]>>({});
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const fetchingRef = useRef(false);

  const [fetchProducts, { loading, error }] = useLazyQuery<GetProductsPaginatedResponse>(
    GET_PRODUCTS_PAGINATED,
    {
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        fetchingRef.current = false;

        const newItems = data.getProductsPaginated.items;
        const newCursor = data.getProductsPaginated.nextCursor;

        const grouped: Record<string, Product[]> = {};
        for (const item of newItems) {
          for (const tag of item.tags?.length ? item.tags : ["Untagged"]) {
            if (!grouped[tag]) grouped[tag] = [];
            grouped[tag].push(item);
          }
        }

        setProductsByTag((prev) => {
          const updated = { ...prev };
          for (const tag in grouped) {
            updated[tag] = [...(updated[tag] || []), ...grouped[tag]];
          }
          return updated;
        });

        setCursor(newCursor);
        setHasMore(newCursor !== null);
      },
      onError: (err) => {
        console.error("GraphQL error:", err.message);
        fetchingRef.current = false;
      },
    }
  );

  const [addCartItem] = useMutation(ADD_CART_ITEM);

  const handleAddToCart = async (userId: number, productId: number, quantity: number = 1) => {
    try {
      const { data } = await addCartItem({
        variables: { userId, productId, quantity },
      });

      if (data.addCartItem) {
        const { data: countData } = await client.query({
        query: GET_CART_COUNT,
        variables: { userId },
        fetchPolicy: "network-only",
      });
      setItemNumberCart(countData?.getUserCartCount);
      } else {
        console.error("Cart update failed");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    if (!fetchingRef.current) {
      fetchingRef.current = true;
      fetchProducts({ variables: { cursor: null, limit: 20 } });
    }
  }, []);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: Element | null) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !fetchingRef.current) {
          fetchingRef.current = true;
          fetchProducts({ variables: { cursor, limit: 20 } });
        }
      });

      if (node) observer.current.observe(node);
    },
    [cursor, hasMore, loading, fetchProducts]
  );

  const renderItem = (item: Product) => {
    const discount = Math.round(((item.mrp - item.current_price) * 100) / item.mrp);
    return (
      <div key={item.id} className="flex flex-col min-w-60 max-w-60 mx-5">
        <div
          onClick={() => router.push(`/pharmacy/item/${item.id}`)}
          className="flex flex-col min-w-60 max-w-60 min-h-[320px] max-h-[320px] px-5 py-2 border rounded shadow-md bg-white gap-2"
        >
          <img src={item.image} alt={item.title} className="w-full h-32 object-contain" />
          <div className="font-bold text-md h-12 line-clamp-2 mt-2">{item.title}</div>
          <div className="text-gray-500 text-sm h-6 line-clamp-1">{item.product_details}</div>
          <div className="text-sm text-red-600 font-medium">
            ₹{item.mrp} <span className="text-green-600">({discount}% Off)</span>
          </div>
          <div className="text-lg font-bold text-black">₹{item.current_price}</div>
        </div>
        <button className="bg-yellow-400 rounded-lg p-2 text-white font-bold mt-4" onClick={() => handleAddToCart(Number(userId), Number(item.id), 1)}>
          Add To Cart
        </button>
      </div>
    );
  };

  return (
    <div>
      {Object.entries(productsByTag).map(([tag, items], index, arr) => (
        <div key={tag}>
          <div className="font-bold text-2xl px-8 lg:px-28 py-10">{tag}</div>
          <div
            className="flex flex-row overflow-x-auto hide-scrollbar px-8 lg:px-24"
            ref={index === arr.length - 1 ? lastElementRef : null}
          >
            {items.map(renderItem)}
          </div>
        </div>
      ))}
      {loading && <div className="text-center py-10">Loading more...</div>}
      {error && <div className="text-center text-red-500 py-4">Error: {error.message}</div>}
    </div>
  );
}
