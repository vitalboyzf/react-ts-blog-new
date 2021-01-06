const mongoose = require("mongoose");
const { connectionStr } = require("./config");
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("数据库连接成功！");
});
mongoose.connection.on("error", (err) => {
    console.log("err", err);
});
