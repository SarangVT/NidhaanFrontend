"use client"
import { useState, useMemo } from "react"
import { useCombobox } from "downshift"
import debounce from "lodash.debounce"
import { FiSearch } from "react-icons/fi"
import { useRouter } from "next/navigation"
import { gql, useLazyQuery } from "@apollo/client"
import { Product } from "./types/def"

const SEARCH_PRODUCTS = gql`
  query SearchProducts($q: String!) {
    searchProducts(q: $q) {
      id
      title
      product_details
      image
    }
  }
`

export default function SearchBar() {
  const router = useRouter()
  const [inputItems, setInputItems] = useState<Product[]>([])

  const [fetchSearch] = useLazyQuery<{ searchProducts: Product[] }>(SEARCH_PRODUCTS, {
    fetchPolicy: "no-cache",
    onCompleted: data => setInputItems(data.searchProducts || []),
    onError: () => setInputItems([]),
  })

  const debouncedSearch = useMemo(() =>
    debounce((query: string) => {
      if (query.trim()) {
        fetchSearch({ variables: { q: query } })
      } else {
        setInputItems([])
      }
    }, 300), [fetchSearch]
  )

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox<Product>({
    items: inputItems,
    itemToString: item => item?.title ?? "",
    onInputValueChange: ({ inputValue }) => {
      debouncedSearch(inputValue || "")
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) router.push(`/pharmacy/item/${selectedItem.id}`)
    },
  })

  return (
    <div className="relative w-full max-w-xl mx-auto mt-4" {...getComboboxProps()}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FiSearch size={22} />
        </div>
        <input
          {...getInputProps()}
          placeholder="Search for medicines..."
          className="w-full rounded-lg pl-10 pr-4 py-3 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-100"
          />
        </div>
      <ul
        {...getMenuProps()}
        className={`absolute z-10 w-full mt-1 rounded-lg max-h-64 overflow-y-auto shadow-xl ${
          isOpen && inputItems.length > 0 ? "bg-white" : "hidden"
        }`}
      >
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              key={item.id}
              {...getItemProps({ item, index })}
              className={`px-4 py-2 flex items-center space-x-3 cursor-pointer ${
                highlightedIndex === index ? "bg-blue-100" : ""
              }`}
            >
              <img src={item.image} alt={item.title} className="w-10 h-10 object-cover rounded" />
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-gray-500">{item.product_details}</div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
