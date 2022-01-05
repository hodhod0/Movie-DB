const express = require("express");
const app = express();
const port = 3000;
var request = require('request');

const movies = [
  { title: "Jaws", year: 1975, rating: 8 },
  { title: "Avatar", year: 2009, rating: 7.8 },
  { title: "Brazil", year: 1985, rating: 8 },
  { title: "الإرهاب والكباب‎", year: 1992, rating: 6.2 },
];

app.get("/", (req, res) => res.send("Ok"));
// app.get('/testhttp',(req,res)=>{
//   try{
//     var options = {
//       'method': 'GET',
//       'url': 'http://localhost:3000/time',
//       'headers': {
//       }
//     };
//     request(options, function (error, response) {
//       console.log(error);
//       if (error) res.send({err:error});
//      res.send(response.body);
//     });
//   }catch(e){
// res.send({error:e});
//   }
// })
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


app.get("/movies/read/id/:id", (req, res) => {
  const id = req.params.id;
  const movie = movies.find((x) => x.title === id);
  if (movie) {
    res.send({
      status: 200,
      data: movie,
    });
  } else {
    res.status(404).send({
      status: 404,
      error: true,
      message: `the movie ${id} does not exist`,
    });
  }
});

app.get("/movies/get/by-title", (req, res) => {
  res.send({
    status: 200,
    data: movies.sort(function (a, b) {
      return a.title - b.title;
    }),
  });
});
app.get("/movies/get/by-rating", (req, res) => {
  res.send({
    status: 200,
    data: movies.sort(function (a, b) {
      return b.rating - a.rating;
    }),
  });
});

app.get("/movies/get/by-date", (req, res) => {
  res.send({
    status: 200,
    data: movies.sort(function (a, b) {
      return b.year - a.year;
    }),
  });
});

app.get("/movies/read", (req, res) => {
  if (movies.length == 0) {
    res.status(404).send("the list is emty");
  } else {
    res.status(200).send(JSON.stringify(movies));
  }
});

app.post("/movies/add", function (req, res) {
  if (
    req.query.title != "" &&
    req.query.title != undefined &&
    req.query.year != "" &&
    req.query.year != undefined &&
    req.query.year.length == 4 &&
    !isNaN(req.query.year)
  ) {
    newMovie = {
      title: req.query.title,
      year: req.query.year,
      rating:
        req.query.rating == "" || req.query.rating == undefined
          ? 4
          : req.query.rating,
    };
    movies.push(newMovie);
    res.status(200).send(JSON.stringify(movies[movies.length - 1]));
  } else {
    res.status(404).send({
      status: 403,
      error: true,
      message: "you cannot create a movie without providing a title and a year",
    });
  }
});

app.put("/movies/edit/:id", (req, res) => {
  title = req.query.title
  id = req.params.id
  year = req.query.year
  rating = req.query.rating
  if(title != undefined && title !=""){
    movies[id].title=title
  }
  if(year != undefined && year !="" && year.length==4 &&  !isNaN(year)){
    movies[id].year=year
  }
  if(rating != undefined && rating != ""){
    movies[id].rating=rating
  }

  res.send(movies[id]);
});
app.delete("/movies/delete/:id",  (req, res) => {
  if (req.params.id < 0 || req.params.id > movies.length - 1) {
    res
      .status(404)
      .send(
        `{status:404, error:true, message:'the movie ${req.params.id} does not exist'}`
      );
  } else {
    res
      .status(200)
      .send(
        `This movie (${JSON.stringify(
          movies.splice(req.params.id, 1)
        )}) is deleted`
      );
  }
});

app.listen(port, () => {
  console.log(`server is  at http://localhost:${port}`);
});

// app.use((req, res) => {
//   res.status(404).send("Sorry can't find that!");
// });
