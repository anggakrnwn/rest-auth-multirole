const express = require("express");
const router = express.Router();
const userController = require("../../controllers/usermanagement/user/UserController");
const verifyToken = require("../../middlewares/auth");
const { validateUser } = require("../../utils/validators/user");

router.get("/", verifyToken, userController.findUsers);
router.post("/create", verifyToken, validateUser, userController.createUser);
router.get("/:id", verifyToken, userController.findUserById);
router.put("/:id", verifyToken, validateUser, userController.updateUser);
router.delete("/:id", verifyToken, userController.deleteUser);

module.exports = router;
