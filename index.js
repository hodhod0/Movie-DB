const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Ok"));
app.listen(port, () => {
  console.log(`server is  at http://localhost:${port}`);
});

app.get("/test", (req, res) => {
  res.send({ status: 200, message: "Ok" });
});
app.get("/time", (req, res) => {
  const date = new Date();
  var hour = date.getHours();

  var min = ("0" + date.getMinutes().toString()).slice(-2);
  res.send(`{status:200, message:${hour}:${min}`);
});

app.get("/hello/:id", (req, res) => {
  res.send({
    status: 200,
    message: "hello " + req.params.id,
  });
});

app.get("/search", (req, res) => {
  const nor = req.query;
  
  if (nor.s != "") {
    res.send({
      status: 200,
      message: "ok",
      data: nor.s,
    });
  } else {
    res.send({
      status: 500,
      error: true,
      message: "you have to provide a search",
    });
  }
});

// app.use((req, res) => {
//   res.status(404).send("Sorry can't find that!");
// });
