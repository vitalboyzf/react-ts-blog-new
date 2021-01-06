const { model, Schema } = require("mongoose");
const MessageSchema = new Schema({
    __v: {
        type: Number,
        select: false
    },
    content: {
        type: String,
        required: true
    },
    fatherMessage: {
        type: Schema.Types.ObjectId,
        ref: "Message"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    publish_date: {
        type: String
    }
});
module.exports = model("Message", MessageSchema);