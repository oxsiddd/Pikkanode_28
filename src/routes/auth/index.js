const Router = require('koa-router')
const koaBody = require('koa-body')

const signIn = require('./signin')
const signUp = require('./signup')

const router = new Router()

const passAuth = async (ctx, next) => {
    if (ctx.session && ctx.session.userId) {
        ctx.body = 'you are not signed in'
        return ctx.redirect('/')
    }
    await next()
}



router.get('/signin', passAuth, signIn.getHandler)
router.post('/signin', koaBody({ multipart: true }), signIn.postHandler)
router.get('/signup', passAuth, signUp.getHandler)
router.post('/signup', koaBody({ multipart: true }), signUp.postHandler)

module.exports = router.routes()