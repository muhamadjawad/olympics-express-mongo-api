const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        require: true,
        trim: true,
        min: 3,
        max: 20,
    },
    lastName: {
        type: String,
        require: true,
        trim: true,
        min: 3,
        max: 20,
    },
    username: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    hash_password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    contactNumber: {
        type: String,
    },

})

userSchema.method({
    async authenticate(password) {
        return bcrypt.compare(password, this.hash_password);
    },
});

const userCollection = new mongoose.model("users", userSchema)
module.exports = { userCollection }