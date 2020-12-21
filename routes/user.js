const router = require('koa-router')()
const Admin = require('../dao/admin')
const { sign, decode } = require('../utils/auth')

router.post('/admin/login', async (ctx, next) => {
    ctx.state.noAuth = true
    //用户登录
    const userlist = await new Admin().login(ctx.request.body)
    if (userlist.length) {
        ctx.body = { token: sign(userlist[0]) }
    } else {
        ctx.throw(403)
    }
    await next()
})

router.get('/admin/auth', async (ctx, next) => {
    ctx.state.noAuth = true
    //通过token获取用户信息
    console.log(decode(ctx.request.query['token'])== 'null')
    if (
        !ctx.request.query['token'] ||
        decode(ctx.request.query['token']) == null
    ) {
        ctx.throw(403)
    }
    ctx.body = decode(ctx.request.query['token'])
    await next()
})

module.exports = router
