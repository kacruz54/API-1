const { Router } = require("express");

const { createUser, loginUser, getUsers, updateUser, deleteUser } = require("../controllers/auth");

const router = Router();

router.post('/new-user', createUser);
router.post('/login', loginUser);
router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;


