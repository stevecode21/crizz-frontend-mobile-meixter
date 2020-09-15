import { Platform } from "react-native";

//API URL LOCAL
export const API_URL = 'http://crizz.com.co:8080/api/v1';

export const isAndroid = Platform.OS === "android" ? true : false;
export const isIos = !isAndroid;

export const APP_STATE = {
	PUBLIC: "PUBLIC_LOGIN",
	PRIVATE: "MAIN_APP",
	REGISTER: "REGISTER",
	UNKNOWN: "UNKNOWN"
};

export const STATUS = {
	SUCCESS: "SUCCESS",
	NOT_STARTED: "NOT_STARTED",
	FETCHING: "FETCHING",
	FAILED: "FAILED"
};

export const LOCALES = {
	ENGLISH: { id: 1, name: "en", label: "ENGLISH" },
	SPANISH: { id: 2, name: "es", label: "ESPAÑOL" }
};

export const ROUTES = {
	VERIFY: 	`${API_URL}/account/phoneVerify`,
	LOGIN: 		`${API_URL}/auth/login`,
	ACCOUNT: 	`${API_URL}/account/info`,
	UPLOADIMAGE:`${API_URL}/account/profileImage`
};
