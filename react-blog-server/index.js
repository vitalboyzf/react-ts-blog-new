const Koa = require("koa");
const app = new Koa();
const path = require("path");
const cors = require("@koa/cors");
const routing = require("./router/index");
const bodyParser = require("koa-body");
const error = require("koa-json-error");
const koaStatic = require("koa-static");
const koaParameter = require("koa-parameter");
app.keys = ["virtual", "zf"];
require("./models/createConnection");
// require("./models/Blog");
// require("./models/comment");
// require("./models/Message");
// require("./models/Sentences");
// require("./models/User");
app.use(koaStatic(path.join(__dirname, "./public")));
// 使用koaParameter处理校验请求体
app.use(koaParameter(app));
// 处理错误 
app.use(error({
    postFormat(e, { stack, ...rest }) {
        // 如果是生产环境，不加人stact信息
        if (process.env.NODE_ENV === "production") {
            return { ...rest };
        } else {
            return { ...rest, stack };
        }
    }
}));
// 解析请求体，放入ctx.request.body中
app.use(bodyParser({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname, "./public/upload"),
        keepExtensions: true
    }
}));
// 配置跨域
app.use(cors({
    allowHeaders: "authorization,Content-Type,Content-Length, Authorization, Accept,X-Requested-With",
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
    exposeHeaders: ["authorization"]
}));
// 注册每一个router
routing(app);
// 监听2000端口
app.listen(2000, () => {
    console.log("listen 2000...");
});