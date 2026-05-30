import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Trash2, ArrowRight, ShieldCheck, ShoppingCart } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  onOpen,
  cart,
  onUpdateCart,
  onClearCart,
  onCheckout
}) {
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const gst = Math.round(subtotal * 0.05); // 5% GST for cafe
  const serviceFee = itemCount > 0 ? 15 : 0; // Rs. 15 flat service/packaging fee
  const grandTotal = subtotal + gst + serviceFee;

  const handleQtyChange = (item, diff) => {
    onUpdateCart(item, diff);
  };

  const handleRemove = (item) => {
    onUpdateCart(item, -item.quantity);
  };

  return (
    <>
      {/* Floating Cart Button Trigger (Displays if cart has items) */}
      <AnimatePresence>
        {itemCount > 0 && !isOpen && (
          <motion.button
            initial={{ scale: 0, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 100 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpen}
            className="fixed bottom-8 right-8 z-40 px-5 py-4 bg-primary-container text-on-primary-container rounded-2xl flex items-center gap-3 neon-glow-primary hover:opacity-95 transition-all shadow-2xl border border-primary-container/20 font-sans cursor-pointer group"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2.5 -right-2.5 bg-secondary text-on-secondary w-5 h-5 rounded-full font-black text-[10px] flex items-center justify-center border border-[#131313] animate-bounce">
                {itemCount}
              </span>
            </div>
            <div className="text-left leading-none">
              <p className="text-[9px] uppercase font-black tracking-widest text-on-primary-container/70">My Cart</p>
              <p className="text-xs font-black mt-0.5">₹{subtotal}</p>
            </div>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cart Side Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden font-sans">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />

            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10 md:pl-16">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-screen max-w-md bg-[#131313] border-l border-white/5 flex flex-col h-full shadow-2xl relative"
              >
                {/* Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-primary-container" />
                    <h3 className="text-lg font-bold">Your Order Cart</h3>
                    <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/5 text-on-surface-variant">
                      {itemCount} items
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {itemCount > 0 && (
                      <button
                        onClick={onClearCart}
                        className="text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors p-2 cursor-pointer"
                      >
                        Clear All
                      </button>
                    )}
                    <button
                      onClick={onClose}
                      className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Items List Content */}
                <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-thin">
                  {cart.length === 0 ? (
                    /* Empty Cart State */
                    <div className="h-full flex flex-col items-center justify-center text-center">
                      <div className="w-20 h-20 rounded-3xl bg-white/3 flex items-center justify-center mb-6 border border-white/5">
                        <ShoppingBag className="w-8 h-8 text-on-surface-variant/40" />
                      </div>
                      <h4 className="text-lg font-bold">Your Cart is Empty</h4>
                      <p className="text-on-surface-variant text-xs mt-2 max-w-xs mx-auto font-light leading-relaxed">
                        Add some delicious softy cones, mocktails, or stacked burgers to get this cozy feast started!
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onClose}
                        className="mt-6 px-6 py-3 bg-primary-container text-on-primary-container font-black uppercase text-xs tracking-widest rounded-xl hover:opacity-90 transition-all border border-primary-container/20 cursor-pointer"
                      >
                        BROWSE THE MENU
                      </motion.button>
                    </div>
                  ) : (
                    /* Active Cart Items */
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="p-4 rounded-2xl bg-[#1c1b1b]/80 border border-white/5 flex items-center gap-4 group hover:border-white/10 transition-all duration-300"
                        >
                          {/* Image */}
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-xl object-cover shrink-0"
                          />

                          {/* Details */}
                          <div className="flex-grow min-w-0">
                            <h4 className="font-bold text-sm text-on-surface truncate">
                              {item.name}
                            </h4>
                            <p className="text-xs font-black text-primary-container mt-1">
                              ₹{item.price}
                            </p>

                            {/* Qty controls */}
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-2 bg-white/3 border border-white/5 px-2 py-1 rounded-lg">
                                <button
                                  onClick={() => handleQtyChange(item, -1)}
                                  className="w-5 h-5 rounded-md hover:bg-white/5 flex items-center justify-center font-bold text-xs text-on-surface-variant hover:text-on-surface cursor-pointer"
                                >
                                  -
                                </button>
                                <span className="text-[11px] font-extrabold w-4 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleQtyChange(item, 1)}
                                  className="w-5 h-5 rounded-md hover:bg-white/5 flex items-center justify-center font-bold text-xs text-on-surface-variant hover:text-on-surface cursor-pointer"
                                >
                                  +
                                </button>
                              </div>

                              <button
                                onClick={() => handleRemove(item)}
                                className="text-on-surface-variant hover:text-red-400 p-1.5 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer calculations & checkout CTA */}
                {itemCount > 0 && (
                  <div className="p-6 border-t border-white/5 bg-[#161616] space-y-4">
                    <div className="space-y-2 text-xs text-on-surface-variant font-light">
                      <div className="flex justify-between">
                        <span>Cart Subtotal:</span>
                        <span className="font-bold text-on-surface">₹{subtotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GST/Taxes (5%):</span>
                        <span className="font-bold text-on-surface">₹{gst}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dine-In Service & Packaging:</span>
                        <span className="font-bold text-on-surface">₹{serviceFee}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm font-black text-on-surface pt-3 border-t border-white/5">
                        <span className="uppercase tracking-wider">Grand Total:</span>
                        <span className="text-primary-container text-lg font-black">₹{grandTotal}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onCheckout}
                        className="w-full py-4 bg-primary-container text-on-primary-container font-black uppercase text-xs tracking-widest rounded-xl hover:opacity-95 shadow-[0_0_15px_rgba(198,243,17,0.2)] transition-all cursor-pointer border border-primary-container/20 flex items-center justify-center gap-2"
                      >
                        Proceed to Checkout
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>

                    <div className="flex items-center justify-center gap-1.5 text-[9px] uppercase font-bold tracking-wider text-on-surface-variant/60">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#00e676]" />
                      Self-Service Contactless Dine-In
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
