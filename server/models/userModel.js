import { fetchOne, insert } from './query'
// import { hash, compare } from 'bcrypt'

export async function findOrCreate(user_data) {
    var user = await fetchOne('users', ['id', 'username', 'email', 'type'], 'email', user_data.email)
    if (Object.keys(user).length === 0) {
        console.log("inserting")
        let insertion = await insert('users', ['username', 'first_name', 'last_name', 'email', 'password', 'type'], [user_data.username, user_data.name, user_data.surname, user_data.email, '$Abc1234', 'oauth'])
        return insertion
    }
    return (user[0])
}

export async function fetchUser(uid) {
    let user = await fetchone('users', ['id', 'username'], 'id', uid)
    return (user[0])
}