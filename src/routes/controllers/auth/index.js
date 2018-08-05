const Router = require('koa-router')
const koaBody = require('koa-body')

const signIn = require('./signin')
const signUp = require('./signup')
const signOut = require('./signout')

//const auth = require('../../../services/auth')

const router = new Router()

const passAuth = async (ctx, next) => {
    if (ctx.session && ctx.session.userId) {
        ctx.body = 'you are not signed in'
        return ctx.redirect('/')
    }
    await next()
}

const checkAuth = async (ctx, next) => {
    if (!ctx.session || !ctx.session.userId) {
        ctx.body = 'you are not signed in'
        return ctx.redirect('/signin')
    }
    await next()
}

router.get('/signin', passAuth, signIn.getHandler)
router.post('/signin', koaBody({ multipart: true }), signIn.postHandler)
router.get('/signup', passAuth, signUp.getHandler)
router.post('/signup', koaBody({ multipart: true }), signUp.postHandler)
router.get('/signout', checkAuth, signOut.getHandler)

// router.get('/signin', passAuth, auth.getSignIn)
// router.post('/signin', koaBody({ multipart: true }), auth.postSignIn)
// router.get('/signup', passAuth, auth.getSignUp)
// router.post('/signup', koaBody({ multipart: true }), auth.postSignUp)
// router.get('/signout', checkAuth, auth.getSignOut)
// router.post('/signout', koaBody({ multipart: true }), signOut.postHandler)

module.exports = router.routes()