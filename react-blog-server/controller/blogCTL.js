const Blog = require("../models/blogDao");
class BlogCTL {
    async queryAll(ctx) {
        const data = await Blog.find().sort({ publish_date: -1 });
        ctx.body = {
            status: 200,
            message: "查询成功",
            data
        };
    }
    async queryBlogByPage(ctx) {
        const page = Math.max(ctx.query.page * 1, 1) - 1;
        const limit = Math.max(ctx.query.limit * 1, 1);
        const data = await Blog.find().sort({ publish_date: -1 }).limit(limit).skip(page * limit);
        const total = await Blog.find();
        ctx.body = {
            cont: total.length,
            status: 200,
            message: "查询成功",
            data
        };
    }
    // 根据title和tags查询博客
    async queryByKey(ctx) {
        const data = await Blog.find({
            title: new RegExp(ctx.query.title),
            tags: new RegExp(ctx.query.tags)
        });
        ctx.body = {
            cont: data.length,
            status: 200,
            message: "查询成功",
            data
        };
    }
    async create(ctx) {
        ctx.verifyParams({
            // 校验请求体，必须要有name属性，属性值为string类型
            content: { type: "string", required: true },
            tags: { type: "string", required: true },
            title: { type: "string", required: true },
            // views: { type: "string", required: false },
            intro: { type: "string", required: true }
            // cover_picture: { type: "string", required: false },
            // publish_date: { type: "string", required: false },
            // update_date: { type: "string", required: false },
        });
        const { content } = ctx.request.body;
        const val = await Blog.findOne({ content });
        ctx.request.body.publish_date = Date.now();
        if (val) ctx.throw(409, "已经存在这一条博客！");
        ctx.body = await Blog.create(ctx.request.body);
    }
    async del(ctx) {
        const result = await Blog.findByIdAndDelete(ctx.params.id);
        if (!result) ctx.throw(401, "删除失败");
        ctx.body = {
            status: 200,
            message: "删除成功"
        };
    }
    async update(ctx) {
        const result = await Blog.findByIdAndUpdate(ctx.params.id, ctx.request.body);
        if (!result) ctx.throw(401, "修改失败");
        ctx.body = {
            status: 200,
            message: "修改成功",
            data: result
        };
    }
    async queryById(ctx) {
        const result = await Blog.findById(ctx.params.id);
        if (!result) ctx.throw(401, "查询失败");
        ctx.body = {
            status: 200,
            message: "查询成功",
            data: result
        };
    }

    async queryBlogByViews(ctx) {
        const data = await Blog.find().sort({ views: -1 }).limit(5);
        ctx.body = {
            status: 200,
            message: "查询成功",
            data
        };
    }
}
module.exports = new BlogCTL();