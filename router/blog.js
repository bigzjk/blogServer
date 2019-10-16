const router = require('koa-router');
const db = require('../db')
const Router = router()
// 获取博客列表
Router.get('/blog_getlist', async (ctx, next)=>{
    let sql = `SELECT blogname,blogcont  FROM  testblogs`;
    await db.query(sql).then(async result => {
        ctx.body = {
            data: result,
            status: 200
        }
    }).catch(e => {
        ctx.body = {
            data: '服务器发生错误',
            status: 500
        }
    })
})

// 添加博客文章
Router.post('/blog_add', async (ctx, next)=>{
    const { 
        title,
        content
    } = ctx.request.body

    var addSql = 'INSERT INTO testblogs(blogname,blogcont) VALUES(?,?)';
    var addSqlParams = [title, content];
    
    await db.query(addSql, addSqlParams).then(resp => {
        ctx.body = {
            resp,
            data: 'success',
            status: 200
        }
    }).catch(e=> {
        ctx.body = {
            data: '服务器错误：'+ JSON.parse(e),
            status: 500
        }
    })
})

module.exports = Router
