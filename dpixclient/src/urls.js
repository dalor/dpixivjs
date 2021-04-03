const API = "";

const FIX_URL = API + "/fix?url=";

export const info = id => `${API}/info/${id}`;

export const fix = url => FIX_URL + url;

export const similar = id => `${API}/similar/${id}`;

export const shortGroupInfo = ids => `${API}/shortGroupInfo?ids=${ids}`;

export const discovery = API + "/discovery";

export const recomendation = id => `${API}/recommendation/${id}`;

export const following = page => `${API}/following/${page}`;
