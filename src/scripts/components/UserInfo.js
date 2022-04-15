export default class UserInfo {
    constructor({ profileName, profileDescription, profilePic }) {

        this._profileName = profileName;
        this._profileDescription = profileDescription;
        this._profilePic = profilePic;

    }

    getUserInfo() {
        const infoAboutUser = { name: this._profileName.textContent, description: this._profileDescription.textContent, avatar: this._profilePic, id: this._profileId }
        return infoAboutUser

    }

    setUserInfo({ name, description, avatar, _id }) {
        this._profileName.textContent = name;
        this._profileDescription.textContent = description;
        this._profilePic.style.backgroundImage = "url(" + avatar + ")";
        this._profileId = _id;
    }

}