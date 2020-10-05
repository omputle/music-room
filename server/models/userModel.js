import { fetchOne, insert } from './query'
const axios = require('axios')
const keys = require('../configs/keys');
// import { hash, compare } from 'bcrypt'

export async function findOrCreate(user_data) {
    var user = await fetchOne('users', ['id', 'username', 'email', 'type'], 'email', user_data.email)
    if (Object.keys(user).length === 0) {
        let insertion = await insert('users', ['username', 'first_name', 'last_name', 'email', 'password', 'type'], [user_data.username, user_data.name, user_data.surname, user_data.email, '$Abc1234', 'oauth'])
        var user = {
            id: insertion.success.insertId, 
            username: user_data.username,
            email: user_data.email
        }
        return user
    }
    return (user[0])
}

export async function fetchUser(uid) {
    let user = await fetchone('users', ['id', 'username'], 'id', uid)
    return (user[0])
}

export async function getDeezerAccessToken(code) {
    let access_url = 'https://connect.deezer.com/oauth/access_token.php?app_id=' + keys.deezer.clientID + '&secret=' + keys.deezer.clientSecret + '&code=' + code;
    try {
        let response = await axios.get(access_url)
        let data = response.data.split("=")[1]
        let access_code = data.split("&")[0]
        console.log("Access code:", access_code);
    } catch (error) {
        console.log("oops: ", error)
    }
}