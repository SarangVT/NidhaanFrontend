"use client"
import { useEffect, useState } from "react";
// import api from "../../api/backend";
// import AuthNavbar from "../HomePage/AuthNavbar";
// import FAQ from "../HomePage/FAQ";
// import Footer from "../HomePage/Footer";
// import ServicesNavbar from "../HomePage/ServicesNavbar";
import HealthConcernIcons from "./HealthConcernIcons";
import ImageSlider from "../components/HomepageImageSlider";
import SearchBrands from "./SearchBrands";
import ShopByCategory from "./ShopByCategory";
import SearchBar from "./SearchBar";
import { products } from "./products";
import Image from "next/image";
import { Product } from "./types/def";

export default function PharmacyDelivery () {
    const [productList, setProductList] = useState<Product[]>(products);
    // useEffect(() => {
    //     const fetchItems = async () => {
    //         try {
    //             const response = await api.get('/item/allItems');
    //             setProductList(response.data.productList || []);
    //         } catch (err) {
    //             console.error('Error fetching items:', err);
    //         }
    //     };

    //     fetchItems();
    // }, []);

    const getItemsByTag = (tag: string) => {
        return productList.filter(item => item.tags?.includes(tag));
    };

    return (
        <div>
            <div className="flex flex-col">
                <div className="relative w-full">
                <img
                    src="/SearchBackground.png"
                    alt="Search Background"
                    className="w-full h-[100px] object-cover sm:h-[250px] md:h-[250px] lg:h-[250px]"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center">
                    Buy Medicines and Essentials
                    </h1>
                    <div className="w-full max-w-3xl px-2 z-10 text-black font-semibold">
                    <SearchBar />
                    </div>
                </div>
                </div>
                <div className="w-full flex justify-center"><HealthConcernIcons/></div>
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