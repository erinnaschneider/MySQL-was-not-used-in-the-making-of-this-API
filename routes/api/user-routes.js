const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  addUserFriend,
  deleteUserFriend
} = require('../../controllers/user-controller');

// routes at /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(addUser);

// routes by id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser)

// routes by /api/users/:userId/friends/:friendId
router
  .route('/:userId/friends/:friendId')
  .post(addUserFriend)
  .delete(deleteUserFriend);

module.exports = router;