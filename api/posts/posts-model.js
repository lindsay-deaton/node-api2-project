const db = require('../../data/db-config');

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
  findPostComments,
  findCommentById,
  insertComment,
};
//above, these are all the functions we're exporting to communicate with the server.


// | 1 | GET    | /api/posts              | Returns **an array of all the post objects** contained in the database  
function find() {
  return db('posts');
//returns database name posts.
}

// | 2 | GET    | /api/posts/:id          | Returns **the post object with the specified id**
function findById(id) {
  return db('posts').where({ id: Number(id) }).first()
  //returns database posts where everyting is equal to the number and the id passed in, the first one on the list.
}

// | 3 | POST   | /api/posts              | Creates a post using the information sent inside the request body and returns **the newly created post object**
function insert(post) {
  return db('posts')
    .insert(post, 'id')
    .then(ids => ({ id: ids[0] }));
}

// | 4 | PUT    | /api/posts/:id          | Updates the post with the specified id using data from the request body and **returns the modified document**, not the original
function update(id, post) {
  return db('posts')
    .where('id', Number(id))
    .update(post);
}

// | 5 | DELETE | /api/posts/:id          | Removes the post with the specified id and returns the **deleted post object**
function remove(id) {
  return db('posts')
    .where('id', Number(id))
    .del();
}

// | 6 | GET    | /api/posts/:id/comments | Returns an **array of all the comment objects** associated with the post with the specified id
function findPostComments(postId) {
  return db('comments')
    .join('posts', 'posts.id', 'post_id')
    .select('comments.*', 'title as post')
    .where('post_id', postId);
}

function findCommentById(id) {
  return db('comments')
    .join('posts', 'posts.id', 'post_id')
    .select('comments.*', 'title as post')
    .where('comments.id', id).first();
}

function insertComment(comment) {
  return db('comments')
    .insert(comment)
    .then(ids => ({ id: ids[0] }));
}
