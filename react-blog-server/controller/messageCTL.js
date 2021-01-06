const Message = require("../models/MessageDao");
class MessageCTL {
    async addMessage(ctx) {
        ctx.verifyParams({
            // 校验请求体，必须要有name属性，属性值为string类型
            content: { type: "string", required: true },
            user: { type: "string", required: true }
        });
        const { content, user, fatherMessage } = ctx.request.body;
        const result = await Message.create({ content, fatherMessage, user, publish_date: Date.now() });
        ctx.body = result;
    }
    async queryRootMessageByPage(ctx) {
        const page = Math.max(ctx.query.page * 1, 1) - 1;
        const limit = Math.max(ctx.query.limit * 1, 1);
        const data = await Message.find().sort({ publish_date: -1 }).limit(limit).skip(page * limit).populate("user");
        const total = await Message.find();
        ctx.body = {
            cont: total.length,
            status: 200,
            message: "查询成功",
            data
        };
    }
    async queryRootMessage(ctx) {
        const message = await Message.find({ fatherMessage: null }).populate("user");
        if (!message) ctx.throw(404, "木有找到");
        ctx.body = {
            status: 200,
            data: message
        };
    }
    async queryMessageByFatherId(ctx) {
        ctx.body = await Message.find({
            fatherMessage: ctx.query.fatherId
        }).populate("user");
    }
    async deleteMessageById(ctx) {
        const result = await Message.findByIdAndDelete(ctx.params.id);
        if (!result) {
            ctx.throw(401, "删除失败");
        }
        ctx.body = result;
    }

}
module.exports = new MessageCTL();