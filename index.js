const express = require("express");
const cors = require("cors");
const server = express();

const blogRouter = require("./blogRouter");

server.use(express.json());
server.use(cors());
server.use("/api/posts/", blogRouter);
server.listen(5000, () => {
    console.log("Server running on port 5000");
});

server.get("/", (req, res) => {
    res.send(`<h1>Blog post database</h1>`);
})