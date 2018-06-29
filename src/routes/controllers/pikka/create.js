const fs = require('fs-extra')
const uuidv4 = require('uuid/v4')
const path = require('path')
const { user } = require('../../../models')

const pictureDir = path.join(process.cwd(), 'public', 'assets', 'images')

const getHandler = async (ctx, next) => {
    let data = {
        title: 'Uploads',
        text: 'Uploads',
        session: ctx.session.userId
    }
    await ctx.render('create', data)
    await next()
}

const allowFileType = {
  'image/png': true,
  'image/jpeg': true
}

const postHandler = async (ctx) => {
  try {
    // check allow file type
    if (!allowFileType[ctx.request.files.photo.type]) {
      throw new Error('file type not allow')
    }
    // form datas
    // console.log(ctx.request.body.caption)
    // console.log(ctx.request.body.detail)
    // file datas
    // console.log(ctx.request.files.photo.name)
    // console.log(ctx.request.files.photo.path)
    const fileName = uuidv4() // generate uuid for file name
    // move uploaded file from temp dir to destination
    const rand = 1
    const uploadDB = await user.upload(fileName, ctx.request.body.caption, rand)
    await fs.rename(ctx.request.files.photo.path, path.join(pictureDir, `${fileName}.jpg`))
    ctx.redirect('/')
  } catch (err) {
    // handle error here
    ctx.status = 400
    ctx.body = err.message
    console.error(err)
    // remove uploaded temporary file when the error occurs
    fs.remove(ctx.request.files.photo.path)
  }
}

module.exports = {
    getHandler,
    postHandler
}