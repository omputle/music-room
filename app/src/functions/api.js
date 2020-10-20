import axios from 'axios'
import keys from '@/configs/config'

export function post(path, data) {
    return new Promise((yes, no) => {
        axios({
            method: 'post',
            url: `${keys.url}${path}`,
            headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`},
            data: data
        }).then(res => {yes(res)}).catch(e => {no(e)})
    })
}

export function get(path) {
    return new Promise((yes, no) => {
        axios({
            method: 'get',
            url: `${keys.url}${path}`,
            headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`}
        }).then(res => {yes(res)}).catch(e => {no(e)})
    })
}

export function del(path, data) {
    return new Promise((yes, no) => {
        axios({
            method: 'delete',
            url: `${keys.url}${path}`,
            headers: {'Authorization': `Bearer ${localStorage.getItem("deez")}`},
            data: data
        }).then(res => {yes(res)}).catch(e => {no(e)})
    })
}
