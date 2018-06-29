const { user } = require('../../../models')
const pool = require('../../../db/connect')

const getHandler = async (ctx, next) => {
    const showObject = await user.showData(pool)
    const keyShowData = await Object.keys(showObject[0])
    let data = {
        title: 'Pikkanode',
        text: 'Pikkanode',
        key: keyShowData,
        data: showObject,
        user: '',
        session: ctx.session.userId
    }
    // console.log(showObject)
    // console.log(keyShowData)
    await ctx.render('home', data)
    await next()
}

const postHandler = async (ctx, next) => {

}

module.exports = {
    getHandler,
    postHandler
}