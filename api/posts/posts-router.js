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

router.post("/", (req, res) => {
  Posts.insert(req.body)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(error => {
    res.status(500).json({message: "Error adding the posts"})
  })
})

router.put("/:id", (req, res) => {
  Posts.update(req.params.id, req.body)
    .then(post => {
      post
        ? res.status(200).json(post)
        : res.status(404).json({message: "The post could not be found"})
    })
    .catch(error => {
    res.status(500).json({message: "Error updating the post."})
  })
})

router.delete("/:id", (req, res) => {
  Posts.remove(req.params.id)
    .then(post => {
      post 
        ? res.status(200).json(post)
        : res.status(404).json({message: "The post could not be found"})
    })
    .catch(error => {
    res.status(500).json({message: "Error deleting this post"})
  })
})

router.get("/:id/comments", (req, res) => {
  Posts.findPostComments(req.params.id)
    .then(post => {
      post.length > 0 
        ? res.status(200).json(post)
        : res.status(404).json({message: "No comments found for the Id requested"})
    })
    .catch(error => {
    res.status(500).json({message: "Error retrieving the comments for this post."})
  })
})

module.exports = router;