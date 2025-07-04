"use client"
import { Fragment, useState, useMemo } from "react";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { FiMenu, FiMessageCircle } from "react-icons/fi";
import { FaRegMoneyBillAlt, FaBoxOpen, FaShoppingCart, FaPlus, FaHeartbeat, FaBoxes, FaPhoneAlt, FaTags } from "react-icons/fa";
import { MdAnnouncement } from "react-icons/md";
import { Listbox, ListboxOptions, ListboxOption, ListboxButton } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
type Order = {
  orderId: string;
  date: string;
  product: string;
  amount: number;
  category: string;
  delivery: string;
};

const dummyOrders: Order[] = [
  { orderId: "OID1", date: "2025-07-01", product: "Paracetamol 500mg", amount: 120, category: "Medicine", delivery: "2 Days" },
  { orderId: "OID2", date: "2025-07-01", product: "Vitamin C Tablets", amount: 250, category: "Supplement", delivery: "1 Day" },
  { orderId: "OID3", date: "2025-07-02", product: "Face Mask Pack", amount: 75, category: "Personal Care", delivery: "3 Days" },
  { orderId: "OID4", date: "2025-07-02", product: "Digital Thermometer", amount: 499, category: "Equipment", delivery: "2 Days" },
];

export default function SellerDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white text-gray-800">
      <div
        className={`${
          menuOpen ? "w-64" : "w-16"
        } bg-teal-600 text-white font-bold transition-all duration-300 p-4 flex flex-col items-start`}
      >
        <button onClick={() => setMenuOpen(!menuOpen)} className="mb-6">
          <FiMenu size={24} />
        </button>
        {menuOpen && (
          <ul className="space-y-4">
            <li>Dashboard</li>
            <li>Products</li>
            <li>Orders</li>
            <li>Messages</li>
            <li>Settings</li>
          </ul>
        )}
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatBox icon={<FaPlus />} title="Add Product" action />
          <StatBox icon={<FaShoppingCart />} title="Open Orders" value="2,839" />
          <StatBox icon={<FaRegMoneyBillAlt />} title="Total Sales" value="₹16,101.18" />
          <StatBox icon={<FaBoxOpen />} title="Total Balance" value="₹390,921.04" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoCard title="Brand Health" text="These quality issues that impact your visibility" icon={<FaHeartbeat />} />
          <InfoCard title="Buyer Messages" text="15 messages, 0 pending replies" icon={<FiMessageCircle />} />
          <InfoCard title="Inventory" text="1,287 items sold, 2,581 total stock left" icon={<FaBoxes />} />
          <InfoCard title="News" text="Holiday prep, climate certifications, short video tips" icon={<MdAnnouncement />} />
          <InfoCard title="Communications" text="Information regarding your communication" icon={<FaPhoneAlt />} />
          <InfoCard title="Match Competitive Prices" text="84 pricing issues that impact your visibility" icon={<FaTags />} />
        </div>
        <OpenOrdersTable orders={dummyOrders} />
      </div>
    </div>
  );
}

function StatBox({ icon, title, value, action = false }: { icon: any; title: string; value?: string; action?: boolean }) {
  return (
    <div className="flex items-center justify-between bg-white border border-gray-200 shadow-sm rounded-2xl p-4 hover:shadow-md transition">
      <div className="flex items-center space-x-4">
        <div className="bg-teal-100 p-2 rounded-full text-teal-600">{icon}</div>
        <div>
          <div className="text-sm font-semibold text-gray-600">{title}</div>
          {value && <div className="text-xl font-semibold text-gray-900">{value}</div>}
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, text, icon }: { title: string; text: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-5 pb-10 hover:shadow-md transition">
      <h2 className="flex flex-row gap-3 leading-3 text-lg font-bold text-gray-800 mb-2">{icon}{title}</h2>
      <p className="text-gray-600 text-semibold">{text}</p>
    </div>
  );
}

type SortKey = "date" | "amount" | "delivery" | null;
type SortOrder = "asc" | "desc";

