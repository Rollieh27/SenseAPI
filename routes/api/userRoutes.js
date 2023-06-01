const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

// Routes for managing users

router
  .route('/')
  .get(getAllUsers) // Retrieves all users from the database
  .post(createUser); // Creates a new user

router
  .route('/:id')
  .get(getUserById) // Retrieves a single user by its ID
  .put(updateUser) // Updates an existing user
  .delete(deleteUser); // Deletes a user

router
  .route('/:userId/friends/:friendId')
  .post(addFriend) // Adds a friend to a user's friend list
  .delete(removeFriend); // Removes a friend from a user's friend list

module.exports = router;
