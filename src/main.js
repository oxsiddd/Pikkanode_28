const Koa = require('koa')
const koaBody = require('koa-body')
const serve = require('koa-static')
const path = require('path')
const render = require('koa-ejs')
const cors = require('@koa/cors')

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

app.use(cors())
   
app.use(koaBody({ maltipart: true }))
app.use(require('./routes'))
app.use(stripPrefix)
app.use(serve(path.join(process.cwd(), 'public')))
app.listen(8000)