const express = require('express'),
  router = express.Router(),
  sMovie = require("../models/sMovie")

/* POST users listing. */
router.post('/', function (req, res, next) {
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

  // movie.save((err, data) => {
  //   if (err) res.json(err);
  //   res.json({ status: 1 });
  // });

  const promise = movie.save();
  promise.then((data)=>{
    res.json({status:1});
  }).catch((err)=>{
    res.json(err);
  })
});

module.exports = router;
