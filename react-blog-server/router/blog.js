const Router = require("koa-router");
const router = new Router({ prefix: "/blog" });
const { queryAll, queryBlogByPage, queryBlogByViews, queryByKey, updateBlog, update, create, del, queryById } = require("../controller/blogCTL");
const authentication = require("../middleware/authentication");
router.get("/", queryAll);
router.get("/:id", queryById);
router.get("/order/queryBlogByPage", queryBlogByPage);
router.get("/order/queryBlogByKey", queryByKey);
router.get("/order/queryBlogByViews", queryBlogByViews);
router.put("/:id", authentication, update);
router.post("/", authentication, create);
router.delete("/:id", authentication, del);// 登录后添加 authentication
module.exports = router;