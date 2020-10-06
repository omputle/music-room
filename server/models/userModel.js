import { fetchOne, insert, delOne } from './query'
import axios from 'axios'
import jwt from 'njwt'
const keys = require('../configs/keys');

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

//login user & create jwt token & insert token into database
export async function loginUser(user) {
    let token = jwt.create({'name':user}, 'secret')
    token = token.compact()
    insert('tokens', ['username', 'token', 'type'], [user, token, 'jwt'])
    .catch(e => {console.log(e)})
    return (token)
}

//find token user in database
export async function findUserToken(token) {
    return new Promise((yes, no) => {
        fetchOne('tokens', ['username'], 'token', token)
        .then(async user => {
            if(user.length > 0) {
                delOne('tokens', 'token', token).catch(e => {console.log(e)})
                yes(await loginUser(user[0].username))
            } else {no({"error":"not authorized"})}
        }).catch(e => {no({"error":"not authorized"})})
    })
}