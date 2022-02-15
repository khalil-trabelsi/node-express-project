var express = require("express");
var fortune = require("./lib/fortune");
var app = express();
var handlebars = require("express3-handlebars").create({
  defaultLayout: "main",
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 3000);
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about", { fortune: fortune.getFortune() });
});
// 404 catch-all handler (middleware)

app.use((req, res, next) => {
  res.status(404).render("notFound");
});

// 500 error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error");
});

app.listen(app.get("port"), () => {
  console.log(
    "Express started on http://localhost.: " +
      app.get("port") +
      "; Press Ctrl-C to terminate"
  );
});
