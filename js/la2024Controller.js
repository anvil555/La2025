'use strict';

const MODEL = Symbol('La2024Model');
const VIEW = Symbol('La2024View');



class La2024Controller {
    constructor(modelLa2024, viewLa2024) {
        this[MODEL] = modelLa2024;
        this[VIEW] = viewLa2024;

        if (sessionStorage.getItem('usuario') === 'admin') {
            this.onLoad(sessionStorage.getItem('usuario'))
        } else {
            let mensaje = "";
            this[VIEW].showLoginModal(this.onLogin, this.onRegister, mensaje);
        }


    }//fin de constructor

    onLogin = async (user) => {
        // console.log('user de modal', user);
        try {
            let registro = await this[MODEL].loginApp(user);

            if (registro && registro === true) {
                // console.log("Usuario ha iniciado sesión con éxito");
                let usuario = await this[MODEL].getServerSession();
                // console.log('usuario.php en controller', usuario);
                // sessionStorage.setItem('usuario', user.nombre);//variable de sesion en el navegador
                this.onLoad(usuario);
            } else {
                let mensaje = "Usuario o contraseña incorrectos";
                this[VIEW].showLoginModal(this.onLogin, this.onRegister, mensaje);
            }
        } catch (err) {
            let mensaje = "Usuario o contraseña incorrectos";
            this[VIEW].showLoginModal(this.onLogin, this.onRegister, mensaje);
            console.log("Fallo al iniciar la sesion");
        }
    }
    onLoad = async (usuario) => {
        // usuario = await this[MODEL].getUsuarioPorId(1);//BORRAR


        this[VIEW].showNavBar(usuario, this.onExit);
        this[VIEW].bindNavBar(this.handlerSubMenu, await this[MODEL].refreshInfo());
        let info = await this[MODEL].refreshInfo();
        let mapa = await this[MODEL].stadisticsAvisos();
        this[VIEW].showMainView(info, mapa);

    }
    onExit = async (param) => {
        console.log('onExit', param)
        switch (param.option) {
            case "changePassDrop":
                this[VIEW].showChangePassModal("");
                this[VIEW].bindChangePass(this.handlerChangePassModal, param.userId);
                break;
            case "deleteUserDrop":
                let user = await this[MODEL].getServerSession();
                user.userId = user.id;
                user.delete = true;
                console.log('Autoborrado de Perfil', user);
                this[VIEW].showInfoModalRemoveUsuario(this.handlerRemoveUser, user);
                break;
            case "cerrarSesion":
                console.log('cerramos la sesion de navegador de : ', param.nombreUsuario);
                // sessionStorage.removeItem('usuario');
                if (sessionStorage.getItem('usuario') === null) {
                    console.log('La variable ha sido eliminada');
                } else {
                    console.log('La variable sigue existiendo');
                }
                this[MODEL].cerrarSesion();

                this[VIEW].showWhiteView();
                let mensaje = "";
                this[VIEW].showLoginModal(this.onLogin, this.onRegister, mensaje);
                break;

            default:
                break;
        }


    }
    onRegister = () => {
        console.log('Registro nuevo usuario');
        this[VIEW].showNuevoUsuarioModal(this.handlerNuevoUsuario, "");
    }
    muestraManager() {
        console.log(this[MODEL]);
    }

    /********************** APARTADO BARRA NAVEGACION ************************/


