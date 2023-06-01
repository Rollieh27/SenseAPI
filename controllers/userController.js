const { users, thought } = require('../models');

const userController = {

  // Retrieves all users from the database
  getAllUsers(req, res) {
    users.find({})
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then((userData) => res.json(userData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Retrieves a single user by their ID
  getUserById({ params }, res) {
    users.findOne({ _id: params.id })
      .populate({
        path: 'thought',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found.' });
        }

        res.json(userData);

      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Creates a new user
  createUser({ body }, res) {
    users.create(body)
      .then((userData) => res.json(userData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Updates an existing user
  updateUser({ params, body }, res) {
    users.findOneAndUpdate(
      { _id: params.id },
      body,
      { new: true, runValidators: true, }
    )
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found.' });
        }

        res.json(userData);

      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Deletes a user and their associated thoughts
  deleteUser({ params }, res) {
    users.findOneAndDelete({ _id: params.id })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found.' });
        }

        return thought.deleteMany({ _id: { $in: userData.thought } });
      })
      .then(() => {
        res.json({ message: 'User and associated thoughts deleted.' });
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Adds a friend to a user's friend list
  addFriend({ params }, res) {
    users.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found.' });
        }

        res.json(userData);

      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Removes a friend from a user's friend list
  removeFriend({ params }, res) {
    users.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found.' });
        }

        res.json(userData);

      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
};

module.exports = userController;
