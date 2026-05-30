import { motion } from 'framer-motion';
import { QrCode, ClipboardList, Sparkles, ChefHat } from 'lucide-react';

export default function QRExplainer({ qrTable }) {
  const steps = [
    {
      icon: <QrCode className="w-8 h-8 text-primary-container" />,
      title: "1. Scan QR Code",
      desc: "Each table features a unique QR code. Simply scan it with your phone camera to open our interactive digital menu instantly."
    },
    {
      icon: <ClipboardList className="w-8 h-8 text-secondary" />,
      title: "2. Order & Customize",
      desc: "Select your favorite comfort food, customize quantities, and place your order directly. No lines, no wait."
    },
    {
      icon: <ChefHat className="w-8 h-8 text-primary-container" />,
      title: "3. Direct Delivery",
      desc: "Our chefs prepare your order fresh. We deliver it directly to your table number in minutes. Sit back and relax!"
    }
  ];

  return (
    <div className="w-full">
      {/* Table Welcome Banner */}
      {qrTable && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 left-0 right-0 z-40 px-4 md:px-6"
        >
          <div className="max-w-3xl mx-auto glass-card border border-primary-container/20 rounded-2xl p-4 flex items-center justify-between shadow-2xl bg-surface/90 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-container/10 flex items-center justify-center animate-pulse">
                <Sparkles className="w-5 h-5 text-primary-container" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-on-surface">QR Dine-in Active</h4>
                <p className="text-xs text-on-surface-variant">
                  Welcome to <span className="text-primary-container font-extrabold text-sm">Table {qrTable}</span>. Your order will be served directly to you!
                </p>
              </div>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-primary-container text-on-primary-container">
              Table Detected
            </span>
          </div>
        </motion.div>
      )}

      {/* Explainer Grid */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-container/10 text-primary-container mb-4 font-bold text-[12px] border border-primary-container/20 uppercase tracking-widest">
            Scan & Dine
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            How Our <span className="text-primary-container">QR Dine-In</span> Works
          </h2>
          <p className="text-on-surface-variant text-sm max-w-xl mx-auto font-light leading-relaxed">
            Experience frictionless, contactless dining at Lips Cafe. Order from your seat and let us take care of the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="p-8 rounded-2xl glass-card border border-white/5 flex flex-col items-center text-center group hover:border-white/10 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold mb-3">{step.title}</h3>
              <p className="text-on-surface-variant text-xs leading-relaxed font-light">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
