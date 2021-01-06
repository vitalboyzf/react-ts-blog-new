const jwt = require("jsonwebtoken");
const { secret } = require("../models/config");

const authentication = async function (ctx, next) {
    let token = ctx.cookies.get("token", {
        signed: true
    });
    if (!token) {
        const { authorization = "" } = ctx.request.header;
        token = authorization.replace("Bearer ", "");
    }
    if (!token) {
        ctx.throw(403, "权限不足");
    }
    try {
        const user = jwt.verify(token, secret);
        ctx.state.user = user;
    } catch (error) {
        ctx.throw(401, error.message);
    }
    await next();
};
module.exports = authentication;