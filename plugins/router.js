const router = require("koa-router")();
const userGenerator = require("../lib/userGenerator");
const definedProfiles = require("../json/defined.json");

router
  .get("/", index)
  .get("/not-found", notFound)
  .get("/profiles", profiles)
  .get("/find", find);

async function index(ctx) {
  await ctx.render("index");
}

async function notFound(ctx) {
  await ctx.render("not-found");
}

async function profiles(ctx) {
  const { type = "random", amount = 1 } = ctx.query;
  const authorizedTypes = ["random", "defined"];
  const errors = {};

  if (!authorizedTypes.includes(type)) {
    errors.type = "Invalid type, please use 'random' or 'defined'";
  }

  if (amount <= 0 || amount > 100) {
    errors.amount = "Invalid amount, please set a value between 1 and 100";
  }

  if (Object.keys(errors).length !== 0) {
    ctx.status = 400;
    ctx.body = { status: ctx.status, params: ctx.query, errors };
    return;
  }

  if (type === "random") {
    const profiles = [];

    for (i = 0; i < amount; i++) {
      profiles.push(userGenerator());
    }

    ctx.status = 200;
    ctx.body = { status: ctx.status, params: ctx.query, profiles };
    return;
  }

  const profiles = [];

  for (p = 0; p < amount; p++) {
    profiles.push(definedProfiles[p]);
  }

  ctx.status = 200;
  ctx.body = { status: ctx.status, params: ctx.query, profiles };
  return;
}

async function find(ctx) {
  const { by, value } = ctx.query;
  const authorizedParams = ["id", "username", "slug", "email"];
  let errors = {};

  if (!authorizedParams.includes(by)) {
    errors.by = "Please provide a valid value";
  }

  if (!by) {
    errors.by = "Please provide a value";
  }

  if (!value) {
    errors.value = "Please provide a value";
  }

  if (Object.keys(errors).length !== 0) {
    ctx.status = 400;
    ctx.body = { status: ctx.status, params: ctx.query, errors };
    return;
  }

  const profile = definedProfiles.find(item => item[by] === value);

  if (!profile) {
    ctx.status = 400;
    ctx.body = {
      status: ctx.status,
      params: ctx.query,
      errors: {
        profile: "No profile found"
      }
    };
    return;
  }

  ctx.status = 200;
  ctx.body = { status: ctx.status, params: ctx.query, profile };
  return;
}

module.exports = router;
