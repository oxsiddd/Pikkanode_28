
const getHandler = async (ctx) => {
    ctx.session.userId = null
    ctx.redirect('/signin')
}

const postHandler = async (ctx) => {
    

}

module.exports = {
    getHandler,
    postHandler
}