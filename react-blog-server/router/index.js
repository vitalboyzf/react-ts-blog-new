const fs = require("fs");
const files = fs.readdirSync(__dirname);

function useRoutes(app) {
    files.forEach(file => {
        if (file === "index.js") return;
        const route = require(`./${file}`);
        app.use(route.routes()).use(route.allowedMethods());
    });
}
module.exports = useRoutes;