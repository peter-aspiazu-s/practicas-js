const { paddockManagers, paddockType, paddocks, farms } = require("../db/data");

const ordenarArrayPorNombreAreaCultivo = (id) => {

    const paddockTypeIdarea = [];
    const initialValue = 0;

    paddocks.forEach(element => {
        return (
            paddockTypeIdarea.push(`${element.paddockTypeId} ${element.area}`.split(' '))
        )
    })

    const paddockTypeIdareaFilter = paddockTypeIdarea.filter(arr => Number(arr[0]) === id);
    const area = []
    paddockTypeIdareaFilter.forEach(element => area.push(Number(element[1])))

    const sumarAreas = area.reduce(
        (valorPrevio, valorActual) => valorPrevio + valorActual, initialValue
    );

    const total = sumarAreas;
    
    const filterId = paddockType.filter(element => element.id === id);
    const nombre = filterId[0].name;
    return {
        nombre, total
    }
}

const ordenarArrayPorNombreAdministradores = (id = 1) => {

    const paddockTypeIdarea = [];
    const initialValue = 0;

    paddocks.forEach(element => {
        return (
            paddockTypeIdarea.push(`${element.paddockManagerId} ${element.area}`.split(' '))
        )
    })
    
    const paddockTypeIdareaFilter = paddockTypeIdarea.filter(arr => Number(arr[0]) === id);
    
    const area = []
    paddockTypeIdareaFilter.forEach(element => area.push(Number(element[1])))
    
    const sumarAreas = area.reduce(
        (valorPrevio, valorActual) => valorPrevio + valorActual, initialValue
    );

    const total = sumarAreas;
    
    const filterId = paddockManagers.filter(element => element.id === id);
    const nombre = filterId[0].name;
    
    return {
        nombre, total
    }
}


const ordenarPorCamposRuc = (id = 1) => {

    //

    const nombreCampo = farms.filter(element => element.id == id);
    const arr = paddocks.filter(id => id.farmId == nombreCampo[0].id);
    const idManagers = arr.map(id => id.paddockManagerId);
    
    let arrManagers = [];
    for(let i = 0; i < idManagers.length; i++){
        arrManagers.push(paddockManagers.filter(arr => arr.id == idManagers[i]));
    }
    const arrName = [];
    arrName.push(arrManagers.map(element => element[0].name));
    
    const deleteNameRepeat = arrName[0].filter((arr, index) => arrName[0].indexOf(arr) === index);

    const nameOrder = deleteNameRepeat.sort();

    let rucArr = [];
    for(let i = 0; i < arrManagers.length; i++){
        rucArr.push(paddockManagers.find(arr => arr.name == nameOrder[i]));
    }
    
    const rucFilter = rucArr.filter(e => e !== undefined);
    const ruc = [];
    for(let j = 0; j < rucFilter.length; j++){
        ruc.push(rucFilter[j].taxNumber);
    }

    console.log(ruc);

    const nameFarms = nombreCampo.find(name => name.name);

    return{
        nameFarms,
        ruc
    }
}


const ordenarArrayPorHectareas = (id = 1) => {

    const paddockTypeIdarea = [];

    paddocks.forEach(element => {
        return (
            paddockTypeIdarea.push(`${element.paddockTypeId} ${element.area}`.split(' '))
        )
    })
    
    const paddockTypeIdareaFilter = paddockTypeIdarea.filter(arr => Number(arr[0]) === id);
    
    const area = []
    paddockTypeIdareaFilter.forEach(element => area.push(Number(element[1])))
    const areaFilter = area.filter(num => num > 20000);
    
    return areaFilter
    
}


const ordenarArrayPorNombreAdministradoresForestal = (id = 1) => {

    const paddockTypeIdarea = [];

    paddocks.forEach(element => {
        return (
            paddockTypeIdarea.push(`${element.paddockManagerId} ${element.farmId} ${element.area}`.split(' '))
        )
    })

    const paddockTypeIdareaFilter = paddockTypeIdarea.filter(arr => Number(arr[1]) === id);
    
    let arrNameManagers = [];
    
    const areaMasDeMil =  paddockTypeIdareaFilter.filter(area => area[2] > 1000);
    
    for(let areas of areaMasDeMil){
        arrNameManagers.push(paddockManagers.find(managersId => managersId.id == Number(areas[0])))
    }

    // Eliminar nombres repetidos
    const arr = arrNameManagers.filter((arr, index) => arrNameManagers.indexOf(arr) === index);
    
    return {
        arr
    }
}


