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
    type:'date',
    Col:true
},{
    title:'Hora',
    name:'hora',
    type:'time',
    Col:true
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

export const fieldSearchProyect=[{
    title:"Titulo del proyecto",
    name:'titulo',
    type:'text',
    Col:true
},{
    title:"Escuela",
    name:"escuela",
    type:"text",
    Col:true
},{
    title:"Facultad",
    name:"facultad",
    type:"text",
    Col:true
}];

export const fieldSearchMetting=[{
    title:"Titulo de la Reunion",
    name:'titulo',
    type:'text',
    Col:true
},{
    title:"Horario",
    name:"horario",
    type:"date",
    Col:true
}];