const { model, Schema } = require("mongoose");
const userSchema = new Schema({
    __v: {
        type: Number,
        select: false
    },
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: false
        // select: false
    },
    avatar_url: { type: String },
    identity: { type: String, default: "游侠" },
    gender: { type: String, enum: ["男", "女"], required: true, default: "男" },
    location: { type: String }
});
module.exports = model("User", userSchema);