const { users, thought } = require('../models');

const thoughtController = {

    // Retrieves all thoughts from the database and sends a JSON response with the data.
    getAllThoughts(req, res) {
        thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // Retrieves a single thought by its _id and sends a JSON response with the data.
    getThoughtById({ params }, res) {
        thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(thoughtData => {
                if (!thoughtData) {
                    return res.status(404).json({ message: 'Error: Thought not found.' });
                }

                res.json(thoughtData);

            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // Creates a new thought and updates the corresponding user.
    createThought({ body }, res) {
        thought.create(body)
            .then(({ _id }) => {
                return users.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thought: _id } },
                    { new: true }
                );
            })
            .then(thoughtData => {
                if (!thoughtData) {
                    return res.status(404).json({ message: 'Error: User not found.' });
                }

                res.json(thoughtData);

            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })
    },

    // Updates an existing thought based on its _id.
    updateThought({ params, body }, res) {
        thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true })
            .then(thoughtData => {
                if (!thoughtData) {
                    return res.status(404).json({ message: 'Error: Thought not found.' });
                }

                res.json(thoughtData);

            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })
    },

    // Deletes a thought and removes it from the corresponding user.
    deleteThought({ params }, res) {
        thought.findOneAndDelete({ _id: params.id })
            .then(thoughtData => {
                if (!thoughtData) {
                    return res.status(404).json({ message: 'Error: Thought not found.' });
                }
                return users.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thought: params.Id } },
                    { new: true }
                )
                
            })

            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })
    },

    // Adds a new reaction to a thought.
    createReaction({ params, body }, res) {
        thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true })
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then(thoughtData => {
                if (!thoughtData) {
                    return res.status(404).json({ message: 'Error: Thought not found.' });
                }

                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })
    },

    // Removes a reaction from a thought.
    deleteReaction({ params }, res) {
        thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true })
            .then(thoughtData => {
                if (!thoughtData) {
                    return res.status(404).json({ message: 'Error: Thought not found.' });
                }

                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })
    }

};

// Export the thoughtController module.
module.exports = thoughtController;
