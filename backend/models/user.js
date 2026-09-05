import mongoose from 'mongoose'
import { createHmac, randomBytes } from "crypto";
import { generateUserToken } from '../services/authentication.js';



const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
    },
    profileImageURL: {
      type: String,
      default: "/images/default.png",
    },
    role: {
        type: String,
        enum: ["USER", "SELLER"],
        default: "USER"
    }
}, {timestamps: true});

UserSchema.pre('save', function() {
    const user = this;
    // if the user password hasn't been changed, i.e when reading from a db
    if (!user.isModified("password")) return;
    // random salt bytes
    const salt = randomBytes(16).toString('hex');
    // hash the password
    const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest('hex');

    this.salt = salt;
    this.password = hashedPassword;
});

UserSchema.static('generateAndReturnToken', async function(email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error(`User with email ${email} not found`);

    const salt = user.salt;
    const hashedPassword = user.password;

    // now match with the provided password
    const providedPasswordHash = createHmac('sha256', salt)
    .update(password)
    .digest('hex'); // returns the password as a hex string

    if (providedPasswordHash != hashedPassword) 
        throw new Error("Incorrect password");

    const token = generateUserToken(user);
    return token; // token goes to the function caller, i.e the signin route
});

export const User = mongoose.model("user", UserSchema);