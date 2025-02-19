const { create, login } = require("../controllers/user");

const router = require("express").Router();

router.post("/create", create);
router.post("/login", login);

module.exports = router;
