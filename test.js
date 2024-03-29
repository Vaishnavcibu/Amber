// var uuid = require('uuid');
// var uniqueId = uuid.v4(); 
// console.log(uniqueId);

function customIdGenerator(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  
  const myUniqueID = customIdGenerator(10);
  
   // Logs the generated ID, e.g., 'aB3dE5gH8j'
  console.log(myUniqueID);
  