    /**
     * aqui manejamos las opciones de los submenus.
     * 
     * @param {*} opcion 
     */
    handlerSubMenu = async (opcion) => {
        console.log(opcion);
        if (opcion === 'altaCliente') {
            this[VIEW].showNuevoCliente();
            this[VIEW].bindNuevoCliente(this.handlerFormAltaCliente);
        } else if (opcion === 'modificaCliente') {
            this[VIEW].showCabeceraBusqueda();
            this[VIEW].bindBusquedaClientes(this.handlerBusquedaCliente);
        } else if (opcion === 'altaMaquina') {
            let coleccion = await this[MODEL].getClientesSQL();
            this[VIEW].showNuevaMaquina(coleccion);
            this[VIEW].bindNuevaMaquina(this.handlerFormAltaMaquina);
        } else if (opcion === 'modificaMaquina') {
            this[VIEW].showCabeceraBusquedaMaquinas();
            this[VIEW].bindBusquedaMaquinas(this.handlerBusquedaMaquina);
        } else if (opcion === 'nuevoAviso') {
            let mapaClientes = await this[MODEL].getClientesSQL();
            this[VIEW].showNuevoAviso(mapaClientes, this.handlerMaquinasDeCliente);
            let cantidadAvisos = await this[MODEL].getCuentaAvisosSQL();
            this[VIEW].bindFlechaBotones(this.handlerNavegadorAvisos, cantidadAvisos);
        } else if (opcion === 'avisosPendientes') {
            let param = {};
            param.orden = 'fechaAsc';
            let avisosPendientes = await this[MODEL].getAvisosPendientesSQL();
            let avisosPendientesTool = await this[MODEL].avisoTool();
            let productoresList = await this[MODEL].getProductoresSQL();
            let productor = 'todos';
            this[VIEW].showAvisosPendientes(param.orden, avisosPendientes, productoresList, productor);
            this[VIEW].bindAvisosPendientes(avisosPendientesTool, this.handlerAvisosPendientes, param);
        } else if (opcion === 'changePass') {
            this[VIEW].showChangePassModal(mensaje)
            this[VIEW].bindChangePass(this.handlerChangePassModal, usuario.id);
        } else if (opcion === 'deleteUser') {
            let user = await this[MODEL].getServerSession();
            this[VIEW].showInfoModalRemoveUsuario(this.handlerRemoveUser, user.id);
        } else if (opcion === 'nuevoUsuario') {
            this[VIEW].showNuevoUsuario();
            this[VIEW].bindNuevoUsuario(this.handlerNuevoUsuario, "");
        } else if (opcion === 'adminUsuarios') {
            let listadoUsuarios = await this[MODEL].getUsuariosSQL();
            this[VIEW].showListadoUsuarios(listadoUsuarios);
            let roles = ['admin', 'user'];
            this[VIEW].bindListadoUsuarios(this.handlerUpdateOrDeleteUsuario, roles);
        } else if (opcion === 'home') {
            let info = await this[MODEL].refreshInfo();
            let mapa = await this[MODEL].stadisticsAvisos();
            this[VIEW].showMainView(info, mapa);
        } else if (opcion === 'menuClientes') {
            let mapa = await this[MODEL].stadisticsClientes();//cambiar esta estadistica
            this[VIEW].showClientesView(mapa);
        } else if (opcion === 'menuMaquinas') {
            let mapa = await this[MODEL].stadisticsMaquinas();//cambiar esta estadistica
            this[VIEW].showMaquinasView(mapa);
        } else if (opcion === 'menuAvisos') {
            let mapa = await this[MODEL].stadisticsAvisos();//cambiar esta estadistica
            this[VIEW].showAvisosView(mapa);
        } else if (opcion === 'menuAdmin') {
            let listadoUsuarios = await this[MODEL].getUsuariosSQL();
            this[VIEW].showListadoUsuarios(listadoUsuarios);
            let roles = ['admin', 'user'];
            this[VIEW].bindListadoUsuarios(this.handlerUpdateOrDeleteUsuario, roles);
        } else if (opcion === "menuTecnicos") {
            let mapa = await this[MODEL].stadisticsProductores();
            this[VIEW].showProductoresView(mapa);
        } else if (opcion === 'altaProductor') {
            this[VIEW].showNuevoProductor();
            this[VIEW].bindNuevoProductor(this.handlerNuevoProductor);
        } else if (opcion === 'modificaProductor') {
            let productores = await this[MODEL].getProductoresSQL();
            this[VIEW].showListadoProductores(productores);
            this[VIEW].bindListadoProductores(this.handlerUpdateOrDeleteProductor);
        } else if (opcion==='menuAcerca'){
            this[VIEW].showAcercaView();
        }
    }

    /************************** APARTADO CLIENTES ****************************/

