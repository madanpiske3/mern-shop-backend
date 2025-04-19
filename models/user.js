import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true   
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    idAdmin: {
        type: Boolean,
        default: false
    },
    street: {
        type: String,
        default: ''
    },
    apartment: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: 'Solapur'
    },
    zip: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: 'India'
    }
})

// id for more frontend frendly
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
})
userSchema.set('toJSON', {
    virtuals: true
})

const User = mongoose.model('User', userSchema);
export default User;