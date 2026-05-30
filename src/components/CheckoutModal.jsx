import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, CreditCard, Landmark, CheckCircle, ShieldAlert, Sparkles, Loader2 } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, cartTotal, qrTable, onPaymentSuccess }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    table: qrTable || ''
  });

  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'card', 'cash'
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0); // 0: Init, 1: Contacting bank, 2: Finalizing
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (qrTable) {
      setForm(prev => ({ ...prev, table: qrTable }));
    }
  }, [qrTable]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(form.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit number';
    }
    if (!form.table.trim()) newErrors.table = 'Table number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePay = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Trigger payment processing simulation
    setIsProcessing(true);
    setProcessingStep(0);

    // Simulate step 1
    setTimeout(() => {
      setProcessingStep(1);
      // Simulate step 2
      setTimeout(() => {
        setProcessingStep(2);
        // Simulate completion
        setTimeout(() => {
          setIsProcessing(false);
          onPaymentSuccess(form);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#0c0c0c]/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col max-h-[90vh] bg-surface z-10"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary-container" />
                Checkout & Pay
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Complete your details to secure your dining order.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handlePay} className="p-6 overflow-y-auto space-y-6 flex-grow scrollbar-thin">
            {/* Input details */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-extrabold tracking-wider text-primary-container">
                1. Customer Details
              </h4>
              
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-on-surface-variant mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`w-full px-4 py-3 bg-[#1c1b1b] border ${errors.name ? 'border-red-500/50' : 'border-white/5'} rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary-container transition-all`}
                />
                {errors.name && <p className="text-[10px] text-red-400 mt-1 font-bold">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-on-surface-variant mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="10-digit number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={`w-full px-4 py-3 bg-[#1c1b1b] border ${errors.phone ? 'border-red-500/50' : 'border-white/5'} rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary-container transition-all`}
                  />
                  {errors.phone && <p className="text-[10px] text-red-400 mt-1 font-bold">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-on-surface-variant mb-1.5">
                    Table Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5"
                    value={form.table}
                    onChange={(e) => setForm({ ...form, table: e.target.value })}
                    className={`w-full px-4 py-3 bg-[#1c1b1b] border ${errors.table ? 'border-red-500/50' : 'border-white/5'} rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary-container transition-all`}
                  />
                  {errors.table && <p className="text-[10px] text-red-400 mt-1 font-bold">{errors.table}</p>}
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-extrabold tracking-wider text-secondary">
                2. Choose Payment Mode
              </h4>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-primary-container bg-primary-container/10 text-primary-container shadow-md'
                      : 'border-white/5 bg-[#1c1b1b] text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <Smartphone className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">UPI / GPay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-secondary bg-secondary/10 text-secondary shadow-md'
                      : 'border-white/5 bg-[#1c1b1b] text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                    paymentMethod === 'cash'
                      ? 'border-primary-container bg-primary-container/10 text-primary-container shadow-md'
                      : 'border-white/5 bg-[#1c1b1b] text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <Landmark className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Counter Pay</span>
                </button>
              </div>

              {/* Dynamic Payment Method View */}
              <div className="p-4 rounded-2xl bg-[#131313] border border-white/5 text-xs text-on-surface-variant font-light space-y-3">
                {paymentMethod === 'upi' && (
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white p-1 rounded-lg shrink-0">
                      {/* Fake QR representation */}
                      <div className="w-full h-full bg-slate-900 flex flex-wrap gap-1 p-0.5">
                        {[...Array(64)].map((_, i) => (
                          <div key={i} className={`w-[6px] h-[6px] rounded-sm ${Math.random() > 0.5 ? 'bg-primary-container' : 'bg-transparent'}`}></div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface">Instant Scan & Pay</p>
                      <p className="text-[10px] leading-relaxed mt-1">
                        Scan the dynamic checkout QR or input VPA. Once approved, the order starts cooking instantly!
                      </p>
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Card Number (XXXX XXXX XXXX XXXX)"
                        defaultValue="4111 2222 3333 4444"
                        className="w-full px-3 py-2 bg-[#1c1b1b] border border-white/5 rounded-lg text-xs focus:outline-none focus:border-secondary"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        defaultValue="12/29"
                        className="w-full px-3 py-2 bg-[#1c1b1b] border border-white/5 rounded-lg text-xs focus:outline-none focus:border-secondary"
                      />
                      <input
                        type="password"
                        placeholder="CVV"
                        defaultValue="123"
                        className="w-full px-3 py-2 bg-[#1c1b1b] border border-white/5 rounded-lg text-xs focus:outline-none focus:border-secondary"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'cash' && (
                  <div>
                    <p className="font-bold text-on-surface flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#00e676]" />
                      Pay cash or card at counter
                    </p>
                    <p className="text-[10px] leading-relaxed mt-1">
                      Your order token will be generated instantly. Head over to the payment desk, quote your Table Number, make payment, and food will be served!
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Total breakdown */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">Amount to Pay</p>
                <p className="text-2xl font-black text-on-surface mt-0.5">₹{cartTotal}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="px-8 py-3.5 bg-primary-container text-on-primary-container font-black uppercase text-xs tracking-widest rounded-xl shadow-lg hover:opacity-90 transition-all cursor-pointer border border-primary-container/20"
              >
                PROCEED TO PAY
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Razorpay Gateway Simulator */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm bg-[#161f30] rounded-2xl border border-blue-500/20 shadow-2xl p-8 relative flex flex-col items-center text-center text-white"
          >
            {/* Razorpay-style Logo */}
            <div className="flex items-center gap-1.5 mb-8">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center font-black text-sm italic">R</div>
              <span className="font-extrabold tracking-tight text-lg text-white">
                razorpay <span className="text-blue-500 text-xs font-semibold">SECURE</span>
              </span>
            </div>

            {/* Spinner */}
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-blue-500/10 w-16 h-16"></div>
              <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
            </div>

            {/* Simulated Steps */}
            <h3 className="font-bold text-base mb-1">
              {processingStep === 0 && "Initiating Transaction..."}
              {processingStep === 1 && "Contacting Bank..."}
              {processingStep === 2 && "Authorizing Payment..."}
            </h3>
            
            <p className="text-slate-400 text-xs mt-1 max-w-[240px]">
              {processingStep === 0 && "Generating secure connection to merchant terminal..."}
              {processingStep === 1 && "Verifying your details and check balance..."}
              {processingStep === 2 && "Securing order with high-grade encryption..."}
            </p>

            {/* Footer lock */}
            <div className="mt-8 flex items-center gap-1.5 text-[9px] uppercase font-bold tracking-widest text-slate-500 bg-[#0e1420] px-3.5 py-1.5 rounded-full border border-white/5">
              <ShieldAlert className="w-3.5 h-3.5 text-blue-500" />
              128-bit Encrypted Demo Gateway
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
