const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('<h3>Oops! You Went The Wrong Route!</h3>');
});

module.exports = router;