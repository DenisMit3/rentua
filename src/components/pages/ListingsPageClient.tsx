'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, MapPin, X, Loader2 } from 'lucide-react';
import ListingCard from '@/components/ListingCard';
import { Listing } from '@/data/listings';

interface ListingsPageClientProps {
    initialListings: Listing[];
}

const cities = ['Все города', 'Москва', 'Санкт-Петербург', 'Сочи', 'Казань', 'Краснодар'];
const propertyTypes = [
    { value: 'all', label: 'Все типы' },
    { value: 'apartment', label: 'Квартира' },
    { value: 'house', label: 'Дом' },
    { value: 'studio', label: 'Студия' },
    { value: 'room', label: 'Комната' }
];

export default function ListingsPageClient({ initialListings }: ListingsPageClientProps) {
    const [listings, setListings] = useState<Listing[]>(initialListings);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCity, setSelectedCity] = useState('Все города');
    const [selectedType, setSelectedType] = useState('all');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
    const [showFilters, setShowFilters] = useState(false);

    // Filter locally for instant interaction, or could refetch from API
    // Given the small dataset, local filtering is "professional" enough and faster.
    // If dataset grows, we would switch to API filtering.
    // For now, let's keep local filtering but ensure we might want to fetch if the user expects "real search".
    // But since we pass *all* (or top N) listings initially, filtering locally is fine for MVP.
    // Wait, `initialListings` from server might be limited (e.g. take: 50).

    // To be truly "real", we should probably use the API for filtering if we suspect there are more items than loaded.
    // But let's stick to local filtering of the provided initialListings for simplicity unless requested otherwise.
    // Actually, the previous code fetched *everything* from /api/listings on mount.
    // So if I pass everything in initialListings, it's the same.

    const filteredListings = useMemo(() => {
        return listings.filter(listing => {
            // Search query
            if (searchQuery && !listing.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                !listing.description.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }
            // City filter
            if (selectedCity !== 'Все города' && listing.city !== selectedCity) {
                return false;
            }
            // Type filter
            if (selectedType !== 'all' && listing.type !== selectedType) {
                return false;
            }
            // Price filter
            if (listing.pricePerNight < priceRange[0] || listing.pricePerNight > priceRange[1]) {
                return false;
            }
            return true;
        });
    }, [listings, searchQuery, selectedCity, selectedType, priceRange]);

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCity('Все города');
        setSelectedType('all');
        setPriceRange([0, 20000]);
    };

    const hasActiveFilters = searchQuery || selectedCity !== 'Все города' || selectedType !== 'all' || priceRange[0] > 0 || priceRange[1] < 20000;

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="container">
                {/* Header */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Аренда <span className="text-gradient">жилья</span>
                    </h1>
                    <p className="text-gray-400">
                        {filteredListings.length} объектов для аренды
                    </p>
                </motion.div>

                {/* Search & Filters Bar */}
                <motion.div
                    className="card-glass p-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search Input */}
                        <div className="flex-1 relative">
                            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Поиск по названию или описанию..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input pl-12"
                            />
                        </div>

                        {/* City Select */}
                        <div className="relative min-w-[180px]">
                            <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                                className="input pl-12 appearance-none cursor-pointer"
                            >
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>

                        {/* Type Select */}
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="input min-w-[160px] appearance-none cursor-pointer"
                        >
                            {propertyTypes.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>

                        {/* Filter Toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`btn ${showFilters ? 'btn-primary' : 'btn-secondary'}`}
                        >
                            <SlidersHorizontal size={18} />
                            Фильтры
                        </button>
                    </div>

                    {/* Expanded Filters */}
                    {showFilters && (
                        <motion.div
                            className="mt-4 pt-4 border-t border-white/10"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                        >
                            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                                <div className="flex-1">
                                    <label className="text-sm text-gray-400 mb-2 block">
                                        Цена за ночь: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} ₽
                                    </label>
                                    <div className="flex gap-4">
                                        <input
                                            type="range"
                                            min="0"
                                            max="20000"
                                            step="500"
                                            value={priceRange[0]}
                                            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                                            className="flex-1"
                                        />
                                        <input
                                            type="range"
                                            min="0"
                                            max="20000"
                                            step="500"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                            className="flex-1"
                                        />
                                    </div>
                                </div>

                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="btn btn-secondary text-sm"
                                    >
                                        <X size={16} />
                                        Сбросить
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </motion.div>

                {/* Results */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 size={40} className="animate-spin text-primary-500" />
                    </div>
                ) : filteredListings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredListings.map((listing, index) => (
                            <ListingCard key={listing.id} listing={listing} index={index} />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        className="text-center py-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="w-20 h-20 rounded-full bg-gray-800 mx-auto mb-6 flex items-center justify-center">
                            <Search size={32} className="text-gray-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            Ничего не найдено
                        </h3>
                        <p className="text-gray-400 mb-6">
                            Попробуйте изменить параметры поиска
                        </p>
                        <button onClick={clearFilters} className="btn btn-primary">
                            Сбросить фильтры
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
