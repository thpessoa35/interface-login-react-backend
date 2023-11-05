const contactsRepository = require('../repositores/contactsRepository');
const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken') 
const secretKey = 'polentinha';


class ContactController {
    async index(req, res){
        const rows = await contactsRepository.findAll();
        return res.json(rows.rows)
    }

    async Create(req, res) {
        const { name, email, password } = req.body;
        
        const rows = await contactsRepository.CreateUser(name, email, password);

        return res.json({message: 'registrado'})
    }
    async FindEmail(req, res) {
        const { email } = req.body;
      
        const rows = await contactsRepository.FindByEmail(email);

        if(rows.rows.length > 0){
            return res.json({"message": "Email existe"})
        }else {
            return res.json({"message": "Email nao existe"})

        }
      }  
     async FindID(req, res){
        const { id } = req.params;
        
      const rows = await contactsRepository.FindByID(id);

       if(rows){   
            return res.json(rows.rows)
       }
    } 

    async LoginUser(req, res) {
        const { email, password } = req.body;
        try {
            const user = await contactsRepository.Login(email, password);
    
            if (user) {
                const token = jwt.sign({email: user.email}, secretKey, {expiresIn: '1h'})

                res.json({token, message: "Login bem-sucedido", });
                
            } else {
                res.json({ message: "Não logado. Verifique suas credenciais." });
                
            }
        } catch (error) {
            console.error(error);
            res.json({ message: "Erro interno do servidor" });
        }
    }
        
}
    
    

module.exports = new ContactController();