const { user } = require('../../models') 

const getHandler = async (ctx, next) => {
    let data = {
        title: 'Sign up',
        text: 'Sign up'
    }
    await ctx.render('signup', data)
    await next()
}

const postHandler = async (ctx, next) => {
    const { email, password } = ctx.request.body
    const userId = await user.register(email, password)
    let data = {
        title: 'Sign up',
        text: 'Sign up'
    }
    console.log('e-mail: ', ctx.request.body.email)
    console.log('password: ', ctx.request.body.password)
    console.log('repassword: ', ctx.request.body.repassword)
    ctx.status = 303
    ctx.redirect('/signup')
    await ctx.render('signup', data)
    await next()
}

module.exports = { 
    getHandler,
    postHandler
}