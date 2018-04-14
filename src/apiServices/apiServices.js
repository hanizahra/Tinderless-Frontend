import axios from 'axios';

const apiServices = {};

apiServices.addUser = (user) => {
  axios({
    method: 'POST',
    url: '/api/DatingApp',
    data: {
      username: user.username,
      email: user.email,
      password: user.password
      // gender: ,
      // age: ,
      // gender_seeking: ,
      // age_seeking: ,
      // photo: ,
      // profile_id:
    }
  })
  console.log('apiServices has received this data -->', user)
}


export default apiServices;
