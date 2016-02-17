# Devito URL Shortener
Devito is a URL shortening service designed to integrate directly with nginx.
Incoming requests are resolved by nginx directly using data stored in a
Redis database.

The management interface is implemented with Node.js, Express, and Redis on
the backend, and AngularJS on the frontend. The frontend HTML templates are
written in Jade, and the CSS is in PostCSS with Stylus and Lost Grid plugins.

The actual URL resolution is accomplished using an nginx configuration using
a Lua script to pull the redirects from the Redis database.
