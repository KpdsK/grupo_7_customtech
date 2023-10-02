const express = require('express');
const router = express.Router();
const userApiController = require('../../controllers/apis/userApiController')


router.get('/', userApiController.list)
router.get('/:id', userApiController.detail)
router.get('/checkout/medio_pago/:pre_tarj', userApiController.getDataCard)


module.exports = router