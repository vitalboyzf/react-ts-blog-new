const Router = require("koa-router");
const router = new Router();
const { upload } = require("../controller/uploadCTL");
router.post("/upload", upload);
module.exports = router;