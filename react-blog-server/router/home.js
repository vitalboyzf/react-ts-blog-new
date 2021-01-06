const Router = require("koa-router");
const router = new Router();
router.post("/", (ctx) => {
    ctx.response.status = 200;
    ctx.body = "<h1>home页面</h1>";
});
module.exports = router;