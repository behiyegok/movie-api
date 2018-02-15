const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // const token =  //tokeni 3 şekilde gönderip 3 şekilde yapalama ihtimalimiz var 
    //     req.headers["x-access-token"]
    //     || req.body.token
    //     || req.query.token; http://localhost:2702/api/movies?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inl1bnVzMSIsImlhdCI6MTUxODcwMTEyNSwiZXhwIjoxNTE4NzAxODQ1fQ.3ry2u4awsTgTnCU8hiyA93DyiRB83JdyvClUqBwZnTU

    const token = req.headers["x-access-token"] || req.body.token || req.query.token;

    if (token) {
        jwt.verify(token, req.app.get("api_secret_key"), (err, decoded) => { //1.parametre gelen token, 2.parametre:api_secret_key,3.parametre:callback
            if (err) {
                res.json({
                    status: false,
                    message: "Failed to authenticate token"
                })
            }
            else {
                req.decode = decoded;
                console.log(decoded);
                /*{  //console dan gelecek örnek çıktı açıklaması
                    username: 'yunus1', --> username
                    iat: 1518701125,    --> token ın oluşturulma tarihi
                    exp: 1518701845     --> token in süresini ifade ediyor
                }*/
                next(); //herşey yolunda herhangi bir route la eşleşebilirsin demek
            }
        });
    }
    else {
        res.json({
            status: false,
            message: "No token provided."
        });
    };
};