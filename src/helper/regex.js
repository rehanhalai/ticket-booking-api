const ApiResponse = require("../helper/apiResponse");


// function validateRequiredFields(body, requiredFields) {
//     const data = body || {}; 
//     const missingFields = requiredFields.filter(field => !data.hasOwnProperty(field));
//     if (missingFields.length > 0) {
//         return ApiResponse.error(res,`Missing required fields: ${missingFields.join(", ")}`);    
//     }
// }

function isEmpty(value) {
    return value === undefined || value === null || value === "";
}

function regexEmail (email) {
    if (isEmpty(email)) return false;
    const myReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return myReg.test(email);
}
function regexFirstUpperCase (name) {
    if (isEmpty(name)) return false;
    const myReg = /^[A-Z]/;
    return myReg.test(name);
}
function regexPhone (phone) {
    if (isEmpty(phone)) return false;
    const myReg = /^\d{10}$/;
    return myReg.test(phone);
}

    
module.exports = {
    regexEmail,
    regexFirstUpperCase,
    regexPhone,
    // validateRequiredFields
}