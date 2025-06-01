"use client"

import ImageSlider from "@/app/components/HomepageImageSlider";
import { Product } from "../types/def";
import ShopByCategory from "../ShopByCategory";
import { useState } from "react";
import { products } from "../products";
import SearchBrands from "../SearchBrands";

export default function PharmacyByCategories () {

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
                    <ShopByCategory category="Trending Now" items={getItemsByTag("Trending Now")} />
                    <ShopByCategory category="Deals of the Day" items={getItemsByTag("Deals of the Day")} />
                    <ShopByCategory category="Ayurveda Care" items={getItemsByTag("Ayurveda Care")} />
                    <ShopByCategory category="Best Deals Now" items={getItemsByTag("Best Deals Now")} />
                    <ShopByCategory category="Popular Combo Deals" items={getItemsByTag("Popular Combo Deals")} />
                    <SearchBrands />
                </div>
            </div>
        );
}