const ordenarAdministradoresCampos = (id = 1) => {

    const array = [];
    array.push(paddocks.filter(({paddockManagerId}) => paddockManagerId == id));
    
    const administra = array[0].map(element => element);

    const nameManager = paddockManagers.filter(element => element.id == id)
    const name = nameManager[0].name


    return {
        administra,
        name
    };

}


const ordenarCultivoAñoAdmin = (id = 1) => {

    // TIPO DE CUULTIVO Y AÑO
    const camposArr = paddocks.filter(cultivo => cultivo.paddockTypeId == id);

    const camposManagers = [];
    for(let i = 0; i < camposArr.length; i++){
        camposManagers.push(paddockManagers.filter(idManager => idManager.id == camposArr[i].paddockManagerId));
    }
    
    //En esta variable ya tengo ordenado los nombres de los managers
    //con el año que les corresponde
    //console.log(camposManagers[0][0]);

    const obj = {};
    const obj2 = {}

    let cultivoArr = [];
    cultivoArr.push(paddockType.filter(arr => arr.id == id));
    let año = [];
    for(let i = 0; i < camposArr.length; i++){
        año.push(camposArr[i].harvestYear);
    }

    let añoCultivo = [];
    for(let j = 0; j < año.length; j++){
        añoCultivo.push(`${cultivoArr[0][0].name}-${año[j]}`)
    }

    //console.log(añoCultivo);

    // ID Y NOMBRE DE ADMINISTRADOR
    let adminIdArr = [];

    for(let i = 0; i < camposArr.length; i++){
        adminIdArr.push(paddockManagers.filter(admin => admin.id == camposArr[i].paddockManagerId));
    }

    let adminArr = [];
    let idArr = [];
    for(let j = 0; j < adminIdArr.length; j++){
        idArr.push(adminIdArr[j][0].id);
        adminArr.push(adminIdArr[j][0].name);
    }

    // PETER DEL MAÑANA NECESITO FILTRAR EL ID Y EL NOMBRE Y UBICARLOS EN EL AÑO
    // QUE CORRESPONDE PILAS
     


    return {
        añoCultivo,
        adminArr,
        idArr,
        camposManagers
    }
}


// agregar datos ficticios a paddockManagers

const agregarDatosPaddockManagers = (nameManager) => {

    // AGREGANDO EL NUEVO MANAGER
    let newId = []
    paddockManagers.map(element => newId.push(element.id));
    
    const id = newId.length +1;
    const taxNumber = new Date().getTime();
    const name = nameManager

    paddockManagers.push({id, taxNumber: taxNumber.toString(), name});

    
    // AGREGANDO un nuevo cuartel de tipo NOGALES con 900mts2,
    // año 2017 de AGRICOLA SANTA ANA, administrado por este nuevo administrador
    paddocks.push({paddockManagerId: id, farmId: 1, paddockTypeId: 4, harvestYear: 2017, area: 900});
    //Luego devolver el lugar que ocupa este nuevo administrador en el ranking
    const array = [];
    array.push(ordenarArrayPorNombreAdministradores(1));
    array.push(ordenarArrayPorNombreAdministradores(2));
    array.push(ordenarArrayPorNombreAdministradores(3));
    array.push(ordenarArrayPorNombreAdministradores(4));
    array.push(ordenarArrayPorNombreAdministradores(5));
    array.push(ordenarArrayPorNombreAdministradores(6));
    array.push(ordenarArrayPorNombreAdministradores(id));
    
    // Nombres ordenados de mayor a menor en areas
    const arrayAreas = []
    array.forEach(element => arrayAreas.push(element.total));
    const arrayAreasOrder = arrayAreas.sort((a, b) => b - a);
    
    const arrayNombreAreas = []

    for(let i = 0; i < arrayAreasOrder.length; i++){
        const arr = array.find(element => element.total == arrayAreasOrder[i]);

        arrayNombreAreas.push(arr.nombre);
    }

    return arrayNombreAreas;
}

module.exports = {
    ordenarArrayPorNombreAreaCultivo,
    ordenarArrayPorNombreAdministradores,
    ordenarArrayPorHectareas,
    ordenarPorCamposRuc,
    ordenarArrayPorNombreAdministradoresForestal,
    ordenarAdministradoresCampos,
    ordenarCultivoAñoAdmin,
    agregarDatosPaddockManagers
}
