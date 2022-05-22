
const { 
    paddockManagers,
} = require("./db/data");

const { 
    ordenarArrayPorNombreAreaCultivo, 
    ordenarArrayPorNombreAdministradores, 
    ordenarArrayPorHectareas,
    ordenarArrayPorNombreAdministradoresForestal,
    ordenarAdministradoresCampos,
    ordenarPorCamposRuc,
    ordenarCultivoAñoAdmin,
    agregarDatosPaddockManagers
} = require("./helpers/ordenarArrays");

// 0 Arreglo con los ids de los responsables de cada cuartel

function listPaddockManagerIds() {

    console.log();
    console.log('===========================================');
    console.log('Pregunta 0');
    return console.log(paddockManagers.map((paddockManager) => paddockManager.id));
     //paddockManagers.map((paddockManager) => paddockManager.id);
};

listPaddockManagerIds();

// 1 Arreglo con los ruts de los responsables de los cuarteles, ordenados por nombre
function listPaddockManagersByName() {
    // CODE HERE
    const arrayNameTax = [];
    
    paddockManagers.map((paddockManager) => {
       return (
           arrayNameTax.push(`${paddockManager.name},${paddockManager.taxNumber}`)
           )
    });

    const arrayNameTax2 = arrayNameTax.sort();
    
    const arrayNameTax3 = []
    arrayNameTax2.forEach(element => {
        arrayNameTax3.push(element.split(','));
    });

    const arrayTaxOrder = []
    arrayNameTax3.forEach(element => {
        arrayTaxOrder.push(element[1]);
    });

    // TAX ordenados por el nombre que corresponde
    console.log();
    console.log('===========================================');
    console.log('Pregunta 1');
    console.log(arrayTaxOrder);

    return arrayTaxOrder;
};

listPaddockManagersByName();


// 2 Arreglo con los nombres de cada tipo de cultivo, ordenados decrecientemente por la suma 
// TOTAL de la cantidad de hectáreas plantadas de cada uno de ellos.
function sortPaddockTypeByTotalArea() {
// CODE HERE
    const array = [];

    // PALTOS
    array.push(ordenarArrayPorNombreAreaCultivo(1));

    // AVELLANOS
    array.push(ordenarArrayPorNombreAreaCultivo(2));

    // CEREZAS
    array.push(ordenarArrayPorNombreAreaCultivo(3));
    
    // NOGALES
    array.push(ordenarArrayPorNombreAreaCultivo(4));

    // Nombres ordenados de mayor a menor en areas
    const arrayAreas = []
    array.forEach(element => arrayAreas.push(element.total));
    const arrayAreasOrder = arrayAreas.sort((a, b) => b - a);
    
    const arrayNombreAreas = []

    for(let i = 0; i < arrayAreasOrder.length; i++){
        const arr = array.find(element => element.total == arrayAreasOrder[i]);

        arrayNombreAreas.push(arr.nombre);
    }

    console.log();
    console.log('===========================================');
    console.log('Pregunta 2');
    console.log(arrayNombreAreas)
    return arrayNombreAreas;
}

sortPaddockTypeByTotalArea();


// 3 Arreglo con los nombres de los administradores, ordenados decrecientemente 
// por la suma TOTAL de hectáreas que administran.
function sortFarmManagerByAdminArea() {
    // CODE HERE
    const array = [];

    // JUAN TAPIA BURGOS
    array.push(ordenarArrayPorNombreAdministradores(1));

    // EFRAIN SOTO VERA
    array.push(ordenarArrayPorNombreAdministradores(2));

    // CARLOS PEREZ GONZALEZ
    array.push(ordenarArrayPorNombreAdministradores(3));

    // ANDRES VIÑALES CIENFUEGOS
    array.push(ordenarArrayPorNombreAdministradores(4));

    // OSCAR PEREZ ZUÑIGA
    array.push(ordenarArrayPorNombreAdministradores(5));

    // JOAQUIN ANDRADE SANDOVAL
    array.push(ordenarArrayPorNombreAdministradores(6));

    // Nombres ordenados de mayor a menor en areas
    const arrayAreas = []
    array.forEach(element => arrayAreas.push(element.total));
    const arrayAreasOrder = arrayAreas.sort((a, b) => b - a);
    
    const arrayNombreAreas = []

    for(let i = 0; i < arrayAreasOrder.length; i++){
        const arr = array.find(element => element.total == arrayAreasOrder[i]);

        arrayNombreAreas.push(arr.nombre);
    }

    console.log();
    console.log('===========================================');
    console.log('Pregunta 3');
    console.log(arrayNombreAreas)
    return arrayNombreAreas;

  }
  
  sortFarmManagerByAdminArea();


  // 4 Objeto en que las claves sean los nombres de los campos y los valores un arreglo 
  // con los ruts de sus administradores ordenados alfabéticamente por nombre.
