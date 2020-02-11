const express = require("express");
const database = require("./data/db");

const router = express.Router();

// GET all posts in database: /api/posts
router.get("/", (req, res) => {
    database.find()
        .then(data => {
            console.log("GET all posts:", data);
            res.status(200).json(data);
        })
        .catch(error => {
            console.log("Error (GET all posts):", error);
            res.status(500).json({ error: "The posts information could not be retrieved." });
        })
})

// GET post by id: /api/posts/:id
router.get("/:id", (req, res) => {

    const {id} = req.params;

    database.findById(id)
        .then(data => {

            console.log("GET post with id", id, ":", data);

            if (!data)
                { res.status(404).json({ message: "The post with the specified ID does not exist." }) }
            else
                {
                    console.log("Post with id", id, " found:", data);
                    res.status(200).json(data);
                }
        })
        .catch(error => {
            console.log("Error (GET post with id", id, "):", error);
            res.status(500).json({ error: "The post information could not be retrieved." });
        })
})



module.exports = router;