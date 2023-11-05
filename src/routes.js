const { Router } = require('express');

const contactController = require('./controllers/contactController');

const router = Router();

router.get('/contacts', contactController.index);
router.get('/contacts/:id', contactController.FindID)
router.post('/contacts/email', contactController.FindEmail)
router.post('/contacts/login', contactController.LoginUser)
router.post('/contacts', contactController.Create);



module.exports = router