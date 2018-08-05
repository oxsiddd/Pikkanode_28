const Router = require('koa-router')
const koaBody = require('koa-body')
const auth = require('../../../../services/auth')

const router = new Router()

const signIn = async (ctx) => {
    const {email, password} = ctx.request.body
	const ok = await auth.signIn(email, password)
	
	if (!ok) {
		ctx.status = 400
		ctx.body = {
			error: 'wrong email or password'
		}
		return
	}

	ctx.body = {
		
	}

}

const signUp = async (ctx) => {
	const {email, password} = ctx.request.body
	const ok = await auth.signUp(email, password)
	console.log(ok.insertId	)
	if (!ok) {
		ctx.status = 400
		ctx.body = {
			error: 'wrong email or password'
		}
		return
	}
	if (ok){
		return ctx.body = `userId: ${ok.insertId}`
	}
	
}

function signOut (ctx) {
	ctx.status = 500
	ctx.body = {
		error: 'sign out not implement'
	}
}


router.post('/signin', signIn)
router.post('/signup', koaBody({ multipart: true }), signUp)
router.post('/signout', signOut)

module.exports = router.routes()