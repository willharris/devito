var redis = require('redis'),
    config = require('../../config');

var client = redis.createClient({host: config.redisHost, port: config.redisPort});

client.on('ready', function () {
    console.log('Connected to Redis server');
});

function mhgetall(keys, callback) {
    var commands = [];
    keys.forEach(function (key, idx) {
        commands.push(['hgetall', key]);
    });
    client.batch(commands).exec(callback);
}

exports.all = function (req, res) {
    var allUrls = [];
    client.keys('shrt#*', function (err, keys) {
        if (keys) {
            mhgetall(keys, function (err, replies) {
                if (err) {
                    console.log('Error: ' + err);
                    res.sendStatus(500);
                } else {
                    for (var i = 0; i < keys.length; i++) {
                        allUrls.push({
                            idx: parseInt(replies[i]['idx']),
                            shortLink: keys[i].substring(5),
                            target: replies[i]['link']
                        });
                    }
                    res.json(allUrls);
                }
            });
        } else {
            res.sendStatus(204);
        }
    });
};

exports.create = function (req, res) {
    if (typeof(req.body.shortLink) !== 'undefined' &&
        typeof(req.body.idx) !== 'undefined' &&
        typeof(req.body.target) !== 'undefined')
    {
        var key = 'shrt#' + req.body.shortLink;
        client.hmset(key, {
            'idx': req.body.idx,
            'link': req.body.target
        });
        res.status(201).json({});
    } else {
        res.sendStatus(400);
    }
};

exports.delete = function (req, res) {
    var urlId = req.params.urlId;
    client.del('shrt#' + urlId);
    res.sendStatus(204);
};
