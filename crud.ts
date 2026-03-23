
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




app.post('/usuarios', (req: Request, res: Response) => {
  const nuevoUsuario: Usuario = req.body;

  if (usuarios.find(u => u.email === nuevoUsuario.email)) {
    return res.status(400).json({ message: "El usuario ya existe" });
  }
  usuarios.push(nuevoUsuario);
  res.status(201).json({ message: "Usuario creado", usuario: nuevoUsuario });
});





const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



