class AppRouter {
    constructor(express, knex, jwt) {
        this.express = express;
        this.knex = knex;
        this.jwt = jwt
    }

    /** ************** API - bind routes ***********************/ 
    router() {
        let router = this.express.Router();

        router.get("/todo", this.getAll.bind(this));
        router.get("/todo/:id", this.getToDo.bind(this));
        router.post("/todo", this.postToDo.bind(this));
        router.put("/todo/:id", this.updateToDo.bind(this));
        router.delete("/todo/:id", this.deleteToDo.bind(this))

        return router
    }

    /** ************** Router - todo ***********************/ 
    
    //Verify and decode jwt
    decode(req){
        let token = req.headers.authorization;
        console.log(token)
        token = token.replace("Bearer", "");
        return this.jwt.verify(token, process.env.JWT_SECRET);
    }

    //getToDo
    getAll(req,res) {
        //console.log("get todo ")
        let user = this.decode(req);
        return this.knex("todo")
            .select('*')
            .where("user_id", user.id)
            .then((data) => {
                //console.log(data);
                res.json(data);
            })
    }

    getToDo (req, res) {
        this.knex("todo")
        .select('*')
        .where({
            id: req.params.id
        })
        .then((data) => {
            res.json(data)
        })
    }

    //postToDo
    postToDo(req, res) {
        this.knex("todo")
            .insert({
                description: req.body.description
            })
            .then(() =>{
                console.log("New item is added to the TO DO list")
                this.knex("todo")
                    .select('*')
                    .then((data) => {
                        //console.log(data);
                        res.json(data);
                    })
            })
    }

    //updateToDo
    updateToDo(req, res) {
        this.knex("todo")
        .where({
            id: req.params.id
        })
        .update({
            description: req.body.description
        })
        .then((data) => {
            console.log("item description is updated")
            res.json(data)
        })
    }


    //deleteToDo
    deleteToDo(req, res) {
        this.knex("todo")
        .where({
            id: req.params.id
        })
        .del()
        .then(() => {
            //res.send("Item deleted")
            this.knex("todo")
            .select('*')
            .then((data) => {
                //console.log(data);
                res.json(data);
            })
        })
    }
    
}

module.exports = AppRouter;