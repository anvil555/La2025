import { Cliente, Maquina, Aviso, Productor, Usuario } from "./objetos.js";
import { LindeException, LindeCustomerException, LindeForkliftException, LindeWorkOrderException, LindeServer } from "./exceptions.js";

const Manager = (function () {
    let manager;
    class Manager {
        #name;
        #clientes = new Map();
        #maquinas = new Map();
        #avisos = new Map();
        #avisosPendientes = new Map();
        #productores = new Map();
        #usuarios = new Map();
        #info = {};

        constructor(name) {
            if (!new.target) throw new LindeException();
            Object.defineProperty(this, "name", {
                enumerable: true,
                get() {
                    return this.#name;
                },
                set(value) {
                    this.#name = value;
                }
            });
        }
        /************************** GESTION DE CLIENTES ********************************/
        async addCliente(...clientes) {
            for (const element of clientes) {
                try {
                    if (element instanceof Cliente) {
                        this.#clientes.set(parseInt(element.id), element);
                        // console.log("Add cliente: ", element);
                    } else {
                        let temp = this.createCliente(element);
                        this.#clientes.set(temp.id, temp);
                        // console.log("Add cliente Temp: ", temp);

                    }
                } catch (LindeCustomerException) {
                    console.error
                }
            }
        }
        async addClienteSQL(cliente) {
            let jsonCliente = JSON.stringify(cliente);
            console.log('jsonCliente', jsonCliente)
            let formData = new FormData();
            formData.append('addCliente', jsonCliente);

            try {
                const response = await fetch('./php/utilClientes.php', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const body = await response.text();
                console.log('Response from server:');
                console.log(body);
                this.addCliente(cliente);

                await this.refreshInfo();

                // Puedes agregar lógica adicional aquí para procesar la respuesta del servidor
            } catch (error) {
                console.error('Error adding client:', error);
            }
        }
        createCliente(element) {
            // console.log('create', element);
            let cliente = new Cliente();
            cliente.id = parseInt(element.id);
            cliente.nombre = element.nombre;
            cliente.direccion = element.direccion;
            cliente.poblacion = element.poblacion;
            cliente.provincia = element.provincia;
            cliente.contacto = element.contacto;
            cliente.telefono = element.telefono;
            cliente.email = element.email;
            cliente.fechaCreacion = element.fechaCreacion;
            cliente.bajaCliente = element.bajaCliente;
            // console.log('return', cliente);
            return cliente;
        }
        async getClientesSQL() {
            try {
                let formData = new FormData();
                formData.append('getListadoClientes', 0);
                let response = await fetch('./php/utilClientes.php',
                    {
                        method: 'POST',
                        body: formData,
                    });
                let data = await response.json();
                // console.log('Datos obtenidos:', data);
                if (data != null) {
                    data.forEach((element, key) => {
                        let cliente = this.createCliente(element);
                        this.addCliente(cliente);
                    });
                }
                return this.#clientes;
            } catch (error) {
                console.error('Error fetching client data:', error);
            }
        }
        async getClientesDeAltaSQL() {
            let listadoClientes = new Map();
            try {
                let formData = new FormData();
                formData.append('getClientesDeAlta', 0);
                let response = await fetch('./php/utilClientes.php',
                    {
                        method: 'POST',
                        body: formData,
                    });
                let data = await response.json();
                if (data != null) {
                    data.forEach((element, key) => {
                        let cliente = this.createCliente(element);
                        listadoClientes.set(cliente.id, cliente);
                    });
                }
                return listadoClientes;
            } catch (error) {
                console.error('Error fetching client data:', error);
            }
        }
        async getClientesParaAvisosSQL() {
            let listadoClientes = new Map();
            try {
                let formData = new FormData();
                formData.append('getClientesParaAvisosSQL', 0);
                let response = await fetch('./php/utilClientes.php',
                    {
                        method: 'POST',
                        body: formData,
                    });
                let data = await response.json();
                if (data != null) {
                    data.forEach((element, key) => {
                        let cliente = this.createCliente(element);
                        listadoClientes.set(cliente.id, cliente);
                    });
                }
                return listadoClientes;
            } catch (error) {
                console.error('Error fetching client data:', error);
            }

        }
        async getCuentaClientesSQL() {
            let cuenta = 0;

            let formData = new FormData();
            formData.append('getCuentaClientes', 0);

            try {
                const response = await fetch('./php/utilClientes.php', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.text();
                // console.log('cuenta clientes:', data);
                cuenta = data;
                return cuenta;
            } catch (error) {
                console.error('error', error);
            }

            console.log("Nº clientes en la BBDD:" + cuenta);
            return id;

        }
        async busquedaClientesSQL(cliente) {
            let clientesBuscados = new Map();
            if (cliente.length > 0) {
                let formData = new FormData();
                formData.append('busquedaClientes', cliente);
                try {
                    let response = await fetch('./php/utilClientes.php', {
                        method: 'POST', body: formData,
                    });
                    await this.getMaquinasSQL();

                    let data = await response.json();
                    data.forEach(element => {
                        let clienteTemp = this.createCliente(element);

                        clientesBuscados.set(clienteTemp.id, clienteTemp);
                        // console.log('clienteTemp', clienteTemp.id);
                        // this.asignarMaquinaAClienteBuscado(clienteTemp, this.#maquinas, clientesBuscados);

                    });
                }
                catch (error) {
                    console.error("Error al buscar clientes en la base de datos:", error);
                }
            } return clientesBuscados;
        }
        async getIdClienteSQL(nombre) {
            let id = 0;
            if (nombre) {
                let formData = new FormData();
                formData.append('getIdCliente', nombre);

                try {
                    const response = await fetch('./php/utilClientes.php', {
                        method: 'POST',
                        body: formData,
                    });
                    const data = await response.text();
                    console.log('id:', data);
                    id = data;
                    return id;
                } catch (error) {
                    console.error('error', error);
                }
            }
            console.log("El id del cliente es:" + id);
            return id;
        }
        async addClienteSQL(cliente) {
            let jsonCliente = JSON.stringify(cliente);
            console.log('jsonCliente', jsonCliente)
            let formData = new FormData();
            formData.append('addCliente', jsonCliente);

            try {
                const response = await fetch('./php/utilClientes.php', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const body = await response.text();
                console.log('Response from server:');
                console.log(body);
                // this.addCliente(cliente);
                await this.refreshInfo();

                // Puedes agregar lógica adicional aquí para procesar la respuesta del servidor
            } catch (error) {
                console.error('Error adding client:', error);
            }
        }
        async getClientePorId(id) {
            let cliente;
            if (id) {
                let formData = new FormData();
                formData.append('getClientePorId', id);

                try {
                    const response = await fetch('./php/utilClientes.php', {
                        method: 'POST',
                        body: formData,
                    });
                    const data = await response.json();
                    // console.log('cliente:', data);
                    cliente = this.createCliente(data);
                    return cliente;
                } catch (error) {
                    console.error('error', error);
                }
            }
            console.log("El id del cliente es:" + id);
            return cliente;

        }
        async updateClienteSQL(cliente) {
            delete cliente.update;
            let jsonCliente = JSON.stringify(cliente);
            //actualizamos el cliente de la BBDD
            let formData = new FormData();
            formData.append('updateCliente', jsonCliente);
            fetch('./php/utilClientes.php', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.text())
                .then((body) => {
                    console.log(body);
                    this.updateClienteMap(cliente);
                })
            if (cliente.bajaCliente == 1) {
                await this.setBajaMaquinasClienteSQL(cliente.id);
            }
            await this.refreshInfo();
        }
        updateClienteMap(cliente) {
            if (!cliente instanceof Cliente) {
                let temp = this.createCliente(cliente);
                if (this.#clientes.has(temp.id)) {
                    this.#clientes.set(temp.id, temp);
                }
            }
            else {
                if (this.#clientes.has(cliente.id)) {
                    this.#clientes.set(cliente.id, cliente);
                }
            }
        }
        async setAltaClienteSQL(idCliente) {
            let formData = new FormData();
            formData.append('setAltaCliente', idCliente);
            fetch('./php/utilClientes.php', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.text())
                .then((body) => {
                    console.log(body);
                }
                )
            this.setAltaClienteMap(idCliente);
            await this.refreshInfo();
        }
        setAltaClienteMap(idCliente) {
            for (const [chasis, maquina] of this.#maquinas) {
                if (maquina.cliente == idCliente) {
                    maquina.baja = 0;
                    this.#maquinas.set(chasis, maquina);
                }
            }
        }
        async removeClienteSQL(idCliente) {
            console.log('el idCliente en remove modelo es: ' + idCliente);
            //borramos el cliente de la BBDD
            let formData = new FormData();
            formData.append('removeCliente', idCliente);
            fetch('./php/utilClientes.php', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.text())
                .then((body) => {
                    console.log(body);

                })
            this.removeClienteMap(idCliente);
            await this.refreshInfo();
            console.log(this.#clientes);
        }
        removeClienteMap(idCliente) {
            this.#clientes.delete(idCliente);
        }

        /*************************** GESTION DE MAQUINAS ******************************/

        createMaquina(element) {
            // console.log('element maquina:', element);
            let maquina = new Maquina();
            maquina.id = parseInt(element.id);
            maquina.modelo = element.modelo.toUpperCase();
            maquina.chasis = element.chasis.toUpperCase();
            maquina.cliente = element.cliente;
            maquina.alquiler = element.alquiler;
            maquina.reaco = element.reaco;
            maquina.contrato = element.contrato;
            maquina.fechaCreacion = element.fechaCreacion;
            maquina.notas = element.notas.toUpperCase();
            maquina.numero = element.numero;
            maquina.baja = element.baja;
            return maquina;

        }
        addMaquina(...maquinas) {
            for (const element of maquinas) {
                try {
                    if (element instanceof Maquina) {
                        this.#maquinas.set(element.chasis, element);
                    } else {
                        let temp = this.createMaquina(element);
                        this.#maquinas.set(temp.chasis, temp);
                    }
                } catch (LindeForkliftException) {
                    console.error
                }
            }
        }
        async addMaquinaSQL(maquina) {
            let jsonMaquina = JSON.stringify(maquina);
            let formData = new FormData();
            formData.append('addMaquina', jsonMaquina);
            fetch('./php/utilMaquinas.php', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.text())
                .then((body) => {
                    console.log(body);
                    this.addMaquina(maquina);

                })
            await this.refreshInfo();
        }
        async setBajaMaquinasClienteSQL(idCliente) {
            let formData = new FormData();
            formData.append('setBajaMaquinasCliente', idCliente);
            fetch('./php/utilMaquinas.php', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.text())
                .then((body) => {
                    console.log(body);
                }
                )
            this.setBajaMaquinasClienteMap(idCliente);
            await this.refreshInfo();
        }
        setBajaMaquinasClienteMap(idCliente) {
            for (const [chasis, maquina] of this.#maquinas) {
                if (maquina.cliente == idCliente) {
                    maquina.baja = 1;
                    this.#maquinas.set(chasis, maquina);
                }
            }
        }
        async updateMaquinaSQL(maquina) {
            delete maquina.update;
            let jsonMaquina = JSON.stringify(maquina);
            //actualizamos el cliente de la BBDD
            let formData = new FormData();
            formData.append('updateMaquina', jsonMaquina);
            fetch('./php/utilMaquinas.php', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.text())
                .then((body) => {
                    console.log(body);
                    this.updateMaquinaMap(maquina);
                })

            let cliente = await this.getClientePorId(maquina.cliente);
            if (cliente.bajaCliente == 1) {
                await this.setAltaClienteSQL(maquina.cliente);
            }
            await this.refreshInfo();

            //get cliente y si esta de baja y damos de alta la maquina
            //dar de alta el ciente


        }
        updateMaquinaMap(maquina) {
            if (!maquina instanceof Maquina) {
                let temp = this.createMaquina(maquina);
                if (this.#maquinas.has(temp.id)) {
                    this.#maquinas.set(temp.id, temp);
                }
            }
            else {
                if (this.#maquinas.has(maquina.id)) {
                    this.#maquinas.set(maquina.id, maquina);
                }
            }
        }
        async removeMaquinaSQL(idMaquina) {
            console.log('el idMaquina en remove modelo es: ' + idMaquina);
            //borramos el cliente de la BBDD
            let formData = new FormData();
            formData.append('removeMaquina', idMaquina);
            fetch('./php/utilMaquinas.php', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.text())
                .then((body) => {
                    console.log(body);

                })
            this.removeMaquinaMap(idMaquina);
            await this.refreshInfo();
            console.log(this.#maquinas);
        }
        removeMaquinaMap(idMaquina) {
            this.#maquinas.delete(idMaquina);
        }
        async getMaquinasSQL() {
            try {
                let formData = new FormData();
                formData.append('getListadoMaquinas', 0);
                let response = await fetch('./php/utilMaquinas.php',
                    {
                        method: 'POST',
                        body: formData,
                    });
                let data = await response.json();
                if (data != null) {
                    let totalMaquinas = data.length;
                    let progressBar = document.getElementById('progress-bar');
                    data.forEach((element, index) => {
                        let maquina = this.createMaquina(element);
                        this.addMaquina(maquina);
                    });
                }
                return this.#maquinas;
            } catch (error) {
                console.error('Error fetching forklift data:', error);
            }
        }
        async getMaquinaPorChasisSQL(chasis) {
            let maquina;
            if (chasis) {
                let formData = new FormData();
                formData.append('getMaquinaPorChasis', chasis);
                try {
                    const response = await fetch('./php/utilMaquinas.php', {
                        method: 'POST',
                        body: formData,
                    });
                    const data = await response.json();
                    if (data) {
                        maquina = this.createMaquina(data);
                        return maquina;
                    }

                } catch (error) {
                    console.log('chasis disponible', error);
                }
            }
            console.log("El chasis de la máquina es:" + chasis);

            // return maquina;
        }
        async getMaquinaPodIdSQL(idMaquina) {
            let maquina;
            if (idMaquina) {
                let formData = new FormData();
                formData.append('getMaquinaPodIdSQL', idMaquina);
                try {
                    const response = await fetch('./php/utilMaquinas.php', {
                        method: 'POST',
                        body: formData,
                    });
                    const data = await response.json();
                    maquina = this.createMaquina(data);
                    return maquina;
                } catch (error) {
                    console.error('error', error);
                }
            }
            console.log("El chasis de la máquina por id es:" + chasis);

            return maquina;
        }
        async getCuentaMaquinasSQL() {
            let cuenta = 0;
            let formData = new FormData();
            formData.append('getCuentaMaquinas', 0);
            try {
                const response = await fetch('./php/utilMaquinas.php', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.text();
                // console.log('cuenta maquinas:', data);
                cuenta = data;
                return cuenta;
            } catch (error) {
                console.error('error', error);
            }
        }
        async asignarMaquinaACliente() {
            // console.log('asignarMaquinaACliente');
            await this.getClientesSQL();
            await this.getMaquinasSQL();
            for (const [id, cliente] of this.#clientes) {
                if (!cliente.maquinas) {
                    cliente.maquinas = new Map();
                }
                // console.log('maquinas size', this.#maquinas.size);
                for (const [chasis, maquina] of this.#maquinas) {
                    if (maquina.cliente === cliente.id) {
                        cliente.maquinas.set(maquina.chasis, maquina);
                    }
                }
                this.#clientes.set(cliente.id, { cliente: cliente, maquinas: cliente.maquinas });
            }
            // console.log(this.#clientes);
        }
        async asignarMaquinaAClienteBuscado(cliente, mapaMaquinas, mapaClientes) {
            console.log('asignarMaquinaACliente buscado');
            await this.getClientesSQL();
            await this.getMaquinasSQL();
            if (!cliente.maquinas) {
                cliente.maquinas = new Map();
            }
            // console.log('maquinas buscadas size', mapaMaquinas.size);
            for (const [chasis, maquina] of mapaMaquinas) {
                if (maquina.cliente === cliente.id) {
                    cliente.maquinas.set(maquina.chasis, maquina);
                }
            }
            mapaClientes.set(cliente.id, { cliente: cliente, maquinas: cliente.maquinas });
            // console.log(mapaClientes);
        }
        async getMaquinasPorCliente(idCliente) {


            //me tiene que devolver un objeto literal  con la propiedad cliente
            //y otra propiedad con un mapa del parque de sus maquinas.


            let cliente = await this.getClientePorId(idCliente);
            let objetoCliente = {};
            objetoCliente.cliente = cliente;
            if (!objetoCliente.maquinas) {
                objetoCliente.maquinas = new Map();
            }
            if (!objetoCliente.pathImagen) {
                objetoCliente.pathImagen = "";
            }


            let formData = new FormData();

            formData.append('getMaquinasCliente', idCliente);
            try {
                let response = await fetch('./php/utilMaquinas.php', {
                    method: 'POST', body: formData,
                });

                let data = await response.json();
                if (data != null) {
                    data.forEach(element => {
                        let maquina = this.createMaquina(element);
                        let pathImagen = this.getImagen(maquina.chasis);

                        objetoCliente.maquinas.set(maquina.chasis, { maquina: maquina, pathImagen: pathImagen });
                    });
                }

            } catch (error) {
                console.error('Error fetching forklift data:', error);
            }


            return objetoCliente;
        }
        async getIdMaquinaSQL(chasis) {
            let id = 0;
            if (chasis) {
                let formData = new FormData();
                formData.append('getIdMaquina', chasis);
                try {
                    const response = await fetch('./php/utilMaquinas.php', {
                        method: 'POST',
                        body: formData,
                    });
                    const data = await response.text();
                    console.log('id:', data);
                    id = data;
                    return id;
                } catch (error) {
                    console.error('error', error);
                }
            }
            console.log("El id de la máquina es:" + id);
            return id;
        }
        async busquedaMaquinasSQL(maquina) {
            // console.log('maquina o chasis', maquina);
            // console.log('this.#clientes', this.#clientes);
            let maquinasBuscadas = new Map();
            let nombreCliente = "";
            if (maquina.length > 0) {
                let formData = new FormData();
                formData.append('busquedaMaquinas', maquina);
                try {
                    let response = await fetch('./php/utilMaquinas.php', {
                        method: 'POST',
                        body: formData,
                    });
                    let data = await response.json();
                    for (let element of data) {
                        let maquinaTemp = this.createMaquina(element);
                        let storedCliente = this.#clientes.get(maquinaTemp.cliente);
                        //console.log('storedcliente', storedCliente);
                        nombreCliente = storedCliente.nombre;
                        //console.log(nombreCliente);

                        // let cliente = await this.getClientePorId(maquinaTemp.cliente);
                        // let listadoAvisos = await this.getAvisosPorChasis(maquinaTemp.chasis);
                        maquinasBuscadas.set(maquinaTemp.chasis, { maquina: maquinaTemp, cliente: nombreCliente/*, avisos: listadoAvisos.size */ });
                    }
                } catch (error) {
                    console.error("Error al buscar maquinas en la base de datos:", error);
                }
            }
            return maquinasBuscadas;
        }
        async getCuentaMaquinasCliente(idCliente) {
            let cuenta = 0;
            let formData = new FormData();
            formData.append('getCuentaMaquinasCliente', idCliente);
            try {
                const response = await fetch('./php/utilMaquinas.php', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.text();
                console.log('cuenta maquinas:', data);
                cuenta = data;
                return cuenta;
            } catch (error) {
                console.error('error', error);
            }

        }
        async maquinaTool(chasis) {
            let element = {};
            let maquina = await this.getMaquinaPorChasisSQL(chasis);
            let cliente = await this.getClientePorId(maquina.cliente);
            let avisos = await this.getAvisosPorChasis(chasis);
            let imagen = this.getImagen(chasis);
            element.maquina = maquina;
            element.cliente = cliente;
            element.avisos = avisos;
            element.imagen = imagen;


            return element;
        }
        getImagen(chasis) {
            if (chasis) {
                const imagesArr = ['324', '335', '336', '337', '360', '131', '132', '133',
                    '386', '387', '388', '1252', '1275', '1276', '1202', '1173', '392', '393', '394', '396', '1401',
                    'X115', '116', '1120', '1152'];
                let pathImagen = "./images/logoMolino.png"; // Ruta predeterminada
                for (let i = 0; i < imagesArr.length; i++) {
                    if (chasis.includes(imagesArr[i])) {
                        pathImagen = "./images/" + imagesArr[i] + ".png";
                        break; // Salir del bucle una vez que se encuentra una coincidencia
                    }
                }
                return pathImagen;
            }
        }
        async removeMaquinasClienteSQL(idCliente) {
            let formData = new FormData();
            formData.append('removeMaquinasCliente', idCliente);
            fetch('./php/utilMaquinas.php', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.text())
                .then((body) => {
                    console.log(body);
                }
                )
            this.removeMaquinasPorClienteMap(idCliente);
            await this.refreshInfo();
        }
        removeMaquinasPorClienteMap(idCliente) {
            for (const [chasis, maquina] of this.#maquinas) {
                if (maquina.cliente == idCliente) {
                    this.#maquinas.delete(chasis);
                }
            }
        }

        /*************************** GESTION DE AVISOS ******************************/
        createAviso(element) {
            // console.log('element aviso', element)
            let aviso = new Aviso();
            aviso.id = parseInt(element.id);
            aviso.idCliente = parseInt(element.idCliente);
            aviso.chasis = element.chasis;
            aviso.averia = element.averia;
            aviso.productor = element.productor;
            aviso.finalizado = element.finalizado;
            aviso.fechaInicio = element.fechaInicio;
            aviso.fechaFin = element.fechaFin;
            aviso.resolucion = element.resolucion;
            aviso.presupuesto = element.presupuesto;
            aviso.aceptado = element.aceptado;
            aviso.prioridad = element.prioridad;

            // console.log("aviso aviso", aviso)
            return aviso;

        }
        addAviso(...avisos) {
            for (const element of avisos) {
                try {
                    if (element instanceof Aviso) {
                        this.#avisos.set(element.id, element);
                    } else {
                        let temp = this.createAviso(element);
                        this.#avisos.set(temp.id, temp);
                    }
                } catch (LindeWorkOrderException) {
                    console.error
                }
            }
        }
        addAvisoSQL(aviso) {
            console.log("avisos en model para add:", aviso)
            let jsonAviso = JSON.stringify(aviso);
            let formData = new FormData();
            formData.append('addAviso', jsonAviso);
            fetch('./php/utilAvisos.php', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.text())
                .then((body) => {
                    console.log(body);
                    this.addAviso(aviso);
                })
            this.refreshInfo();
        }
        async updateAvisoSQL(...avisos) {

            for (const aviso of avisos) {
                let jsonAviso = JSON.stringify(aviso);
                //actualizamos el aviso de la BBDD
                let formData = new FormData();
                formData.append('updateAviso', jsonAviso);
                fetch('./php/utilAvisos.php', {
                    method: 'POST',
                    body: formData,
                })
                    .then((response) => response.text())
                    .then((body) => {
                        console.log(body);
                        let avisoTemp = this.createAviso(aviso);
                        this.addAviso(avisoTemp);
                    })
            }

            await this.refreshInfo();
        }
        async removeAvisoSQL(idAviso) {
            console.log('el idAviso en remove modelo es: ' + idAviso);
            //borramos el cliente de la BBDD
            let formData = new FormData();
            formData.append('deleteAviso', idAviso);
            fetch('./php/utilAvisos.php', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.text())
                .then((body) => {
                    console.log(body);
                    this.#avisos.delete(idAviso);
                    this.refreshInfo();
                })
        }
        async getListadoAvisosSQL() {
            let listaAvisos = new Map();
            let formData = new FormData();
            formData.append('getListadoAvisos', 0);
            try {
                let response = await fetch('./php/utilAvisos.php', {
                    method: 'POST', body: formData,
                });
                let data = await response.json();
                if (data != null) {
                    data.forEach(element => {

                        let avisoTemp = this.createAviso(element);

                        this.#avisos.set(avisoTemp.id, avisoTemp);
                    });
                }
            } catch (error) {
                console.error('Error fetching work order data:', error);
            }
            return listaAvisos;
        }
        async getCuentaAvisosSQL() {
            let cuenta = 0;
            let formData = new FormData();
            formData.append('getCuentaAvisos', 0);
            try {
                const response = await fetch('./php/utilAvisos.php', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.text();
                // console.log('cuenta avisos:', data);
                cuenta = data;
                return cuenta;
            } catch (error) {
                console.error('error', error);
            }
        }
        async getAvisosPorCliente(idCliente) {
            let listaAvisos = new Map();
            let formData = new FormData();
            formData.append('getAvisosPorCliente', idCliente);
            try {
                let response = await fetch('./php/utilAvisos.php', {
                    method: 'POST', body: formData,
                });
                let data = await response.json();
                if (data != null) {
                    data.forEach(element => {

                        let aviso = this.createAviso(element);

                        listaAvisos.set(aviso.id, aviso);
                    });
                }
            } catch (error) {
                console.error('Error fetching work order data:', error);
            }
            return listaAvisos;
        }
        async getAvisosPorChasis(chasis) {
            // console.log("chasis para avisos", chasis);
            let listaAvisos = new Map();
            let formData = new FormData();

            formData.append('getAvisosPorChasis', chasis);
            try {
                let response = await fetch('./php/utilAvisos.php', {
                    method: 'POST',
                    body: formData
                });

                let data = await response.json()
                if (data != null) {
                    data.forEach(element => {
                        let aviso = this.createAviso(element);
                        listaAvisos.set(aviso.id, aviso);
                    });
                }
                return listaAvisos;

            } catch (error) {
                console.error('Error fetching forklift data:', error);
            }

        }
        async getCuentaAvisosMaquinaSQL(chasis) {
            let cuenta = 0;
            let formData = new FormData();
            formData.append('getCuentaAvisosMaquina', chasis);
            try {
                const response = await fetch('./php/utilAvisos.php', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.text();
                console.log('cuenta avisos chasis:', data);
                cuenta = data;
                return cuenta;
            } catch (error) {
                console.error('error', error);
            }
        }
        async getCuentaAvisosClienteSQL(idCliente) {
            let cuenta = 0;
            let formData = new FormData();
            formData.append('getCuentaAvisosCliente', idCliente);
            try {
                const response = await fetch('./php/utilAvisos.php', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.text();
                console.log('cuenta avisos cliente:', data);
                cuenta = data;
                return cuenta;
            } catch (error) {
                console.error('error', error);
            }
        }
        async getCuentaAvisosPendientes() {
            let cuenta = 0;
            let formData = new FormData();
            formData.append('getCuentaAvisosPendientes', 0);
            try {
                const response = await fetch('./php/utilAvisos.php', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.text();
                // console.log('cuenta avisos pendientes:', data);
                cuenta = data;
                return cuenta;
            } catch (error) {
                console.error('error', error);
            }
        }
        async getAvisosPendientesSQL() {
            let listaAvisos = new Map();
            let formData = new FormData();
            formData.append('getAvisosPendientes', 0);
            try {
                let response = await fetch('./php/utilAvisos.php', {
                    method: 'POST', body: formData,
                });
                let data = await response.json();

                if (data) {
                    for (let element of data) {


                        let avisoTemp = this.createAviso(element);

                        //consulto los mapas en lugar de la bbdd para agilizar la carga
                        //y reducir el trafico de datos
                        let clienteTemp = this.#clientes.get(parseInt(element.idCliente));
                        let maquinaTemp = this.#maquinas.get(element.chasis);

                        avisoTemp.nombreCliente = clienteTemp.nombre;
                        avisoTemp.numeroMaquina = maquinaTemp.numero;

                        this.#avisosPendientes.set(avisoTemp.id, avisoTemp);
                    }
                }
            } catch (error) {
                console.error('Error al obtener los avisos pendientes:', error);
            }
            // console.log(this.#avisosPendientes)

            return this.#avisosPendientes;
        }
        async avisoTool() {
            let avisoTool = {};
            let infoClientes = new Map();
            let infoProductores = await this.getProductoresSQL();
            let infoMaquinas = new Map();

            avisoTool.infoClientes = infoClientes;
            avisoTool.infoProductores = infoProductores;

            for (const [key, maquina] of this.#maquinas) {
                if (maquina.baja == 0) {
                    infoMaquinas.set(key, { idCliente: maquina.cliente, chasis: maquina.chasis, numero: maquina.numero })

                    for (const [idCliente, cliente] of this.#clientes) {
                        if (idCliente == maquina.cliente) {
                            infoClientes.set(idCliente, cliente);
                        }
                    }
                }

            }
            avisoTool.infoMaquinas = infoMaquinas;

            return avisoTool;
        }
        async ultimoAviso(idCliente) {
            let coleccionAvisosCliente = await this.getAvisosPorCliente(idCliente);
            // console.log(coleccionAvisosCliente);
            if (coleccionAvisosCliente.size > 0) {
                return Array.from(coleccionAvisosCliente.values())[0].fechaInicio;
            }
            // return Array.from(coleccionAvisosCliente.values())[0].fechaInicio;

        }
        async getAvisosPendientesPorProductorSQL(productor) {
            let listaAvisos = new Map();
            let formData = new FormData();
            formData.append('getAvisosPendientesPorProductor', productor);
            try {
                let response = await fetch('./php/utilAvisos.php', {
                    method: 'POST', body: formData,
                });
                let data = await response.json();

                if (data) {
                    for (let element of data) {


                        let avisoTemp = this.createAviso(element);

                        //consulto los mapas en lugar de la bbdd para agilizar la carga
                        //y reducir el trafico de datos
                        let clienteTemp = this.#clientes.get(parseInt(element.idCliente));
                        let maquinaTemp = this.#maquinas.get(element.chasis);


                        avisoTemp.nombreCliente = clienteTemp.nombre;
                        avisoTemp.numeroMaquina = maquinaTemp.numero;

                        listaAvisos.set(avisoTemp.id, avisoTemp);
                    }
                }
            } catch (error) {
                console.error('Error al obtener los avisos pendientes:', error);
            }

            return listaAvisos;
        }
        async setEndAvisos(idAvisos) {
            console.log('setEndAvisos: ', idAvisos.size);
            Array.from(idAvisos.values()).forEach(idAviso => {


                console.log('idAvisoooooo', idAviso)
                let formData = new FormData();
                formData.append('setEndAviso', idAviso);
                fetch('./php/utilAvisos.php', {
                    method: 'POST',
                    body: formData,
                })
                    .then((response) => response.text())
                    .then((body) => {
                        console.log(body);

                    })

            })

        }
        async getAvisoPorId(idAviso) {
            let aviso;
            if (idAviso) {
                let formData = new FormData();
                formData.append('getAvisoPorId', idAviso);
                try {
                    const response = await fetch('./php/utilAvisos.php', {
                        method: 'POST',
                        body: formData,
                    });
                    const data = await response.json();
                    aviso = this.createAviso(data);
                    let storedCliente = this.#clientes.get(aviso.idCliente);
                    aviso.nombreCliente = storedCliente.nombre;
                    let pathImagen = this.getImagen(aviso.chasis);
                    aviso.pathImagen = pathImagen;


                    return aviso;
                } catch (error) {
                    console.error('error', error);
                }
            }
            console.log("El id del aviso es:" + idAviso);
            return aviso;

        }
        async getFirstAviso() {
            let aviso;
            let formData = new FormData();
            formData.append('getFirstAviso', 0);
            try {
                const response = await fetch('./php/utilAvisos.php', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                aviso = this.createAviso(data);
                let storedCliente = this.#clientes.get(aviso.idCliente);
                aviso.nombreCliente = storedCliente.nombre;
                let pathImagen = this.getImagen(aviso.chasis);
                aviso.pathImagen = pathImagen;

                return aviso;
            } catch (error) {
                console.error('error', error);
            }
        }
        async getLastAviso() {
            let aviso;
            let formData = new FormData();
            formData.append('getLastAviso', 0);
            try {
                const response = await fetch('./php/utilAvisos.php', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                aviso = this.createAviso(data);
                let storedCliente = this.#clientes.get(aviso.idCliente);
                aviso.nombreCliente = storedCliente.nombre;
                let pathImagen = this.getImagen(aviso.chasis);
                aviso.pathImagen = pathImagen;

                return aviso;
            } catch (error) {
                console.error('error', error);
            }
        }
        async getNextAviso(idAviso) {
            let aviso;
            let formData = new FormData();
            formData.append('getNextAviso', idAviso);
            try {
                const response = await fetch('./php/utilAvisos.php', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                aviso = this.createAviso(data);
                let storedCliente = this.#clientes.get(aviso.idCliente);
                aviso.nombreCliente = storedCliente.nombre;
                let pathImagen = this.getImagen(aviso.chasis);
                aviso.pathImagen = pathImagen;

                return aviso;
            } catch (error) {
                console.error('error', error);
            }
        }
        async getPrevAviso(idAviso) {
            let aviso;
            let formData = new FormData();
            formData.append('getPrevAviso', idAviso);
            try {
                const response = await fetch('./php/utilAvisos.php', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                aviso = this.createAviso(data);
                let storedCliente = this.#clientes.get(aviso.idCliente);
                aviso.nombreCliente = storedCliente.nombre;
                let pathImagen = this.getImagen(aviso.chasis);
                aviso.pathImagen = pathImagen;

                return aviso;
            } catch (error) {
                console.error('error', error);
            }
        }
        async removeAvisosPorClienteSQL(idCliente) {
            let formData = new FormData();
            formData.append('removeAvisosPorCliente', idCliente);
            fetch('./php/utilAvisos.php', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.text())
                .then((body) => {
                    console.log(body);
                }
                )
            this.removeAvisosPorClienteMap(idCliente);
            await this.refreshInfo();
        }
        removeAvisosPorClienteMap(idCliente) {
            for (const [id, aviso] of this.#avisos) {
                if (aviso.idCliente == idCliente) {
                    this.#avisos.delete(id);
                }
            }
        }
        async removeAvisosPorChasisSQL(chasis) {
            let formData = new FormData();
            formData.append('removeAvisosPorChasis', chasis);
            fetch('./php/utilAvisos.php', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.text())
                .then((body) => {
                    console.log(body);
                }
                )
            this.removeAvisosPorChasisMap(chasis);
            await this.refreshInfo();
        }
        removeAvisosPorChasisMap(chasis) {
            for (const [id, aviso] of this.#avisos) {
                if (aviso.chasis == chasis) {
                    this.#avisos.delete(id);
                }
            }
        }


        /*************************** GESTION DE PRODUCTORES ******************************/

        addProductor(...productores) {
            for (const element of productores) {
                try {
                    if (element instanceof Productor) {
                        this.#productores.set(element.id, element);
                    } else {
                        let temp = this.createProductor(element);
                        this.#productores.set(temp.id, temp);
                    }
                } catch (LindeException) {
                    console.error
                }
            }
        }
        createProductor(element) {
            let productor = new Productor();
            productor.id = element.id;
            productor.nombre = element.nombre;
            productor.baja = element.baja;
            return productor;
        }
        async getCuentaProductoresSQL() {
            let cuenta = 0;
            let formData = new FormData();
            formData.append('getCuentaProductores', 0);
            try {
                const response = await fetch('./php/utilProductores.php', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.text();
                // console.log('cuenta productores:', data);
                cuenta = data;
                return cuenta;
            } catch (error) {
                console.error('error', error);
            }
        }
        async getProductoresSQL() {
            try {
                let formData = new FormData();
                formData.append('getListadoProductores', 0);
                let response = await fetch('./php/utilProductores.php',
                    {
                        method: 'POST',
                        body: formData,
                    });
                let data = await response.json();
                if (data != null) {
                    data.forEach((element, index) => {
                        let productor = this.createProductor(element);
                        this.addProductor(productor);
                    });
                }
                return this.#productores;
            } catch (error) {
                console.error('Error fetching forklift data:', error);
            }
        }
        async addProductorSQL(productor) {
            console.log("productor en model para add:", productor);
            let jsonProductor = JSON.stringify(productor);
            let formData = new FormData();
            formData.append('addProductor', jsonProductor);

            try {
                let response = await fetch('./php/utilProductores.php', {
                    method: 'POST',
                    body: formData,
                });

                let body = await response.text();
                console.log(body);

                if (body === 'false') {
                    return false;
                }
            } catch (error) {
                console.error("Error al agregar productor:", error);
                return false;
            } finally {
                await this.refreshInfo();
            }
        }
        async getProductor(productor) {
            let jsonProductor = JSON.stringify(productor);
            let formData = new FormData();
            formData.append('getProductor', jsonProductor);
            try {
                let response = await fetch('./php/utilProductores.php', {
                    method: 'POST',
                    body: formData,
                });

                let body = await response.text();
                console.log(body);

                if (body === 'false') {
                    return false;

                }
            } catch (error) {
                console.error("Error al comprobar productor:", error);
                return false;
            } finally {
               await this.refreshInfo();
            }


        }
        async getProductorPorId(idProductor){
            let formData = new FormData();
            formData.append('getProductorPorId', idProductor);
            try {
                let response = await fetch('./php/utilProductores.php', {
                    method: 'POST',
                    body: formData,
                });

                let body = await response.text();
                console.log(body);

                if (body === 'false') {
                    return false;

                }
            } catch (error) {
                console.error("Error al comprobar productor:", error);
                return false;
            } finally {
              await  this.refreshInfo();
            }
        }
        async removeProductorSQL(idProductor) {
            let formData = new FormData();
            formData.append('deleteProductor', idProductor);
            fetch('./php/utilProductores.php', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.text())
                .then((body) => {
                    console.log(body);
                }
                )
            this.#productores.delete(idProductor);
            await this.refreshInfo();
        }

        async updateProductorSQL(productor) {
            let formData = new FormData();
            formData.append('updateProductor', JSON.stringify(productor));
            fetch('./php/utilProductores.php', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.text())
                .then((body) => {
                    console.log(body);
                }
                )
                // this.#productores.set(productor.id, productor);
            await this.refreshInfo();
        }





        /****************************** GESTION DE LOGIN Y USUARIOS ******************************/

        addUsuario(...usuarios) {
            for (const element of usuarios) {
                try {
                    if (element instanceof Usuario) {
                        this.#usuarios.set(element.id, element);
                    } else {
                        let temp = this.createUsuario(element);
                        this.#usuarios.set(temp.id, temp);
                    }
                } catch (LindeException) {
                    console.error
                }
            }
        }
        createUsuario(element) {

            let usuario = new Usuario();
            usuario.id = element.id;
            usuario.username = element.username;
            // usuario.pass = element.pass;
            usuario.rol = element.rol;
            usuario.baja = element.baja;
            return usuario;
        }
        async loginApp(usuario) {
            // console.log('usuario en loginApp: ' + usuario.nombre + " : " + usuario.password);

            try {
                let response = await fetch("./php/utilUsuarios.php", {
                    method: "POST",
                    body: new URLSearchParams({
                        "username": usuario.nombre,
                        "pass": usuario.password
                    })
                });

                if (response.ok) {//segun el valor que devuelva el servidor lo pasamos a la vista para que autorice a seguir mostrando mas informacion. 
                    let data = await response.json();
                    // console.log(data);
                    if (data.status === "success") {
                        // console.log("Acceso concedido");
                        return true;
                    } else {
                        // console.log("Acceso denegado");
                        return false;
                    }
                } else {
                    // console.log('Error al comunicarse con el servidor');
                    return false;
                }
            } catch (e) {
                console.error("Error al analizar la respuesta del servidor", e);
                return false;
            }
        }
        async getServerSession() {
            let usuario;
            let formData = new FormData();
            formData.append('getServerSession', 0);
            try {
                const response = await fetch('./php/utilUsuarios.php', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                // console.log('usuario php: ', data);
                if (data) {
                    usuario = new Usuario();
                    usuario.id = data.id;
                    usuario.username = data.username;
                    usuario.rol = data.rol;

                }

                return usuario;
            } catch (error) {
                console.error('error', error);
            }
        }
        async addUsuarioSQL(usuario) {
            console.log("usuario en model para add:", usuario);
            let jsonUsuario = JSON.stringify(usuario);
            let formData = new FormData();
            formData.append('addUser', jsonUsuario);

            try {
                let response = await fetch('./php/utilUsuarios.php', {
                    method: 'POST',
                    body: formData,
                });

                let body = await response.text();
                console.log(body);

                if (body === 'false') {
                    return false;
                    // } else {
                    //     return false;
                }
            } catch (error) {
                console.error("Error al agregar usuario:", error);
                return false;
            } finally {
                this.refreshInfo();
            }
        }
        async getUsuariosSQL() {
            try {
                let listadoUsuarios = new Map();
                let formData = new FormData();
                formData.append('getListadoUsuarios', 0);
                let response = await fetch('./php/utilUsuarios.php',
                    {
                        method: 'POST',
                        body: formData,
                    });
                let data = await response.json();
                if (data != null) {
                    // console.log('datausuario',data)
                    data.forEach((element, index) => {
                        // console.log('element', element);
                        let usuario = this.createUsuario(element);
                        this.addUsuario(element);
                        listadoUsuarios.set(usuario.id, usuario);

                    });
                }
                return listadoUsuarios;
            } catch (error) {
                console.error('Error fetching forklift data:', error);
            }
            return listadoUsuarios;
        }
        async getCuentaUsuariosSQL() {
            let cuenta = 0;
            let formData = new FormData();
            formData.append('getCuentaUsuarios', 0);
            try {
                const response = await fetch('./php/utilUsuarios.php', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.text();
                // console.log('cuenta productores:', data);
                cuenta = data;
                return cuenta;
            } catch (error) {
                console.error('error', error);
            }
        }
        async updateUsuario(usuario) {
            console.log('usuario para actualizar', usuario);

            let jsonUsuario;
            try {
                jsonUsuario = JSON.stringify(usuario);
                console.log('Usuario en formato JSON:', jsonUsuario);
            } catch (error) {
                console.error('Error al convertir el usuario a JSON:', error);
                return;
            }

            let formData = new FormData();
            formData.append('updateUsuario', jsonUsuario);

            try {
                let response = await fetch('./php/utilUsuarios.php', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`Error HTTP! Estado: ${response.status}`);
                }

                let body = await response.text();
                console.log('Respuesta del servidor:', body);

                let usuarioTemp = this.createUsuario(usuario);
                this.addUsuario(usuarioTemp);

                await this.refreshInfo();
            } catch (error) {
                console.error('Error al actualizar el usuario:', error);
            }
        }
        async updatePass(usuario) {


            let jsonUsuario = JSON.stringify(usuario);
            //actualizamos el aviso de la BBDD
            let formData = new FormData();
            formData.append('updatePass', jsonUsuario);
            fetch('./php/utilUsuarios.php', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.text())
                .then((body) => {
                    console.log(body);
                })

            await this.refreshInfo();
        }
        async removeUsuario(userId) {
            console.log('el userId en remove modelo es: ' + userId);
            //borramos el cliente de la BBDD
            let formData = new FormData();
            formData.append('removeUsuario', userId);
            fetch('./php/utilUsuarios.php', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.text())
                .then((body) => {
                    console.log(body);
                    this.#usuarios.delete(userId);
                    this.refreshInfo();
                })
        }
        async getUsuarioPorId(userId) {
            let usuario = {};
            if (userId) {
                let formData = new FormData();
                formData.append('getUsuarioPorId', userId);

                try {
                    const response = await fetch('./php/utilUsuarios.php', {
                        method: 'POST',
                        body: formData,
                    });
                    const data = await response.json();
                    // usuario = this.createUsuario(data);
                    usuario.id = data.id;
                    usuario.username = data.username;
                    usuario.rol = data.rol;
                    usuario.baja = data.baja;
                    return usuario;
                } catch (error) {
                    console.error('error', error);
                }
            }
            return usuario;
        }
        async cerrarSesion() {
            let formData = new FormData();
            formData.append('cerrarSesion', 0);
            try {
                const response = await fetch('./php/utilUsuarios.php', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.text();
                // console.log('cerrar sesion php: ');
                if (data) {
                    console.log(data);
                }
            } catch (error) {
                console.error('error', error);
            }
        }
        async refreshInfo() {
            console.log('Actualizando...');
            this.#info.nClientes = await this.getCuentaClientesSQL();
            this.#info.nMaquinas = await this.getCuentaMaquinasSQL();
            this.#info.nAvisos = await this.getCuentaAvisosSQL();
            this.#info.nProductores = await this.getCuentaProductoresSQL();
            this.#info.nAvisosPendientes = await this.getCuentaAvisosPendientes();
            this.#info.nUsuarios = await this.getCuentaUsuariosSQL();
            // console.log(this.#info)
            this.#clientes.clear();
            this.#clientes = await this.getClientesSQL();
            this.#maquinas.clear();
            this.#maquinas = await this.getMaquinasSQL();
            this.#avisosPendientes.clear();
            this.#avisosPendientes = await this.getAvisosPendientesSQL();

            return this.#info;
        }

        /****************************** estadisticas ***************************/

        async getAvisosPorAnio() {
            let formData = new FormData();
            let year = new Date().getFullYear(); // Llamar a getFullYear como una función.
            formData.append('getAvisosPorAnio', year);
            try {
                let response = await fetch('./php/utilAvisos.php', {
                    method: 'POST', 
                    body: formData
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let data = await response.json(); 
                // console.log(data);
                return data;
            } catch (error) {
                console.error("Error al obtener los datos: ", error);
            }
        }
        async getAvisosPorMeses() {
            let formData = new FormData();
            let year = new Date().getFullYear(); // Llamar a getFullYear como una función.
            formData.append('getAvisosPorMeses', year);
            try {
                let response = await fetch('./php/utilAvisos.php', {
                    method: 'POST', // Asegúrate de que estás usando el método POST si envías formData.
                    body: formData
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let data = await response.json(); // Asegúrate de que response.json() se resuelva correctamente.
                // console.log(data);
                return data;
            } catch (error) {
                console.error("Error al obtener los datos: ", error);
            }
        }
        async getAvisosLastFiveYears() {
            let formData = new FormData();
            formData.append('getAvisosLastFiveYears', 0);
            try {
                let response = await fetch('./php/utilAvisos.php', {
                    method: 'POST', // Asegúrate de que estás usando el método POST si envías formData.
                    body: formData
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let data = await response.json(); // Asegúrate de que response.json() se resuelva correctamente.
                // console.log(data);
                return data;
            } catch (error) {
                console.error("Error al obtener los datos: ", error);
            }
        }
        async stadisticsAvisos() {
            let comboAvisos = {};
            let year = new Date().getFullYear(); // Llamar a getFullYear como una función.
            comboAvisos.year = year;
            comboAvisos.mes = await this.getAvisosPorMeses();
            comboAvisos.tecnico = await this.getAvisosPorAnio();
            comboAvisos.FiveYears = await this.getAvisosLastFiveYears();
            return comboAvisos;
        }
        async getTopClientesMaquinas() {
            let formData = new FormData();
            formData.append('getTopClientesMaquinas', 0);
            try {
                let response = await fetch('./php/utilClientes.php', {
                    method: 'POST', // Asegúrate de que estás usando el método POST si envías formData.
                    body: formData
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let data = await response.json(); // Asegúrate de que response.json() se resuelva correctamente.
                // console.log(data);
                return data;
            } catch (error) {
                console.error("Error al obtener los datos: ", error);
            }
        }
        async getTopClientesAvisos() {
            let formData = new FormData();
            formData.append('getTopClientesAvisos', 0);
            try {
                let response = await fetch('./php/utilClientes.php', {
                    method: 'POST', // Asegúrate de que estás usando el método POST si envías formData.
                    body: formData
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let data = await response.json(); // Asegúrate de que response.json() se resuelva correctamente.
                // console.log(data);
                return data;
            } catch (error) {
                console.error("Error al obtener los datos: ", error);
            }
        }
        async stadisticsClientes() {
            let comboClientes = {};
            comboClientes.maquinas = await this.getTopClientesMaquinas();
            comboClientes.avisos = await this.getTopClientesAvisos();
            return comboClientes;
        }
        async getTopMaquinasAvisos() {
            let formData = new FormData();
            formData.append('getTopMaquinasAvisos', 0);
            try {
                let response = await fetch('./php/utilMaquinas.php', {
                    method: 'POST',
                    body: formData
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let data = await response.json();
                // console.log(data);
                return data;
            } catch (error) {
                console.error("Error al obtener los datos: ", error);
            }
        }
        async getModelos() {
            let formData = new FormData();
            formData.append('getModelos', 0);
            try {
                let response = await fetch('./php/utilMaquinas.php', {
                    method: 'POST', // Asegúrate de que estás usando el método POST si envías formData.
                    body: formData
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let data = await response.json(); // Asegúrate de que response.json() se resuelva correctamente.
                // console.log(data);
                return data;
            } catch (error) {
                console.error("Error al obtener los datos: ", error);
            }
        }
        async stadisticsMaquinas() {
            let comboMaquinas = {};
            comboMaquinas.avisos = await this.getTopMaquinasAvisos();
            comboMaquinas.modelos = await this.getModelos();
            return comboMaquinas;
        }
        async getCargaDeTrabajo() {
            let formData = new FormData();
            formData.append('getCargaDeTrabajo', 0);
            try {
                let response = await fetch('./php/utilAvisos.php', {
                    method: 'POST',
                    body: formData
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let data = await response.json();
                // console.log(data);
                return data;
            } catch (error) {
                console.error("Error al obtener los datos: ", error);
            }
        }
        async getTopProductores() {
            let formData = new FormData();
            formData.append('getTopProductores', 0);
            try {
                let response = await fetch('./php/utilAvisos.php', {
                    method: 'POST',
                    body: formData
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let data = await response.json();
                // console.log(data);
                return data;
            } catch (error) {
                console.error("Error al obtener los datos: ", error);
            }
        }
        async stadisticsProductores() {
            let comboProductores = {};
            comboProductores.topProductores = await this.getTopProductores();
            comboProductores.cargaDeTrabajo = await this.getCargaDeTrabajo();
            return comboProductores;
        }

    }//fin de clase


    function init() {
        return new Manager();
    }
    return {

        getInstancia: function () {
            if (!manager) {
                manager = init();
            }
            return manager;
        }
    }
})();

export default Manager;
