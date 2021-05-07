import { AsyncStorage } from 'react-native';
export const baseLink = "https://dashadv.com/app/$2y$12$kdAFaXHWRv8MqmBc/public/api/";
export const categoriesURL = baseLink + "home/categories";
export const productsURL = baseLink + "home/products";
export const productDetailsURL = baseLink + "home/product/details";
export const aboutUsURL = baseLink + "about_us";
export const registerURL = baseLink + "signup";
export const loginURL = baseLink + "login";
export const editProfileURL = baseLink + "profile/edit";
export const notificationListURL = baseLink + "notification-list";
export const placeAnOrderURL = baseLink + "order/create";
export const setNotificationTokenURL = baseLink + "set-token";
export const setNotificationReadURL =  baseLink + "notification/read";
export const changePasswordURL = baseLink + "password/change";
export const adsSlider = baseLink + "ads";
export const forgetPasswordURL = baseLink + "forgot-password";
export const notificationCountURL = baseLink +"notification/count";
export const contactURL = "contact_us";

export const storeDataToAsyncStorage =  (key, value) => {

    return new Promise( async (resolve, reject) => {
        try {
            await AsyncStorage.setItem(key, value);
            resolve({
                res: "data saved to storage"
            });
        } catch(e) {
            reject({
                err: e
            });
        }
    })
};

export const getDataFromAsyncStorage = async (key) => {
    return new Promise( async (resolve, reject) => {
        try {
            const value =  await AsyncStorage.getItem(key);
            resolve(value);
        } catch(err) {
            reject(err);
            console.log("Error retrieving data from cache", e);
        }
    })
};

export const removeItemFromAsyncStorage = async (key) => {
    return new Promise( async (resolve, reject) => {
        try {
            const value =  await AsyncStorage.removeItem(key);
            if(value !== null) {
                resolve({
                    status: true
                })
            }
        } catch(err) {
            reject(err);
            console.log("Error removing data from cache", e);
        }
    })
};


export const getHeader = async () => {
    return new Promise( async (resolve, reject) => {
        try {
            const token = await AsyncStorage.getItem("token");
            //console.log("auth token", token);
            const header = {
                lang: "en",
                "Authorization": `Bearer ${JSON.parse(token)}`,
                "Content-Type": "application/json"
            };
            resolve(header);
        } catch(e) {
            reject(e);
            console.log("Error removing data from cache", e);
        }
    })
};