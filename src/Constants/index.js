import { Platform } from "react-native"

//API URL API
export const API_URL = 'https://api.meixter.com/api/v1'
//export const API_URL = 'http://192.168.43.220:8080/api/v1'

export const URI = 'https://api.meixter.com/'


export const isAndroid = Platform.OS === "android" ? true : false
export const isIos = !isAndroid

export const APP_STATE = {
	PUBLIC 		: "PUBLIC_LOGIN",
	PRIVATE 	: "MAIN_APP",
	REGISTER 	: "REGISTER",
	UNKNOWN 	: "UNKNOWN"
}

export const STATUS = {
	SUCCESS 	: "SUCCESS",
	NOT_STARTED : "NOT_STARTED",
	FETCHING 	: "FETCHING",
	FAILED 		: "FAILED"
}

export const LOCALES = {
	ENGLISH: { id: 1, name: "en", label: "ENGLISH" },
	SPANISH: { id: 2, name: "es", label: "ESPAÑOL" }
}

export const ROUTES = {
	VERIFY 			:`${API_URL}/account/phoneVerify`,
	LOGIN 			:`${API_URL}/auth/login`,
	ACCOUNT 		:`${API_URL}/account/info`,
	UPLOADIMAGE 	:`${API_URL}/account/profileImage`,
	VERIFYNICK 		:`${API_URL}/account/verifyNickname`,
	PROFILEDATA 	:`${API_URL}/account/profileData`,
	ADJUSTPROFILE 	:`${API_URL}/account/profileAdjust`,
	TAGSTREND		:`${API_URL}/tag/trend`,
	TAGSALL 		:`${API_URL}/tag/all`,
	MYTAGS 			:`${API_URL}/tag/user/all`,
	CONFIG_GENERAL  :`${API_URL}/Config/General`,
	CONFIG_LANGUAGE :`${API_URL}/Config/Language`,
	CONFIG_TRACKS	:`${API_URL}/Config/Track`,
	LESSON 			:`${API_URL}/Lesson/Lesson`,
	LIST_LESSON 	:`${API_URL}/Lesson/listByUser`,
	GET_LESSON 		:`${API_URL}/Lesson/findById`,
	FREEZE_LESSON	:`${API_URL}/Lesson/offer`,
	COMMENTS_LESSON	:`${API_URL}/Lesson/Comment`,
}
