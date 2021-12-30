const express = require("express");
const app = express();
const port = 3000;

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]

app.get("/", (req, res) => res.send("Ok"));


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

app.get('/movies/add', (req, res)=>{
    res.send();
})

app.get('/movies/get', (req, res)=>{
    res.send({
        status:200,
        data: movies,
    });
})

app.get('/movies/edit', (req, res)=>{
    res.send();
})
app.get('/movies/delete', (req, res)=>{
    res.send();
})


app.listen(port, () => {
    console.log(`server is  at http://localhost:${port}`);
  });

// app.use((req, res) => {
//   res.status(404).send("Sorry can't find that!");
// });
