const express = require('express');
const bodyParser = require('body-parser');

const app=express();
const port=process.env.port || 5000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//simulacion de Base de datos

const users = 
[
    {id: 1, firstname: 'daniel',lastname: 'calvo',email: 'calvo@polpo.cr.com'},
    {id: 2, firstname: 'ashley',lastname: 'moya',email: 'moya@polpo.cr.com'},
    {id: 3, firstname: 'michelle',lastname: 'lizano',email: 'lizano@polpo.cr.com'},
    {id: 4, firstname: 'Roberto',lastname: 'rodriguez',email: 'rodriguez@polpo.cr.com'}
]
const todos=
[
    {id:1,title: 'universidad',keywords: ['estudios', 'importante', 'academia'],userid: 1},
    {id:2,title: 'oficio',keywords: ['barrer', 'limpiar', 'lavar'],userid: 2},
    {id:3,title: 'trabajar',keywords: ['estudiar', 'aprender', 'proactividad'],userid: 1},
    {id:4,title: 'jugar',keywords: ['video juegos', 'amigos', 'fornite'],userid: 3},
    {id:5,title: 'dormir',keywords: ['tender cama', 'apagar telefono'],userid: 4},
    {id:6,title: 'oficio noche',keywords: ['barrer', 'limpiar', 'lavar'],userid: 2},


]
const tasks=
[
    {id:1,title:'Estudiar para programacion',completed:1,todoid:1,userid:1},
    {id:2,title:'Estudiar para pruebas ingles',completed:0,todoid:1,userid:1},
    {id:3,title:'tener la casa limpia hoy',completed:0,todoid:2,userid:2},
    {id:4,title:'jugar fornite amigos ',completed:1,todoid:4,userid:3},
    {id:5,title:'Jugar god of war 4',completed:1,todoid:4,userid:3},
    {id:6,title:'Dormir en la cama',completed:0,todoid:5,userid:4},
    {id:7,title:'dormir sin usar el telefono',completed:1,todoid:5,userid:4}

]
app.get('/',(_,res)=>{
res.send('ESTAMOS EN VIVO');
});

app.get('/users',(_, res)=>{ // obtener todos los usuarios primera parte
res.json({ ok: true, users});
});


app.get('/user/:id',(req, res)=>{ //obtener un usuario especifico segunda parte
const { id } = req.params;
const user=users.filter((user)=>user.id == id)[0];
if(user.id) res.json({ok: true,user});
else res.json("El id no existe ");
}); 


app.post('/adduser',(req, res)=>{ // para agregar usuarios tercera parte
    const {  firstname,lastname,email }= req.body;
    if(firstname && lastname && email)
    {
        var ELID=1;
       
            var id=1;
            users.forEach(x =>{
               if(x.id == ELID)
               {
                    id++;                
               } 
               ELID++;
            });
        
        users.push({id,firstname,lastname,email});
        res.json({ok: true, users});
    }
});
//este es obtener el task de todos pero de un solo usuario
app.get('/users/:id/todos',(req, res)=>{ 
    
     const { id } = req.params;
     const user=users.filter((user)=>user.id == id)[0];
     const datos = todos.filter(todos => todos.userid == id);
     res.json({ok: true,user,datos});

    }); 

// este obtiene los datos de un todo y todas sus tasks relacionadas
app.get('/users/todos/:id',(req, res)=>{ 
    
    const { id } = req.params;
    const todo=todos.filter((todo)=>todo.id == id)[0];
    const tareas = tasks.filter(tasks => tasks.todoid == id);
    res.json({ok: true,todo,tareas});

   });   



//este es para agregar un task a un todo id ya hecho
app.post('/todos/:id/tasks',(req, res)=>{ // para agregar usuarios tercera parte
    const {  title,completed }= req.body;
    if(title && completed )
    {
        const { id } = req.params;
           tasksID=1;
           todoid=id;
           var ELID=1;
           const Eluser=todos.find((Eluser)=> Eluser.id === Number(id));
           tasks.forEach(x =>{
           if(x.id == ELID)
           {
             tasksID++;                
           } 
            ELID++;
           });
           userid=Eluser.userid;
        tasks.push({tasksID,title,completed,todoid,userid});
        const Task = tasks[tasks.length - 1];
        res.json({ok: true, Task});
    }
});
//--------------------------------------------
app.listen(port,()=>{
console.log(`Server is run on port: ${port}`);
});