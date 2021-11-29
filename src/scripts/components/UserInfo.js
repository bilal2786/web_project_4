import {profileName,profileDescription} from '../script.js'
export default class UserInfo {
    constructor ({nameSelector , jobSelector}){
        
        this._nameSelector=nameSelector;
        this._jobSelector=jobSelector;
        
    }
    getUserInfo(){
        const infoAboutUser={name:profileName.textContent , job:profileDescription.textContent}
        return infoAboutUser
    }
    setUserInfo(){
        profileName.textContent = this._nameSelector.value;
        profileDescription.textContent = this._jobSelector.value;
    }

}