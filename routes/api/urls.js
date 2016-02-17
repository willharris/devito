var redis = require('redis'),
    client = redis.createClient({host: '127.0.0.1', port: '6379'});

client.on('ready', function () {
    console.log('Connected to Redis server');
});

exports.all = function (req, res) {
    var allUrls = [];
    client.keys('shrt#*', function (err, keys) {
        if (keys) {
            client.mget(keys, function (err2, values) {
                for (var i = 0; i < keys.length; i++) {
                    allUrls.push({shortLink: keys[i].substring(5), target: values[i]});
                }
                res.json(allUrls);
            });
        } else {
            res.sendStatus(204);
        }
    });
};

exports.create = function (req, res) {
    client.set('shrt#' + req.body.shortLink, req.body.target);
    res.status(201).json({});
};

exports.delete = function (req, res) {
    var urlId = req.params.urlId;
    client.del('shrt#' + urlId);
    res.sendStatus(204);
};