    /**
     * 
     * MANEJADOR DEL APARTADO NUEVO CLIENTE
     */
    handlerFormAltaCliente = async (cliente) => {
        console.log('handlerCliente', cliente)

        let idTemp = await this[MODEL].getIdClienteSQL(cliente.nombre);
        if (idTemp && idTemp > 0) {
            let mensaje = "Ya existe un cliente con el nombre " + cliente.nombre.toUpperCase() + " con ID: " + idTemp;
            this[VIEW].showConfirmModal(mensaje, this.handlerConfirmModal);
        } else {
            await this[MODEL].addClienteSQL(cliente);
            let newId = await this[MODEL].getIdClienteSQL(cliente);
            console.log("desde model: ", newId);

            let mensaje = "El cliente " + cliente.nombre + " añadido con éxito.";
            this[VIEW].showConfirmModal(mensaje, this.handlerConfirmModal);
            let coleccion = await this[MODEL].busquedaClientesSQL(cliente.nombre);//coleccion de clientes ajax segun datos de input    
            this[VIEW].showCabeceraBusqueda();
            this[VIEW].showListadoClientesEncontrados(coleccion, this.handlerDetalleCliente);//con esta linea mostramos los clientes en formato falsa tabla

        }
    }
    handlerConfirmModal = (mensaje) => {
        console.log(mensaje);
        if (mensaje) {
            //es aceptado mostrar la vista que queramos
            console.log('mostramos la vista principal.');
        } else {
            //si no seguir mostrando el formulario
        }
    }
    /**
     * MANEJADOR QUE RECOGE EL DATO DE BUSQUEDA EN TIEMPO REAL.
     */
    handlerBusquedaCliente = async (nombreCliente) => {
        let coleccion = await this[MODEL].busquedaClientesSQL(nombreCliente);//coleccion de clientes ajax segun datos de input    

        this[VIEW].showListadoClientesEncontrados(coleccion, this.handlerDetalleCliente);//con esta linea mostramos los clientes en formato falsa tabla

    }
    handlerDetalleCliente = async (idCliente) => {
        let cliente = await this[MODEL].getMaquinasPorCliente(idCliente);

        //hay que intentar suprimir la coleccion... y mostrar solo el cliente
        let coleccion = await this[MODEL].busquedaClientesSQL(idCliente);//coleccion de clientes ajax segun datos de input    
        let cuentaDeAvisos = await this[MODEL].getCuentaAvisosClienteSQL(idCliente);
        cliente.cuenta = cuentaDeAvisos;
        cliente.ultimoAviso = await this[MODEL].ultimoAviso(idCliente);
        this[VIEW].showDetalleCliente(cliente);
        this[VIEW].bindListadoClientesEncontrados(coleccion, this.handlerUpdateAndDeleteCliente);//y con esta le dotamos de funcionalidad

    }
    /**
     * 
     * MANEJADOR PARA ACTUALIZAR O BORRAR UN CLIENTE
     */
    handlerUpdateAndDeleteCliente = async (clienteTool) => {
        console.log("update or delete:", clienteTool);

        //gestion de borrado de cliente
        if (clienteTool.delete == true) {
            console.log('detete:', "aqui para borrar cliente");
            this[VIEW].showInfoModalRemoveCliente(this.handlerRemoveCliente, clienteTool.id);
        }
        //gestion de actualizacion de cliente
        else if (clienteTool.update == true) {
            console.log('update:', "aqui para actualizar");
            let idTemp = await this[MODEL].getIdClienteSQL(clienteTool.nombre);
            console.log('idTemp', idTemp);

            let clienteTemp = await this[MODEL].getClientePorId(clienteTool.id);
            console.log('clienteTemp', clienteTemp)

            if (idTemp && idTemp > 0 && clienteTool.nombre !== clienteTemp.nombre) {
                let mensaje = "Ya existe un cliente con el nombre " + clienteTool.nombre.toUpperCase() + " con ID: " + idTemp;
                this[VIEW].showConfirmModal(mensaje, this.handlerConfirmModal);
                this[VIEW].cancelarUpdateCliente(clienteTemp);
            } else {
                this[MODEL].updateClienteSQL(clienteTool);
                this[VIEW].showConfirmUpdateModal('Datos de ' + clienteTool.nombre + ' actualizados.');
            }
        }
        //gestion de parque de maquinas por cliente
        else if (clienteTool.parque == true) {
            console.log('Parque de cliente: ', clienteTool)
            //aqui mostrar el listado de maquinas por cliente
        } else if (clienteTool.historial == true) {
            console.log('Historial de cliente:', clienteTool)
            //aqui mostrar historial de cliente.
        }
    }
    handlerRemoveCliente = async (idCliente) => {
        console.log(idCliente);
        await this[MODEL].removeAvisosPorClienteSQL(idCliente);
        await this[MODEL].removeMaquinasClienteSQL(idCliente);
        await this[MODEL].removeClienteSQL(idCliente);
        this[MODEL].removeClienteMap(idCliente);
        let mapa = await this[MODEL].stadisticsClientes();//cambiar esta estadistica
        this[VIEW].showClientesView(mapa);
    }

