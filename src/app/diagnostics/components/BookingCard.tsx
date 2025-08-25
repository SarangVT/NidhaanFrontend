type Test = {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  discount: string;
  reportDelivery: string;
  homeCollection: boolean;
};
export default function BookingCard({ test }: { test: Test }) {
  return (
    <div className="min-w-[250px] max-w-[380px] h-[350px] flex flex-col justify-between border border-teal-200 rounded-2xl p-8 bg-white shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-3">
        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
          <span className="text-teal-600 text-xl">🧪</span>
        </div>
        <span className="text-teal-600 text-md font-semibold bg-teal-50 px-2 py-1 rounded-lg">
          SAFE
        </span>
      </div>

      <h3 className="text-md font-semibold text-gray-800 mb-2">{test.title}</h3>

      {test.homeCollection && (
        <p className="text-teal-600 text-xs font-medium mb-1">
          Home Collection Available
        </p>
      )}
      <p className="text-gray-600 text-xs mb-3">
        Report delivery - <span className="font-medium">{test.reportDelivery}</span>
      </p>

      <div className="mb-4">
        <span className="text-lg font-bold text-gray-900">₹{test.price}</span>{" "}
        <span className="line-through text-gray-400 text-md">₹{test.originalPrice}</span>{" "}
        <span className="text-green-600 text-md">{test.discount}</span>
      </div>

      <div className="flex gap-2">
        <button className="w-1/2 border border-teal-500 text-teal-600 text-md py-2 rounded-xl hover:bg-teal-50">
          View Details
        </button>
        <button className="w-1/2 bg-teal-600 text-white text-md py-2 rounded-xl hover:bg-teal-700">
          Add To Cart
        </button>
      </div>
    </div>
  );
}