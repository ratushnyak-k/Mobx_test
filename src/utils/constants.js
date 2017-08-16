export const Constants = {
  baseApiUrl: 'https://shrouded-shelf-66371.herokuapp.com/',
};

export const ApiRoutes = {
  signup: '/signup',
  signin: '/signin',
  myProfile: '/users',
  users: '/users/get',
  user: (id) => `/users/${id}`,
  friends: {
    get: '/friends/get/',
    pending: '/friends/pending/get/',
    request: (id) => `/friends/request/${id}`,
    cancel: (id) => `/friends/cancel/${id}`,
    accept: (id) => `/friends/accept/${id}`,
    deny: (id) => `/friends/deny/${id}`,
    remove: (id) => `/friends/remove/${id}`,
  },
};

export const friendsStatuses = {
  NOT_FRIENDS: 0,
  FRIENDS_OF_FRIENDS: 1,
  PENDING_FRIENDS: 2,
  FRIENDS: 3,
};

export const userTabs = {
  friends: 'friends',
  pending: 'pending',
};