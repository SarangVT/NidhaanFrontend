"use client"

import ImageSlider from "@/app/components/HomepageImageSlider";
import { Product } from "../types/def";
import ShopByCategory from "../ShopByCategory";
import { useState } from "react";
import { products } from "../products";
import SearchBrands from "../SearchBrands";
import ShopByCategoryComp from "../ShopByCategory";

export default function PharmacyByBrands () {

    const [productList, setProductList] = useState<Product[]>(products);
    const getItemsByTag = (tag: string) => {
            return productList.filter(item => item.tags?.includes(tag));
        };
    
        return (
            <div>
                <div className="flex flex-col">
                    <div className="flex justify-start"><ImageSlider/></div>
                </div>

                <div className="space-y-12">
                    <ShopByCategoryComp/>
                    <SearchBrands />
                </div>
            </div>
        );
}