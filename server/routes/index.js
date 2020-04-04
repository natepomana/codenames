const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send({ response: "I am alive, check port 3000 my dood" }).status(200);
});

module.exports = router;