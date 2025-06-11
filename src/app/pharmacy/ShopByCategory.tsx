"use client"
// import api from "../../api/backend";
import { useRouter } from "next/navigation";
// import { addToCart } from "../CartPage/helperFunctions";
// import { useUserData } from "../Context/userContext";
import { useEffect } from "react";
import { useState } from "react";
import { Product, ShopByCategoryProps } from './types/def';
import { products } from "./products";
import Image from "next/image";

export function ShopByCategory ({category, items}: ShopByCategoryProps) {

    const router = useRouter();
    function Item({id, title, desc, src, current_price, mrp}: {id: string, title: string, desc: string, src: string, current_price: number, mrp: number}) {
        const discount = Math.round(((mrp - current_price) * 100) / mrp);
        return (
            <div className="flex flex-col min-w-60 max-w-60 mx-5">
                <div onClick={() => router.push(`/pharmacy/item?id=${id}`)} className="flex flex-col min-w-60 max-w-60 min-h-[320px] max-h-[320px] px-5 py-2 border rounded shadow-md bg-white gap-2">
                    <img src={src} alt={title} className="w-full h-32 object-contain"/>
                    <div className="font-bold text-md break-words h-12 line-clamp-2 mt-2">{title}</div>
                    <div className="text-gray-500 text-sm line-clamp-1 w-full h-6">{desc}</div>
                    <div className="text-sm text-red-600 font-medium">
                        ₹{mrp} <span className="text-green-600">({discount}% Off)</span>
                    </div>
                    <div className="text-lg font-bold text-black">₹{current_price}</div>
                </div>
                <button className="bg-yellow-400 rounded-lg p-2 text-white font-bold mt-4"
               >Add To Cart</button>
            </div>
        );
    }

    return (
        <div>
            <div className="font-bold text-2xl px-8 lg:px-28 py-10">{category}</div>
            <div className="flex flex-row overflow-x-auto overflow-y-hidden hide-scrollbar px-8 lg:px-24">
                {items.map((item, index) => (
                    <div key={index}><Item id={item.id} title={item.title} desc={item.product_details} src={item.image} current_price={item.current_price} mrp={item.mrp}/></div>
                ))}
            </div>
        </div>
    )
}

export default function ShopByCategoryComp () {
    const [productList, setProductList] = useState<Product[]>(products);

    const getItemsByTag = (tag: string) => {
        return productList.filter(item => item.tags?.includes(tag));
    };
    return (
        <div>
            <ShopByCategory category="Trending Now" items={getItemsByTag("Trending Now")}/>
            <ShopByCategory category="Deals of the Day" items={getItemsByTag("Deals of the Day")} />
            <ShopByCategory category="Ayurveda Care" items={getItemsByTag("Ayurveda Care")} />
            <ShopByCategory category="Best Deals Now" items={getItemsByTag("Best Deals Now")} />
            <ShopByCategory category="Popular Combo Deals" items={getItemsByTag("Popular Combo Deals")} />
        </div>
    )
}