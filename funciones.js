//addEventListener permite ejhecutar la función cuando se haga click
import { edit, getData, remove, save, selectOne } from "./firestore.js"
//variable que contiene el id
let id = 0
document.getElementById('btnGuardar').addEventListener('click', () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })
    //verificar si existen estilos en rojo (is-invalid)
    if(document.querySelectorAll('.is-invalid').length == 0) {
        const registro = {
            run: document.getElementById('run').value,
            nom: document.getElementById('nombre').value.trim(),
            mar: document.getElementById('marca').value,
            mod: document.getElementById('modelo').value,
            pat: document.getElementById('patente').value,
            fechain: document.getElementById('fechaIngreso').value,
            horain: document.getElementById('horaIngreso').value,
            fechasa: document.getElementById('fechaSalida').value,
            horasa: document.getElementById('horaSalida').value,
        }
        if (document.getElementById('btnGuardar').value == 'Guardar') {
            save(registro)
        }
        else {
            edit(id, registro)
            id = 0

        }
        limpiar()
    }
})

//DOMContentLoaded es un evento que se activa al recargar la página
window.addEventListener('DOMContentLoaded', () => {
    getData((datos) => {
        let tabla = ''
        datos.forEach((doc) => {
            //Data trae todos los valores de los documentos de la base de datos
            const item = doc.data()
            tabla += `<tr>
            <td>${item.run}</td>
            <td>${item.nom}</td>
            <td>${item.mar}</td>
            <td>${item.mod}</td>
            <td>${item.pat}</td>
            <td>${item.fechain}</td>
            <td>${item.horain}</td>
            <td>${item.fechasa}</td>
            <td>${item.horasa}</td>
            <td nowrap>
                <button class="btn btn-warning" id="${doc.id}">Editar</button>
                <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
            </td>
        </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        //recorrer todos los botones eliminar
        document.querySelectorAll('.btn-danger').forEach(btn => {
            //verificar en que boton se hizo click
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "Está seguro de borrar el registro?",
                    text: "No hay vuelta atrás!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    cancelButtonText: "Cancelar",
                    confirmButtonText: "Si! Borrar el registro!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Borrado!",
                            text: "El registro ha sido eliminado para siempre >:) ",
                            icon: "success"
                        });
                        //invocamos la funcion que permite eliminar el documento, enviando el id
                        remove(btn.id)
                    }
                });

            })
        })
        document.querySelectorAll('.btn-warning').forEach(btn => {
            //async y await permite esperar una respuesta de la funcion para continuar con el codigo
            btn.addEventListener('click', async () => {
                //ejecutamos la consulta que retorna el documento apsando el id como parametro
                const vehiculo = await selectOne(btn.id)
                //capturamos los valores del documento
                const e = vehiculo.data()
                //pasar valores a los inputs

                document.getElementById('run').value = e.run
                document.getElementById('nombre').value = e.nom
                document.getElementById('marca').value = e.mar
                document.getElementById('modelo').value = e.mod
                document.getElementById('patente').value = e.pat
                document.getElementById('fechaIngreso').value = e.fechain
                document.getElementById('horaIngreso').value = e.horain
                document.getElementById('fechaSalida').value = e.fechasa
                document.getElementById('horaSalida').value = e.horasa
                //cambiar el boton a editar

                document.getElementById('btnGuardar').value = 'Editar'
                //solo lectura al run
                document.getElementById('run').readOnly = true
                //asignar id del documento
                id = vehiculo.id
            })
        })
    })
})
