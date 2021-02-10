// implement your posts router here
const Posts = require("./posts-model")
const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
  Posts.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.statust(500).json({message: 'Error retrieving the posts.'
    })
  })
})

router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({message: "Posts are not found"})
    }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: "Error retrieving the posts."})
  })
})

module.exports = router;