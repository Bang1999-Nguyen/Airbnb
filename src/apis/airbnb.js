import callApi from "../utils/callApi";
import axios from 'axios';;

const locationApi = {
 getLocation(token){
    return callApi('api/locations', token);
 },
 getDetailOfLocation(id){
    return callApi(`api/rooms?locationId=${id}`);
   },
  
   logIn(user){
      return callApi(`api/auth/login`, 'POST', user);
   },
   register(user){
      return callApi(`api/auth/register`, 'POST', user);
   },
   getRoom(id){
      return callApi(`api/rooms/${id}`);
   },
   reserveRoom(reserve, token){
      return axios({
         url: "https://airbnb.cybersoft.edu.vn/api/rooms/booking",
         method: 'POST',
         data:reserve,
         headers: {'token': `${token}`, 
         'tokenByClass': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxMiIsIkhldEhhblN0cmluZyI6IjA4LzAzLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY0NjY5NzYwMDAwMCIsIm5iZiI6MTYxNzkwMTIwMCwiZXhwIjoxNjQ2ODQ1MjAwfQ.mPmSkXNXN1frPpzs9CbkOn1tlxu1XGzuT_3jPckLDnU'}
       });
   },
   getComment(id){
      return callApi(`api/reviews/byRoom?roomId=${id}`);
   },
   createComment(id, content, token){
      return axios({
         url: `https://airbnb.cybersoft.edu.vn/api/reviews?roomId=${id}`,
         method: 'POST',
         data:content,
         headers: {'token': `${token}`, 
         'tokenByClass': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxMiIsIkhldEhhblN0cmluZyI6IjA4LzAzLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY0NjY5NzYwMDAwMCIsIm5iZiI6MTYxNzkwMTIwMCwiZXhwIjoxNjQ2ODQ1MjAwfQ.mPmSkXNXN1frPpzs9CbkOn1tlxu1XGzuT_3jPckLDnU'}
       });
   },
   deleteComment(id, token){
      return axios({
         url: `https://airbnb.cybersoft.edu.vn/api/reviews/${id}`,
         method: 'DELETE',
         headers: {'token': `${token}`, 
         'tokenByClass': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxMiIsIkhldEhhblN0cmluZyI6IjA4LzAzLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY0NjY5NzYwMDAwMCIsIm5iZiI6MTYxNzkwMTIwMCwiZXhwIjoxNjQ2ODQ1MjAwfQ.mPmSkXNXN1frPpzs9CbkOn1tlxu1XGzuT_3jPckLDnU'}
       });
   },
   updateComment(id, content, token){
      return axios({
         url: `https://airbnb.cybersoft.edu.vn/api/reviews/${id}`,
         method: 'PUT',
         data:content,
         headers: {'token': `${token}`, 
         'tokenByClass': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxMiIsIkhldEhhblN0cmluZyI6IjA4LzAzLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY0NjY5NzYwMDAwMCIsIm5iZiI6MTYxNzkwMTIwMCwiZXhwIjoxNjQ2ODQ1MjAwfQ.mPmSkXNXN1frPpzs9CbkOn1tlxu1XGzuT_3jPckLDnU'}
       });
   },
   getInformation(id){
      return callApi(`api/users/${id}`);
   },
   updateAvatar(image, token){
      return axios({
         url: `https://airbnb.cybersoft.edu.vn/api/users/upload-avatar`,
         method: 'POST',
         data:image,
         headers: {'token': `${token}`, 
         'tokenByClass': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxMiIsIkhldEhhblN0cmluZyI6IjA4LzAzLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY0NjY5NzYwMDAwMCIsIm5iZiI6MTYxNzkwMTIwMCwiZXhwIjoxNjQ2ODQ1MjAwfQ.mPmSkXNXN1frPpzs9CbkOn1tlxu1XGzuT_3jPckLDnU'}
       });
   }
   ,
   updateUser(id, content, token){
      return axios({
         url: `https://airbnb.cybersoft.edu.vn/api/users/${id}`,
         method: 'PUT',
         data:content,
         headers: {'token': `${token}`, 
         'tokenByClass': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxMiIsIkhldEhhblN0cmluZyI6IjA4LzAzLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY0NjY5NzYwMDAwMCIsIm5iZiI6MTYxNzkwMTIwMCwiZXhwIjoxNjQ2ODQ1MjAwfQ.mPmSkXNXN1frPpzs9CbkOn1tlxu1XGzuT_3jPckLDnU'}
       });
   },
   getMoreDEtail(id){
      return callApi(`api/locations/${id}`);
   },
   createNewLocation(content, token){
      return axios({
         url: `https://airbnb.cybersoft.edu.vn/api/locations`,
         method: 'POST',
         data:content,
         headers: {'token': `${token}`, 
         'tokenByClass': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxMiIsIkhldEhhblN0cmluZyI6IjA4LzAzLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY0NjY5NzYwMDAwMCIsIm5iZiI6MTYxNzkwMTIwMCwiZXhwIjoxNjQ2ODQ1MjAwfQ.mPmSkXNXN1frPpzs9CbkOn1tlxu1XGzuT_3jPckLDnU'}
       });
   },
   updateImageForLocation(id, image, token){
      return axios({
         url: `https://airbnb.cybersoft.edu.vn/api/locations/upload-images/${id}`,
         method: 'POST',
         data:image,
         headers: {'token': `${token}`, 
         'tokenByClass': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxMiIsIkhldEhhblN0cmluZyI6IjA4LzAzLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY0NjY5NzYwMDAwMCIsIm5iZiI6MTYxNzkwMTIwMCwiZXhwIjoxNjQ2ODQ1MjAwfQ.mPmSkXNXN1frPpzs9CbkOn1tlxu1XGzuT_3jPckLDnU'}
       });
   },
   updateInputLocation(id, input, token){
      return axios({
         url: `https://airbnb.cybersoft.edu.vn/api/locations/${id}`,
         method: 'PUT',
         data:input,
         headers: {'token': `${token}`, 
         'tokenByClass': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxMiIsIkhldEhhblN0cmluZyI6IjA4LzAzLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY0NjY5NzYwMDAwMCIsIm5iZiI6MTYxNzkwMTIwMCwiZXhwIjoxNjQ2ODQ1MjAwfQ.mPmSkXNXN1frPpzs9CbkOn1tlxu1XGzuT_3jPckLDnU'}
       });
   },
   deleteLocationAdmin(id, token){
      return axios({
         url: `https://airbnb.cybersoft.edu.vn/api/locations/${id}`,
         method: 'DELETE',
         headers: {'token': `${token}`, 
         'tokenByClass': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxMiIsIkhldEhhblN0cmluZyI6IjA4LzAzLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY0NjY5NzYwMDAwMCIsIm5iZiI6MTYxNzkwMTIwMCwiZXhwIjoxNjQ2ODQ1MjAwfQ.mPmSkXNXN1frPpzs9CbkOn1tlxu1XGzuT_3jPckLDnU'}
       });
   },
   createRoom(room, token){
      return axios({
         url: `https://airbnb.cybersoft.edu.vn/api/rooms`,
         method: 'POST',
         data:room,
         headers: {'token': `${token}`, 
         'tokenByClass': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxMiIsIkhldEhhblN0cmluZyI6IjA4LzAzLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY0NjY5NzYwMDAwMCIsIm5iZiI6MTYxNzkwMTIwMCwiZXhwIjoxNjQ2ODQ1MjAwfQ.mPmSkXNXN1frPpzs9CbkOn1tlxu1XGzuT_3jPckLDnU'}
       });
   },
   changeImageValue(id, image, token){
      return axios({
         url: `https://airbnb.cybersoft.edu.vn/api/rooms/upload-image/${id}`,
         method: 'POST',
         data:image,
         headers: {'token': `${token}`, 
         'tokenByClass': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxMiIsIkhldEhhblN0cmluZyI6IjA4LzAzLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY0NjY5NzYwMDAwMCIsIm5iZiI6MTYxNzkwMTIwMCwiZXhwIjoxNjQ2ODQ1MjAwfQ.mPmSkXNXN1frPpzs9CbkOn1tlxu1XGzuT_3jPckLDnU'}
       });
   },
   changeRoom(id, content, token){
      return axios({
         url: `https://airbnb.cybersoft.edu.vn/api/rooms/${id}`,
         method: 'PUT',
         data:content,
         headers: {'token': `${token}`, 
         'tokenByClass': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxMiIsIkhldEhhblN0cmluZyI6IjA4LzAzLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY0NjY5NzYwMDAwMCIsIm5iZiI6MTYxNzkwMTIwMCwiZXhwIjoxNjQ2ODQ1MjAwfQ.mPmSkXNXN1frPpzs9CbkOn1tlxu1XGzuT_3jPckLDnU'}
       });
   },
   getUserAdmin(){
      return callApi(`api/users/pagination`);
   },
   addUser(user, token){
      return axios({
         url: `https://airbnb.cybersoft.edu.vn/api/users`,
         method: 'POST',
         data:user,
         headers: {'token': `${token}`, 
         'tokenByClass': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxMiIsIkhldEhhblN0cmluZyI6IjA4LzAzLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY0NjY5NzYwMDAwMCIsIm5iZiI6MTYxNzkwMTIwMCwiZXhwIjoxNjQ2ODQ1MjAwfQ.mPmSkXNXN1frPpzs9CbkOn1tlxu1XGzuT_3jPckLDnU'}
       });
   },
   deleteUserAdmin(id, token){
      return axios({
         url: `https://airbnb.cybersoft.edu.vn/api/users/${id}`,
         method: 'DELETE',
         headers: {'token': `${token}`, 
         'tokenByClass': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxMiIsIkhldEhhblN0cmluZyI6IjA4LzAzLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY0NjY5NzYwMDAwMCIsIm5iZiI6MTYxNzkwMTIwMCwiZXhwIjoxNjQ2ODQ1MjAwfQ.mPmSkXNXN1frPpzs9CbkOn1tlxu1XGzuT_3jPckLDnU'}
       });
   },
   getTicketsOfYou(id){
      return callApi(`api/tickets/by-user?userId=${id}`);
   }
  
};

export default locationApi;