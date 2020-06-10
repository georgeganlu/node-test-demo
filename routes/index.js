const router = require('koa-router')()
const path = require("path");
const fs = require("fs");
const io = require('../bin/www');


// io.on('connection', (socket) => {
//     io.emit('urgentNotice',{
//         data: 'asdfasdfasdfasdfasdfasdfasdfasdfasdf'
//     });
// });




router.get('/', async (ctx, next) => {
    
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    })
})

router.get('/string', async (ctx, next) => {

    // io.on('connection', (socket) => {
    //     io.emit('urgentNotice',{
    //         data: 'asdfasdfasdfasdfasdfasdfasdfasdfasdf'
    //     });
    // });

    // io.emit('urgentNotice',{
    //     data: 'george urgentNotice',
    // });
    console.log(ctx.request.body, 'body的数据');

    ctx.body = {
        msg: '测试 json的值是不是对的。',
    }
})

router.post('/json', async (ctx, next) => {
    console.log(ctx.request.body, 'body的内容是什么');
    ctx.body = {
        title: 'koa2 json'
    }
})

router.post('/fileUpload', async (ctx, next) => {
    // console.log(230234234);
    // console.log(ctx.request.body);    
    // console.log(ctx.request.files);
    ctx.body = {
        "upload": "test",
    }
});

router.post('/fileBase64', async (ctx, next) => {
    let str = ctx.request.body;
    fs.writeFileSync('data.json', JSON.stringify(str, '', '\t'));
    // var base64Data = str.data.replace(/^data:image\/\w+;base64,/, "");
    // var dataBuffer = new Buffer(base64Data, 'base64');
    // let path1 = path.resolve(__dirname, 'dist');
    // fs.writeFileSync(path1, dataBuffer);

    // fs.writeFile("1.jpg", dataBuffer, function (err) {
    //     if (err) {
    //         ctx.body(err);
    //     } else {
    //         ctx.body("保存成功！");
    //     }
    // });
    // var base64Data = str.data.replace(/^data:image\/\w+;base64,/, "");
    // let bufferStr = Buffer.from(base64Data, 'base64');  
    // let path1 = path.join(__dirname, '../disk/');
    // fs.writeFileSync(path1, bufferStr);
    ctx.body = {
        "upload": "test",
    }
});

router.get("/test1/:key1/test2/:key2", async (ctx, next) => {
    console.log(ctx.params);
    ctx.body = {
        status: "200",
        message: '测试成功'
    };
});


// 简单请求和非简单请求。
router.get('/simple', async (ctx, next) => {
    // console.log(ctx.params);
    ctx.set('Access-Control-Allow-Origin', '*');
    // ctx.set('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, HEAD, DELETE, PUT');
    // ctx.set("Access-Control-Allow-Headers", Object.keys(ctx.request.header).join(','));
    ctx.body = {
        status: "200",
        message: '测试成功'
    };
});

// 简单请求和非简单请求。
router.post('/simple', async (ctx, next) => {
    // console.log(ctx.params);
    ctx.set('Access-Control-Allow-Origin', '*');
    // ctx.set('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, HEAD, DELETE, PUT');
    // ctx.set("Access-Control-Allow-Headers", Object.keys(ctx.request.header).join(','));
    ctx.body = {
        status: "200",
        message: '测试成功'
    };
});

// 现在这里需要处理options请求的情况。
router.put('/simple', async (ctx, next) => {
    // ctx.set('Access-Control-Allow-Origin', '*');
    // ctx.set('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, HEAD, DELETE, PUT');
    // ctx.set("Access-Control-Allow-Headers", Object.keys(ctx.request.header).join(','));
    ctx.body = {
        status: "200",
        message: '测试成功'
    };
});


router.get('/complex', async (ctx, next) => {
    console.log(ctx.params);
    ctx.body = {
        status: "200",
        message: '测试成功'
    };
});


module.exports = router;