module.exports = class User {
    constructor(userId, roleId, uid, email, username) {
        this.userId = userId;
        this.roleId = roleId;
        this.uid = uid;
        this.email = email;
        this.username = username;
    }

    isValid() {
        return (this.userId !== undefined && this.roleId !== undefined &&
            this.uid !== undefined && this.email !== undefined && this.username !== undefined)
    }
};