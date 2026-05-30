import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './App.css'

// Import New Digital Ordering Components
import QRExplainer from './components/QRExplainer'
import MenuSection from './components/MenuSection'
import CartDrawer from './components/CartDrawer'
import CheckoutModal from './components/CheckoutModal'
import OrderConfirmation from './components/OrderConfirmation'

function App() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 500], [1, 0.5])

  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // ----------------------------------------------------
  // DIGITAL ORDERING STATES
  // ----------------------------------------------------
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('lips_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);
  const [qrTable, setQrTable] = useState(null);

  // Sync Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem('lips_cart', JSON.stringify(cart));
  }, [cart]);

  // QR Dine-In Concept: Scan QR -> Table Detected from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tableParam = params.get('table');
    if (tableParam) {
      setQrTable(tableParam);
    } else {
      // Also check hash parameters e.g. #table-5
      const hash = window.location.hash;
      const hashMatch = hash.match(/#table[=-]?(\d+)/i);
      if (hashMatch) {
        setQrTable(hashMatch[1]);
      }
    }
  }, []);

  // Update Cart logic
  const handleUpdateCart = (item, change) => {
    setCart(prev => {
      const idx = prev.findIndex(ci => ci.id === item.id);
      if (idx > -1) {
        const newCart = [...prev];
        const newQty = newCart[idx].quantity + change;
        if (newQty <= 0) {
          newCart.splice(idx, 1);
        } else {
          newCart[idx] = { ...newCart[idx], quantity: newQty };
        }
        return newCart;
      } else if (change > 0) {
        return [...prev, {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: change
        }];
      }
      return prev;
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handlePaymentSuccess = (customerDetails) => {
    const orderId = `#LIPS-${Math.floor(1000 + Math.random() * 9000)}`;
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const gst = Math.round(subtotal * 0.05);
    const serviceFee = 15;
    const total = subtotal + gst + serviceFee;

    setActiveOrder({
      orderId,
      customerName: customerDetails.name,
      phone: customerDetails.phone,
      table: customerDetails.table,
      items: [...cart],
      subtotal,
      gst,
      serviceFee,
      total
    });

    setCart([]);
    setIsCheckoutOpen(false);
  };

  // ----------------------------------------------------
  // ORIGINAL DATA
  // ----------------------------------------------------
  const testimonials = [
    {
      name: "Arun Kumar",
      handle: "@arun_guide",
      text: "The softy here is literally the best in Chennai. The vibe is so chill, it's my go-to spot after work. 🍦✨",
      avatar: "AK"
    },
    {
      name: "Priya S.",
      handle: "@priya_eats",
      text: "Lips Cafe has this incredible neon aesthetic. It's not just about the food, the greeting is always so warm! 🖤🍔",
      avatar: "PS"
    },
    {
      name: "Santhosh R.",
      handle: "@santhosh_foodie",
      text: "The burgers are huge and juicy! Perfect late-night hangout spot with friends.",
      avatar: "SR"
    }
  ]


  return (
    <div className="bg-[#131313] text-[#e5e2e1] overflow-hidden font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-effect backdrop-blur-xl bg-[#131313]/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-extrabold tracking-tight text-primary-container"
          >
            Lips Cafe
          </motion.div>
          <div className="hidden md:flex gap-8">
            {['Menu', 'Reviews', 'Directions'].map((item) => (
              <motion.a
                key={item}
                href={item === 'Menu' ? '#digital-menu' : `#${item.toLowerCase()}`}
                whileHover={{ color: '#c6f311' }}
                className="text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const el = document.getElementById('digital-menu');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-2 bg-primary-container text-on-primary-container font-bold text-xs uppercase tracking-wider rounded-lg neon-glow-primary transition-all cursor-pointer"
          >
            ORDER NOW
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[85vh] flex items-center px-6 md:px-16 overflow-hidden pt-20">
        {/* Parallax Background Image */}
        <motion.div 
          style={{ y: y1, opacity }}
          className="absolute inset-0 z-0"
        >
          <img 
            alt="Cafe Interior" 
            className="w-full h-full object-cover opacity-50" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCngnwecmlJhHnMQZmz3isj7Lal3_AthaA0ZZT3mYW488VZH17bRijXBNI0CqDL2OC_ABRnRVovJuEZOYvCbwsvCSzxDepfoCN-i4uI3QHoZOg2lAXw_wfHRIU8eJvJ2ZuZrdJAgZ2KcOgyXTBRu6WL1XDtgovWbChYuHPeDycwHFAf357Mck5-Ng3fbSWTrgkfqZmUgAVevBodiAdRptN2p6ezH6DP5rR6WtNCrPbM2V2VpskU7gSq1skvnpZW-Tp2-s9wGvWf3xQ"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#131313] via-[#131313]/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent"></div>
        </motion.div>
        
        {/* Ambient Neon Glow Blobs */}
        <div className="absolute top-24 left-10 w-96 h-96 bg-primary-container/10 rounded-full filter blur-3xl opacity-30 animate-blob pointer-events-none"></div>
        <div className="absolute bottom-24 right-10 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000 pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-block"
          >
            <span className="px-4 py-1.5 rounded-full bg-secondary/10 text-secondary mb-6 font-bold text-[12px] border border-secondary/20 uppercase tracking-wider">
              ✨ Cozy Little Hideout
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl font-black mb-6 leading-tight"
          >
            Your Cozy Little <span className="text-primary-container">Hideout</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-on-surface-variant mb-10 max-w-xl font-light"
          >
            Escape the rush. Experience great food, pleasant vibes, and hospitality that feels like home. Tondiarpet's favorite spot for late-night cravings.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              onClick={() => {
                const el = document.getElementById('digital-menu');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-container text-on-primary-container px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 neon-glow-primary hover:opacity-90 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">restaurant_menu</span>
              EXPLORE MENU
            </motion.button>
            <motion.a
              href="#directions"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-card text-[#e5e2e1] px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white/10 transition-all cursor-pointer border border-white/10"
            >
              <span className="material-symbols-outlined text-[18px]">directions</span>
              GET DIRECTIONS
            </motion.a>
          </motion.div>
        </div>

        {/* Floating Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 hidden md:block"
        >
          <div className="text-primary-container text-center">
            <span className="material-symbols-outlined text-3xl">keyboard_double_arrow_down</span>
          </div>
        </motion.div>
      </section>


      {/* Menu Grid Section */}
      <section id="menu" className="py-20 bg-[#1c1b1b]">
        <div className="px-6 max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-3xl font-extrabold mb-12"
          >
            Our <span className="text-primary-container">Signatures</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* The Sweet Spot (7 Cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              className="md:col-span-7 group relative overflow-hidden rounded-3xl h-[500px] border border-white/5"
            >
              <img 
                alt="Ice Cream Menu" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5z6wf7O6YRL3R7ejxzQxb69UJxEQcPk1PFjvUxHWTcSRVy2cXg-g1vMIMirN4S-RnXOWy4UMEgi1PlXR2te34EAjHkNP4sJTzHoWnfs2UxLN0D4A6Ck_8nuTISzRKBH8D8veZFGanoApWoWudfLq-sOeYmJwknnhlvUfK8UztrHyp1BplsiBnSs7SoH4F9oEUF6SpMxjGa_jedFl07V_yjoEkaIIE-Vhy7HOg0MMN8x3S6rTRrDn802_AO0qGGsPB2fgwEu7NNgQ"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-10">
                <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full font-bold text-[10px] mb-4 inline-block tracking-wider">
                  BEST SELLER
                </span>
                <h3 className="text-2xl font-bold mb-2">The Sweet Spot</h3>
                <p className="text-[#c4c9ad] text-sm mb-6 max-w-sm">
                  Legendary Softy cones and craft ice creams that define our late-night experience.
                </p>
                <button 
                  onClick={() => {
                    const el = document.getElementById('digital-menu');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="font-bold text-xs uppercase tracking-wider text-primary-container flex items-center gap-2 group/btn cursor-pointer"
                >
                  VIEW SWEETS 
                  <span className="material-symbols-outlined transition-transform group-hover/btn:translate-x-2">arrow_forward</span>
                </button>
              </div>
            </motion.div>

            {/* The Crunch Corner (5 Cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              className="md:col-span-5 group relative overflow-hidden rounded-3xl h-[500px] border border-white/5"
            >
              <img 
                alt="Fried Chicken and Drink" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDm2dCCo96GaZjAND7-5ez0oJI4aFCfkVItxZWz-8m4hWQIWXFrNn8tt7c42-sqWcqb_UqiXH3Q9kDpPTH4KrecWH-aY1sE-38ukZ3-8Y1QFBUBzxGe0Wy_wTEX2n4SPaTff5QxdbFWn2HzqGwEXrWo396fQtvcLWJossziWp7qZqqDqVTCArkP1W7XXsMHWTBGn5JxhTjoAf5tBhEzTDeVCNn9hkeuJxQLouhhXR6j1MpCImcSk1z39m0yxNURst2RxrqXa7xbjFA"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-10">
                <h3 className="text-2xl font-bold mb-2">The Crunch Corner</h3>
                <p className="text-[#c4c9ad] text-sm mb-6">
                  The ultimate crunch: French Fries and signature Fried Chicken.
                </p>
                <button 
                  onClick={() => {
                    const el = document.getElementById('digital-menu');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="font-bold text-xs uppercase tracking-wider text-secondary flex items-center gap-2 group/btn cursor-pointer"
                >
                  VIEW SIDES 
                  <span className="material-symbols-outlined transition-transform group-hover/btn:translate-x-2">arrow_forward</span>
                </button>
              </div>
            </motion.div>

            {/* The Main Bites (12 Cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              className="md:col-span-12 group relative overflow-hidden rounded-3xl h-[400px] border border-white/5"
            >
              <img 
                alt="Gourmet Burger" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtNMrb-y1oomBZDokSQprmB4zi71Aq444wJ2fk3L5LkP6Zgl54GC_LN829ASBhr25vzwrkgJmMhHcxqbAWIAqsfpkLDa4DI4w1mj5qben7I5V1OVrRhlJbv4Xh_K72TrNruhqoXkRYIz0LVish8yhtlzZaGRGNiFBIKDEPttwkfZYuEZSB7sml65kqHuGKvndRSnpZXbzOcXGbfpFmk4W2KbDBXk1Dp-hvuk1G1x_Mxhp6yMpLYW-zySGM31qnxe1cabNgjNO4bzw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#131313] via-[#131313]/40 to-transparent"></div>
              <div className="absolute inset-y-0 left-0 p-10 flex flex-col justify-center max-w-md">
                <h3 className="text-2xl font-bold mb-2">The Main Bites</h3>
                <p className="text-[#c4c9ad] text-sm mb-6">
                  Stacked high and full of flavor. Our burgers are the talk of Tondiarpet.
                </p>
                <button 
                  onClick={() => {
                    const el = document.getElementById('digital-menu');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-primary-container w-fit text-on-primary-container px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider neon-glow-primary hover:scale-105 transition-all cursor-pointer active:scale-95"
                >
                  EXPLORE BURGERS
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          NEW DIGITAL ORDERING SECTIONS (QR & Menu Catalog)
         ---------------------------------------------------- */}
      <QRExplainer qrTable={qrTable} />
      
      <MenuSection cart={cart} onUpdateCart={handleUpdateCart} />

      {/* Reviews Section */}
      <section id="reviews" className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl font-extrabold text-center mb-16"
        >
          Love from the <span className="text-secondary">Locals</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-8 rounded-2xl flex flex-col h-full border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="flex gap-1 text-secondary mb-6">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="text-base italic mb-8 flex-grow text-gray-200">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#20201f] flex items-center justify-center font-bold text-secondary">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-sm text-[#e5e2e1]">{t.name}</div>
                  <div className="text-[10px] uppercase tracking-wider text-[#c4c9ad]">{t.handle}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Visit Us & Directions Section */}
      <section id="directions" className="py-20 bg-[#1c1b1b] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            
            {/* Hours and Description */}
            <div className="space-y-6">
              <div className="text-2xl font-extrabold text-primary-container">Lips Cafe</div>
              <p className="text-sm text-[#c4c9ad] leading-relaxed">
                Providing a cozy hideout and gourmet street food to the heart of Tondiarpet since 2021.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-[#e5e2e1] hover:text-primary-container border border-white/10 transition-colors">
                  <span className="material-symbols-outlined">social_leaderboard</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-[#e5e2e1] hover:text-secondary border border-white/10 transition-colors">
                  <span className="material-symbols-outlined">photo_camera</span>
                </a>
              </div>
            </div>

            {/* Location & Hours */}
            <div className="space-y-6">
              <h4 className="font-bold text-xs text-primary-container uppercase tracking-[0.2em]">Visit Us</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-[#c4c9ad]">
                  <span className="material-symbols-outlined text-primary-container">location_on</span>
                  <span className="text-sm">
                    625, Thiruvottiyur High Rd,<br />Tondiarpet, Chennai, 600081
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[#c4c9ad]">
                  <span className="material-symbols-outlined text-secondary">schedule</span>
                  <span className="text-sm">11:30 AM - Late Night</span>
                </div>
              </div>
            </div>

            {/* Storefront Map Callout */}
            <div className="relative h-56 rounded-2xl overflow-hidden glass-card border border-white/5 group">
              <img 
                alt="Storefront" 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmMW53hZEAJ7BsCprAAA9j5gkHFbzw-TQoRaY3TxtiP1GlxPDehqk5WSt2yOpd4AF3L0UBDrOqqUvaBJ80Leom7ll2sjhob-3j53i_PTgFvAIG_TQTshhYHauYitPS-5710K9Wmknz5Cc0oIXK0M3UeeJBE_lDfTJTZtvJNQG0Tw0RL_CDqhOmy8qGluSLa-rd5WcVAOru8g9dvmSTa-7k4xlXsnEo_f15CCsdoWbQDdI6a2J244xKWQGz8cVKx2HR2gUY2lcopXo"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.a 
                  href="https://maps.google.com/?q=Lips+Cafe+Tondiarpet"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#20201f]/90 backdrop-blur-md text-[#e5e2e1] px-6 py-3 rounded-lg font-bold text-xs flex items-center gap-2 border border-white/10 hover:border-white/20 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">map</span>
                  OPEN IN MAPS
                </motion.a>
              </div>
            </div>

          </div>

          {/* Footer Copyright */}
          <div className="border-t border-white/5 py-8 text-center mt-16">
            <p className="text-xs text-[#c4c9ad]">© 2024 Lips Cafe. Crafted for Comfort.</p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          DIGITAL ORDERING OVERLAYS & CONTROLS
         ---------------------------------------------------- */}
      
      {/* Persistent Floating Cart FAB and Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOpen={() => setIsCartOpen(true)}
        cart={cart}
        onUpdateCart={handleUpdateCart}
        onClearCart={handleClearCart}
        onCheckout={handleCheckoutClick}
      />

      {/* Checkout Modal with Simulated razorpay pay gateway */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartTotal={
          cart.reduce((tot, it) => tot + it.price * it.quantity, 0) +
          Math.round(cart.reduce((tot, it) => tot + it.price * it.quantity, 0) * 0.05) +
          (cart.length > 0 ? 15 : 0)
        }
        qrTable={qrTable}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Premium Order Confirmation Screen Overlay */}
      {activeOrder && (
        <OrderConfirmation
          orderDetails={activeOrder}
          onClose={() => setActiveOrder(null)}
        />
      )}
    </div>
  )
}

export default App