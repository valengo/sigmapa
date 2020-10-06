const UserRepository = (() => {
    let _user;

    return {
        isAdmin: () => {
            return _user.roleId === 'A';
        },
        update: (user) => {
            _user = user;
        }
    };
})();