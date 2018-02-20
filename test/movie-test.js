const chai = require("chai"),
    chaiHttp = require("chai-http"),
    should = chai.should(),
    server = require("../app");

chai.use(chaiHttp);
let token, movieId;

describe("/api/movies token", () => {

    before((done) => { //testler başlamadan önce yapılan işlemler
        chai.request(server)
            .post("/authenticate")
            .send({ username: "behiye", password: "123456" })
            .end((err, res) => {
                token = res.body.token;
                console.log(token);
                done();
            });
    });

    /** Bütün filmleri getiren test 
     * istek türü belirtildi yeri belirtildi
     * access token girildi
     * sonuçlar alındı
     */
    describe("/GET all movies", () => {
        it("it should GET all the movies", (done) => {
            chai.request(server)
                .get("/api/movies")
                .set("x-access-token", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    done();
                });
        });
    });

    /** Film ekleme testi 
     * giriş yapıldı token belirtildi
     * örnek bir veri oluşturuldu
     * örnek veri kaydedildi 
     */
    describe("/POST a movie", () => {
        it("it should POST a movie", (done) => {
            const movie = {
                title: "truva",
                director_id: "5a856c2dc7492c32a8570286",
                category: "history",
                country: "taiwan",
                year: 1963,
                imdb_score: 8
            };

            chai.request(server)
                .post("/api/movies")
                .send(movie)
                .set("x-access-token", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("title");
                    res.body.should.have.property("director_id");
                    res.body.should.have.property("category");
                    res.body.should.have.property("country");
                    res.body.should.have.property("year");
                    res.body.should.have.property("imdb_score");
                    movieId = res.body._id;
                    done();
                });
        });
    });

    /** Filmi getirme testi
     * sayfaya giriş yapıldı ve token üretildi
     * örnek veri çağrıldı
     */
    describe("/GET/:movie_id a movie", () => {
        it("it should be GET a movie by the given id", (done) => {
            chai.request(server)
                .get("/api/movies/" + movieId)
                .set("x-access-token", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("title");
                    res.body.should.have.property("director_id");
                    res.body.should.have.property("category");
                    res.body.should.have.property("country");
                    res.body.should.have.property("year");
                    res.body.should.have.property("imdb_score");
                    res.body.should.have.property("_id").eq(movieId); //gönderilen movieId den dönen değer _id ye eşit olmalı
                    done();
                });
        });
    });

    /** Film güncelleme testi
     * sayfaya giriş yapıldı ve token üretildi
     * örnek veri çağrıldı
     * örnek veri güncellendi
     */
    describe("/PUT/:movie_id a movie", () => {
        it("it should UPDATE a movie given by id", (done) => {
            const movie = {
                title: "39numara",
                director_id: "5a856c2dc7492c32a8570286",
                category: "horror",
                country: "Fas",
                year: 1993,
                imdb_score: 2.1
            };

            chai.request(server)
                .put("/api/movies/" + movieId)
                .send(movie)
                .set("x-access-token", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    //res.body.should.have.property("title").eql(movie.title);
                    res.body.should.have.property("director_id").eql(movie.director_id);
                    res.body.should.have.property("category").eql(movie.category);
                    res.body.should.have.property("country").eql(movie.country);
                    res.body.should.have.property("year").eql(movie.year);
                    res.body.should.have.property("imdb_score").eql(movie.imdb_score);
                    done();
                });
        });
    });

    /** Film silme testi
     * sayfaya giriş yapıldı ve token üretildi
     * örnek veri çağrıldı
     * örnek veri silindi
     */
    describe("/DELETE/:movie_id a movie", () => {
        it("it should DEELTE a movie given by id", (done) => {
            chai.request(server)
                .delete("/api/movies/" + movieId)
                .set("x-access-token", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("status").eql(1);
                    done();
                });
        });
    });
});