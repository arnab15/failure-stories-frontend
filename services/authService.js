/* eslint-disable camelcase */
import httpService from "./apiService";

const loginEndpoint = "/login";
const signUpEndpoint = "/signup";
const refreshTokenEndPoint = "/refresh-token";
const logoutEndpoint = "/logout";
const forgot_password = "/forgot-password";
const resetPasswordEndpoint = "/reset-password";
const confirmAccountEndpoint = "/confirm-account";
const loginWithGoogleUrl = "/login-with-google";
const login = ({ email, password }) =>
  httpService.post(loginEndpoint, { email, password });

const signup = ({ name, email, password }) =>
  httpService.post(signUpEndpoint, { name, email, password });

const getRefreshedToken = () => httpService.post(refreshTokenEndPoint, {});

const logout = () => httpService.delete(logoutEndpoint);

const forgotPassword = ({ email }) =>
  httpService.post(forgot_password, { email });

const validateForgotPasswordCredentials = ({ userId, token }) =>
  httpService.post(`${forgot_password}/${userId}/${token}`);

const resetPassword = ({ userId, token, password }) =>
  httpService.post(`${resetPasswordEndpoint}/${userId}/${token}`, { password });

const confirmAccountCreation = (token) =>
  httpService.post(`${confirmAccountEndpoint}/${token}`);

export function loginWithGoogle(token) {
  return httpService.post(
    loginWithGoogleUrl,
    {},
    {
      headers: { "x-auth-google": `Bearer ${token}` },
    }
  );
}
export default {
  login,
  signup,
  getRefreshedToken,
  logout,
  forgotPassword,
  validateForgotPasswordCredentials,
  resetPassword,
  confirmAccountCreation,
  loginWithGoogle,
};
