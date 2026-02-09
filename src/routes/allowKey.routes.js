const { Router } = require("express");

const { generateKey, getCurrentKey } = require("../controllers/allowKey");

const router = Router();

router.post('/generate', generateKey);
router.get('/current', getCurrentKey);

module.exports = router;
