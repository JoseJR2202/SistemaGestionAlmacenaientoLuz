export const login = async({cedula, clave})=>{
    console.log(cedula, clave);
    const response = await fetch('/api/session/user',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cedula:cedula,
            clave:clave
        })
    });
    const result= await response.json();
    return result;
};

