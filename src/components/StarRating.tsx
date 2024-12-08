import React from 'react';
import { StarIcon } from '@heroicons/react/20/solid';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = React.memo(({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <StarIcon
          key={index}
          className={`h-5 w-5 ${
            index < Math.floor(rating)
              ? 'text-yellow-400'
              : index < rating
              ? 'text-yellow-400 opacity-50'
              : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
        {rating.toFixed(1)}
      </span>
    </div>
  );
});

export default StarRating;