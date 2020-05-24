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
        error: "The posts information could not be retrieved.",
      });
    });
});

router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The post information could not be retrieved.",
      });
    });
});

router.get("/:id/comments", (req, res) => {
  Posts.findCommentById(req.params.id)
    .then((comment) => {
      if (!comment) {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      } else {
        res.status(200).json(comment);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The comments information could not be retrieved.",
      });
    });
});

router.post("/", (req, res) => {
  const postData = req.body;
  Posts.insert(postData)
    .then((post) => {
      if (!postData.title || !postData.contents) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post.",
        });
      } else {
        res.status(201).json(post);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    });
});

router.delete("/:id", (req, res) => {
  const postId = req.params.id;
  Posts.remove(postId)
    .then((post) => {
      if (!post) {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      } else {
        res.status(200).json(post);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The post could not be removed",
      });
    });
});

router.put("/:id", (req, res) => {
    const changes = req.body;
    Posts.update(req.params.id, changes)
    .then(post => {
        if (!post) {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        } else if (!changes.title || !changes.contents) {
            res.status(400).json({
                errorMessage: "Please provide title and contents for the post."
            })
        } else {
            res.status(200).json(post)
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "The post information could not be modified."
        })
    }) 
})

module.exports = router;
