"use client"

import HealthConcernIcons from "./HealthConcernIcons";
import ImageSlider from "../components/HomepageImageSlider";
import SearchBrands from "./SearchBrands";
import SearchBar from "./SearchBar";
import Image from "next/image";
import ShopByCategoryComp from "./ShopByCategory";
import { useEffect, useState } from "react";

export default function PharmacyDelivery () {
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

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
    setIsMounted(true);
    }, []);

    return (
        <div>
            <div className="flex flex-col w-full overflow-x-hidden">
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
                    {isMounted && <SearchBar />}
                    </div>
                </div>
                </div>
                <div className="w-full flex justify-center"><HealthConcernIcons/></div>
                <div className="flex justify-start px-10"><ImageSlider/></div>
            </div>

            <div className="space-y-12">
                <ShopByCategoryComp/>
                <SearchBrands />
            </div>
        </div>
    );
}