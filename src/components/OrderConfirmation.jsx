import { motion } from 'framer-motion';
import { ChefHat, Check, ShoppingBag, Sparkles, MapPin, Clock } from 'lucide-react';

export default function OrderConfirmation({ orderDetails, onClose }) {
  const { orderId, customerName, table, items, subtotal, total, gst, serviceFee } = orderDetails;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0c0c0c]/90 backdrop-blur-md" />

      {/* Confirmation Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-lg glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl p-8 bg-surface z-10 text-center max-h-[92vh] overflow-y-auto scrollbar-thin"
        style={{ background: 'rgba(20, 20, 20, 0.95)' }}
      >
        {/* Animated Green Checkmark Ring */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-20 h-20 rounded-full bg-[#00e676]/10 border border-[#00e676]/30 flex items-center justify-center relative shadow-[0_0_20px_rgba(0,230,118,0.2)]"
          >
            <motion.div
              initial={{ rotate: -45, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <Check className="w-10 h-10 text-[#00e676]" />
            </motion.div>

            {/* Pulsing ring */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full border border-[#00e676]/40 pointer-events-none"
            />
          </motion.div>
        </div>

        {/* Text Success Header */}
        <span className="inline-block px-3 py-1 rounded-full bg-[#00e676]/10 text-[#00e676] mb-3 font-bold text-[10px] border border-[#00e676]/20 uppercase tracking-widest">
          Payment Successful
        </span>
        <h2 className="text-2xl md:text-3xl font-black font-display text-on-surface leading-tight">
          Your Order is Placed!
        </h2>
        <p className="text-on-surface-variant text-xs mt-2 max-w-sm mx-auto font-light leading-relaxed">
          Thank you, <span className="text-primary-container font-extrabold">{customerName}</span>! Our chefs have received your order and are starting to prepare it right away.
        </p>

        {/* Order Details box */}
        <div className="mt-8 p-5 rounded-2xl bg-[#1c1b1b] border border-white/5 text-left space-y-4 shadow-inner">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div>
              <p className="text-[9px] uppercase font-black tracking-wider text-on-surface-variant">Order Reference ID</p>
              <p className="text-sm font-extrabold text-primary-container mt-0.5">{orderId}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] uppercase font-black tracking-wider text-on-surface-variant">Seat / Table</p>
              <p className="text-sm font-extrabold text-secondary mt-0.5">Table {table}</p>
            </div>
          </div>

          {/* Quick Item List */}
          <div className="space-y-2 max-h-[140px] overflow-y-auto scrollbar-thin pr-1">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs text-on-surface font-light">
                <span className="truncate max-w-[200px]">
                  {item.name} <span className="text-on-surface-variant font-bold text-[10px] ml-1">x{item.quantity}</span>
                </span>
                <span className="font-extrabold">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          {/* Time & Delivery Details */}
          <div className="pt-3 border-t border-white/5 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <Clock className="w-4 h-4 text-primary-container" />
              <div>
                <p className="text-[8px] uppercase font-extrabold tracking-wider">Est. Prep Time</p>
                <p className="text-xs font-black text-on-surface mt-0.5">15 - 20 Mins</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant">
              <ChefHat className="w-4 h-4 text-secondary" />
              <div>
                <p className="text-[8px] uppercase font-extrabold tracking-wider">Kitchen Status</p>
                <p className="text-xs font-black text-[#00e676] mt-0.5 animate-pulse">Preparing...</p>
              </div>
            </div>
          </div>

          {/* Total Breakdown Summary */}
          <div className="pt-3 border-t border-white/5 space-y-1.5 text-[10px] text-on-surface-variant font-light">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>GST & Service Charge:</span>
              <span>₹{gst + serviceFee}</span>
            </div>
            <div className="flex justify-between text-xs font-black text-on-surface pt-1.5 border-t border-white/5">
              <span className="uppercase tracking-wider">Grand Total Paid:</span>
              <span className="text-primary-container text-sm">₹{total}</span>
            </div>
          </div>
        </div>

        {/* Home Action button */}
        <div className="mt-8 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-8 py-3.5 bg-primary-container text-on-primary-container font-black uppercase text-xs tracking-widest rounded-xl hover:opacity-90 transition-all cursor-pointer border border-primary-container/20 flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            ORDER SOMETHING ELSE
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
