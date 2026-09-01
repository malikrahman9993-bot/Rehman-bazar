import React, { useState } from 'react';
import { Star, CheckCircle2, ThumbsUp, Quote } from 'lucide-react';
import { SAMPLE_REVIEWS } from '../../data/products';
import { RatingStars } from '../common/RatingStars';
import { useStore } from '../../context/StoreContext';
import { ScrollReveal } from '../common/ScrollReveal';

export const CustomerReviewsSection: React.FC = () => {
  const { showToast } = useStore();
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({});

  const handleHelpful = (id: string, currentCount: number) => {
    if (helpfulCounts[id]) return;
    setHelpfulCounts((prev) => ({ ...prev, [id]: (prev[id] || currentCount) + 1 }));
    showToast('Feedback Received', 'Thank you for marking this review as helpful.', 'info');
  };

  return (
    <section className="py-16 sm:py-24 bg-stone-950 border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <CheckCircle2 size={14} />
              <span>VERIFIED BUYER EXPERIENCES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-serif-luxury tracking-tight">
              Voices of Our USA &amp; UK Patrons
            </h2>
            <div className="flex items-center justify-center gap-3 pt-2">
              <RatingStars rating={4.9} size="md" showCount={false} />
              <span className="text-xs text-stone-300 font-semibold">
                <strong>4.9 / 5.0 Average Rating</strong> based on 12,400+ reviews
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_REVIEWS.map((rev, idx) => (
            <ScrollReveal key={rev.id} direction="up" delay={idx * 0.1}>
              <div
                className="p-6 rounded-3xl bg-stone-900 border border-stone-800/90 flex flex-col justify-between space-y-4 hover:border-amber-500/30 transition-all shadow-xl h-full"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <RatingStars rating={rev.rating} size="sm" showCount={false} />
                    <span className="text-[11px] text-stone-500 font-medium">{rev.date}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      className="w-10 h-10 rounded-full object-cover border border-amber-500/30"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">{rev.author}</span>
                        <CheckCircle2 size={12} className="text-emerald-400" />
                      </div>
                      <span className="text-[11px] text-stone-400">{rev.location}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleHelpful(rev.id, rev.helpfulCount)}
                    className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-amber-400 transition-colors p-1.5 rounded-lg bg-stone-800/50"
                    title="Mark as helpful"
                  >
                    <ThumbsUp size={12} />
                    <span className="text-[11px] font-semibold">
                      {helpfulCounts[rev.id] !== undefined ? helpfulCounts[rev.id] : rev.helpfulCount}
                    </span>
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
