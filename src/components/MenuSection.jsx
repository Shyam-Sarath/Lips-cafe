import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, Flame, Eye, ShoppingCart } from 'lucide-react';
import { menuCategories, menuItems } from '../data/menuData';
import LipsIcon from './LipsIcon';

export default function MenuSection({ cart, onUpdateCart }) {
  const [activeCategory, setActiveCategory] = useState('ice-creams');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [bestSellersOnly, setBestSellersOnly] = useState(false);

  // Filter menu items based on selected category, search, veg, and best seller toggles
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVeg = !vegOnly || item.isVeg;
    const matchesBestSeller = !bestSellersOnly || item.isBestSeller;
    
    return matchesCategory && matchesSearch && matchesVeg && matchesBestSeller;
  });

  // Helper to get current quantity of an item in the cart
  const getItemQty = (itemId) => {
    const cartItem = cart.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddOne = (item) => {
    onUpdateCart(item, 1);
  };

  const handleRemoveOne = (item) => {
    onUpdateCart(item, -1);
  };

  return (
    <section id="digital-menu" className="py-20 bg-[#1c1b1b] relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-secondary/5 rounded-full filter blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-container/5 rounded-full filter blur-3xl opacity-20 pointer-events-none"></div>

      <div className="px-6 max-w-7xl mx-auto relative z-10">
        
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary mb-4 font-bold text-[12px] border border-secondary/20 uppercase tracking-widest">
              Digital Ordering
            </span>
            <h2 className="text-3xl md:text-5xl font-black relative">
              Craving Something <span className="text-primary-container relative">
                Delicious?
                <LipsIcon className="absolute -top-7 -right-7 w-8 h-8 text-secondary/15 rotate-12 stroke-[1.2] hidden sm:block pointer-events-none" />
              </span>
            </h2>
            <p className="text-on-surface-variant text-sm mt-2 max-w-lg font-light leading-relaxed">
              Explore our freshly prepared menu items and customize your order. Tap any item to add it to your live cart.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#131313]/90 border border-white/10 rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/50 transition-all font-sans"
            />
          </div>
        </div>

        {/* Quick Filter Toggles & Tabs */}
        <div className="flex flex-col gap-6 mb-10">
          {/* Tabs container with custom scrollbar */}
          <div className="flex items-center gap-3 overflow-x-auto pb-3 -mx-6 px-6 scrollbar-hide md:overflow-visible">
            {menuCategories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`relative px-5 py-3 rounded-xl text-xs uppercase font-extrabold tracking-widest flex items-center gap-2.5 transition-all duration-300 whitespace-nowrap border cursor-pointer ${
                    isActive 
                      ? 'bg-primary-container text-on-primary-container border-primary-container shadow-[0_0_15px_rgba(198,243,17,0.2)]' 
                      : 'bg-white/5 text-on-surface-variant hover:text-on-surface hover:bg-white/10 border-white/5'
                  }`}
                >
                  <span className="text-base">{category.icon}</span>
                  {category.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryGlow"
                      className="absolute inset-0 rounded-xl border border-primary-container/50 pointer-events-none"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Veg-only and Best Sellers quick toggles */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`px-4 py-2.5 rounded-full border transition-all flex items-center gap-2 cursor-pointer ${
                vegOnly 
                  ? 'border-[#00e676]/30 bg-[#00e676]/10 text-[#00e676]' 
                  : 'border-white/5 bg-white/3 hover:bg-white/6 text-on-surface-variant'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${vegOnly ? 'bg-[#00e676] animate-pulse' : 'bg-on-surface-variant/40'}`}></span>
              Veg Only
            </button>
            
            <button
              onClick={() => setBestSellersOnly(!bestSellersOnly)}
              className={`px-4 py-2.5 rounded-full border transition-all flex items-center gap-2 cursor-pointer ${
                bestSellersOnly 
                  ? 'border-secondary/30 bg-secondary/10 text-secondary' 
                  : 'border-white/5 bg-white/3 hover:bg-white/6 text-on-surface-variant'
              }`}
            >
              <Flame className={`w-3.5 h-3.5 ${bestSellersOnly ? 'text-secondary fill-secondary' : 'text-on-surface-variant/40'}`} />
              Best Sellers
            </button>
          </div>
        </div>

        {/* Dynamic Grid Layout */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[300px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const itemQty = getItemQty(item.id);
              
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl glass-card border border-white/5 hover:border-white/12 flex flex-col overflow-hidden relative group transition-all duration-500 shadow-xl"
                  style={{ background: 'rgba(28, 27, 27, 0.65)' }}
                >
                  {/* Card Image Container */}
                  <div className="h-56 relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1b] via-[#1c1b1b]/10 to-transparent"></div>
                    
                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      {/* Veg / Non-Veg badge */}
                      <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md border ${
                        item.isVeg 
                          ? 'bg-[#00e676]/10 text-[#00e676] border-[#00e676]/20' 
                          : 'bg-red-500/10 text-red-400 border-red-500/20'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-[#00e676]' : 'bg-red-400'}`}></span>
                        {item.isVeg ? 'VEG' : 'NON-VEG'}
                      </span>

                      {/* Best seller badge */}
                      {item.isBestSeller && (
                        <span className="bg-secondary text-on-secondary px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest flex items-center gap-1 border border-secondary/20 shadow-md">
                          <Flame className="w-2.5 h-2.5 fill-current" />
                          BEST SELLER
                        </span>
                      )}
                    </div>

                    {/* Quick rating overlay */}
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1 rounded-lg flex items-center gap-1 text-[10px] font-bold text-secondary">
                      <Star className="w-3 h-3 fill-secondary text-secondary" />
                      {item.rating}
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold group-hover:text-primary-container transition-colors duration-300 font-display">
                        {item.name}
                      </h3>
                      <p className="text-on-surface-variant text-[12px] leading-relaxed mt-2 line-clamp-2 font-light">
                        {item.description}
                      </p>
                    </div>

                    {/* Price and Add-To-Cart controls */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                      <span className="text-xl font-black text-on-surface">
                        ₹{item.price}
                      </span>

                      {itemQty === 0 ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAddOne(item)}
                          className="px-4 py-2 bg-primary-container text-on-primary-container rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-1.5 hover:opacity-95 shadow-[0_0_12px_rgba(198,243,17,0.15)] transition-all cursor-pointer border border-primary-container/20"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          ADD
                        </motion.button>
                      ) : (
                        <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-2.5 py-1.5 rounded-xl">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRemoveOne(item)}
                            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center font-bold text-sm text-on-surface transition-colors cursor-pointer"
                          >
                            -
                          </motion.button>
                          <span className="text-xs font-extrabold w-4 text-center">
                            {itemQty}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleAddOne(item)}
                            className="w-7 h-7 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                          >
                            +
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Empty filtered items state */}
          {filteredItems.length === 0 && (
            <div className="col-span-full py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/5">
                <Search className="w-6 h-6 text-on-surface-variant" />
              </div>
              <h4 className="text-lg font-bold">No Dishes Found</h4>
              <p className="text-on-surface-variant text-xs mt-1 font-light">
                Try refining your filters or search keywords.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
