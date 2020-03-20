const Koa = require("koa");
const views = require("./plugins/views");
const router = require("./plugins/router");
const static = require("./plugins/static");

const app = new Koa();

app.use(views);
app.use(router.routes());
app.use(static);
app.use(async function pageNotFound(ctx) {
  // We need to explicitly set 404 here so that koa doesn't assign 200 on body
  ctx.status = 404;
  // Redirect to 404 page
  ctx.redirect("/not-found");
});

app.listen(3000);
