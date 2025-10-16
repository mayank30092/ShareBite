import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true, trim: true, lowercase: true},
    password: { type: String, required: true},
    role: { type: String, enum: ['restaurant', 'ngo','volunteer'], required: true},
    avatar:{type:String},
    location: { type: String, required:true},
},
{timestamps: true}
);

// Hash the password before saving the user model
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

//to compare password during login
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);