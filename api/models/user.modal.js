import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            default: "https://static.vecteezy.com/system/resources/previews/003/429/299/non_2x/male-silhouette-neon-light-icon-gentlemen-wc-door-glowing-sign-vector.jpg"
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;