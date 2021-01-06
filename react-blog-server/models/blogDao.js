const { model, Schema } = require("mongoose");
const BlogSchema = new Schema({
    __v: {
        type: Number,
        select: false
    },
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        required: true,
        default: 0
    },
    intro: {
        type: String,
        required: true
    },
    cover_picture: { type: String, required: false },
    publish_date: { type: String, required: true },
    update_date: { type: String, required: false }
});
module.exports = model("blogSchemas", BlogSchema);