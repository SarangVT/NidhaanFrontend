// data/infoItems.tsx
import {
  FaPenNib,
  FaClipboardList,
  FaBookOpen,
  FaInfoCircle,
  FaTruck,
  FaMoneyBillWave,
} from 'react-icons/fa';

export const infoItems = [
  {
    icon: <FaPenNib />,
    title: 'Become a Seller on Nidhaan',
    description: 'Make your medicines available to thousands of local buyers 24x7',
    linkText: 'Register as a Nidhaan seller',
    href: '#',
  },
  {
    icon: <FaClipboardList />,
    title: 'Step-by-step registration guide',
    description: 'A complete walk-through of the seller registration process',
    linkText: 'How to Register as a Seller',
    href: '#',
  },
  {
    icon: <FaBookOpen />,
    title: "Beginner's guide to Selling",
    description: 'A simple guide to help you begin selling online with Nidhaan',
    linkText: "Download beginner's guide",
    href: '#',
  },
  {
    icon: <FaInfoCircle />,
    title: 'Guide to Nidhaan Seller Panel',
    description: 'Learn about the dashboard to manage your pharmacy on Nidhaan',
    linkText: 'View Seller Panel Guide',
    href: '#',
  },
  {
    icon: <FaTruck />,
    title: 'Nidhaan Delivery Service',
    description: 'Nidhaan Delivery handles logistics, medicine delivery, and tracking',
    linkText: 'How Delivery Works',
    href: '#',
  },
  {
    icon: <FaMoneyBillWave />,
    title: 'Refer & earn rewards',
    description:
      'Refer new sellers & earn up to ₹25,000. Your friend gets ₹1,000 once they go live!',
    linkText: 'Refer a Seller',
    href: '#',
  },
];
