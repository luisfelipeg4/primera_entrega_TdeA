const fs = require('fs')
const requerimientosInscripcion = require('./requerimientosInscripcion')
const cursosOfrecidos = require('./cursosOfrecidos')
const argv =  require('yargs')
.command('inscribir', 'Incribirse en un curso para quedar prematriculado', requerimientosInscripcion)
.command('informacion', 'Obtener la información de los cursos')
.argv

const comandos = argv._
/**
 * Método que imprime cada dos segundos los cursos ofrecidos por el T de A
 */
let informacion = ()=>{
    console.log("LOS CURSOS DE EXTENSION OFRECIDOS SON: ")
    cursosOfrecidos.forEach((element,index) => {
        setTimeout(function(){
            let informacionCurso=`- CURSO DE ${element.nombre}, SU ID ES ${element.id}, 
                        TIENE UN VALOR DE $ ${element.valor} COP
                        CON UNA DURACION DE ${element.duracion} HORAS
 ------------------------------------------------------------------------------ `
            console.log(informacionCurso);
        },2000*(index+1))
    });
}
/**
 * Método de válidacion de que exista un curso para generar la prematricula
 * Si encuentra el curso prematricula al estudiante
 */
let inscripcion = (idCurso, nombre, cedula)=>{
    let curso = cursosOfrecidos.find(curso => curso.id==idCurso)
    if (curso!=undefined){
        let text =` 
------------------------------------------------------------------------------
        EL ESTUDIANTE CON CEDULA ${cedula} Y NOMBRE ${nombre}
        SE HA INCRITO CURSO DE ${curso.nombre}, SU ID ES ${curso.id}, 
        TIENE UN VALOR DE $ ${curso.valor} COP
        CON UNA DURACION DE ${curso.duracion} HORAS
------------------------------------------------------------------------------`
        fs.appendFile('matriculas.txt', text, function (err) {
            if (err) throw err;
            console.log(`
------------------------------------------------------------------------------
            SE CREO CORRECTAMENTE LA MATRICULA
            ${text}`);
          });
    }else{
        console.log(`
        ------------------------------------------------------------------------------
        EL CURSO CON ID ${idCurso} NO EXISTE SE LISTARAN LOS CURSOS DISPONIBLES....
        ------------------------------------------------------------------------------`)
        ;
        informacion()
    }
}

// Condicionales para validar la entrada de argv al 
if (comandos.find(comand => comand=='inscribir')){
    let {idCurso, nombre, cedula } = argv
    if (nombre!=true && cedula!=true )
    {
        inscripcion(idCurso, nombre, cedula)
    }else{
        console.log("FALTAN ARGUMENTOS");
    }
}else if (comandos.find(comand => comand=='informacion')){
    informacion()
}else {
    let text =`  ----------------------------------------------------
                SI DESEA VER LOS CURSOS A DE EXTENCIÓN ESCRIBA:  
                node app.js informacion
                -------------
                SI DESEA INSCRIBIRSE A UN CURSO ESCRIBA:
                node app.js inscribir -i=? -c=? -n=?
                DONDE 
                -i // es el id del curso
                -c // su cedula 
                -n // su nombre`
    console.log(text);
    
    
}
