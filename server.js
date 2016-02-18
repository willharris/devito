/* globals process, __dirname */

var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    config = require('./config'),
    routes = require('./routes'),
    api = require('./routes/api');

var app = module.exports = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(morgan(config.env === 'dev' ? 'dev' : 'combined'));
app.use(bodyParser.json());
app.use('/static', express.static(__dirname + '/public'));

// index and partials
app.get('/', routes.index);
app.get('/ng', routes.index);
app.get('/ng/partials/:name', routes.partials);
// redirect all others to the index (HTML5 history)
app.get('/ng/*', routes.index);

// JSON API
app.get('/api/urls', api.urls.all);
app.post('/api/urls', api.urls.create);
app.delete('/api/urls/:urlId', api.urls.delete);

app.listen(config.port, config.host);

console.log('Server listening on ' + config.host + ':' + config.port);

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});
