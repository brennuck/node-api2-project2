const router = require("express").Router();
const Posts = require("../data/db.js");

router.get("/", (req, res) => {
  Posts.find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "The post with the specified ID does not exist.",
      });
    });
});

module.exports = router;
