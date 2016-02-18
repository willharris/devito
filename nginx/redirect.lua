--
-- Lua script based on https://github.com/openresty/lua-resty-redis.git
-- to read URL redirection keys from Redis and redirect clients to the
-- appropriate new URL.
--
-- Redis keys created based on the URL path minus the leading slash, prefixed
-- with 'shrt#'. Values are then retrieved from the 'link' hash value of the
-- results.
--

-- We limit the possible request length to 64 chars, and exclude
-- the leading slash. Note that Lua string indices are 1-based!
local key = ngx.unescape_uri(string.sub(ngx.var.uri, 2, 65))
local key, n, err = ngx.re.gsub(key, '[^a-zA-Z0-9_+\!/]+', '')
if err then
    ngx.log(ngx.ERR, 'Failed to clean lookup key: ', err)
    ngx.exit(500)
end
if key == nil then
    ngx.log(ngx.ERR, 'No lookup key found in URI')
    ngx.exit(404)
end

local redis = require 'resty.redis'
local red = redis:new()

red:set_timeout(1000) -- 1 sec

local ok, err = red:connect('127.0.0.1', 6379)
if not ok then
    ngx.log(ngx.ERR, 'Failed to connect: ', err)
    ngx.exit(503) -- return service not available
end

local res, err = red:hget('shrt#'..key, 'link')
if err then
    ngx.log(ngx.ERR, 'Failed to get key "', key, '": ', err)
end

local ok, err = red:set_keepalive(10000, 100)
if not ok then
    ngx.log(ngx.ERR, 'Failed to set keepalive: ', err)
end

if res == nil or res == ngx.null then
    ngx.exit(404)
else
    ngx.redirect(res)
end

