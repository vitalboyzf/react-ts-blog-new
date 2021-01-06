const { model, Schema } = require("mongoose");
const CommentSchema = new Schema({
    __v: {
        type: Number,
        select: false
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "blogSchemas",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    fatherComment: {
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
module.exports = model("Comment", CommentSchema);