const bcrypt = require('bcrypt')
const { user } = require('../../models') 

const getHandler = async (ctx, next) => {
    let data = {
        title: 'Sign up',
        text: 'Sign up'
    }
    await ctx.render('signup', data)
    await next()
}

const postHandler = async (ctx) => {
    const { email, password, rePassword } = ctx.request.body
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword)
    const checkPassword = await bcrypt.compare(rePassword, hashedPassword)
    if(!checkPassword){
        console.log('wrong password')
        return ctx.redirect('/signup')
    } 
        console.log('password correct')
        const userId = await user.register(email, hashedPassword)
        // console.log('e-mail: ', ctx.request.body.email)
        // console.log('password: ', ctx.request.body.password)
        // console.log('rePassword: ', ctx.request.body.repassword)
        ctx.status = 303
        ctx.redirect('/')
    
}

module.exports = { 
    getHandler,
    postHandler
}