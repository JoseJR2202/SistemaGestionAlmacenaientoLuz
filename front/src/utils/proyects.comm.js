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
}