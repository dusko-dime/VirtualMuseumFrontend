import api from "./base.service";

export const register = ({
  username,
  firstName,
  lastName,
  password,
  email,
}) => {
  return api().post("/users/register", {
    username,
    password,
    firstName,
    lastName,
    email,
  });
};

export const login = ({ username, password }) => {
  return api().post("/login", {
    username,
    password,
  });
};

export const refresh = ({ accessToken, refreshToken }) => {
  return api(true).post("/refresh", {
    accessToken,
    refreshToken,
  });
};
