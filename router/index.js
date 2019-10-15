const blog = require('./blog');

module.exports = function(app){
    app.use(blog.routes()).use(blog.allowedMethods());
}
