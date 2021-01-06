const Router = require("koa-router");
const router = new Router({ prefix: "/sentences" });
const authentication = require("../middleware/authentication");
const { add, delete: del, update, query } = require("../controller/sentenceCTL");
router.post("/", authentication, add);
router.get("/", query);
router.put("/:id", update);
router.delete("/:id", authentication, del);
module.exports = router;  