import jwt from 'njwt'

import keys from '@/configs/config'

export function verify(token) {
    return new Promise((yes, no) => {
        jwt.verify(token, keys.jwt, (e) => {
            if (e) {
                no()
            } else {yes()}
        })
    })
}