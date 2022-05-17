var router = require('express').Router();
router.use('/user',require('./user'));
router.use('/student',require('./student'));

module.exports = router;
