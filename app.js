var express = require("express");

var app = express();
var handlebars = require("express3-handlebars").create({
  defaultLayout: "main",
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 3000);
app.use(express.static(__dirname + "/public"));

var fortunes = [
  "Conquer your fears or they will conquer you.",
  "Rivers need springs.",
  "Do not fear what you don't know.",
  "You will have a pleasant surprise.",
  "Whenever possible, keep it simple.",
];

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render("about", { fortune: randomFortune });
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
