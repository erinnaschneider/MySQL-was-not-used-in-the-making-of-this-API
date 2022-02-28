const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// routes at /api/thoughts
router
  .route('/')
  .get(getAllThoughts)
  .post(addThought);

// routes by id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought);

// routes by /api/thoughts/:userId/:thoughtId
router
  .route('/:userId/:thoughtId')
  .delete(removeThought);

// routes by /api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(addReaction);

// routes by /api/thoughts/:thoughtId/reactions/:reactionId
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;