export const isLogged = (req:any, res, next) => {
  if (req.isAuthenticated()) {
    res.send({
      status: 304,
      response: 'Ya existe una sesión',
      type:req.user.tipo_usuario
    });
  } else {
    next();
  }
};

export const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send({
      status: 400,
      response: 'Debe iniciar sesión primero',
    });
  }
};

export const isAdmin = (req:any, res, next)=>{
  if(req.user.tipo_usuario==='Administrador'){
    next();
  }else{
    res.send({
      status:403,
      response:'No tiene acceso a estas funciones',
      type:req.user.tipo_usuario
    })
  }
};

export const isValidate= (req:any, res, next)=>{
  if(req.user.tipo_usuario==='Administrador' || req.user.tipo_usuario==='investigador' ){
    next();
  }else{
    res.send({
      status:403,
      response:'No tiene acceso a estas',
      type:req.user.tipo_usuario
    })
  }
};