    /************************** APARTADO MAQUINAS ****************************/


    handlerFormAltaMaquina = async (maquina) => {
        console.log('handlerMaquina', maquina)

        let idMaquinaTemp = await this[MODEL].getIdMaquinaSQL(maquina.chasis);

        console.log('idMaquinaTemp', idMaquinaTemp);

        if (idMaquinaTemp && idMaquinaTemp > 0) {
            let mensaje = "Ya existe una máquina con el chasis " + maquina.chasis.toUpperCase() + " con ID: " + idMaquinaTemp;
            this[VIEW].showConfirmModal(mensaje, this.handlerConfirmModal);

        } else {
            await this[MODEL].addMaquinaSQL(maquina);
            await this[MODEL].getMaquinasSQL();

            let mensaje = "La máquina con chasis " + maquina.chasis + " añadida con éxito.";
            this[VIEW].showConfirmModal(mensaje, this.handlerConfirmModal);

            this[VIEW].showCabeceraBusquedaMaquinas();
            this[VIEW].bindBusquedaMaquinas(this.handlerBusquedaMaquina(maquina.chasis));

        }
    }
    handlerBusquedaMaquina = async (chasisMaquina) => {
        let coleccionMaquinas = await this[MODEL].busquedaMaquinasSQL(chasisMaquina);//coleccion de maquinas ajax segun datos de input
        this[VIEW].showListadoMaquinasEncontradas(coleccionMaquinas, this.handlerDetalleMaquina);//con esta linea mostramos las maquinas en formato falsa tabla
    }
    handlerDetalleMaquina = async (chasis) => {
        console.log('idMaquina handlerDetalleMaquina:', chasis);
        let element = await this[MODEL].maquinaTool(chasis);

        let coleccionMaquinas = await this[MODEL].busquedaMaquinasSQL(chasis);//coleccion de maquinas ajax segun datos de input
        let coleccionClientesAlta = await this[MODEL].getClientesDeAltaSQL();

        this[VIEW].showDetalleMaquina(element);
        this[VIEW].bindListadoMaquinasEncontradas(element, coleccionClientesAlta, this.handlerUpdateAndDeleteMaquina);//y con esta le dotamos de funcionalidad

    }
    handlerUpdateAndDeleteMaquina = async (maquina) => {
        // console.log("update or delete:", maquina);
        if (maquina.update == true) {
            console.log("update:", maquina);
            //comprobar que no haya otra maquina con el mismo chasis
            let storedMaquina = await this[MODEL].getMaquinaPorChasisSQL(maquina.chasis);
            if (storedMaquina && storedMaquina.chasis == maquina.chasis && storedMaquina.id != maquina.id) {
                console.log("ya existe una maquina con ese chasis");
                let mensaje = "Ya existe una maquina con el chasis " + maquina.chasis + " con ID: " + storedMaquina.id;
                this[VIEW].showConfirmModal(mensaje, this.handlerConfirmModal);
                let originalMaquina = await this[MODEL].getMaquinaPodIdSQL(maquina.id);/////
                this[VIEW].showUpdateMaquina(originalMaquina);
            } else {
                this[MODEL].updateMaquinaSQL(maquina);
                this[VIEW].showConfirmUpdateModal('Datos de maquina ' + maquina.chasis + ' actualizados correctamente');
                let storedCliente = await this[MODEL].getClientePorId(maquina.cliente);
                maquina.nombreCliente = storedCliente.nombre;
                this[VIEW].showUpdateMaquina(maquina);
            }

        } else if (maquina.delete == true) {
            console.log('delete:', "aqui para borrar maquina");
            this[VIEW].showInfoModalRemoveMaquina(this.handlerRemoveMaquina, maquina);


        } else if (maquina.historial == true) {
            console.log('historial maquina: ', maquina)
        }
    }
    handlerRemoveMaquina = async (idMaquina) => {
        console.log('idMaquina delete', idMaquina);
        let storedMaquina = await this[MODEL].getMaquinaPodIdSQL(idMaquina);
        await this[MODEL].removeAvisosPorChasisSQL(storedMaquina.chasis);
        this[MODEL].removeMaquinaSQL(idMaquina);
        this[MODEL].removeMaquinaMap(idMaquina);
        let info = await this[MODEL].refreshInfo();
        let mapa = await this[MODEL].getAvisosPorAnio();
        this[VIEW].showMainView(info, mapa);
    }

