// backend/routes/api/index.js
const router = require('express').Router();

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
    // res.send('ok')
});

module.exports = router;
