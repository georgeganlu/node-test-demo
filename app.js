const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa-cors');

const index = require('./routes/index')
const users = require('./routes/users')
const koaBody = require('koa-body');
const path = require("path");
// error handler
onerror(app);

// app.use(cors());

// middlewares

// app.use(bodyparser({
//     enableTypes: ['json', 'form', 'text'],   
// }))

app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 2000 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
        uploadDir: 'disk',
    },
    jsonLimit: "50mb",
    textLimit: "50mb",
    formLimit: "50mb"
}))


app.use(json())
app.use(logger())
app.use(require('koa-static')(path.join(__dirname + '/public')));

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))


// logger
app.use(async (ctx, next) => {
    // 处理options请求。
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, x-header');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, HEAD');
    ctx.set('Access-Control-Max-Age', '1800');
    if (ctx.request.method === 'OPTIONS') {
        // ctx.set("Access-Control-Allow-Origin", '*');
        //指定服务器允许进行跨域资源访问的请求方法列表，一般用在响应预检请求上
        // ctx.set("Access-Control-Allow-Methods", "OPTIONS,POST,GET,HEAD,DELETE,PUT");
        // ctx.set('Access-Control-Allow-Headers', 'Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With');
        //必需。指定服务器允许进行跨域资源访问的请求头列表，一般用在响应预检请求上
        ctx.body = 200; 
    }

    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app