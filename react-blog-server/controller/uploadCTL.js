const path = require("path");
class UploadCTL {
    upload(ctx) {
        const file = ctx.request.files.img;
        if (!file) {
            ctx.body = "上传出错，请上传key值为img的文件(图片)";
            return;
        }
        const basename = path.basename(file.path);
        ctx.body = { url: `${ctx.origin}/upload/${basename}` };
    }
}
module.exports = new UploadCTL();