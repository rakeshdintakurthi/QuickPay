import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import TransactionHistory from '../components/TransactionHistory';
import { CreditCard, Smartphone, Wallet, CheckCircle, AlertCircle } from 'lucide-react';

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

const Payment = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('UPI');
    const [amount, setAmount] = useState('');
    const [upiId, setUpiId] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [refreshHistory, setRefreshHistory] = useState(0);

    const paymentMethods = [
        { id: 'UPI', name: 'UPI', icon: Smartphone },
        { id: 'Card', name: 'Card', icon: CreditCard },
        { id: 'Wallet', name: 'Wallet', icon: Wallet },
    ];

    const handlePayment = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        // Validation
        if (!amount || amount <= 0) {
            setMessage({ type: 'error', text: 'Please enter a valid amount' });
            return;
        }

        if (activeTab === 'UPI' && !upiId.trim()) {
            setMessage({ type: 'error', text: 'Please enter UPI ID' });
            return;
        }

        setLoading(true);

        try {
            // Step 1: Create order
            const orderResponse = await api.post('/create-order', {
                amount: parseFloat(amount)
            });

            if (!orderResponse.data.success) {
                throw new Error(orderResponse.data.message || 'Failed to create order');
            }

            // Step 2: Configure Razorpay options
            const options = {
                key: RAZORPAY_KEY_ID,
                amount: orderResponse.data.order.amount,
                currency: orderResponse.data.order.currency,
                name: 'QuickPay',
                description: `Payment via ${activeTab}`,
                order_id: orderResponse.data.order.id,
                prefill: {
                    name: user.name,
                    email: user.email,
                },
                theme: {
                    color: '#00BAF2'
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                        setMessage({ type: 'error', text: 'Payment cancelled' });
                    }
                },
                handler: async function (response) {
                    await verifyPayment(response);
                }
            };

            // Add payment method specific options
            if (activeTab === 'UPI') {
                options.method = 'upi';
                options.prefill.vpa = upiId;
            } else if (activeTab === 'Card') {
                options.method = 'card';
            } else if (activeTab === 'Wallet') {
                options.method = 'wallet';
            }

            // Step 3: Open Razorpay checkout
            const razorpay = new window.Razorpay(options);
            razorpay.open();

        } catch (error) {
            console.error('Payment Error:', error);
            setMessage({
                type: 'error',
                text: error.response?.data?.message || error.message || 'Payment failed'
            });
            setLoading(false);
        }
    };

    const verifyPayment = async (paymentData) => {
        try {
            const verifyResponse = await api.post('/verify-payment', {
                razorpay_order_id: paymentData.razorpay_order_id,
                razorpay_payment_id: paymentData.razorpay_payment_id,
                razorpay_signature: paymentData.razorpay_signature,
                amount: parseFloat(amount),
                paymentMethod: activeTab,
                upiId: activeTab === 'UPI' ? upiId : undefined
            });

            if (verifyResponse.data.success) {
                setMessage({
                    type: 'success',
                    text: `✓ Payment successful! Transaction ID: ${verifyResponse.data.transactionId}`
                });
                // Reset form
                setAmount('');
                setUpiId('');
                // Refresh transaction history
                setRefreshHistory(prev => prev + 1);
            } else {
                setMessage({
                    type: 'error',
                    text: verifyResponse.data.message || 'Payment verification failed'
                });
            }
        } catch (error) {
            console.error('Verification Error:', error);
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Payment verification failed'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* Payment Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 animate-slide-up">
                    <div className="mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Make a Payment</h1>
                        <p className="text-gray-600 mt-1">Fast, secure, and easy transactions</p>
                    </div>

                    {/* Success/Error Messages */}
                    {message.text && (
                        <div className={`mb-6 p-4 rounded-lg flex items-start space-x-3 ${message.type === 'success'
                                ? 'bg-green-50 border border-green-200 text-green-700'
                                : 'bg-red-50 border border-red-200 text-red-700'
                            }`}>
                            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                            <span className="text-sm flex-1">{message.text}</span>
                        </div>
                    )}

                    {/* Payment Method Tabs */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Select Payment Method
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {paymentMethods.map((method) => {
                                const Icon = method.icon;
                                return (
                                    <button
                                        key={method.id}
                                        onClick={() => setActiveTab(method.id)}
                                        className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${activeTab === method.id
                                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                : 'border-gray-200 bg-white text-gray-600 hover:border-blue-300'
                                            }`}
                                    >
                                        <Icon size={24} className="mb-2" />
                                        <span className="text-sm font-medium">{method.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Payment Form */}
                    <form onSubmit={handlePayment} className="space-y-5">
                        {/* UPI ID Input (only for UPI) */}
                        {activeTab === 'UPI' && (
                            <div className="animate-fade-in">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    UPI ID
                                </label>
                                <input
                                    type="text"
                                    value={upiId}
                                    onChange={(e) => setUpiId(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="yourname@paytm"
                                    disabled={loading}
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    For testing, use: success@razorpay
                                </p>
                            </div>
                        )}

                        {/* Amount Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Amount (₹)
                            </label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                                placeholder="0.00"
                                min="1"
                                step="0.01"
                                disabled={loading}
                                required
                            />
                        </div>

                        {/* Card Note (only for Card) */}
                        {activeTab === 'Card' && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700 animate-fade-in">
                                <p className="flex items-start space-x-2">
                                    <span>ℹ️</span>
                                    <span>
                                        Card details will be entered securely via Razorpay.
                                        Test card: <strong>4111 1111 1111 1111</strong>
                                    </span>
                                </p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span>Processing...</span>
                                </div>
                            ) : (
                                `Pay ₹${amount || '0.00'} with ${activeTab}`
                            )}
                        </button>
                    </form>

                    {/* Security Badge */}
                    <div className="mt-6 flex items-center justify-center space-x-2 text-gray-500 text-sm">
                        <span>🔒</span>
                        <span>Secure payments powered by Razorpay</span>
                    </div>
                </div>

                {/* Transaction History */}
                <TransactionHistory key={refreshHistory} />
            </main>
        </div>
    );
};

export default Payment;
