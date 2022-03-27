import { info, similar, shortGroupInfo, recomendation, following, discovery, ugoira } from "../urls";

export const infoFetch = (id) => fetch(info(id))
    .then(res => res.json())
    .then(res => res.data || null)
    .catch(() => null)

export const similarFetch = (id, token) => fetch(similar(id),
    {
        headers: { Token: token },
    })
    .then(res => res.json())
    .then(res => res.data?.ids || null)
    .catch(() => null)

export const shortGroupInfoFetch = (ids, token) => fetch(shortGroupInfo(ids),
    {
        headers: { Token: token },
    })
    .then(res => res.json())
    .then(res => res.data || null)
    .catch(() => null)

export const recomendationFetch = (id, token) => fetch(recomendation(id),
    {
        headers: { Token: token },
    })
    .then(res => res.json())
    .then(res => res.data?.ids || null)
    .catch(() => null)

export const followingFetch = (page, token) => fetch(following(page),
    {
        headers: { Token: token },
    })
    .then(res => res.json())
    .then(res => res.data?.ids || null)
    .catch(() => null)

export const discoveryFetch = (token) => fetch(discovery,
    {
        headers: { Token: token },
    })
    .then(res => res.json())
    .then(res => res.data?.ids || null)
    .catch(() => null)

export const ugoiraFetch = (id, token) => fetch(ugoira(id),
    {
        headers: { Token: token },
    })
    .then(res => res.json())
    .then(res => res.data || null)
    .catch(() => null)

