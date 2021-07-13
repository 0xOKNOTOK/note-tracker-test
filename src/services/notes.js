import axios from 'axios';
const baseUrl = 'http://localhost:3001/notes';

const getAll = () => {
    const req = axios.get(baseUrl);
    const fakeNote = {
        id: 10000,
        content: 'This note is not saved to the server',
        date: '2020-04039T16:50:21.098Z',
        important: true,
    };
    return req.then((res) => res.data.concat(fakeNote));
};

const create = (newObject) => {
    const req = axios.post(baseUrl, newObject);
    return req.then((res) => res.data);
};

const update = (id, newObject) => {
    const req = axios.put(`${baseUrl}/${id}`, newObject);
    return req.then((res) => res.data);
};

export default {
    getAll,
    create,
    update,
};
