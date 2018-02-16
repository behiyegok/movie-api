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


/**
 * npm run test ya da npm test olarak başlatabilirsin
 * mocha nın çalışması için package.json dosyasına script in altına "test" : mocha ibaresini ekle 
 * "test":"mocha --exit" ibaresini eklersek mongodb bağlantı uyarısını vermez
 * mocha varsayılan olarak dosya dizininde test klasörünü arar ve içerisindeki .js leri çalıştırır ek klasör eklenince hata verir o klasörlerin içerisindeki test dosyalarını da çalıştırmak için "test":"mocha --exit --recursive" yazılır.
 * 
 */