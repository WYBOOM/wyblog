const router = require('koa-router')()

router.get('/', async (ctx, next) => {
    ctx.state.noAuth = true
    await ctx.render('index', {
        title: 'Hello Koa 2!im nonononono here!!!!!!!!!!',
    })
    await next()
})

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string'
    await next()
})

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json',
    }
})

module.exports = router
