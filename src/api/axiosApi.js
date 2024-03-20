//import axios  from 'axios';
import axios from "../axiosConfig";


export async function axiosPost(body) {
    return await axios.post(body);
}

export async function axiosGet(url) {
    return await axios.get(url);
}

export async function axiosGetById(id) {
    return await axios.get(id);
}

export async function axiosPut(body) {
    return await axios.put(body);
}

export async function axiosPatch(body) {
    return await axios.patch(body);
}

export async function axiosDelete() {
    return await axios.delete();
}

export async function axiosDeleteById(id) {
    return await axios.delete(id);
}