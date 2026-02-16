import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Clock, CheckCircle, XCircle, CreditCard, Smartphone, Wallet } from 'lucide-react';

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await api.get('/api/transactions');
            if (response.data.success) {
                setTransactions(response.data.transactions);
            }
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
            setError('Failed to load transaction history');
        } finally {
            setLoading(false);
        }
    };

    const getPaymentMethodIcon = (method) => {
        switch (method) {
            case 'UPI':
                return <Smartphone size={16} className="text-blue-600" />;
            case 'Card':
                return <CreditCard size={16} className="text-purple-600" />;
            case 'Wallet':
                return <Wallet size={16} className="text-green-600" />;
            default:
                return <CreditCard size={16} className="text-gray-600" />;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 animate-slide-up">
            <div className="flex items-center space-x-2 mb-6">
                <Clock size={24} className="text-blue-600" />
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">Transaction History</h2>
            </div>

            {error && (
                <div className="text-center text-red-600 py-4">{error}</div>
            )}

            {!error && transactions.length === 0 && (
                <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                        <Clock size={32} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500">No transactions yet</p>
                    <p className="text-sm text-gray-400 mt-1">Your payment history will appear here</p>
                </div>
            )}

            {!error && transactions.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Method</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-4 text-sm text-gray-600">
                                        {formatDate(transaction.createdAt)}
                                    </td>
                                    <td className="py-4 px-4 text-sm font-semibold text-gray-800">
                                        ₹{transaction.amount.toFixed(2)}
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center space-x-2">
                                            {getPaymentMethodIcon(transaction.paymentMethod)}
                                            <span className="text-sm text-gray-700">{transaction.paymentMethod}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        {transaction.status === 'success' ? (
                                            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                                <CheckCircle size={14} />
                                                <span>Success</span>
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                                                <XCircle size={14} />
                                                <span>Failed</span>
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-4 px-4 text-xs text-gray-500 font-mono">
                                        {transaction.razorpay_payment_id.substring(0, 20)}...
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TransactionHistory;
