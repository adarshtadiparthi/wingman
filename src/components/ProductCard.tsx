import React from 'react';
import { Product } from '../types/product';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({ product }) => {
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full z-10">
        -20%
      </div>

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-700 p-4">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Content Container */}
      <div className="p-5">
        {/* Category */}
        <p className="text-sm text-blue-500 dark:text-blue-400 font-medium mb-2 uppercase tracking-wider">
          {product.category}
        </p>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2 h-14">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="mb-3">
          <StarRating rating={product.rating.rate} />
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
            ({product.rating.count} reviews)
          </span>
        </div>

        {/* Price and Button Container */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ${product.price.toFixed(2)}
            </span>
            {/* Optional: Display original price if item is on sale */}
            <span className="text-sm text-gray-500 line-through">
              ${(product.price * 1.2).toFixed(2)}
            </span>
          </div>

          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;