const { Router } = require("express");

const { createUser, loginUser } = require("../controllers/auth");

const router = Router();

router.post ('/new-user', createUser);
router.post ('/login', loginUser);

module.exports = router;


