import axios from 'axios';

const apiServices = {};

apiServices.addUser = (user) => {
 return axios({
    method: 'POST',
    url: 'http://localhost:3000/api/DatingApp',
    data: {
      username: user.username,
      email: user.email,
      password: user.password,
      gender: user.gender,
      age: user.age,
      gender_seeking: user.gender_seeking,
      age_seeking: user.age_seeking,
      profile_id: user.profile_id
    }
  });

}

apiServices.addLocation = (location) => {
 return axios({
    method: 'POST',
    url: 'http://localhost:3000/api/DatingApp/location',
    data: {
      name: location.name,
      formatted_address: location.formatted_address,
      place_id: location.place_id,
      url: location.url
    }
  })
  console.log('apiServices has received this data -->', location)
}

apiServices.getOneUser = (id) => {
  return axios.get(`http://localhost:3000/api/DatingApp/${id}`)
}

apiServices.updateUser = (user, id) => {
  return axios({
    method:'PATCH',
    url: `http://localhost:3000/api/DatingApp/${id}`,
    data:
    {
      user: user.age_seeking,
      id: user.gender_seeking,
    }
  })
  console.log('patch is running and user and id are', user)
}

apiServices.addUserPhoto = (userId, photo) => {
 return axios({
    method: 'POST',
    url: 'http://localhost:3000/api/DatingApp/addphoto',
    data: {
      user_id: userId,
      photo: photo
    }
  })
  console.log('apiServices has received this data -->', photo)
}

apiServices.getOnePhoto = (id) => {
  return axios.get(`http://localhost:3000/api/DatingApp/addphoto/${id}`)
}

apiServices.loginUser = (user, password) => {
  return axios({
    method: 'POST',
    url: `http://localhost:3000/api/DatingApp/login`,
    data: {
      username: user,
      password: password
    }
  })//.then((response) =>{console.log('apiServices.loginUser response: ', response)});
}

apiServices.addLike = (data) => {
  console.log(data)
  return axios({
    method: 'POST',
    url: 'http://localhost:3000/api/DatingApp/likes',
    data: {
      swiper_user_id: data.swiper_user_id,
      person_they_swiped_yes_on_user_id: data.person_they_swiped_yes_on_user_id
    }
  })
}

apiServices.updateLocation = (userId, location) => {
  // console.log('from apiServices.updateLocation: ', userId, location);
  let postData = Object.assign({}, {userId: userId}, location)
  console.log('postData: ', postData);
  return axios({
    method: 'POST',
    url: `http://localhost:3000/api/DatingApp/updateLocation`,
    data: postData
  })
}

apiServices.getNearbyPeople = (userId) => {
  // console.log('from apiServices.getNearbyPeople userId: ', userId);
  let postData = {userId: userId};
  console.log('postData: ', postData);
  return axios({
    method: 'POST',
    url: `http://localhost:3000/api/DatingApp/getNearbyPeople`,
    data: postData
  })
}

apiServices.checkForMatch = (data) => {
  return axios.request({
    url: 'http://localhost:3000/api/DatingApp/checkForMatch',
    method: "POST",
    data: {
      person_they_swiped_yes_on_user_id: data.person_they_swiped_yes_on_user_id,
      swiper_user_id: data.swiper_user_id
    }
  })
}

export default apiServices;
