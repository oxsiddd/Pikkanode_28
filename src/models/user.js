const pool = require('../db/connect')

const register = async (email, password) => {
	const [result] = await pool.query(`
		insert into users
			(email, password)
		values
			(?, ?)
	`, [ email, password ])

	// ????
	return result
}
const login = async (email) => {
	const [rows] = await pool.query(`
		select
			id, email, password
		from
			users
		where
			email = ?
	`, [ email ])

	console.log(rows)
	return rows
}

const registerFacebook = async (id, name) => {
	const result = await pool.query(`
		insert into facebook_users
			(facebook_user_id, name)
		values
			(?, ?)
	`, [ id, name])

	// ????
	return result[0].facebook_user_id
}
const loginFacebook = async (id) => {
	const [rows] = await pool.query(`
		select
			facebook_user_id, name
		from
			facebook_users
		where
			facebook_user_id = ?
	`, [ id ])

	console.log(rows)
	return rows
}

const upload = async (filename, caption, rand) => {
	const result = await pool.query(`
		insert into pictures
			(id, caption, created_by)
		values
			(?, ?, ?)
	`, [ filename, caption, rand ])

	// ????
	return result[0].id
}

const showData = async (pool) => {
	const [rows] = await pool.query(`
		select * from pictures 
	`)
    //console.log(rows)
    return rows
}

module.exports = {
	register,
	login,
	upload,
	showData
}