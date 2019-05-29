var express = require('express');
var router = express.Router;

router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Express'
    });
});

router.get('/login', (req, res, next) => {
    res.render('login');
});

router.get('/signup', (req, res, next) => {
    res.render('signup');
});

module.exports = router;