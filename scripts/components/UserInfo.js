import { profileName, profileDescription } from '../script.js'
export default class UserInfo {
    constructor({ profileName, profileDescription }) {

        this._profileName = profileName;
        this._profileDescription = profileDescription;

    }

    getUserInfo() {
        const infoAboutUser = { name: profileName.textContent, description: profileDescription.textContent }
        return infoAboutUser
    }

    setUserInfo({ name, description }) {
        profileName.textContent = name;
        profileDescription.textContent = description;
    }

}