const cors = require("koa2-cors");
let port = 8000;
let root = "./dist";
process.argv.some((item, index) => {
  if (item === "--port") {
    port = process.argv[index + 1];
    return true;
  }
});

const Koa = require("koa");
const path = require("path");
const staticFiles = require("koa-static");
const App = new Koa();

App.use(
  cors({
    origin: () => {
      return "*";
    },
  })
);
App.use(staticFiles(path.join(__dirname, root)));

App.listen(port, () => {
  console.log("Start static service: 0.0.0.0:" + port);
});
