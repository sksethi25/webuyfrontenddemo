let loginService  = require('./loginService');
let logoutService  = require('./logoutService');

let ProfileService  = require('./profileService');
let signupService  = require('./signupService');

let loginApi = function(args) { return loginService.login(args); };
let logoutApi = function(args) { return logoutService.logout(args); };
let profileApi = function(args) { return ProfileService.profile(args); };
let signupApi = function(args) { return signupService.signup(args); };
exports.loginApi =loginApi;
exports.logoutApi =logoutApi;
exports.profileApi =profileApi;
exports.signupApi =signupApi;