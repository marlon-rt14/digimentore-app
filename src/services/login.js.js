const helper = {};

const loggedUser = window.localStorage.getItem("loggedUser");

helper.getSessionUser = () => {
  return JSON.parse(loggedUser).user || null;
};

helper.getSessionToken = () => {
  return `Bearer ${JSON.parse(loggedUser).token}` || null;
};

module.exports = helper;
