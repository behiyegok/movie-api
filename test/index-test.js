const chai = require("chai"),
    chaiHttp = require("chai-http"),
    should = chai.should(),
    server = require("../app");

chai.use(chaiHttp);

describe("Testin Açıklaması", () => {
    it("(GET /) anasayfayı döndürür", (done) => {
        done();
    });
    it("(GET /) movies endpoint", (done) => {
        done();
    });
});