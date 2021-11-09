import axios from 'axios';
import { BASE_URL, USER_LOGIN } from '../settings/apiConfig';

const callApiToken = (endpoint, method = 'GET', data = null) =>{
    return axios({
        url: `${BASE_URL}/${endpoint}`,
        method,
        data,
        header: 
        [
            {'token': localStorage.getItem(USER_LOGIN)},
            {'tokenByClass': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxMiIsIkhldEhhblN0cmluZyI6IjA4LzAzLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY0NjY5NzYwMDAwMCIsIm5iZiI6MTYxNzkwMTIwMCwiZXhwIjoxNjQ2ODQ1MjAwfQ.mPmSkXNXN1frPpzs9CbkOn1tlxu1XGzuT_3jPckLDnU'}
            
        ]
      });
}
export default callApiToken;