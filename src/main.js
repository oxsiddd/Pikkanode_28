const Koa = require('koa')
// const koaBody = require('koa-body')
const serve = require('koa-static')
const path = require('path')
const render = require('koa-ejs')
const cors = require('@koa/cors')
const session = require('koa-session')

const app = new Koa()

const stripPrefix = async (ctx, next) => {
    if (!ctx.path.startsWith('/-')) {
        ctx.status = 404
        return
    }

    ctx.path = ctx.path.slice(2)
    await next()
}

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'template',
    viewExt: 'ejs',
    cache: false
})

const sessionStore = {}
const sessionConfig = {
    key: 'sess',
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    store: {
        get (key, maxAge, { rolling }) {
            return sessionStore[key]
        },
        set (key, sess, maxAge, { rolling }) {
            sessionStore[key] = sess
        },
        destroy (key) {
            delete sessionStorage[key]
        }
    }
}

const flash = async (ctx, next) => { // Flash middleware
    if (!ctx.session) throw new Error('flash message required session')
    ctx.flash = ctx.session.flash
    delete ctx.session.flash
    await next()
}


app.use(cors({
    credentials: true
})) 
app.keys = ['supersecret']
app.use(session(sessionConfig, app))
app.use(flash) 
app.use(require('./routes'))
app.use(stripPrefix)
app.use(serve(path.join(process.cwd(), 'public')))
app.listen(8000)