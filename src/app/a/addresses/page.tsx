type Address = {
  name: string;
  details: string;
  phone: string;
  default: boolean;
};

const mockAddresses: Address[] = [
  {
    name: "Sarang Thakare",
    details:
      "Unit 210 C2, First Floor, VSB(Vikram Sarabhai) Hostel, IIT Indore, Simrol, INDORE, MP 452020",
    phone: "9011964178",
    default: true,
  },
  {
    name: "Sarang Vinayak Thakare",
    details:
      "Plot No 48 A, Sanjivani Nagar, Near Khandelwal Nagar, Sai Nagar, AMRAVATI, MH 444607",
    phone: "9011964178",
    default: false,
  },
];

export default function Address() {

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold mb-12 flex justify-center">Your Addresses</h1>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          <div
            className="border-dashed border-2 border-gray-400 rounded flex items-center justify-center h-32 cursor-pointer hover:bg-gray-50"
          >
            + Add address
          </div>

          {mockAddresses.map((addr, i) => (
            <div key={i} className="border rounded p-4 relative">
              {addr.default && (
                <span className="absolute top-2 right-2 text-sm text-white bg-yellow-500 px-2 py-1 rounded">
                  Default
                </span>
              )}
              <p className="font-semibold">{addr.name}</p>
              <p className="text-sm mt-1">{addr.details}</p>
              <p className="text-sm mt-1">Phone: {addr.phone}</p>
              <div className="flex gap-4 text-blue-600 mt-2 text-sm">
                <button>Edit</button>
                <button>Remove</button>
                {!addr.default && <button>Set as Default</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
