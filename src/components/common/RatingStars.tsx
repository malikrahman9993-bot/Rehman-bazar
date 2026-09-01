import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  reviewsCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  reviewsCount,
  size = 'sm',
  showCount = true,
}) => {
  const iconSize = size === 'sm' ? 14 : size === 'md' ? 16 : 20;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const isFull = rating >= starIndex;
          const isHalf = !isFull && rating >= starIndex - 0.5;
          return (
            <span key={starIndex} className="inline-block">
              {isFull ? (
                <Star size={iconSize} className="fill-amber-400 text-amber-400" />
              ) : isHalf ? (
                <StarHalf size={iconSize} className="fill-amber-400 text-amber-400" />
              ) : (
                <Star size={iconSize} className="text-stone-600" />
              )}
            </span>
          );
        })}
      </div>
      {showCount && (
        <span className="text-xs text-stone-400 font-medium">
          <strong className="text-stone-200">{rating.toFixed(1)}</strong>
          {reviewsCount !== undefined && ` (${reviewsCount})`}
        </span>
      )}
    </div>
  );
};
