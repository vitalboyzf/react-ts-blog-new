const Router = require("koa-router");
const router = new Router({ prefix: "/book" });
const config = require("../config");

router.get("/", async (ctx) => {
    ctx.body = {
        status: 200,
        message: "查询成功",
        data: [
            {
                title: "ECMAScript 6入门",
                url: config.host + "/books-link/ECMAScript 6入门.pdf",
                img: config.host + ":2000/assets/img/es6入门.png"
            },
            {
                title: "你不知道的JavaScript（上）",
                url: config.host + "/books-link/你不知道的JavaScript（上卷）.pdf",
                img: config.host + ":2000/assets/img/你不知道的js1.png"
            },
            {
                title: "你不知道的JavaScript（中）",
                url: config.host + "/books-link/你不知道的JavaScript（中卷）.pdf",
                img: config.host + ":2000/assets/img/你不知道的js2.png"
            },
            {
                title: "你不知道的JavaScript (下)",
                url: config.host + "/books-link/你不知道的JavaScript3.pdf",
                img: config.host + ":2000/assets/img/你不知道的js3.png"
            },
            {
                title: "JavaScript设计模式",
                url: config.host + "/books-link/JavaScript设计模式.pdf",
                img: config.host + ":2000/assets/img/设计模式.png"
            },
            {
                title: "JavaScript数据结构与算法",
                url: config.host + "/books-link/JavaScript数据结构与算法.pdf",
                img: config.host + ":2000/assets/img/js数据结构与算法.png"
            },
            {
                title: "图解HTTP+彩色版",
                url: config.host + "/books-link/图解HTTP+彩色版.pdf",
                img: config.host + ":2000/assets/img/图解http.png"
            },
            {
                title: "React设计模式与最佳实践",
                url: config.host + "/books-link/React设计模式与最佳实践.pdf",
                img: config.host + ":2000/assets/img/react.png"
            },
            {
                title: "JavaScript语言精粹",
                url: config.host + "/books-link/JavaScript语言精粹.pdf",
                img: config.host + ":2000/assets/img/js语言精粹.png"
            },
            {
                title: "HTML5权威指南",
                url: config.host + "/books-link/HTML5权威指南.pdf",
                img: config.host + ":2000/assets/img/HTML5权威指南.png"
            },
            {
                title: "javascript权威指南第六版",
                url: config.host + "/books-link/javascript权威指南第六版.pdf",
                img: config.host + ":2000/assets/img/javascript权威指南第六版.png"
            },
            {
                title: "高性能JavaScript-中英对照版",
                url: config.host + "/books-link/高性能JavaScript-中英对照版.pdf",
                img: config.host + ":2000/assets/img/高性能JavaScript-中英对照版.png"
            }
        ]
    };

});
module.exports = router;  