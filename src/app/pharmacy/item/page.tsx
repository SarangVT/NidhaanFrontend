"use client"
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Product } from '../types/def';

const sampleImages = [
  '/images/image.png',
  '/images/image2.png',
  '/images/image1.png',
];

const product = {
    "id": "5",
    "title": "Paracetamol 500mg",
    "seller_id": "1",
    "rating": "4.50",
    "mrp": 50.00,
    "image": "/images/paracetamol.jpg",
    "current_price": 30.00,
    "offers": "{10% Off}",
    "highlights": "{Relieves pain,Reduces fever}",
    "product_details": "Pain and fever relief",
    "manufacturer_details": "MediStore Labs",
    "marketer_details": "MediStore Pvt Ltd",
    "country_of_origin": "India",
    "expires_on_or_after": "2026-12-31",
    "created_at": "2025-05-14 12:08:45.28872",
    "tags": "{Trending Now,Best Deals Now}"
  };

export default function ItemPage() {
    const [itemDetails, setItemDetails] = useState<Product>(product);
    const params = useParams();
    const id = params?.id as string;

    if (!itemDetails) {
        return <div className="p-8 text-gray-600 text-lg">Loading item details...</div>;
    }
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    const { title,
    rating,
    mrp,
    current_price,
    image,
    offers = [],
    highlights = [],
    product_details,
    manufacturer_details,
    marketer_details,
    country_of_origin,
    expires_on_or_after,
  } = itemDetails;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const discount = Math.round(((mrp - current_price) * 100) / mrp);
  const scrollRef = useRef(null);

  return (
    <div>
      <div className="mb-12" />
      <div className="p-4 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex gap-4">
            <div className="hidden sm:flex flex-col gap-2 max-h-96 overflow-auto">
              {sampleImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Thumbnail ${idx}`}
                  className={`w-16 h-16 object-cover border cursor-pointer rounded-lg ${
                    idx === currentImageIndex ? 'border-blue-500' : 'border-gray-300'
                  }`}
                  onClick={() => setCurrentImageIndex(idx)}
                />
              ))}
            </div>
            <div className="flex-1 flex justify-center items-center relative">
              <img
                src={sampleImages[currentImageIndex]}
                alt="Product"
                className="w-full max-w-sm object-contain"
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-start space-y-2 ml-12">
            <h1 className="text-2xl font-bold">{title}</h1>
            {/* <div className="text-yellow-500 font-semibold">
              {'★'.repeat(Math.floor(rating || 4)) + '☆'.repeat(5 - Math.floor(rating || 4))} ({rating || 120} reviews)
            </div>
            <div>
              {highlights.map((highlight, i) => (
                <p key={i}><strong>{highlight}</strong></p>
              ))}
            </div>*/}
          </div> 

          <div className="flex-1 flex flex-col justify-start space-y-4">
            <div className="flex flex-col">
              <p className="text-gray-400">
                MRP <span className="line-through">₹{mrp}</span> — {discount}% Off
              </p>
              <p className="text-2xl font-bold text-green-600">₹{current_price}</p>
            </div>
            <div className="font-bold">Get by 16 May, 2025</div>
            <div>
              <h3 className="font-semibold mb-1">Offers</h3>
              {/* <ul className="list-disc list-inside text-gray-700">
                {offers.map((offer, idx) => (
                  <li key={idx}>{offer}</li>
                ))}
              </ul> */}
            </div>
            <button className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 w-full max-w-sm font-bold">
              Add to Cart
            </button>
            <button className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 w-full max-w-sm font-bold">
              Buy Now
            </button>
          </div>
        </div>

        <div className="space-y-2 pt-12">
          <h2 className="text-xl font-bold">Description</h2>
          <p dangerouslySetInnerHTML={{ __html: product_details }} />
        </div>

        <div className="space-y-2 pt-6">
          <h2 className="text-xl font-bold">Additional Information</h2>
          <p><strong>Manufacturer:</strong> {manufacturer_details}</p>
          <p><strong>Marketer:</strong> {marketer_details}</p>
          <p><strong>Country of Origin:</strong> {country_of_origin}</p>
          <p><strong>Expires On Or After:</strong> {expires_on_or_after}</p>
        </div>

        <div className="space-y-2 pt-6">
          <h2 className="text-xl font-bold">Safety Information</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Do not exceed the recommended dose.</li>
            <li>Store in a cool, dry place away from sunlight.</li>
            <li>Keep out of reach of children.</li>
          </ul>
        </div>

        <div className="space-y-2 pt-6">
          <h2 className="text-xl font-bold">Customer Ratings & Reviews</h2>
          <div className="space-y-3">
            <div className="border p-3 rounded">
              <p className="font-semibold">Rahul M.</p>
              <p className="text-yellow-500">★★★★★</p>
              <p className="text-gray-700">Worked great for my headache. Fast delivery too!</p>
            </div>
            <div className="border p-3 rounded">
              <p className="font-semibold">Sneha P.</p>
              <p className="text-yellow-500">★★★★☆</p>
              <p className="text-gray-700">Effective, but packaging could be better.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
