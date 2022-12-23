import conect from "../db/db.js"
import sessions from 'express-session'
import bcrypt from 'bcrypt'


//logica de registro

export const registro = async (req, res) => {
    try {
        const { id_user, name_user, lastname_user, celphone_user, mail_user, password_user } = req.body;
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password_user, salt);

        conect.query("SELECT * FROM users", (error, rows) => {
            if (!error) {
                for (let i = 0; i < rows.length; i++) {
                    if (rows[i].mail_user == mail_user || rows[i].id_user == id_user) {
                        return res.json({ data: "user exist" })
                    }

                }
                conect.query(
                    "INSERT INTO users (id_user,name_user,lastname_user,celphone_user,mail_user,password_user) VALUES (?,?,?,?,?,?)",
                    [id_user, name_user, lastname_user, celphone_user, mail_user, hash],
                    (error, results) => {
                        if (results) {
                            return res.json({ data: "INSERT_OK" })
                        } else {
                            return res.json({ data: "INSERT_ERROR", error })

                        }
                    }
                );
            }
        });
    } catch (error) {
        return res.json({ msj: "ERROR 404", error })

    }
};

//logica de login 

export const login = (req, res) => {
    try {
        const { mail_user, password_user } = req.body;

        conect.query("SELECT*FROM users WHERE mail_user = ?", [mail_user], (error, rows) => {
            if (rows.length > 0) {
                rows.forEach((element) => {
                    bcrypt.compare(password_user, element.password_user, (error, isMatch) => {
                        if (!isMatch) {
                            return res.json({ data: "PASSWORD_ERROR" });

                        } else {
                            sessions.mail_user = rows[0].mail_user;
                            sessions.nombre = rows[0].nom_user;
                            console.log(sessions);
                            return res.json({ data: "logueado", rows });
                        }
                    });
                });

            } else {
                return res.json({ data: "error desconocido" });
            }

        }
        )
    } catch (error) {
        return res.json({ msj: "ERROR 404" })
    }
}

//consultar usuarios
export const consultar_t = (req, res)=>{
    try {
        conect.query(  "SELECT * FROM users ",
            (error, rows) => {
                if (rows.length>0) {
                    return res.json({ data: rows })
                }else if(rows.length<=0){
                    return res.json({ data:"no existen registros" })
                } {
                    return res.json({ data: "error", error })

                }
            }
        );



    } catch (error) {
        return res.json({ msj: "ERROR 404" })
    }
}

//consultar un usuario en especifico

export const consultar_u = (req, res)=>{
    try {
    const {id_user} = req.body;
        conect.query(  "SELECT * FROM users WHERE id_user= ? ",
        [id_user],
            (error, rows) => {
                if (rows.length>0) {
                    return res.json({ data: rows })
                }else if(rows.length<=0){
                    return res.json({ data:"no existe un registro con este id" })
                } {
                    return res.json({ data: "error", error })

                }
            }
        );



    } catch (error) {
        return res.json({ msj: "ERROR 404" })
    }
}


//actualizar usuario




//Eliminar usuario

export const eliminar_u = (req, res) => {
    try {
        const { id_user } = req.body;

        conect.query(
            "DELETE FROM `users` WHERE (id_user = ? );",
            [id_user],
            (error, results) => {
                if (results) {
                    return res.json({ data: "Delete_OK" })
                } else {
                    return res.json({ data: "Delete error", error })

                }
            }
        );



    } catch (error) {
        return res.json({ msj: "ERROR 404" })
    }
}


