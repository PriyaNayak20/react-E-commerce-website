import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFilter } from './FilterContext'
import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from './CartContext'

interface Product {
  category: string
}

interface FetchResponse {
  products: Product[]
}

const Sidebar = () => {
  const navigate = useNavigate()
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    setKeyword,
  } = useFilter()
  const { cartItems } = useCart()
  const [categories, setCategories] = useState<string[]>([])
  const [keywords] = useState<string[]>([
    'apple',
    'watch',
    'Fashion',
    'trend',
    'shoes',
    'shirt',
  ])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products')
        const data: FetchResponse = await response.json()
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        )
        setCategories(uniqueCategories)
      } catch (error) {
        console.error('Error fetching product', error)
      }
    }

    fetchCategories()
  }, [])

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMinPrice(value ? parseFloat(value) : undefined)
  }

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMaxPrice(value ? parseFloat(value) : undefined)
  }

  const handleRadioChangeCategories = (category: string) => {
    setSelectedCategory(category)
  }

  const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword)
  }

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setMinPrice(undefined)
    setMaxPrice(undefined)
    setKeyword('')
  }

  return (
    <div className="w-64 p-5 h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-10 mt-4">ShopEase</h1>
        <div className="relative" onClick={() => navigate('/cart')}>
          <FaShoppingCart className="text-black text-2xl cursor-pointer" />
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
            {cartItems.length}
          </span>
        </div>
      </div>

      <section>
        <input
          type="text"
          className="border-2 rounded px-2 sm:mb-0"
          placeholder="Search Product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex justify-center items-center">
          <input
            type="text"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            placeholder="Min"
            value={minPrice ?? ''}
            onChange={handleMinPriceChange}
          />
          <input
            type="text"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            placeholder="Max"
            value={maxPrice ?? ''}
            onChange={handleMaxPriceChange}
          />
        </div>

        {/* Categories Section  */}
        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-3">Categories</h2>
        </div>
        <section>
          {categories.map((category, index) => (
            <label key={index} className="block mb-2">
              <input
                type="radio"
                name="category"
                value={category}
                onChange={() => handleRadioChangeCategories(category)}
                className="mr-2 w-[16px] h-[16px]"
                checked={selectedCategory === category}
              />
              {category.toUpperCase()}
            </label>
          ))}
        </section>

        {/*  Keywords  Section */}
        <div className="mb-5 mt-4">
          <h2 className="text-xl font-semibold mb-3">Keywords</h2>
          <div>
            {keywords.map((keyword, index) => (
              <button
                key={index}
                onClick={() => handleKeywordClick(keyword)}
                className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200"
              >
                {keyword.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleResetFilters}
          className="w-full mb-[4rem] py-2 rounded mt-5"
          style={{ backgroundColor: 'black', color: 'white' }}
        >
          Reset Filters
        </button>
      </section>
    </div>
  )
}

export default Sidebar
