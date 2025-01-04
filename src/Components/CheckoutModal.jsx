import React from 'react';

export default function CheckoutModal({ isOpen, onClose, cartItems, cartTotal, onSubmit }) {
    const [checkoutForm, setCheckoutForm] = React.useState({
        name: '',
        address: '',
        phone: '',
        paymentMethod: 'transfer'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Format pesan WhatsApp
        const message = `*New Order Details*%0A
--------------------------------%0A
*Customer Details*%0A
Name: ${checkoutForm.name}%0A
Address: ${checkoutForm.address}%0A
Phone: ${checkoutForm.phone}%0A
Payment Method: ${checkoutForm.paymentMethod}%0A
--------------------------------%0A
*Order Items*%0A
${cartItems.map(item => 
    `- ${item.title} (${item.quantity}x) @ Rp ${item.price.toLocaleString()} = Rp ${(item.price * item.quantity).toLocaleString()}%0A`
).join('')}
--------------------------------%0A
*Total: Rp ${cartTotal.toLocaleString()}*%0A`;

        // Buka WhatsApp dengan pesan yang sudah disiapkan
        window.open(`https://wa.me/6281218443652?text=${message}`);
        
        // Reset form dan tutup modal
        setCheckoutForm({
            name: '',
            address: '',
            phone: '',
            paymentMethod: 'transfer'
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-700 p-6 rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Checkout Details</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-primary-light">Name</label>
                        <input
                            type="text"
                            value={checkoutForm.name}
                            onChange={(e) => setCheckoutForm({...checkoutForm, name: e.target.value})}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-primary-light">Address</label>
                        <textarea
                            value={checkoutForm.address}
                            onChange={(e) => setCheckoutForm({...checkoutForm, address: e.target.value})}
                            className="w-full p-2 border rounded"
                            rows="3"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-primary-light">Phone Number (WhatsApp)</label>
                        <input
                            type="tel"
                            value={checkoutForm.phone}
                            onChange={(e) => setCheckoutForm({...checkoutForm, phone: e.target.value})}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-primary-light">Payment Method</label>
                        <select
                            value={checkoutForm.paymentMethod}
                            onChange={(e) => setCheckoutForm({...checkoutForm, paymentMethod: e.target.value})}
                            className="w-full p-2 border rounded text-primary-light"
                            required
                        >
                            <option value="transfer">Bank Transfer</option>
                            <option value="cod">Cash on Delivery</option>
                            <option value="ewallet">E-Wallet</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-red-800 rounded hover:bg-red-900"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Proceed to WhatsApp
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 