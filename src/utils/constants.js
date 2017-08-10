export const Constants = {
  baseApiUrl: 'https://shrouded-shelf-66371.herokuapp.com/',
};

export const ApiRoutes = {
  signup: '/signup',
  signin: '/signin',
  myProfile: '/users',
  users: '/users/get',
  user: (id) => `/users/${id}`,
};