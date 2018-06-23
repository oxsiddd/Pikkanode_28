const getHandler = async (ctx, next) => {
    let data = {
        title: 'Sign In',
        text: 'Sign in'
    }
    await ctx.render('signin', data)
    await next()
}

const postHandler = async (ctx, next) => {
    let data = {
        title: 'Sign In',
        text: 'Sign in'
    }
    console.log('e-mail: ', ctx.request.body.email)
    console.log('password: ', ctx.request.body.password)
    ctx.status = 303
    ctx.redirect('/signin')
    await ctx.render('signin', data)
    await next()
}

module.exports = {
    getHandler,
    postHandler
}