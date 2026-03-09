const { createPool } = import("mysql2");

const pool = createPool({
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    port: "3306",
    password: "alex@mySql7",
    database: "JustStudy",
    connectionLimit: 50000
})

// Establish connection 
pool.connect((error) => {
    if(error){
        console.error("Database connection failed!");
    }

    else{
        console.log("Database connection was successful!");
    }
})

//pool.query('select * from Users', (err, result, fields) => {
  //  if (err){
    //    return console.log(err);
    //}

    //return console.log(result);
//})


