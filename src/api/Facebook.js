// in managed apps:
import {Facebook, Constants} from 'expo';

const permissions = ['public_profile', 'email'];

const facebookLogin = async () => {
    try {
        const {type, token} = await Facebook.logInWithReadPermissionsAsync(Constants.manifest.facebookAppId, {
            permissions: permissions,
        });

        if (type === 'success') {
            return Promise.resolve(token);
        } else {
            return Promise.reject("Error trying to login");
        }
    } catch (error) {
        return Promise.reject(error);
    }
};


export const facebookAPI = {
    facebookLogin,
};



