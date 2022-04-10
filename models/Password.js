const passwordValidator = require("password-validator")

const schema = new passwordValidator();
 
schema
// Pas moins de 8 caractères
.is().min(8)                  
// Pas plus de 30 caractères                  
.is().max(30)                         
// Avoir des lettres majuscules         
.has().uppercase()                
// Avoir des lettres minuscules              
.has().lowercase()       
// Minimum 2 chiffres                       
.has().digits(2)                 
// Pas d'espaces               
.has().not().spaces()                           
 
module.exports = schema;
