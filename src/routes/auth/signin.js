const bcrypt = require('bcrypt')
// const session = require('koa-session')
const { user } = require('../../models')

const getHandler = async (ctx, next) => {
    let data = {
        title: 'Sign In',
        text: 'Sign in',
        flash: ctx.flash
    }
    await ctx.render('signin', data)
    await next()
}

const postHandler = async (ctx) => {
    let signInEmail = ctx.request.body.email
    let signInPassword = ctx.request.body.password

    const getMail = await user.login(signInEmail)
    console.log(getMail)
    if(getMail === []){
        ctx.session.flash = { error: 'username not found' }
        return ctx.redirect('/signin')
    }

    let dbEmail = getMail[0].email
    let dbPassword = getMail[0].password
    const checkPassword = await bcrypt.compare(signInPassword, dbPassword)
    console.log('e-mail: ', dbEmail)
    console.log('password: ', dbPassword)
        
    if(signInEmail !== dbEmail){
        console.log('unknow user')
        ctx.session.flash = { error: 'username invalid' }
        return ctx.redirect('/signin')
    }else if(!checkPassword){
        console.log('password incorrect')
        ctx.session.flash = { error: 'password invalid' }
        return ctx.redirect('/signin')
    }
    console.log('login success')
    ctx.session.userId = 13242
    ctx.redirect('/')
        
    //}   

}

module.exports = {
    getHandler,
    postHandler
}