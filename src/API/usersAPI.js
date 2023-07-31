import axios from 'axios';

export const getUsers = async ({ query, sort, order, page = 1, errorCallback }) => {
  try {
    const res = await axios.get(`https://api.github.com/search/users?q=${query}+in:login`, {
        params: {
            per_page: 10,
            sort,
            order,
            page,
        },
    });
    return res.data;
  } catch (e) {
    console.log(e);
    errorCallback(e);
  }
};

export const getUser = async (login) => {
    try {
        const res = await axios.get(`https://api.github.com/users/${login}`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};