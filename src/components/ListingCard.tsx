'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, MapPin, Users, Bed, Bath, Heart, Zap } from 'lucide-react';
import { Listing } from '@/data/listings';

interface ListingCardProps {
    listing: Listing;
    index?: number;
}

export default function ListingCard({ listing, index = 0 }: ListingCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Link href={`/listings/${listing.id}`} className="block">
                <div className="card group cursor-pointer">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                            src={listing.images[0]}
                            alt={listing.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex gap-2">
                            {listing.instantBook && (
                                <span className="badge badge-success">
                                    <Zap size={12} />
                                    Мгновенно
                                </span>
                            )}
                        </div>

                        {/* Favorite button */}
                        <button
                            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-rose-500 transition-all"
                            onClick={(e) => {
                                e.preventDefault();
                                // TODO: Add to favorites
                            }}
                        >
                            <Heart size={18} />
                        </button>

                        {/* Price tag */}
                        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5">
                            <span className="text-white font-bold">{listing.pricePerNight.toLocaleString()} ₴</span>
                            <span className="text-gray-300 text-sm"> / ночь</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        {/* Location & Rating */}
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1 text-gray-400 text-sm">
                                <MapPin size={14} />
                                <span>{listing.city}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                <span className="text-white font-medium">{listing.rating}</span>
                                <span className="text-gray-500 text-sm">({listing.reviewsCount})</span>
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-white font-semibold text-lg mb-3 line-clamp-1 group-hover:text-gradient transition-all">
                            {listing.title}
                        </h3>

                        {/* Features */}
                        <div className="flex items-center gap-4 text-gray-400 text-sm">
                            <div className="flex items-center gap-1">
                                <Users size={14} />
                                <span>{listing.maxGuests}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Bed size={14} />
                                <span>{listing.beds}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Bath size={14} />
                                <span>{listing.bathrooms}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
