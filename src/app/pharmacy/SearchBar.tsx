import { useState, useMemo, useEffect } from "react"
import { useCombobox } from "downshift"
import debounce from "lodash.debounce"
import Fuse from "fuse.js"
import { FiSearch } from "react-icons/fi";
// import api from "../../api/backend";
import { useRouter } from "next/navigation";
import { products as items} from "./products";
import { Product } from "./types/def";

const searchableFields = [
  "title",
  "product_details",
  "manufacturer_details",
  "tags",
  "highlights"
]

function getRandomSubset(arr: Product[], size = 4) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, size)
}

export default function SearchBar() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>(items);
    // useEffect(() => {
    //     const fetchItems = async () => {
    //         try {
    //             const response = await api.get('/item/allItems');
    //             console.log(response.data)
    //             setProducts(response.data.itemList || []);
    //         } catch (err) {
    //             console.error('Error fetching items:', err);
    //         }
    //     };

    //     fetchItems();
    // }, []);

  const [inputItems, setInputItems] = useState(() => getRandomSubset(products))

  const fuse = useMemo(() => new Fuse(products, {
    keys: searchableFields,
    threshold: 0.4,
    includeScore: true,
  }), [products])

const debouncedSetItems = useMemo(() => {
  return debounce((inputValue) => {
    const results = inputValue
      ? fuse.search(inputValue).map(res => res.item)
      : getRandomSubset(products)
    setInputItems(results)
  }, 200)
}, [fuse, products])

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items: inputItems,
    itemToString: item => item?.title ?? "",
    onInputValueChange: ({ inputValue }) => {
      if (inputValue === "") {
        setInputItems(getRandomSubset(products))
      } else {
        debouncedSetItems(inputValue)
      }
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        router.push(`/item?id=${selectedItem.id}`);
      }
    }
  })

  return (
    <div className="w-full max-w-xl mx-auto mt-4">
      <div {...getComboboxProps()} className="relative">
        <div className="relative focus:outline-none">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiSearch size={22} className="font-bold"/>
          </div>
          <input
            {...getInputProps()}
            className="w-full border rounded-lg pl-10 pr-4 py-3 placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-100
              focus:placeholder-black border-b-0 bg-white
              "
            placeholder="Search for medicines..."
            style={{ borderBottom: "none", background: "white", outline:"none", border: "none"}}
          />
        </div>

        <ul
          {...getMenuProps()}
          className="absolute z-10 w-full bg-white mt-1 rounded-lg max-h-64 overflow-y-auto shadow-xl"
        >
          {isOpen &&
            inputItems.map((item, index) => (
              <li
                key={item.id}
                {...getItemProps({ item, index})}
                className={`px-4 py-2 flex items-start space-x-3 cursor-pointer ${
                  highlightedIndex === index ? "bg-blue-100" : ""
                }`}
              >
                <img src={item.image} alt="" className="w-10 h-10 object-cover rounded" />
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-gray-500">{item.product_details}</div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
