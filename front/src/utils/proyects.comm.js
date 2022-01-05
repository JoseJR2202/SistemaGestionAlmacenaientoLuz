export const getCommentsUser= async()=>{
    const response = await fetch('/api/proyects/comments/user',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    });
    const result= await response.json();
    console.log(result);
    return result;
};

export const getDetailProyect= async(id)=>{
    const response = await fetch(`/api/proyects/${id}`,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    const result= await response.json();
    console.log(result);
    return result;
};

export const getProyect = async(url_archivo)=>{
    const response = await fetch(`/files/${url_archivo}`,{
        method: 'GET',
    });
    const result= await response.blob();
    const url = URL.createObjectURL(new Blob([result]));
    console.log(url)
    return url;
};

export const getCommentsProyect=async(id)=>{
    const response = await fetch(`/api/proyects/comments/${id}`,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    const result= await response.json();
    console.log(result);
    return result;   
}

export const insertCommentProyect= async(id, descripcion)=>{
    const response= await fetch(`/api/proyects/comments/${id}`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            descripcion:descripcion
        })
    });
    const result= await response.json();
    console.log(result);
    return result;   
}

export const insertProyect=async({titulo, descripcion, autores})=>{
    const response= await fetch(`/api/proyects/`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            titulo:titulo,
            descripcion:descripcion,
            autores:autores
        })
    });
    const result= await response.json();
    console.log(result);
    return result;
}

export const fileProyect= async({data, id})=>{
    const file= new FormData();
    file.append('file', data)
    const response = await fetch(`/api/proyects/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
        },
        body: file
    });
    const result= await response.json();
    return result;
}

export const filterProyect= async({titulo, escuela, facultad})=>{
    const data=new Map();
    if(titulo!=='')
        data.set('titulo', titulo)
    if(escuela!=='')
        data.set('escuela', escuela)
   if(facultad!=='')
        data.set('facultad', facultad)
    const data2= Object.fromEntries(data)
    console.log(data2)
    const response = await  fetch(`/api/proyects/filter`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data2)
    });
    const result= await response.json();
    return result;
}

export const getRecentProyects= async()=>{
    const response = await fetch(`/api/proyects/recent`,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    const result= await response.json();
    console.log(result);
    return result;   
}

export const getCommentProyectsByUser= async()=>{
    const response = await fetch(`/api/proyects/comments/user/proyects`,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    const result= await response.json();
    console.log(result);
    return result;   
}

export const getProyectsStauts= async()=>{
    const response = await fetch(`/api/proyects/state`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    });
    const result= await response.json();
    console.log(result);
    return result;   
};

export const changeStateProyect= async({id, option})=>{
    const response= await fetch(`/api/proyects/state/${id}`,{
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
           estado:option
        })
    });
    const result= await response.json();
    console.log(result);
    return result;
}

export const deleteProyect= async(id)=>{
    const response = await fetch(`/api/proyects/${id}`,{
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    });
    const result= await response.json();
    console.log(result);
    return result;   
};

