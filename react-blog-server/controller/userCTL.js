const User = require("../models/userDao");
const jwt = require("jsonwebtoken");
const { secret } = require("../models/config");
class UserCTL {
    async create(ctx) {
        ctx.verifyParams({
            // 校验请求体，必须要有name属性，属性值为string类型
            name: { type: "string", require: true },
            password: { type: "string", require: true }
        });
        const { name } = ctx.request.body;
        const repeatedUser = await User.findOne({ name });
        if (repeatedUser) ctx.throw(409, "用户名已经被占用！");
        if (name === "张斐") ctx.request.body.identity = "超级管理员";
        ctx.body = await User.create(ctx.request.body);
    }
    async whoami(ctx) {
        const user = await User.findById(ctx.state.user._id);
        // let { _id, name, avatar_url, identity, password, gender } = user;
        if (!user) {
            ctx.throw(404, "用户不存在");
        }
        ctx.body = { data: user };
    }
    async delete(ctx) {
        const user = await User.findByIdAndDelete(ctx.params.id);
        if (!user) ctx.throw(404, "删除错误");
        ctx.body = user;
    }
    async update(ctx) {
        // name,
        // identity,
        // avatar_url,
        // location,
        // introduce
        const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
        if (!user) ctx.throw(404, "更新错误");
        ctx.body = user;
    }
    async query(ctx) {
        const user = await User.find();
        if (!user) ctx.throw(404, "木有找到");
        ctx.body = user;
    }
    async findById(ctx) {
        const user = await User.findById(ctx.params.id);
        if (!user) {
            ctx.throw(404, "用户不存在");
        }
        ctx.body = user;
    }
    // 用户登录，如果存在登录用户，返回一个token令牌
    async login(ctx) {
        ctx.verifyParams({
            name: { type: "string", require: true },
            password: { type: "string", require: true }
        });
        const user = await User.findOne(ctx.request.body);
        // 如果没有这个用户，抛出401
        if (!user) {
            ctx.body = {
                status: 401, message: "用户名或密码错误"
            };
            return;
        }
        // 获取用户id和用户名用于token签名处理
        let { _id } = user;
        const token = jwt.sign({
            _id
        }, secret, {
            expiresIn: "24h"
        });
        ctx.set("authorization", "Bearer " + token);
        ctx.cookies.set("token", token, {
            signed: true,
            httpOnly: false,
            maxAge: 3600 * 1000 * 24
        });
        ctx.body = { status: 200, message: "登录成功" };
    }
}
module.exports = new UserCTL();