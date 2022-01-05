export const lastMeeting= async()=>{
    const response = await fetch(`/api/meeting/lastMeeting`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    });
    const result= await response.json();
    console.log(result);
    return result; 
};

export const recentMeeting= async()=>{
    const response = await fetch(`/api/meeting/recentMeeting`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    });
    const result= await response.json();
    console.log(result);
    return result; 
};

export const detailMeeting= async(id)=>{
    const response = await fetch(`/api/meeting/${id}`,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    const result= await response.json();
    console.log(result);
    return result; 
};

export const createMeeting= async({asunto, descripcion, fecha, invitados})=>{
    const response = await fetch(`/api/meeting/`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            asunto:asunto,
            descripcion:descripcion,
            fecha:fecha,
            invitados:invitados
         })
    });
    const result= await response.json();
    console.log(result);
    return result; 
};

export const commentsMeeting= async(id)=>{
    const response = await fetch(`/api/meeting/comments/${id}`,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    const result= await response.json();
    console.log(result);
    return result; 
};

export const filterMeeting= async({titulo, horario})=>{
    const data=new Map();
    if(titulo!=='')
        data.set('titulo', titulo)
    if(horario!=='')
        data.set('horario', horario)
    const data2= Object.fromEntries(data)
    console.log(data2)
    const response = await  fetch(`/api/meeting/filter`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data2)
    });
    const result= await response.json();
    return result; 
};

export const filterMeetingParticipate= async({titulo, horario})=>{
    const data=new Map();
    if(titulo!=='')
        data.set('titulo', titulo)
    if(horario!=='')
        data.set('horario', horario)
    const data2= Object.fromEntries(data)
    console.log(data2)
    const response = await  fetch(`/api/meeting/filterParticipate`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data2)
    });
    const result= await response.json();
    return result; 
};

export const culminateMeeting= async(id)=>{
    const response = await fetch(`/api/meeting/${id}`,{
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        }
    });
    const result= await response.json();
    console.log(result);
    return result; 
};

export const insertCommentMeeting= async(descripcion, id)=>{
    const response = await fetch(`/api/meeting/comments/${id}`,{
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
};

export const participateMeeting= async(id)=>{
    const response = await fetch(`/api/meeting/participates/${id}`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    });
    const result= await response.json();
    console.log(result);
    return result; 
};