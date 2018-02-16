const chai = require("chai"),
    chaiHttp = require("chai-http"),
    should = chai.should(),
    server = require("../app");

chai.use(chaiHttp);
let token;

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


    describe("/GET a movies", () => {
        it("it should GET all the movies", (done) => {
            chai.request(server)
            .get("/api/movies")
            .set("x-access-token", token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a("array");
                done();
            });
        });
    });

    describe("/POST a movie", ()=>{
        it("it should POST a movie", (done)=>{
            chai.request(server)
            .post("/api/movies")
            .send();
        })
    })
});