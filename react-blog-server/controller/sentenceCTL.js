const Sentences = require("../models/SentencesDao");
class SentencesCTL {
    async add(ctx) {
        console.log("add", Sentences.find());
        ctx.verifyParams({
            // 校验请求体，必须要有name属性，属性值为string类型
            content: { type: "string", required: true },
            img_url: { type: "string", required: true }
        });
        const { content, img_url } = ctx.request.body;
        const val = await Sentences.findOne({ content });
        if (val) ctx.throw(409, "已经存在这一条内容！");
        const sentences = await Sentences.create({ content, img_url, publish_date: Date.now() });
        ctx.body = sentences;
    }
    async query(ctx) {
        const sentences = await Sentences.find().sort({ publish_date: -1 });
        if (!sentences) ctx.throw(404, "木有找到");
        ctx.body = {
            status: 200,
            data: sentences
        };
    }
    async update(ctx) {
        const result = await Sentences.findByIdAndUpdate(ctx.params.id, ctx.request.body);
        if (!result) ctx.throw(401, "修改失败");
        ctx.body = {
            status: 200,
            message: "修改成功",
            data: result
        };
    }
    async delete(ctx) {
        const result = await Sentences.findByIdAndDelete(ctx.params.id);
        if (!result) ctx.throw(401, "删除失败");
        ctx.body = {
            status: 200,
            message: "删除成功"
        };
    }
}
module.exports = new SentencesCTL();