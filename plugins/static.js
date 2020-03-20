const serve = require("koa-static");
const mount = require("koa-mount");
const path = require("path");

module.exports = mount("/static", serve(path.join(__dirname, "/../static")));
