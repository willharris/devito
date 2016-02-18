var config = require('../config');

/*
 * GET home page.
 */

exports.index = function (req, res){
    res.render('index', {
        HOSTNAME: config.hostname
    });
};

exports.partials = function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
};
