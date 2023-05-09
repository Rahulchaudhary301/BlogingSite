const mongoose = require("mongoose")

const isValidEmail = function (emailvalue) {
  let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[com]{2,3}))$/
  if (emailRegex.test(emailvalue)) return true;
};

const isValidString = function (stringValue) {
    if (typeof stringValue === "undefined" || stringValue === null) return false
    if (typeof stringValue === "string" && stringValue.trim().length === 0) return false
    return true
}

const isValidPassword = function (passwordCheck) {
  let pass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{5,15}$/;
  if (pass.test(passwordCheck)) return true;
};
const isValidTitle = function (title) {
  return ["Mr", "Mrs", "Miss"].indexOf(title) !== -1
}

const mobileValidation = function (number){
    if (/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(number)) return true
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
}



module.exports = { isValidEmail, isValidString, isValidPassword, isValidTitle,mobileValidation  ,isValidRequestBody}