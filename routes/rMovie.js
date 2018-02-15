const express = require('express'),
  router = express.Router(),
  sMovie = require("../models/sMovie")

/* POST save movie */
router.post('/', function (req, res) {
  /*
  const { title, imdb_score, category, country, year } = req.body;
  const movie = new sMovie({
    title: title,
    imdb_score: imdb_score,
    category: category,
    country: country,
    year: year
  });
*/

  const movie = new sMovie(req.body);  //body den dönen cevapları direk bu şekilde de kaydedebilirsin

  /*
  movie.save((err, data) => {
    if (err) res.json(err);
    res.json({ status: 1 });
  });
*/

  const promise = movie.save();
  promise.then((data) => {
    res.json({ status: 1 });
  }).catch((err) => {
    res.json(err);
  });
});


// GET see all movies
router.get("/", (req, res) => {
  sMovie.aggregate([
    {
      $lookup: {
        from: "directors",
        localField: "director_id",
        foreignField: "_id",
        as: "directors"
      }
    },
    {
      $unwind: "$directors"
    }
  ], (err, data) => {
    res.json(data);
  });

  // sMovie.find({}, (err, data) => {
  //   if (err) throw err;
  //   res.json(data);
  // });
});

// GET Top 10 movies
router.get("/top10", (req, res) => {
  const promiseTopten = sMovie.find({}).limit(3).sort({ imdb_score: -1 });
  promiseTopten.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })

});

// GET see a movie
router.get("/:movie_id", (req, res, next) => {  //örnek data : 5a83ec52b776b6136cdb1931
  sMovie.findById(req.params.movie_id, (err, data) => {
    if (err) next(err);  //next kullanmazsak istek patlar patlayınca da sunucu ayağa kalkmıyor başarılı bir istek yapsan da sunucu cevap vermiyor mortingen anlayacağınız
    res.json(data);
  });
});

// PUT update a movie
router.put("/:movie_id", (req, res, next) => {  //örnek data : 5a83ec52b776b6136cdb1931
  sMovie.findByIdAndUpdate(
    req.params.movie_id,
    req.body,
    { new: true }, //veri güncellenip hemen çıktıya basıyor
    (err, data) => {
      if (err) next(err);
      res.json(data);
    });
});

// DELETE remove a movie
router.delete("/:movie_id", (req, res, next) => {  //örnek data : 5a83ec52b776b6136cdb1931
  sMovie.findByIdAndRemove(req.params.movie_id, (err, data) => {
    if (err) next(err);
    res.json({ status: 1 });
  });
});


// Between
router.get("/between/:start_year/:end_year", (req, res) => {
  const { start_year, end_year } = req.params;

  sMovie.find(
    {
      // "$gte" : büyük eşitse , "$lte" : küçük eşitse
      // "$gt" : büyükse , "$lt" : küçükse
      year: { "$gt": parseInt(start_year), "$lt": parseInt(end_year) }
    },
    (err, data) => {
      if (err) throw err;
      res.json(data);
    });
});



module.exports = router;