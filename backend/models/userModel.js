import bcrypt from 'bcryptjs';
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

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
    // We can now use this method in userController.js
    // Matches entered password with the password in the database
}

userSchema.pre('save', async function (next) {
    // .pre allows us to run a function before saving a user different to function 
    if (!this.isModified('password')) {
        next();
        // If password is not modified, move on to the next function
    } 
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    // Hash password
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;