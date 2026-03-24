
//importa express
import express from "express";
import type { Request, Response } from "express";



const app = express();
app.use(express.json()); 



// estructura del usuario
type Usuario = {
  email: string;        // ID único
  name: string;
  age: number;
  isActive: boolean;
  createdAt: Date;
};

//arreglo de usuarios 
const usuarios: Usuario[] = [
{
email: "ana02@email.com",     
name: "ana",
age: 20,
isActive: true,
createdAt: new Date("2026-03-13T10:30:00"),
},
{
email: "juan07@email.com",     
name: "juan",
age: 25,
isActive: true,
createdAt: new Date("2026-03-13T10:30:00"),
},
{
email: "carlos11@email.com",     
name: "carlos",
age: 23,
isActive: true,
createdAt: new Date("2026-03-13T10:30:00"),
}

];



//crear usuarios
app.post('/usuarios', (req: Request, res: Response) => {
  const usuario: Usuario = req.body;
  
  if (!usuario) {
    return res.status(400).json({
      status: "False",
      message: "los datos son obligatorios",
    }); 
  }

  const email = usuario.email?.trim();
  
   if (!usuario.email || !usuario.name || !usuario.age || usuario.isActive === undefined) {
    return res.status(400).json({
      status: "False",
      message: "los datos son obligatorios",
    }); 
  }


  if (usuarios.find(u => u.email === usuario.email)) {
    return res.status(409).json({ message: "El usuario ya existe" });
  }
  usuarios.push(usuario);
  res.status(201).json({ message: "Usuario creado", usuario: usuario });
});


// obtener todos los usuarios
app.get('/usuarios', (req: Request, res: Response) => {
  res.status(200).json({sucess: "true" , message: "Usuarios obtenidos correctamente", data: usuarios}); 
  
});   





// obtener un usuario por email
app.get('/usuarios/:email', (req: Request, res: Response) => {
  const usuario = usuarios.find(u => u.email === req.params.email);

  if (!usuario) {
    return res.status(404).json({success: "false", message: "Usuario no encontrado" });
  }

  res.json(usuario);
});




//actualizar un usuario por email
app.put('/usuarios/:email', (req: Request, res: Response) => {
  const index = usuarios.findIndex(u => u.email === req.params.email);
  
  if (index === -1) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  } 

const existeUsuario = usuarios.some(u => u.email === req.body.email && u.email !== req.params.email);
if (existeUsuario) {
  return res.status(409).json({ status: "conflicto", message: "El email ya existe" }); 
}

usuarios[index].email = req.body.email || usuarios[index].email;

return res.status(200).json({ status: "Exito", message: "Usuario actualizado", usuario: usuarios[index] });


});  



//eliminar usuario por email
app.delete('/usuarios/:email', (req: Request, res: Response) => {
  const index = usuarios.findIndex(u => u.email === req.params.email);

  if (index === -1) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  usuarios.splice(index, 1);
  res.status(200).json({ message: "Usuario eliminado" });
});






const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



