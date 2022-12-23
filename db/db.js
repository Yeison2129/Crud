import mysql from "mysql"

const usuarios = mysql.createConnection({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'',
    database:'usuarios',
})

usuarios.connect((error)=>{
    if(error){
        throw error
    }else{
        console.log("Conectado :D");
    }
})

export default usuarios