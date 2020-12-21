const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const { verify } = require('./utils/auth')
const { token } = require('./config')

const routeList = [
    require('./routes/index'),
    require('./routes/users'),
    require('./routes/user'),
]

// error handler
onerror(app)

// middlewares
app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text'],
    })
)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(cors()) //跨域

app.use(
    views(__dirname + '/views', {
        extension: 'pug',
    })
)

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
routeList.forEach((route, index) => {
    route.prefix('/api/v1') //设置前缀
    app.use(route.routes(), route.allowedMethods())
})

/**
 * token 验证 :根据每个路由的noAuth来判断是否需要判断token，所以放在路由注册下
 *              也可以每个路由中不写 await next() ,这样就不会执行鉴权中间件
 */
app.use(async (ctx, next) => {
    if (ctx.state.noAuth) {
        await next()
    } else {
        await verify()(ctx, next)
    }
})

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
