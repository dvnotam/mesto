export default class UserInfo {
    constructor({userName, userJob}) {
        this._name = userName
        this._job = userJob
    }

    getUserInfo () {
        return {
            name: this._name.textContent,
            job: this._job.textContent
        }
    }

    setUserInfo (item) {
        this._name.textContent = item.name
        this._job.textContent = item.job
    }
}