function OpenOrdersTable({ orders }: { orders: Order[] }) {
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [filterCategory, setFilterCategory] = useState("");

  const handleAcceptOrder = (orderId: string) => {
    console.log("Accepted order:", orderId);
    // TODO: Add API call here
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedAndFiltered = useMemo(() => {
    let filtered = orders;
    if (filterCategory) {
      filtered = orders.filter(o => o.category === filterCategory);
    }

    if (!sortKey) return filtered;

    const sorted = [...filtered].sort((a, b) => {
      if (sortKey === "date") {
        return sortOrder === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }

      if (sortKey === "amount") {
        return sortOrder === "asc"
          ? a.amount - b.amount
          : b.amount - a.amount;
      }

      if (sortKey === "delivery") {
        const daysA = parseInt(a.delivery.split(" ")[0]);
        const daysB = parseInt(b.delivery.split(" ")[0]);
        return sortOrder === "asc" ? daysA - daysB : daysB - daysA;
      }

      return 0;
    });
    return sorted;
  }, [orders, sortKey, sortOrder, filterCategory]);

const categories = ["All Categories", ...new Set(orders.map(o => o.category))];
  return (
    <div className="bg-white border border-gray-50 rounded-2xl shadow-sm p-5 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Open Orders</h2>

<Listbox value={filterCategory || "All Categories"} onChange={(value) => {
  setFilterCategory(value === "All Categories" ? "" : value);
}}>
  <div className="relative w-48">
    <ListboxButton className="w-full border border-gray-300 rounded px-3 py-1 text-sm text-left bg-white font-bold flex justify-between items-center">
      {filterCategory || "All Categories"}
      <FaChevronDown className="ml-2 text-gray-400 text-xs" />
    </ListboxButton>

    <ListboxOptions className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-sm z-10">
      {categories.map((cat) => (
        <ListboxOption key={cat} value={cat} as={Fragment}>
          {({ selected, active }) => (
            <ul
              className={`px-5 py-2 font-semibold text-sm cursor-pointer ${
                selected ? "font-bold text-black" : "text-gray-700"
              } ${active ? "bg-teal-100" : ""}`}
            >
              {cat}
            </ul>
          )}
        </ListboxOption>
      ))}
    </ListboxOptions>
  </div>
</Listbox>

      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="p-2">Action</th>
              <th className="p-2 cursor-pointer select-none" onClick={() => handleSort("date")}>
                <div className="flex items-center gap-2">
                  Date Placed
                  <div className="flex flex-col items-center leading-none text-xs -space-y-1">
                    <FaSortUp size={12} className={sortKey === "date" && sortOrder === "asc" ? "text-teal-500" : "text-gray-400"} />
                    <FaSortDown size={12} className={sortKey === "date" && sortOrder === "desc" ? "text-teal-500" : "text-gray-400"} />
                  </div>
                </div>
              </th>
              <th className="p-2">Product Name</th>
              <th className="p-2 cursor-pointer select-none" onClick={() => handleSort("amount")}>
                <div className="flex items-center gap-1">
                  Amount
                  <div className="flex flex-col leading-none -space-y-1">
                    <FaSortUp size={12} className={sortKey === "amount" && sortOrder === "asc" ? "text-teal-500" : "text-gray-400"} />
                    <FaSortDown size={12} className={sortKey === "amount" && sortOrder === "desc" ? "text-teal-500" : "text-gray-400"} />
                  </div>
                </div>
              </th>
              <th className="p-2">Category</th>
              <th className="p-2 cursor-pointer select-none" onClick={() => handleSort("delivery")}>
                <div className="flex items-center gap-1">
                  Delivery Time
                  <div className="flex flex-col -space-y-1 leading-none">
                    <FaSortUp size={12} className={sortKey === "delivery" && sortOrder === "asc" ? "text-teal-500" : "text-gray-400"} />
                    <FaSortDown size={12} className={sortKey === "delivery" && sortOrder === "desc" ? "text-teal-500" : "text-gray-400"} />
                  </div>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedAndFiltered.map((order) => (
              <tr key={order.orderId} className="border-b hover:bg-teal-50">
                <td className="p-2">
                  <button
                    onClick={() => handleAcceptOrder(order.orderId)}
                    className="px-3 py-1 text-sm bg-teal-500 text-white border border-teal-500 rounded-full hover:bg-teal-600 transition"
                  >
                    Accept
                  </button>
                </td>
                <td className="p-2 text-gray-700">{order.date}</td>
                <td className="p-2 text-gray-700">{order.product}</td>
                <td className="p-2 text-gray-700">₹{order.amount}</td>
                <td className="p-2 text-gray-700">{order.category}</td>
                <td className="p-2 text-gray-700">{order.delivery}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
