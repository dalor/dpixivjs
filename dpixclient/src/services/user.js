import { userInfo, userExtra } from "../urls";

export const userInfoFetch = (token) => fetch(userInfo,
    {
        headers: { Token: token },
    })
    .then(res => res.json())
    .then(res => res.data || null)
    .catch(() => null)

export const userExtraFetch = (token) => fetch(userExtra,
    {
        headers: { Token: token },
    })
    .then(res => res.json())
    .then(res => res.data || null)
    .catch(() => null)