    /************************** APARTADO AVISOS ****************************/

    handlerMaquinasDeCliente = async (idCliente) => {
        console.log('conseguir maquinas para el cliente: ', idCliente);
        let mapaMaquinasCliente = await this[MODEL].getMaquinasPorCliente(idCliente);
        let mapaAvisosCliente = await this[MODEL].getAvisosPorCliente(idCliente);
        let mapaProductores = await this[MODEL].getProductoresSQL();
        this[VIEW].bindNuevoAviso(mapaMaquinasCliente, mapaAvisosCliente, mapaProductores, this.handlerFormNuevoAviso);

        this[VIEW].showInfoAveriasCliente(mapaAvisosCliente, this.handlerModalDetalleAviso);


    }
    handlerFormNuevoAviso = async (aviso) => {
        console.log('Nuevo Aviso', aviso);
        if (aviso.info == true) {
            delete aviso.info;
            let mapaAvisosMaquina = await this[MODEL].getAvisosPorChasis(aviso.chasis)
            this[VIEW].showInfoAveriasMaquina(mapaAvisosMaquina, this.handlerModalDetalleAviso);
        } else if (aviso.new == true) {
            delete aviso.new;
            this[MODEL].addAvisoSQL(aviso);
            let mapaClientes = await this[MODEL].getClientesSQL();
            let cantidadAvisos = await this[MODEL].getCuentaAvisosSQL();
            this[VIEW].showNuevoAviso(mapaClientes, this.handlerMaquinasDeCliente);
            this[VIEW].bindFlechaBotones(this.handlerNavegadorAvisos, cantidadAvisos);

        } else if (aviso.reset == true) {
            delete aviso.reset;
            let mapaClientes = await this[MODEL].getClientesSQL();
            let cantidadAvisos = await this[MODEL].getCuentaAvisosSQL();
            this[VIEW].showNuevoAviso(mapaClientes, this.handlerMaquinasDeCliente);
            this[VIEW].bindFlechaBotones(this.handlerNavegadorAvisos, cantidadAvisos);
        }
    }
    handlerAvisosPendientes = async (parametro) => {
        console.log('parametro avisos controller', parametro);

        let productoresList = await this[MODEL].getProductoresSQL();

        let avisosPendientes = async (parametro) => {
            if (parametro.paramProductor && parametro.paramProductor != 'todos') {
                return await this[MODEL].getAvisosPendientesPorProductorSQL(parametro.paramProductor);
            } else {
                return await this[MODEL].getAvisosPendientesSQL();
            }
        }


        let avisosPendientesTool = await this[MODEL].avisoTool();
        avisosPendientesTool.avisosPendientes = await avisosPendientes(parametro);
        // console.log('la longitud de parametros.paramAvisosFinalizados es:', parametro.paramAvisosFinalizados.length)

        if (parametro.paramAvisosFinalizados && parametro.paramAvisosFinalizados.size > 0) {
            await this[MODEL].setEndAvisos(parametro.paramAvisosFinalizados);
            delete parametro.paramAvisosFinalizados;
            let info = await this[MODEL].refreshInfo();
            this[VIEW].showAvisosPendientes(parametro.orden, await avisosPendientes(parametro), productoresList, parametro.paramProductor);
        } else if (parametro.orden && !parametro.update) {
            this[VIEW].showAvisosPendientes(parametro.orden, await avisosPendientes(parametro), productoresList, parametro.paramProductor/*,paramProductor*/);
        } else if (parametro.update == true) {
            await this[MODEL].updateAvisoSQL(parametro);
            this[VIEW].showAvisosPendientes(parametro.orden, await avisosPendientes(parametro), productoresList, parametro.paramProductor);
            delete parametro.update;
        } else if (parametro.delete == true) {
            console.log('parametro eliminar aviso', parametro);
            this[VIEW].showInfoModalRemoveAviso(this.handlerRemoveAviso, parametro);
            delete parametro.delete;
        } else {
            parametro.orden = 'fechaAsc';
            this[VIEW].showAvisosPendientes(parametro.orden, await avisosPendientes(parametro), productoresList, parametro.paramProductor/*,paramProductor*/);
        }
        this[VIEW].bindAvisosPendientes(avisosPendientesTool, this.handlerAvisosPendientes, parametro);
    }
    handlerRemoveAviso = async (parametro) => {
        console.log('parametro eliminar aviso', parametro.id);
        if (parametro.delete == true) {
            console.log("eliminar aviso en modelo: " + parametro.id);
        } else if (parametro.cancelar == true) {
            let productoresList = await this[MODEL].getProductoresSQL();
            // let avisosPendientes = await this[MODEL].getAvisosPendientesSQL();
            let avisosPendientes;
            if (parametro.paramProductor) {
                avisosPendientes = await this[MODEL].getAvisosPendientesPorProductorSQL(parametro.paramProductor);
            } else {
                avisosPendientes = await this[MODEL].getAvisosPendientesSQL();
            }
            this[VIEW].showAvisosPendientes('fechaAsc', avisosPendientes, productoresList, parametro.paramProductor);
            let avisosPendientesTool = await this[MODEL].avisoTool();
            this[VIEW].bindAvisosPendientes(avisosPendientesTool, this.handlerAvisosPendientes)

        }
    }
    handlerModalDetalleAviso = async (idAviso) => {
        console.log('idAviso handlerDetalleAviso:', idAviso);
        let aviso = await this[MODEL].getAvisoPorId(idAviso);
        this[VIEW].showModalInfoDetalleAviso(aviso);


    }
    handlerNavegadorAvisos = async (param) => {
        // console.log('parametro flecha', param);
        let aviso;
        let mapaClientes = await this[MODEL].getClientesSQL();
        let mapaMaquinas = await this[MODEL].getMaquinasSQL();
        let mapaProductores = await this[MODEL].getProductoresSQL();
        let rutaImagen = (chasis) => {
            return this[MODEL].getImagen(chasis);
        }
        switch (param.comando) {
            case 0:
                aviso = await this[MODEL].getAvisoPorId(param.nAvisos);
                this[VIEW].bindMostrarAviso(aviso, mapaMaquinas, mapaProductores, rutaImagen, this.handlerUpdateAvisoGuardado);
                break;
            case 1:
                aviso = await this[MODEL].getFirstAviso();
                this[VIEW].bindMostrarAviso(aviso, mapaMaquinas, mapaProductores, rutaImagen, this.handlerUpdateAvisoGuardado);
                break;
            case -1:
                aviso = await this[MODEL].getPrevAviso(param.nAvisos);
                this[VIEW].bindMostrarAviso(aviso, mapaMaquinas, mapaProductores, rutaImagen, this.handlerUpdateAvisoGuardado);

                break;
            case 2:
                aviso = await this[MODEL].getNextAviso(param.nAvisos);
                this[VIEW].bindMostrarAviso(aviso, mapaMaquinas, mapaProductores, rutaImagen, this.handlerUpdateAvisoGuardado);
                break;
            case 3:
                aviso = await this[MODEL].getLastAviso();
                this[VIEW].bindMostrarAviso(aviso, mapaMaquinas, mapaProductores, rutaImagen, this.handlerUpdateAvisoGuardado);

                break;
            case 4:
                this[VIEW].showNuevoAviso(mapaClientes, this.handlerMaquinasDeCliente);
                let cantidadAvisos = await this[MODEL].getCuentaAvisosSQL();

                this[VIEW].bindFlechaBotones(this.handlerNavegadorAvisos, cantidadAvisos);

                break;
            default:
                console.log('default');
                break;
        }
    }
    handlerUpdateAvisoGuardado = async (aviso) => {
        console.log('aviso a actualizar:', aviso);
        if (aviso && aviso.reset == true) {
            delete aviso.reset;
            let mapaClientes = await this[MODEL].getClientesSQL();
            let cantidadAvisos = await this[MODEL].getCuentaAvisosSQL();

            this[VIEW].showNuevoAviso(mapaClientes, this.handlerMaquinasDeCliente);
            this[VIEW].bindFlechaBotones(this.handlerNavegadorAvisos, cantidadAvisos);

        } else if (aviso.update == true) {
            await this[MODEL].updateAvisoSQL(aviso);
            this[VIEW].showConfirmUpdateModal('Datos de aviso ' + aviso.id + ' actualizados correctamente');

        }

    }

