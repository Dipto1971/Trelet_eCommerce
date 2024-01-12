import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        // Every order will be associated with a user
        // This will be used to determine which user created which order
        required: true,
        ref: 'User',
    },
    orderItems: [{
        name: { type: String, required: true },
        // Every order item will have a name
        qty: { type: Number, required: true },
        // Every order item will have a quantity
        image: { type: String, required: true },
        // Every order item will have an image
        price: { type: Number, required: true },
        // Every order item will have a price
        product: {
            type: mongoose.Schema.Types.ObjectId,
            // Every order item will be associated with a product
            // This will be used to determine which product was ordered
            required: true,
            ref: 'Product',
        },
    }, ],
    shippingAddress: {
        address: { type: String, required: true },
        // Every shipping address will have an address
        city: { type: String, required: true },
        // Every shipping address will have a city
        postalCode: { type: String, required: true },
        // Every shipping address will have a postal code
        country: { type: String, required: true },
        // Every shipping address will have a country
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentResult: {
        id: String,
        // Every payment result will have an id
        status: String,
        // Every payment result will have a status
        update_time: String,
        // Every payment result will have an update time
        email_address: String,
        // Every payment result will have an email address
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    }, 
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;