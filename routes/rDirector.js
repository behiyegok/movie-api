const express = require('express'),
    router = express.Router(),
    Director = require("../models/sDirector"), //Director Model
    mongoose = require("mongoose");

router.post("/", (req, res, next) => {
    const director = new Director(req.body);
    const promise = director.save();
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err)
    });
});

router.get("/", (req, res) => {
    const promise = Director.aggregate([
        {
            $lookup:
                {
                    from: "movies", //nereyle join edilecek
                    localField: "_id", //from dan gelenenin hangi alanından bağlantı/eşleşme yapacaksın
                    foreignField: "director_id", //from dan gelen eşleşme alanı burdaki hangi alanla bağlantı kuracak
                    as: "directorMovies" //gelen veriler hangi değişkene atanacak

                }
        },
        {
            $unwind: {
                path: "$directorMovies",
                preserveNullAndEmptyArrays: true //director collection un da movie collenctionundan herhangibir veriyle eşleşmeyen dataları getirir
            }
        },
        {
            $group: {
                _id: {
                    _id: "$_id",
                    name: "$name",
                    surname: "$surname",
                    bio: "$bio"
                },
                movies: {
                    $push: "$directorMovies"
                }
            }
        },
        {
            $project: {
                _id: "$_id._id",
                name: "$_id.name",
                surname: "$_id.surname",
                bio: "$_id.bio",
                movies: "$movies"
            }
        }

    ]);
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
    //res.json({ title: "behiye" })
});

//GET Id bazlı director ve filmlerini çağırmaaa
router.get("/:director_id", (req, res) => {
    const promise = Director.aggregate([
        {
            $match: {
                "_id": mongoose.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup:
                {
                    from: "movies", //nereyle join edilecek
                    localField: "_id", //from dan gelenenin hangi alanından bağlantı/eşleşme yapacaksın
                    foreignField: "director_id", //from dan gelen eşleşme alanı burdaki hangi alanla bağlantı kuracak
                    as: "directorMovies" //gelen veriler hangi değişkene atanacak

                }
        },
        {
            $unwind: {
                path: "$directorMovies",
                preserveNullAndEmptyArrays: true //director collection un da movie collenctionundan herhangibir veriyle eşleşmeyen dataları getirir
            }
        },
        {
            $group: {
                _id: {
                    _id: "$_id",
                    name: "$name",
                    surname: "$surname",
                    bio: "$bio"
                },
                movies: {
                    $push: "$directorMovies"
                }
            }
        },
        {
            $project: {
                _id: "$_id._id",
                name: "$_id.name",
                surname: "$_id.surname",
                bio: "$_id.bio",
                movies: "$movies"
            }
        }
    ]);
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
    //res.json({ title: "behiye" })
});

// PUT update a director
router.put("/:director_id", (req, res, next) => {
    const promise = Director.findByIdAndUpdate(
        req.params.director_id,
        req.body,
        {
            new: true
        }
    );

    promise.then((director) => {
        if (!director)
            next({ message: "director was not found.", code: 99 });
        res.json(director);
    }).catch((err) => {
        res.json(err);
    });
});

// DELETE remove a director
router.delete("/:director_id", (req, res, next) => {
    Director.findByIdAndRemove(req.params.director_id, (err, data) => {
        if (err) next (err)
        res.json({ status: 1 });
    });
});


module.exports = router;