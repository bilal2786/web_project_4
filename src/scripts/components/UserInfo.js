export default class UserInfo {
    constructor({ profileName, profileDescription, profilePic }) {

        this._profileName = profileName;
        this._profileDescription = profileDescription;
        this._profilePic = profilePic;

    }

    getUserInfo() {
        const infoAboutUser = { name: this._profileName.textContent, description: this._profileDescription.textContent }
        return infoAboutUser

    }

    setUserInfo({ name, description, avatar }) {
        this._profileName.textContent = name;
        this._profileDescription.textContent = description;
        this._profilePic.style.backgroundImage = "url(" + avatar + ")";
    }

}