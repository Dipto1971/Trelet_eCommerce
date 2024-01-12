import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    // Every user will have a name
    email: { type: String, required: true, unique: true },
    // Every user will have an email
    password: { type: String, required: true },
    // Every user will have a password
    isAdmin: { type: Boolean, required: true, default: false },
    // Every user will have an isAdmin property
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;