import callApi from "../utils/callApi";
import axios from 'axios';import callApiToken from "../utils/CallApiToken";
;

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
      return callApiToken(`api/rooms/booking`, 'POST', reserve, token)
   },
   getComment(id){
      return callApi(`api/reviews/byRoom?roomId=${id}`);
   },
   createComment(id, content, token){
       return callApiToken(`api/reviews?roomId=${id}`, 'POST', content, token)
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
       return callApiToken(`api/reviews/${id}`, 'PUT', content, token)
   },
   getInformation(id){
      return callApi(`api/users/${id}`);
   },
   updateAvatar(image, token){
       return callApiToken(`api/users/upload-avatar`, 'POST', image, token)
   }
   ,
   updateUser(id, content, token){
       return callApiToken(`api/users/${id}`, 'PUT', content, token)
   },
   getMoreDEtail(id){
      return callApi(`api/locations/${id}`);
   },
   createNewLocation(content, token){
       return callApiToken(`api/locations`, 'POST', content, token)
   },
   updateImageForLocation(id, image, token){
       return callApiToken(`api/locations/upload-images/${id}`, 'POST', image, token)
   },
   updateInputLocation(id, input, token){
       return callApiToken(`api/locations/${id}`, 'PUT', input, token)
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
       return callApiToken(`api/rooms`, 'POST', room, token)
   },
   changeImageValue(id, image, token){
       return callApiToken(`api/rooms/upload-image/${id}`, 'POST', image, token)
   },
   changeRoom(id, content, token){
       return callApiToken(`api/rooms/${id}`, 'PUT', content, token)
   },
   getUserAdmin(){
      return callApi(`api/users/pagination`);
   },
   addUser(user, token){
       return callApiToken(`api/users`, 'POST', user, token)
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
   },
   deleteRoomAdmin(id, token){
      return axios({
         url: `https://airbnb.cybersoft.edu.vn/api/rooms/${id}`,
         method: 'DELETE',
         headers: {'token': `${token}`, 
         'tokenByClass': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxMiIsIkhldEhhblN0cmluZyI6IjA4LzAzLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY0NjY5NzYwMDAwMCIsIm5iZiI6MTYxNzkwMTIwMCwiZXhwIjoxNjQ2ODQ1MjAwfQ.mPmSkXNXN1frPpzs9CbkOn1tlxu1XGzuT_3jPckLDnU'}
       });
   }
  
};

export default locationApi;