const http = require('http');
const koa = require('koa');
const etag = require('koa-etag');
const bodyParser = require('koa-bodyparser');
// const errorHandler = require('koa-error');
const compress = require('koa-compress');
const log = global.console.log.bind(console);
const PORT = process.env.PORT || 3456;
// const koaBody = require('koa-body');
const app = new koa();
const router = require('./router');



// app.use(koaBody());

// app.use(errorHandler());
app.use(bodyParser());

app.use(etag());

// compressor
app.use(compress({
    filter: contentType => /text|javascript/i.test(contentType),
    threshold: 2048
}));

app.use(async (ctx, next)=>{
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set("Access-Control-Allow-Credentials", "true")
    ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, WG-App-Version, WG-Device-Id, WG-Network-Type, WG-Vendor, WG-OS-Type, WG-OS-Version, WG-Device-Model, WG-CPU, WG-Sid, WG-App-Id, WG-Token");
    ctx.set("Access-Control-Allow-Methods", "POST, GET");
    ctx.set("Content-Type", "application/json;charset=UTF-8");
    await next()
})

router(app);

http.createServer(app.callback()).listen(PORT);


log('server is running on port: %s', PORT);