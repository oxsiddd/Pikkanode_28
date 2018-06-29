const Router = require('koa-router')
const koaBody = require('koa-body')

const create = require('./create')
const home = require('./home')
const detail = require('./detail')
const comment = require('./comment')
const like = require('./like')

const router = new Router()

const checkAuth = async (ctx, next) => {
    if (!ctx.session || !ctx.session.userId) {
        ctx.body = 'you are not signed in'
        return ctx.redirect('/signin')
    }
    await next()
}


router.get('/create', create.getHandler)
// router.post('/create', create.postHandler)
router.post('/create', koaBody({ multipart: true }), create.postHandler)
router.get('/', checkAuth, home.getHandler)
router.post('/', home.postHandler)
router.get('/pikka/:id', detail.getHandler)
router.post('/pikka/:id/comment', comment.postHandler)
router.post('/pikka/id/like', like.postHandler)

module.exports = router.routes()