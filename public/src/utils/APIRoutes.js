const defaultLocalHost = "http://localhost:5000";
const defaultApiBaseUrl =
	process.env.NODE_ENV === "production" ? "" : defaultLocalHost;
const apiBaseUrl = (process.env.REACT_APP_API_URL || defaultApiBaseUrl).replace(
	/\/$/,
	""
);

export const host = process.env.REACT_APP_SOCKET_HOST || apiBaseUrl;
export const loginRoute = `${apiBaseUrl}/api/auth/login`;
export const registerRoute = `${apiBaseUrl}/api/auth/register`;
export const logoutRoute = `${apiBaseUrl}/api/auth/logout`;
export const allUsersRoute = `${apiBaseUrl}/api/auth/allusers`;
export const sendMessageRoute = `${apiBaseUrl}/api/messages/addmsg`;
export const recieveMessageRoute = `${apiBaseUrl}/api/messages/getmsg`;
export const setAvatarRoute = `${apiBaseUrl}/api/auth/setavatar`;
