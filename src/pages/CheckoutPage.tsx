import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle } from 'lucide-react';
import { shippingSchema, paymentSchema } from '../utils/validationSchemas';
import type { ShippingFormData, PaymentFormData } from '../utils/validationSchemas';
import { useCartStore } from '../store/cartStore';
import { useCreateOrder } from '../hooks/useOrders';
import Layout from '../components/layout/Layout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { toast } from 'sonner';

const PAYMENT_METHODS = ['CREDIT_CARD', 'PAYPAL', 'MOBILE_MONEY', 'CASH_ON_DELIVERY'];
const steps = ['Shipping', 'Payment', 'Review'];

const CheckoutPage = () => {
  const [step, setStep] = useState(0);
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(null);
  const { items, totalPrice, clearCart } = useCartStore();
  const createOrder = useCreateOrder();
  const navigate = useNavigate();

  const shippingForm = useForm<ShippingFormData>({ resolver: zodResolver(shippingSchema), mode: 'onChange' });
  const paymentForm = useForm<PaymentFormData>({ resolver: zodResolver(paymentSchema), mode: 'onChange' });

  const onShippingSubmit = (data: ShippingFormData) => {
    setShippingData(data);
    setStep(1);
  };

  const onPaymentSubmit = () => setStep(2);

  const onPlaceOrder = async () => {
    if (!shippingData) return;
    try {
      await createOrder.mutateAsync({
        shippingAddress: shippingData.shippingAddress,
        city: shippingData.city,
        postalCode: shippingData.postalCode,
        phone: shippingData.phone,
        paymentMethod: paymentForm.getValues('paymentMethod'),
      });
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/profile');
    } catch {
      toast.error('Failed to place order. Please try again.');
    }
  };

  return (
    <Layout>
      <h1 className="font-display text-3xl font-bold text-white mb-8">Checkout</h1>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
              i < step ? 'bg-purple-600 text-white' : i === step ? 'bg-purple-500 text-white' : 'glass text-white/30'
            }`}>
              {i < step ? <CheckCircle size={16} /> : i + 1}
            </div>
            <span className={`text-sm ${i === step ? 'text-white' : 'text-white/40'}`}>{s}</span>
            {i < steps.length - 1 && <div className="w-8 h-px bg-white/10 mx-1" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 0 && (
            <form onSubmit={shippingForm.handleSubmit(onShippingSubmit)} className="glass rounded-2xl p-6 flex flex-col gap-4">
              <h2 className="font-display text-xl text-white mb-2">Shipping Information</h2>
              <Input label="Full Name" error={shippingForm.formState.errors.fullName?.message} {...shippingForm.register('fullName')} />
              <Input label="Email" type="email" error={shippingForm.formState.errors.email?.message} {...shippingForm.register('email')} />
              <Input label="Phone (10 digits)" error={shippingForm.formState.errors.phone?.message} {...shippingForm.register('phone')} />
              <Input label="Shipping Address" error={shippingForm.formState.errors.shippingAddress?.message} {...shippingForm.register('shippingAddress')} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="City" error={shippingForm.formState.errors.city?.message} {...shippingForm.register('city')} />
                <Input label="Postal Code (optional)" error={shippingForm.formState.errors.postalCode?.message} {...shippingForm.register('postalCode')} />
              </div>
              <Button type="submit" className="mt-2">Continue to Payment</Button>
            </form>
          )}

          {step === 1 && (
            <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="glass rounded-2xl p-6 flex flex-col gap-4">
              <h2 className="font-display text-xl text-white mb-2">Payment Method</h2>
              <div className="flex flex-col gap-3">
                {PAYMENT_METHODS.map((m) => (
                  <label key={m} className={`glass rounded-xl p-4 flex items-center gap-3 cursor-pointer transition-all hover:border-purple-500/40 ${
                    paymentForm.watch('paymentMethod') === m ? 'border-purple-500/60 bg-purple-500/10' : ''
                  }`}>
                    <input type="radio" value={m} {...paymentForm.register('paymentMethod')} className="accent-purple-500" />
                    <span className="text-white/80 text-sm">{m.replace(/_/g, ' ')}</span>
                  </label>
                ))}
              </div>
              {paymentForm.formState.errors.paymentMethod && (
                <p className="text-red-400 text-xs">{paymentForm.formState.errors.paymentMethod.message}</p>
              )}
              <div className="flex gap-3 mt-2">
                <Button variant="secondary" onClick={() => setStep(0)}>Back</Button>
                <Button type="submit">Review Order</Button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="glass rounded-2xl p-6 flex flex-col gap-6">
              <h2 className="font-display text-xl text-white">Order Review</h2>
              {shippingData && (
                <div className="glass rounded-xl p-4">
                  <p className="text-white/50 text-sm mb-2">Shipping to</p>
                  <p className="text-white">{shippingData.fullName}</p>
                  <p className="text-white/70 text-sm">{shippingData.shippingAddress}, {shippingData.city}</p>
                  <p className="text-white/70 text-sm">{shippingData.phone}</p>
                </div>
              )}
              <div className="glass rounded-xl p-4">
                <p className="text-white/50 text-sm mb-2">Payment</p>
                <p className="text-white">{paymentForm.getValues('paymentMethod')?.replace(/_/g, ' ')}</p>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
                <Button isLoading={createOrder.isPending} onClick={onPlaceOrder}>Place Order</Button>
              </div>
            </div>
          )}
        </div>

        <div className="glass rounded-2xl p-6 h-fit">
          <h2 className="font-display text-lg font-semibold text-white mb-4">Cart Summary</h2>
          <div className="flex flex-col gap-2 mb-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-sm text-white/60">
                <span className="line-clamp-1 flex-1 mr-2">{product.title} ×{quantity}</span>
                <span>${(product.price * quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-3 flex justify-between font-semibold text-white">
            <span>Total</span>
            <span className="text-purple-400">${totalPrice().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;