    /***************************** APARTADO USUARIOS **************************/

    handlerChangePass = async (usuario) => {

        console.log('password para cambiar', usuario);

        if (usuario.pass) {
            let user = await this[MODEL].getServerSession();
            console.log('user session ', user);
            let changedUser = {};
            changedUser.id = user.id;
            changedUser.pass = usuario.pass;
            await this[MODEL].updatePass(changedUser);
            let mensaje = "Contraseña Actualizada";
            this[VIEW].showConfirmModal(mensaje);
            let info = await this[MODEL].refreshInfo();
            let mapa = await this[MODEL].getAvisosPorAnio();
            this[VIEW].showMainView(info, mapa);
        } else if (usuario.cancelar && usuario.cancelar == true) {
            let info = await this[MODEL].refreshInfo();
            let mapa = await this[MODEL].getAvisosPorAnio();
            this[VIEW].showMainView(info, mapa);
        }
    }
    handlerRemoveUser = async (param) => {
        console.log('removeUser ', param);
        if (param.cancelar && param.cancelar == true) {
            let info = await this[MODEL].refreshInfo();
            this[VIEW].showMainView(info);

        } else if (param.delete && param.delete == true) {
            await this[MODEL].removeUsuario(param.userId);
            let mensaje = "Perfil eliminado";
            this[VIEW].showConfirmModal(mensaje);
            this[MODEL].cerrarSesion();

            this[VIEW].showWhiteView();
            this[VIEW].showLoginModal(this.onLogin, this.onRegister, "");

        }
    }
    handlerRemoveUserPorAdmin = async (usuario) => {
        console.log('removePorAdmin', usuario.id)
        await this[MODEL].removeUsuario(usuario.id);
        let mensaje = "Perfil eliminado";
        this[VIEW].showConfirmModal(mensaje);
        let listadoUsuarios = await this[MODEL].getUsuariosSQL();
        this[VIEW].showListadoUsuarios(listadoUsuarios);
        let roles = ['admin', 'user'];
        this[VIEW].bindListadoUsuarios(this.handlerUpdateOrDeleteUsuario, roles);



    }
    handlerNuevoUsuario = async (usuario) => {
        console.log("usuario en nuevo: ", usuario)
        if (!usuario) {
            let mensaje = "";
            this[VIEW].showLoginModal(this.onLogin, this.onRegister, mensaje);

        } else {
            console.log("si usuario en nuevo: ", usuario);
            if (!usuario.rol) {
                usuario.rol = 'user';
            }
            usuario.baja = 0;

            let newUser = await this[MODEL].addUsuarioSQL(usuario);
            // console.log('new user ', newUser);


            if (newUser == false) {
                let mensaje = "El nombre ya está en uso";
                if (usuario.modal) {
                    this[VIEW].showNuevoUsuarioModal(this.handlerNuevoUsuario, mensaje);
                } else if (usuario.form) {
                    this[VIEW].showNuevoUsuario();
                    this[VIEW].bindNuevoUsuario(this.handlerNuevoUsuario, "");
                }
            } else {
                if (usuario.modal) {
                    let mensaje = "Usuario Registrado con éxito";
                    this[VIEW].showLoginModal(this.onLogin, this.onRegister, mensaje);
                } else {

                    let listadoUsuarios = await this[MODEL].getUsuariosSQL();
                    this[VIEW].showListadoUsuarios(listadoUsuarios);
                    let roles = ['admin', 'user'];
                    this[VIEW].bindListadoUsuarios(this.handlerUpdateOrDeleteUsuario, roles);
                }

            }

        }
    }
    handlerUpdateOrDeleteUsuario = async (usuario) => {
        console.log('el usuario en updateordelete es: ', usuario)

        if (usuario.update) {
            let storedUsuario = await this[MODEL].getUsuarioPorId(usuario.id);
            console.log('storedUser', storedUsuario)
            if (usuario.username) {
                storedUsuario.username = usuario.username
            }
            if (usuario.rol) {
                storedUsuario.rol = usuario.rol;
            }
            if (usuario.baja) {
                storedUsuario.baja = usuario.baja;
            }
            console.log('user updated', storedUsuario)
            await this[MODEL].updateUsuario(storedUsuario);
            let listadoUsuarios = await this[MODEL].getUsuariosSQL();
            this[VIEW].showListadoUsuarios(listadoUsuarios);
            let roles = ['admin', 'user'];
            this[VIEW].bindListadoUsuarios(this.handlerUpdateOrDeleteUsuario, roles);


        } else if (usuario.resetPass) {
            let storedUsuario = await this[MODEL].getUsuarioPorId(usuario.id);
            console.log('storedUser', storedUsuario)
            let mensaje = "";
            this[VIEW].showChangePassModal(mensaje)
            this[VIEW].bindChangePass(this.handlerChangePassModal, usuario.id);
        } else if (usuario.delUser) {
            let storedUsuario = await this[MODEL].getUsuarioPorId(usuario.id);
            this[VIEW].showInfoModalRemoveUsuario(this.handlerRemoveUserPorAdmin, storedUsuario)

        }

    }
    handlerChangePassModal = async (usuario) => {
        console.log('changePassModal', usuario);


        if (usuario.cancelar && usuario.cancelar == true) {
            let info = await this[MODEL].refreshInfo();
            let mapa = await this[MODEL].getAvisosPorAnio();
        } else {
            await this[MODEL].updatePass(usuario);
            this[VIEW].showConfirmModal("Password Actualizado");
        }
    }

