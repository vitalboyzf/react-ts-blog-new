const Router = require("koa-router");
const router = new Router({ prefix: "/user" });
const { secret } = require("../models/config");
const { create: add, delete: del, update, query, findById, login, whoami } = require("../controller/userCTL");
// 查询所有用户信息
const authentication = require("../middleware/authentication");

router.get("/whoami", authentication, whoami);
router.get("/", query);
// 根据id查询一条用户信息
router.get("/:id", findById);
// 添加用户
router.post("/", add);
// 修改用户
router.patch("/:id", authentication, update);
// 删除用户
router.delete("/:id", authentication, del);
router.post("/login", login);
module.exports = router;