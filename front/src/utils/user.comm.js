export const detailUser= async()=>{
    const response = await fetch('/api/users/',{
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    const result= await response.json();
    console.log(result);
    return result;
}

export const changePassword = async({clave, confirmarClave})=>{
    const response = await fetch('/api/users/changeKey',{
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            clave:clave,
            confirmarClave:confirmarClave
        })
    });
    const result= await response.json();
    console.log(result);
    return result;
}