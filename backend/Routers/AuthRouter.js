require("dotenv").config()

class AuthRouter {
    constructor(express, knex, jwt) {
        this.express = express;
        this.knex = knex;
        this.jwt = jwt;
    }

/** ************** bind routes ***********************/ 
router() {
    let router = this.express.Router();

    router.post("/login", this.authLogin.bind(this));
    //router.get("/login", this.getAuth.bind(this));
    return router;
}

/** ************** Router - AUTH ***********************/ 

//get
getAuth(req, res) {
    //console.log("get todo ")
    return this.knex("users")
    .select('*')
    .then((data) => {
        //console.log(data);
        res.json(data);
    })
}

//Login - post
authLogin(req, res) {
    if (req.body.username && req.body.password){

        const username = req.body.username;
        const password = req.body.password;

        this.knex("users")
            .where({
                username,
                password,
            })
            .first()
            .then((query) => {
                if (query) {
                    const payload = {
                        id: query.id,
                        username: query.username,
                        email: query.email,
                    };
                    const token = this.jwt.sign(payload, process.env.JWT_SECRET);
                    res.json({token})
                } else {
                    res.sendStatus(401);
                } 
            })
        } else {
            res.sendStatus(401);
        }
    }
}

module.exports = AuthRouter;