    /*************************** APARTADO PRODUCTORES **************************/
    handlerNuevoProductor = async (productor) => {
        console.log('Productor en controller', productor);
        if (productor) {
            let storedProductor = await this[MODEL].getProductorPorId(productor.id);
            if (storedProductor == false) {
                await this[MODEL].addProductorSQL(productor);
                let mensaje = "Productor añadido con éxito";
                this[VIEW].showConfirmModal(mensaje);
                //mostrar listado de productores
                let listadoProductores = await this[MODEL].getProductoresSQL();
                this[VIEW].showListadoProductores(listadoProductores);
                this[VIEW].bindListadoProductores(this.handlerUpdateOrDeleteProductor);

            } else {
                let mensaje = "Ya existe un productor con el id " + productor.id;
                this[VIEW].showNuevoProductor(mensaje);
            }
        } else {
            let mapa = await this[MODEL].stadisticsProductores();
            this[VIEW].showProductoresView(mapa);
        }

    }
    handlerUpdateOrDeleteProductor = async (productor) => {
        console.log('Productor en controller', productor);
        if (productor.delProductor && productor.delProductor == true) {
            this[VIEW].showInfoModalRemoveProductor(this.handlerRemoveProductor, productor.id);
            delete productor.delProductor;
        } else {
            // let storedProductor = await this[MODEL].getProductorPorId(productor.id);
            // if (storedProductor == false) {
                this[MODEL].updateProductorSQL(productor);
            // } else {
            //     let mensaje = "Ya existe un productor con el id " + productor.id;
            //     this[VIEW].showConfirmModal(mensaje);
            // }
        }
    }

    handlerRemoveProductor = async (idProductor) => {
        console.log('productor a eliminar', idProductor);
        await this[MODEL].removeProductorSQL(idProductor);
        let listadoProductores = await this[MODEL].getProductoresSQL();
        this[VIEW].showListadoProductores(listadoProductores);
        this[VIEW].bindListadoProductores(this.handlerUpdateOrDeleteProductor);

    }




}//fin de clase
export default La2024Controller;