function farmManagerNames() {
    // CODE HERE
    const campoArr1 = ordenarPorCamposRuc(1);
    const name1 = campoArr1.nameFarms.name;
    const ruc1 = campoArr1.ruc;

    const campoArr2 = ordenarPorCamposRuc(2);
    const name2 = campoArr2.nameFarms.name;
    const ruc2 = campoArr2.ruc;

    const campoArr3 = ordenarPorCamposRuc(3);
    const name3 = campoArr3.nameFarms.name;
    const ruc3 = campoArr3.ruc;

    const obj = {};

    obj[name1] = [ruc1];
    obj[name2] = [ruc2];
    obj[name3] = [ruc3];



    console.log();
    console.log('===========================================');
    console.log('Pregunta 4');

    console.log(obj);
    return obj;

}
  
  farmManagerNames();


// 5 Arreglo ordenado decrecientemente con los m2 totales de cada campo que tengan más
// de 2 hectáreas en Paltos
// Tip: Una hectárea equivale a 10.000m2
function biggestAvocadoFarms() {
    // CODE HERE
    let array = []

    array.push(ordenarArrayPorHectareas(1));

    console.log();
    console.log('===========================================');
    console.log('Pregunta 5');
    if(array[0].length !== 0){
        console.log(array);
        return array;
    }else {
        console.log('No hay campos que tengan 2 o más hectareas en PALTOS');
    }
}
  
  biggestAvocadoFarms();


// 6 Arreglo con nombres de los administradores de la FORESTAL Y AGRÍCOLA LO ENCINA, 
// ordenados por nombre, que trabajen más de 1000 m2 de Cerezas
function biggestCherriesManagers() {
    // CODE HERE
    
    // le paso el id de FORESTAL Y AGRICOLA LO ENCINA
    const {arr} = ordenarArrayPorNombreAdministradoresForestal(3);
    const arrName = [];

    arr.map(arr => arrName.push(arr.name));
    
    console.log();
    console.log('===========================================');
    console.log('Pregunta 6');
    console.log(arrName.sort())
    
    return arrName.sort();
}
  

biggestCherriesManagers();


// 7 Objeto en el cual las claves sean el nombre del administrador y 
// el valor un arreglo con los nombres de los campos que administra, ordenados alfabéticamente
function farmManagerPaddocks() {
    // CODE HERE
    const admin1 = ordenarAdministradoresCampos(4);
    const name1 = admin1.name
    const admin2 = ordenarAdministradoresCampos(3);
    const name2 = admin2.name
    const admin3 = ordenarAdministradoresCampos(2);
    const name3 = admin3.name
    const admin4 = ordenarAdministradoresCampos(6);
    const name4 = admin4.name
    const admin5 = ordenarAdministradoresCampos(1);
    const name5 = admin5.name
    const admin6 = ordenarAdministradoresCampos(5);
    const name6 = admin6.name
    const obj = {}
    
    obj[name1] = admin1.administra;
    obj[name2] = admin2.administra;
    obj[name3] = admin3.administra;
    obj[name4] = admin4.administra;
    obj[name5] = admin5.administra;
    obj[name6] = admin6.administra;

    console.log();
    console.log('===========================================');
    console.log('Pregunta 7');
    console.log(obj);

  }
  
  farmManagerPaddocks();


  // 8 Objeto en que las claves sean el tipo de cultivo concatenado con su año de plantación
  // (la concatenación tiene un separador de guión ‘-’, por ejemplo AVELLANOS-2020) y 
  // el valor otro objeto en el cual la clave sea el id del administrador y el valor el 
  // nombre del administrador
function paddocksManagers() {
    // CODE HERE
    let obj = {};
    let obj2 = {};
    let obj3 = {obj2};

    const cultivoAñoIdAdmin = ordenarCultivoAñoAdmin(1);

    const cultivoArr = cultivoAñoIdAdmin.añoCultivo;
    const arrManagers = cultivoAñoIdAdmin.camposManagers;
    const idManagers = [];
    const nameManagers = [];
    //console.log(arrManagers);
    for(let i = 0; i < arrManagers.length; i++){
        idManagers.push(arrManagers[i][0].id);
        nameManagers.push(arrManagers[i][0].name);
    }
    
    console.log();
    console.log('===========================================');
    console.log('Pregunta 8');
    //console.log(obj);

    console.log('No logre dar con la solución el tiempo no me dió, espero me den una oportunidad')

  }
  

  paddocksManagers();


  // 9 Agregar nuevo administrador con datos ficticios a "paddockManagers" 
  // y agregar un nuevo cuartel de tipo NOGALES con 900mts2, 
  // año 2017 de AGRICOLA SANTA ANA, administrado por este nuevo administrador 
// Luego devolver el lugar que ocupa este nuevo administrador en el ranking de la pregunta 3.
// No modificar arreglos originales para no alterar las respuestas anteriores al correr la solución
function newManagerRanking() {
    // CODE HERE
    
    console.log();
    console.log('===========================================');
    console.log('Pregunta 9');
    console.log(agregarDatosPaddockManagers('Peter Aspiazu'));
    
    return agregarDatosPaddockManagers('Peter');
  }
  
  newManagerRanking();

