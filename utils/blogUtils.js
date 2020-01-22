const db = require('../db')
const Tips = require('./tip')
// 获取博客内容列表
function getBlogList() {
    return new Promise((resolve, reject) => {
        let sql = `SELECT title,value  FROM  bloglist`;
         db.query(sql).then(result => {
            let body = {
                data: result,
                status: 200
            }
            resolve(body)
        }).catch(e => {
            let body = {
                data: 'getBlogList-服务器发生错误'+e,
                status: 500
            }
            resolve(body)
        })
    })
}
// 添加博客内容
function addBlog(ctx = {}) {
    return new Promise((resolve, reject) => {
        let { title, content } = ctx.request.body
        var addSql = 'INSERT INTO bloglist(blogname,blogcont) VALUES(?,?)';
        var addSqlParams = [title, content];
        db.query(addSql, addSqlParams).then(resp => {
            let body = {
                resp,
                data: 'success',
                status: 200
            }
            resolve(body)
        }).catch(e=> {
            let body = {
                data: 'addBlog-服务器错误：'+ JSON.parse(e),
                status: 500
            }
            resolve(body)
        })
    })
}


module.exports = {
    getBlogList,
    addBlog
}
