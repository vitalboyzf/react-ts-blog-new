const { model, Schema } = require("mongoose");
const SentencesSchema = new Schema({
    __v: {
        type: Number,
        select: false
    },
    content: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    img_url: {
        type: String,
        required: true
    },
    publish_date: {
        type: String,
        required: true
    }
});
module.exports = model("Sentences", SentencesSchema);