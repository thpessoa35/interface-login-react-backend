const db = require('../db')
const bcrypt = require('bcrypt')

class contactRepository{

    async findAll(){
        const contacts = await db.query('SELECT * FROM users')
        return contacts;
    }

    async CreateUser(name, email, password) {
        const contacts = await db.query(`
        INSERT INTO users (name, email, password)
        VALUES ( $1, $2, $3)
        `, [name, email, password])
        return contacts;
    }
    
    async FindByEmail(email) {
        const contacts = await db.query(`SELECT * FROM users WHERE email = $1`,[email])
        return contacts
    }   

    async FindByID(id){
         const contacts = await db.query(`SELECT * FROM users WHERE ID = $1`, [id])
        return contacts
    }

    async  Login(email, password) {
        try {
            const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    
            if (result.rows.length > 0) {
                const user = result.rows[0];
                const hashPassword = user.password;

                const isMatch = await bcrypt.compare(password, hashPassword);
    
                if (isMatch) {
                    return user; 
                }
            }
    
            return null; 
        } catch (error) {
            console.error("Erro na consulta:", error);
            return null;
        }
    }

}
module.exports = new contactRepository();