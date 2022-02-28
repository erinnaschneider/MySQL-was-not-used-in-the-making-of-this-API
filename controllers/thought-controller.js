const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // create a thought
  addThought({ body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { username: body.username },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id.' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // update thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      body,
      { new: true, runValidators: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id.' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

    // remove thought
    removeThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
          if (!deletedThought) {
            return res.status(404).json({ message: 'No thought found with this id. 1' });
          }
          return User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { thoughts: params.thoughtId } },
            { new: true }
          );
        })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id. 2' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

  // add reaction to thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId }, 
      { $push: { reactions: body } }, 
      { new: true, runValidators: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id.' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // remove reaction
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController;