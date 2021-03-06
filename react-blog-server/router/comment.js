const Router = require("koa-router");
const router = new Router({ prefix: "/comment" });
const { addComment, queryRootComment, queryAllComment, deleteCommentById, queryCommentByFatherId } = require("../controller/commentCTL");
const authentication = require("../middleware/authentication");
router.post("/", addComment);
router.get("/", queryAllComment);
router.get("/queryRootComment", queryRootComment);
router.delete("/:id",authentication, deleteCommentById);
router.get("/queryByFather", queryCommentByFatherId);
module.exports = router;  