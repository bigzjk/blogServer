const router = require('koa-router');
const Router = router()

const { 
    getBlogList,
    addBlog 
} = require('../utils/blogUtils')

// 获取博客列表
Router.get('/', async (ctx, next)=>{
    console.log(ctx.query);
    ctx.body =  await getBlogList()
})

// 获取博客列表
Router.get('/blog_getlist', async (ctx, next)=>{
    console.log(ctx.query);
    ctx.body =  await getBlogList()
})

// 添加博客文章
Router.post('/blog_add', async (ctx, next)=>{
    console.log('-------', ctx.request);
    ctx.body =  await addBlog(ctx)
})

module.exports = Router
