const http = require('http');
const path = require('path')
const koa = require('koa');
const cors = require('@koa/cors');
const etag = require('koa-etag');
// const bodyParser = require('koa-bodyparser');
const static =  require('koa-static')

const compress = require('koa-compress');
const log = global.console.log.bind(console);
const PORT = process.env.PORT || 7777;
const koaBody = require('koa-body');
const app = new koa();
const router = require('./router');

const staticPath = './static'


// compressor
// app.use(compress({
//     // filter: contentType => /text|javascript/i.test(contentType),
//     threshold: 2048
// }));

app.use(async (ctx, next) => {
    ctx.cookies.set('MyName', 'alkun')
    await next()
})
app.use(etag());
app.use(cors());

app.use(async (ctx, next)=>{
    // ctx.set('Access-Control-Allow-Origin', '*')
    // ctx.set("Access-Control-Allow-Credentials", "true")
    // ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, WG-App-Version, WG-Device-Id, WG-Network-Type, WG-Vendor, WG-OS-Type, WG-OS-Version, WG-Device-Model, WG-CPU, WG-Sid, WG-App-Id, WG-Token");
    // ctx.set("Access-Control-Allow-Methods", "POST, GET");
    ctx.set("Content-Type", "application/json");
    await next()
})

app.use(koaBody());
// 设置静态资源
app.use(static(
    path.join(__dirname, staticPath)
))


router(app);

// http.createServer(app.callback()).listen(PORT);
app.listen(PORT);

log('server is running on port: %s', PORT);