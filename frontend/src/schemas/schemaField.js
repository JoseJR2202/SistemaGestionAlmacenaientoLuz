export const fieldLogin=[{
    title:'Cedula',
    name:'cedula',
    type:'number',
},{
    title:'Clave',
    name:'clave',
    type:'password'
}];

export const fieldChangeKey=[{
    title:'Clave nueva',
    name:'clave',
    type:'password',
},{
    title:'Confirmar clave nueva',
    name:'confirmarClave',
    type:'password'
}];

export const fieldProyect=[{
    title:'Titulo',
    name:'titulo',
    type:'text',
},{
    title:'Autores',
    name:'autores',
    type:'text'
},{
    title:'Descripcion',
    name:'descripcion',
    type:'text',
    as:'textarea'
},{
    title:'Adjuntar',
    name:'archivo',
    type:'file'
}];

export const fieldMeeting=[{
    title:'Asunto',
    name:'asunto',
    type:'text',
},{
    title:'Fecha',
    name:'fecha',
    type:'date'
},{
    title:'Hora',
    name:'hora',
    type:'time'
},{
    title:'Invitar a (separe con \',\' los correos o cedulas',
    name:'invitados',
    type:'text'
},{
    title:'Descripcion',
    name:'descripcion',
    type:'text',
    as:'textarea'
}];