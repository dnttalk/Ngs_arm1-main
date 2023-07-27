const express = require('express');
const router = express.Router();

router.get('/first', (req, res) => {
    res.render('second');
});

router.get('/first', (req, res) => {
    res.render('mpn');
});

router.get('/first', (req, res) => {
    res.render('first');
});
router.get('/first', (req, res) => {
    res.render('first');
});

router.get('/login', (req, res) => {
    res.redirect('/first');
});
module.exports = router;