const Comment = require("../models/commentDao");
class CommentCTL {
    async addComment(ctx) {
        ctx.verifyParams({
            // 校验请求体，必须要有name属性，属性值为string类型
            content: { type: "string", required: true },
            user: { type: "string", required: true },
            blogId: { type: "string", required: true }
        });
        const { content, user, blogId, fatherComment } = ctx.request.body;
        const result = await Comment.create({ content, blogId, fatherComment, user, publish_date: Date.now() });
        ctx.body = result;
    }
    async queryRootComment(ctx) {
        const comments = await Comment.find({ fatherComment: null, blogId: ctx.query.blogId }).populate("user");
        if (!comments) ctx.throw(404, "木有找到");
        ctx.body = {
            status: 200,
            data: comments
        };
    }
    async queryAllComment(ctx) {
        const comments = await Comment.find({ fatherComment: null }).populate("user blogId");
        if (!comments) ctx.throw(404, "木有找到");
        ctx.body = {
            status: 200,
            data: comments
        };
    }
    async queryCommentByFatherId(ctx) {
        ctx.body = await Comment.find({
            fatherComment: ctx.query.fatherId
        }).populate("user");

    }
    async deleteCommentById(ctx) {
        const result = await Comment.findByIdAndDelete(ctx.params.id);
        if (!result) {
            ctx.throw(401, "删除失败");
        }
        ctx.body = result;
    }

}
module.exports = new CommentCTL();