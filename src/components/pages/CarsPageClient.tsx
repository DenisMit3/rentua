'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, MapPin, X, Car } from 'lucide-react';
import { Vehicle } from '@/data/vehicles';
import VehicleCard from '@/components/VehicleCard';

interface CarsPageClientProps {
    initialVehicles: Vehicle[];
}

const cities = ['Все города', 'Москва', 'Санкт-Петербург', 'Сочи', 'Казань', 'Краснодар'];
const vehicleTypes = [
    { value: 'all', label: 'Все типы' },
    { value: 'sedan', label: 'Седан' },
    { value: 'suv', label: 'Внедорожник' },
    { value: 'hatchback', label: 'Хэтчбек' },
    { value: 'minivan', label: 'Минивэн' },
    { value: 'electric', label: 'Электро' },
    { value: 'luxury', label: 'Премиум' }
];
const transmissionTypes = [
    { value: 'all', label: 'Любая КПП' },
    { value: 'automatic', label: 'Автомат' },
    { value: 'manual', label: 'Механика' }
];

export default function CarsPageClient({ initialVehicles }: CarsPageClientProps) {
    const [vehiclesData, setVehiclesData] = useState<Vehicle[]>(initialVehicles);
    // const [loading, setLoading] = useState(false); // Not used if using initial data

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCity, setSelectedCity] = useState('Все города');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedTransmission, setSelectedTransmission] = useState('all');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);
    const [showFilters, setShowFilters] = useState(false);

    // const filteredVehicles = useMemo...
    // Note: Use initialVehicles for filtering unless we want to fetch new data?
    // If we use 'vehiclesData' state, we can update it if we implement server-side search later.
    // For now, filtering the initial set.

    // Actually, if we use Client Component filtering, we should filter `vehiclesData`.
    // And `vehiclesData` defaults to `initialVehicles`.

    const filteredVehicles = useMemo(() => {
        return vehiclesData.filter(v => {
            // Search
            if (searchQuery && !v.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                !v.make.toLowerCase().includes(searchQuery.toLowerCase()) &&
                !v.model.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }
            // City filter
            if (selectedCity !== 'Все города' && v.city !== selectedCity) {
                return false;
            }
            // Type filter
            if (selectedType !== 'all' && v.type !== selectedType) {
                return false;
            }
            // Transmission
            if (selectedTransmission !== 'all' && v.transmission !== selectedTransmission) {
                return false;
            }
            // Price
            if (v.pricePerDay < priceRange[0] || v.pricePerDay > priceRange[1]) {
                return false;
            }
            return true;
        });
    }, [vehiclesData, searchQuery, selectedCity, selectedType, selectedTransmission, priceRange]);

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCity('Все города');
        setSelectedType('all');
        setSelectedTransmission('all');
        setPriceRange([0, 30000]);
    };

    const hasActiveFilters = searchQuery || selectedCity !== 'Все города' || selectedType !== 'all' || selectedTransmission !== 'all' || priceRange[0] > 0 || priceRange[1] < 30000;

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
                        Аренда <span className="text-gradient">автомобилей</span>
                    </h1>
                    <p className="text-gray-400">
                        {filteredVehicles.length} автомобилей для аренды
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
                                placeholder="Поиск по марке или модели..."
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
                            {vehicleTypes.map(type => (
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
                            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
                                {/* Transmission */}
                                <div>
                                    <label className="text-sm text-gray-400 mb-2 block">Коробка передач</label>
                                    <select
                                        value={selectedTransmission}
                                        onChange={(e) => setSelectedTransmission(e.target.value)}
                                        className="input min-w-[160px] appearance-none cursor-pointer"
                                    >
                                        {transmissionTypes.map(type => (
                                            <option key={type.value} value={type.value}>{type.label}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Price Range */}
                                <div className="flex-1">
                                    <label className="text-sm text-gray-400 mb-2 block">
                                        Цена за день: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} ₴
                                    </label>
                                    <div className="flex gap-4">
                                        <input
                                            type="range"
                                            min="0"
                                            max="30000"
                                            step="500"
                                            value={priceRange[0]}
                                            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                                            className="flex-1"
                                        />
                                        <input
                                            type="range"
                                            min="0"
                                            max="30000"
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
                {filteredVehicles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredVehicles.map((vehicle, index) => (
                            <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        className="text-center py-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="w-20 h-20 rounded-full bg-gray-800 mx-auto mb-6 flex items-center justify-center">
                            <Car size={32} className="text-gray-500" />
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
