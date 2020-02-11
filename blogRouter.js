const express = require("express");
const database = require("./data/db");

const router = express.Router();

// GET all posts in database
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


module.exports = router;