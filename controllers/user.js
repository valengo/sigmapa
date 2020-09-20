module.exports = function (dependencies) {

}


// module.exports = function (db) {
//     let userModule = {};
//
//     userModule.userExists = function (email) {
//         db.query('SELECT user from users  where email = $1', email, (err, res) => {
//             if (err) {
//
//             }
//         })
//     }
//
//     return userModule;
// }