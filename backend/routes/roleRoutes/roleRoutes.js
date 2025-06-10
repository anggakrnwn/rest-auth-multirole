const express = require('express');
const router = express.Router();
const roleController = require('../../controllers/usermanagement/role/RoleController');
const verifyToken = require('../../middlewares/auth');

router.get('/', verifyToken, roleController.findRoles);
router.post('/create', verifyToken, roleController.createRole);
router.put('/:id', verifyToken, roleController.updateRole);
router.delete('/:id', verifyToken, roleController.deleteRole);

module.exports = router;
