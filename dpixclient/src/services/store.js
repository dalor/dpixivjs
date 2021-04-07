import { createStore } from 'redux'
import Cookies from 'js-cookie'

const dataStorageKey = "dPixivData"

const saveData = (data) => {
    localStorage.setItem(dataStorageKey, JSON.stringify(data));
};

const loadData = () => {
    const data = localStorage.getItem(dataStorageKey)
    return data && JSON.parse(data)
}

const loadTokenFromCookie = () => Cookies.get('pixivSession')

const load = () => {
    const data = loadData() || {}
    const pixivSession = loadTokenFromCookie()
    if (pixivSession) {
        Object.assign(data, { token: pixivSession })
        saveData(data)
    }
    return data
};

export default createStore((state = {}, action) => {
    if (action.type === "saveData") {
        const data = Object.assign({}, state, action.data || {})
        saveData(data)
        return data
    }
    if (!state.token) {
        return Object.assign({}, state, load())
    }
    return state
})