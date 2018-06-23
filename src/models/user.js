const pool = require('../db/connect')

const register = async (email, password) => {
	const result = await pool.query(`
		insert into users
			(email, password)
		values
			(?, ?)
	`, [ email, password ])

	// ????
	return 1
}
const upload = async (filename, caption, rand) => {
	const result = await pool.query(`
		insert into pictures
			(id, caption, created_by)
		values
			(?, ?, ?)
	`, [ filename, caption, rand ])

	// ????
	return 1
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
	upload,
	showData
}