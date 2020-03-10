const fs = require('fs');

let listadoPorHAcer = [];


const guardarDB = () => {

    let data = JSON.stringify(listadoPorHAcer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });

}

const cargarDb = () => {

    try {
        listadoPorHAcer = require('../db/data.json');
    } catch (error) {
        listadoPorHAcer = [];
    }

}

const crear = (descripcion) => {

    cargarDb();

    let porHacer = {
        descripcion,
        completado: false
    }
    listadoPorHAcer.push(porHacer);
    guardarDB();
    return porHacer;
}

const getListado = () => {
    cargarDb();
    return listadoPorHAcer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDb();
    let index = listadoPorHAcer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHAcer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDb();

    let nuevoListado = listadoPorHAcer.filter(tarea => tarea.descripcion !== descripcion);
    if (listadoPorHAcer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHAcer = nuevoListado;
        guardarDB();
        return true;
    }

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}