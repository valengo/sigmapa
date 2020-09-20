module.exports = class User {
    constructor(userId, roleId, uid, email, name) {
        this.userId = userId;
        this.roleId = roleId;
        this.uid = uid;
        this.email = email;
        this.name = name;
    }
};