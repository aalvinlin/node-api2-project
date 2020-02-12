const express = require("express");
const database = require("./data/db");

const router = express.Router();

// POST post: /api/posts
router.post("/", (req, res) => {

    if (!req.body.title || !req.body.contents)
        { res.status(400).json({ message: "Please provide title and contents for the post." }) }

    else
    {
        database.insert(req.body)
            .then(response => {
                console.log("Added post");
                res.status(201).json(response);
            })
            .catch(error => {
                res.status(500).json({ error: "The post could not be There was an error while saving the post to the database." })
            })
    }

})

// POST a new comment to a post (specified by id): /api/posts/:id/comments
router.post("/:id/comments", (req, res) => {

    const {id} = req.params;

    database.findById(id)
        .then(data => {

            console.log("Looking for a post with id", id, ":", data);

            if (!data)
                { res.status(404).json({ message: "The post with the specified ID does not exist." }) }

            else if (!req.body.text)
                { res.status(400).json({ message: "Please provide text for the comment." }) }

            else
                {
                    let commentObject = { text: req.body.text, post_id: id};

                    console.log("About to add comment:", commentObject);

                    database.insertComment(commentObject)
                        .then(commentData => {
                            
                            res.status(201).json(commentData);
                        })
                        .catch(error => {
                            res.status(500).json({ error: "There was an error while saving the comment to the database." })
                        })
                }
        })
        .catch(error => {
            console.log("Error (GET post with id", id, "):", error);
            res.status(500).json({ error: "The post information could not be retrieved." });
        })
})


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


// GET comments associated with a post (speicfied by id): /api/posts/:id/comments
router.get("/:id/comments", (req, res) => {

    const {id} = req.params;

    database.findById(id)
        .then(data => {

            console.log("GET post with id", id, ":", data);

            if (!data)
                { res.status(404).json({ message: "The post with the specified ID does not exist." }) }
            else
                {
                    database.findPostComments(id)
                        .then(commentData => {
                            console.log("Comments from post with id", id, " found:", commentData);
                            res.status(200).json(commentData);
                        })
                        .catch(error => {
                            console.log("Error getting comments from post with id", id, "):", error);
                            res.status(500).json({ error: "The comments information could not be retrieved." })
                        })
                }
        })
        .catch(error => {
            console.log("Error (GET post with id", id, "):", error);
            res.status(500).json({ error: "The post information could not be retrieved." });
        })
})


// DELETE post by id: /api/posts/:id
router.delete("/:id", (req, res) => {

    const {id} = req.params;

    database.findById(id)
        .then(data => {

            console.log("Looking for post with id", id, ":", data);

            if (!data)
                { res.status(404).json({ message: "The post with the specified ID does not exist." }) }
            else
            {
                database.remove(id)
                    .then(deletedResult => {
                        console.log("Deleting post with id", id, " found:", data);
                        res.status(200).json(data);
                    })
                    .catch(error => {
                        res.status(500).json({ error: "The post could not be removed." })
                    })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "Could not connect to database." });
        })
})


// PUT post by id: /api/posts/:id
router.put("/:id", (req, res) => {

    const {id} = req.params;

    database.findById(id)
        .then(data => {

            console.log("Looking for post with id", id, ":", data);

            if (data.length === 0)
                { res.status(404).json({ message: "The post with the specified ID does not exist." }) }

            else if (!req.body.title || !req.body.contents)
                { res.status(400).json({ message: "Please provide title and contents for the post." }) }

            else
            {
                database.update(id, req.body)
                    .then(updatedResult => {
                        console.log("Updating post with id", id, " found:", data);
                        res.status(200).json(updatedResult);
                    })
                    .catch(error => {
                        res.status(500).json({ error: "The post could not be modified." })
                    })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "Could not connect to database." });
        })
})

module.exports = router;