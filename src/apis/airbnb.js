import callApi from "../utils/callApi";
const locationApi = {
 getLocation(token){
    return callApi('api/locations', token);
 },
 getDetailOfLocation(id){
    return callApi(`api/rooms?locationId=${id}`);
   },
};

export default locationApi;