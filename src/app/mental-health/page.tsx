"use client"
import { useEffect } from "react";
import ImageDisplay from "./ImageDisplay";
import TrustHighlights from "./TrustHighlights";
import TestimonialCarousel from "./TestimonialCarousel";

export default function MentalHealth () {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <div className="flex flex-col">
                <ImageDisplay/>
                <TrustHighlights/>
                <TestimonialCarousel/>
            </div>
        </div>
    )
}