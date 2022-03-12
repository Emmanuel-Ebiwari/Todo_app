const mysql = require('mysql2');

// const connection = mysql.createConnection({
//     host: 'bwrardikjymafrzdcbty-mysql.services.clever-cloud.com',
//     user: 'ubmqircd2ipmtuzm',
//     password: 'ZzVIz8X31XRpOmJ93JB7',
//     database: 'bwrardikjymafrzdcbty'

// })
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'todo_database'

})

module.exports = connection;