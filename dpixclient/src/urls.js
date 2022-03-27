const API = "";

export const url = API

export const info = id => `${API}/pic/${id}/info`;

export const fix = url => `${API}/fix?url=${url}`;

export const fixUgoira = (url, delay) => `${API}/fixUgoira?url=${url}&delay=${delay}`;

export const similar = id => `${API}/pic/${id}/similar`;

export const shortGroupInfo = ids => `${API}/pics/shortGroupInfo?ids=${ids}`;

export const discovery = `${API}/user/discovery`;

export const recomendation = id => `${API}/pic/${id}/recommendation`;

export const following = page => `${API}/user/following/${page}`;

export const botAuth = (session) => `https://t.me/dpixivbot?start=session_${session}`

export const userInfo = `${API}/user/info`;

export const userExtra = `${API}/user/extra`;

export const ugoira = id => `${API}/pic/${id}/ugoira`;
