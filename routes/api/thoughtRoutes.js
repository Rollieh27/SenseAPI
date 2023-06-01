const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

// Routes for managing thoughts

router
  .route('/')
  .get(getAllThoughts) // Retrieves all thoughts from the database
  .post(createThought); // Creates a new thought

router
  .route('/:id')
  .get(getThoughtById) // Retrieves a single thought by its ID
  .put(updateThought) // Updates an existing thought
  .delete(deleteThought); // Deletes a thought

router
  .route('/:thoughtId/reactions')
  .post(createReaction); // Adds a reaction to a thought

router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction); // Deletes a reaction from a thought

module.exports = router;
