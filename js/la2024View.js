'use strict';
class La2024View {
    constructor() {
        this.header = document.getElementsByTagName('header')[0];
        this.main = document.getElementsByTagName('main')[0];
        this.footer = document.getElementsByTagName('footer')[0];

        this.pageSize = 50;
        this.currentOffSet = 0;
    }
    /************************** APARTADO BARRA NAVEGACION ************************/

    showNavBar(usuario, handler) {
        let nombreUsuario;
        if (usuario) {
            // console.log(usuario);
            nombreUsuario = usuario.username;
        }
        let param = {};
        param.nombreUsuario = nombreUsuario;
        param.userId = usuario.id;
        this.header.replaceChildren();
        this.header.insertAdjacentHTML('afterbegin', `                        
            <a href="#"><section class="logo" style="background-image:url('./images/logoMolino.png')"></section></a>
            <div class="cabecera">
                <nav class="navBar">
                    <ul class="" id='navBar'>
                     <li class="">
                            <a class="enlaceNav inactivo" href="#" id='home' data-option='home'>Home</a>
                        </li>
                        <li class="">
                            <a class="enlaceNav inactivo" href="#" id='menuAvisos' data-option='menuAvisos'>Avisos</a>
                        </li>                     
                    </ul>                
                </nav>
                <nav class="navBar">
                    <ul class="" id='subMenu'>                    
                    </ul>                
                </nav> 
            </div>
            <div class="menulogin">
                <div class="datosUser">
                    <div class="imgCont dropbtn" id="dropbtn">
                        <img src="./images/loginprofile.png" alt="profile" id="profileImg">
                    </div>
                    <div class="datosCont">
                        <div class="nombre">
                            <span>${usuario.username}</span>
                        </div>
                    </div>
                    <div class="dropdown-content" id="menuCurrentUser">
                        <article class="enlaceNav inactivo">
                            <span>${usuario.rol}</span>
                        </article>
                        <div class="enlaceNav inactivo" id="changePass" data-option="changePassDrop">Cambiar Pass</div>
                        <div class="enlaceNav inactivo" id="deleteUser" data-option="deleteUserDrop">Eliminar Perfil</div>
                        <div class="enlaceNav inactivo" id="cerrarSesion" data-option="cerrarSesion">Cerrar Sesión</div>
                    </div>
                </div>
            </div>
        `)
        let navBar = document.getElementById('navBar');

        switch (usuario.rol) {
            case "admin":
                let clienteLi = document.createElement('li');
                let enlaceClientes = document.createElement('a');
                enlaceClientes.classList.add('enlaceNav');
                enlaceClientes.classList.add('inactivo');
                enlaceClientes.setAttribute('id', 'menuClientes');
                enlaceClientes.setAttribute('data-option', 'menuClientes');
                enlaceClientes.setAttribute('href', '#');
                enlaceClientes.innerHTML = 'Clientes';
                clienteLi.appendChild(enlaceClientes);
                navBar.appendChild(clienteLi);

                let maquinaLi = document.createElement('li');
                let enlaceMaquinas = document.createElement('a');
                enlaceMaquinas.classList.add('enlaceNav');
                enlaceMaquinas.classList.add('inactivo');
                enlaceMaquinas.setAttribute('id', 'menuMaquinas');
                enlaceMaquinas.setAttribute('data-option', 'menuMaquinas');
                enlaceMaquinas.setAttribute('href', '#');
                enlaceMaquinas.innerHTML = 'Máquinas';
                maquinaLi.appendChild(enlaceMaquinas);
                navBar.appendChild(maquinaLi);

                let tecnicoLi = document.createElement('li');
                let enlaceTecnicos = document.createElement('a');
                enlaceTecnicos.classList.add('enlaceNav');
                enlaceTecnicos.classList.add('inactivo');
                enlaceTecnicos.setAttribute('id', 'menuTecnicos');
                enlaceTecnicos.setAttribute('data-option', 'menuTecnicos');
                enlaceTecnicos.setAttribute('href', '#');
                enlaceTecnicos.innerHTML = 'Técnicos';
                tecnicoLi.appendChild(enlaceTecnicos);
                navBar.appendChild(tecnicoLi);

                let adminLi = document.createElement('li');
                let enlaceAdmin = document.createElement('a');
                enlaceAdmin.classList.add('enlaceNav');
                enlaceAdmin.classList.add('inactivo');
                enlaceAdmin.setAttribute('id', 'menuAdmin');
                enlaceAdmin.setAttribute('data-option', 'menuAdmin');
                enlaceAdmin.setAttribute('href', '#');
                enlaceAdmin.innerHTML = 'Admin';
                adminLi.appendChild(enlaceAdmin);
                navBar.appendChild(adminLi);
                

                let acercaLi = document.createElement('li');
                let enlaceAcerca = document.createElement('a');
                enlaceAcerca.classList.add('enlaceNav');
                enlaceAcerca.classList.add('inactivo');
                enlaceAcerca.setAttribute('id', 'menuAcerca');
                enlaceAcerca.setAttribute('data-option', 'menuAcerca');
                enlaceAcerca.setAttribute('href', '#');
                enlaceAcerca.innerHTML = 'Acerca de:';
                acercaLi.appendChild(enlaceAcerca);
                navBar.appendChild(acercaLi);

                break;
            case "user":
                // let userLi = document.createElement('li');
                // let enlaceUser = document.createElement('a');
                // enlaceUser.classList.add('enlaceNav');
                // enlaceUser.classList.add('inactivo');
                // enlaceUser.setAttribute('id', 'menuUser');
                // enlaceUser.setAttribute('data-option', 'menuUser');
                // enlaceUser.setAttribute('href', '#');
                // enlaceUser.innerHTML = 'User';
                // userLi.appendChild(enlaceUser);
                // navBar.appendChild(userLi);
                break;
            default:
                break;
        }
        let menuCurrentUser = document.getElementById('menuCurrentUser');
        let options = menuCurrentUser.getElementsByTagName('div');
        for (const option of options) {
            option.addEventListener('click', (event) => {
                console.log(event.currentTarget.dataset.option);
                param.option = event.currentTarget.dataset.option;
                handler(param);
            })

        }

        let cerrarSesion = document.getElementById('cerrarSesion');
        cerrarSesion.addEventListener('click', (event) => {
            handler(param.nombreUsuario);
        })

        let dropbtn = document.getElementById('dropbtn');
        dropbtn.addEventListener('click', function () {
            console.log('pulsada imagen');
            const dropdownContent = document.getElementById('menuCurrentUser');
            dropdownContent.classList.toggle('show'); // Alterna la clase "show" para mostrar/ocultar el contenido
        });

        window.addEventListener('click', function (e) {
            if (!e.target.matches('.dropbtn') && !e.target.matches('#profileImg')) {
                const dropdownContent = document.getElementById('menuCurrentUser');
                if (dropdownContent && dropdownContent.classList.contains('show')) {
                    dropdownContent.classList.remove('show');
                }
            }
        });


    }
    bindNavBar(handler, info) {
        let navBar = document.querySelectorAll('li a');
        let home = document.getElementById('home');
        home.addEventListener('click', (event) => {
            for (let i of navBar) {
                i.classList.remove('activo');
                i.classList = "inactivo";
            }
            home.classList = "enlaceNav activo";
            let subMenu = document.getElementById('subMenu');
            subMenu.replaceChildren();
            // console.log(event.currentTarget.dataset.option);
            handler(event.currentTarget.dataset.option);

        })

        let menuAvisos = document.getElementById('menuAvisos');
        menuAvisos.addEventListener('click', (event) => {

            for (let i of navBar) {
                i.classList.remove('activo');
                i.classList = "inactivo";
            }
            menuAvisos.classList = "enlaceNav activo";
            // console.log(event.currentTarget.dataset.option);
            handler(event.currentTarget.dataset.option);

            let subMenu = document.getElementById('subMenu');
            subMenu.replaceChildren();
            subMenu.insertAdjacentHTML('beforeend', `            
                <li class="">
                    <a class="enlaceNav inactivo" href="#" id='nuevoAviso' data-option='nuevoAviso'>Nuevo Aviso</a>
                </li>
                <li class="">
                    <a class="enlaceNav inactivo" href="#" id='avisosPendientes' data-option='avisosPendientes'>Avisos Pendientes</a>
                </li>                
                `)
            let subMenuLi = subMenu.querySelectorAll('li a');

            let nuevoAviso = document.getElementById('nuevoAviso');
            nuevoAviso.addEventListener('click', (event) => {

                for (let i of subMenuLi) {
                    i.classList.remove('activo');
                    i.classList = "inactivo";
                }
                nuevoAviso.classList = "enlaceNav activo";
                handler(event.currentTarget.dataset.option);
            })

            let avisosPendientes = document.getElementById('avisosPendientes');
            avisosPendientes.addEventListener('click', (event) => {

                for (let i of subMenuLi) {
                    i.classList.remove('activo');
                    i.classList = "inactivo";
                }
                avisosPendientes.classList = "enlaceNav activo";
                handler(event.currentTarget.dataset.option);
            })
        })
        let menuAdmin = document.getElementById('menuAdmin');
        if (menuAdmin) {
            menuAdmin.addEventListener('click', (event) => {

                for (let i of navBar) {
                    i.classList.remove('activo');
                    i.classList = "inactivo";
                }
                menuAdmin.classList = "enlaceNav activo";
                // console.log(event.currentTarget.dataset.option);
                handler(event.currentTarget.dataset.option);
                let subMenu = document.getElementById('subMenu');
                subMenu.replaceChildren();
                subMenu.insertAdjacentHTML('beforeend', `    
                    <li class="">
                        <a class="enlaceNav inactivo" href="#" id='nuevoUsuario' data-option='nuevoUsuario'>Nuevo Usuario</a>
                    </li>         
                    <li class="">
                        <a class="enlaceNav activo" href="#" id='adminUsuarios' data-option='adminUsuarios'>Administrar Usuarios</a>
                    </li>   
                    `)
                let subMenuLi = subMenu.querySelectorAll('li a');

                let nuevoUsuario = document.getElementById('nuevoUsuario');
                nuevoUsuario.addEventListener('click', (event) => {

                    for (let i of subMenuLi) {
                        i.classList.remove('activo');
                        i.classList = "inactivo";
                    }
                    nuevoUsuario.classList = "enlaceNav activo";
                    handler(event.currentTarget.dataset.option);
                })

                let adminUsuarios = document.getElementById('adminUsuarios');
                adminUsuarios.addEventListener('click', (event) => {

                    for (let i of subMenuLi) {
                        i.classList.remove('activo');
                        i.classList = "inactivo";
                    }
                    adminUsuarios.classList = "enlaceNav activo";
                    handler(event.currentTarget.dataset.option);
                })

                let changePass = document.getElementById('changePass');
                changePass.addEventListener('click', (event) => {

                    for (let i of subMenuLi) {
                        i.classList.remove('activo');
                        i.classList = "inactivo";
                    }
                    changePass.classList = "enlaceNav activo";
                    handler(event.currentTarget.dataset.option);
                })
            })
            let menuClientes = document.getElementById('menuClientes');
            menuClientes.addEventListener('click', (event) => {
                for (let i of navBar) {
                    i.classList.remove('activo');
                    i.classList = "inactivo";
                }
                menuClientes.classList = "enlaceNav activo";
                // console.log(event.currentTarget.dataset.option);//se puede coger el data-option
                handler(event.currentTarget.dataset.option);

                let subMenu = document.getElementById('subMenu');

                subMenu.replaceChildren();
                subMenu.insertAdjacentHTML('beforeend', `            
                    <li class="">
                        <a class="enlaceNav inactivo option" href="#" id='altaCliente' data-option='altaCliente'>Nuevo Cliente</a>
                    </li>
                    <li class="">
                        <a class="enlaceNav inactivo option" href="#" id='modificaCliente' data-option='modificaCliente'>Modificar Cliente</a>
                    </li>    
                   <!--  <li class="">
                        <a class="enlaceNav inactivo option" href="#" id='historicoCliente' data-option='historicoCliente'>Histórico Cliente</a>
                    </li> -->      
                `)
                let subMenuLi = subMenu.querySelectorAll('li a');
                let altaCliente = document.getElementById('altaCliente');
                altaCliente.addEventListener('click', (event) => {
                    console.log('pulsado altaCliente')

                    for (let i of subMenuLi) {
                        // console.log(i)
                        i.classList.remove('activo');
                        i.classList = "inactivo";
                    }
                    altaCliente.classList = "enlaceNav activo";

                    //aqui el formulario de alta cliente
                    handler(event.currentTarget.dataset.option);


                })
                let modificaCliente = document.getElementById('modificaCliente');
                modificaCliente.addEventListener('click', (event) => {

                    for (let i of subMenuLi) {
                        i.classList.remove('activo');
                        i.classList = "inactivo";
                    }
                    modificaCliente.classList = "enlaceNav activo";

                    // aqui el buscador de clientes
                    handler(event.currentTarget.dataset.option);
                })
            })
            let menuMaquinas = document.getElementById('menuMaquinas');
            menuMaquinas.addEventListener('click', (event) => {

                for (let i of navBar) {
                    i.classList.remove('activo');
                    i.classList = "inactivo";
                }
                menuMaquinas.classList = "enlaceNav activo";
                // console.log(event.currentTarget.dataset.option);
                handler(event.currentTarget.dataset.option);
                let subMenu = document.getElementById('subMenu');
                subMenu.replaceChildren();
                subMenu.insertAdjacentHTML('beforeend', `            
                    <li class="">
                        <a class="enlaceNav inactivo" href="#" id='altaMaquina' data-option='altaMaquina'>Nueva Máquina</a>
                    </li>
                    <li class="">
                        <a class="enlaceNav inactivo" href="#" id='modificaMaquina' data-option='modificaMaquina'>Modificar Máquina</a>
                    </li>      `)
                let subMenuLi = subMenu.querySelectorAll('li a');
                let altaMaquina = document.getElementById('altaMaquina');
                altaMaquina.addEventListener('click', (event) => {

                    for (let i of subMenuLi) {
                        i.classList.remove('activo');
                        i.classList = "inactivo";
                    }
                    altaMaquina.classList = "enlaceNav activo";

                    //aqui el formulario de alta de maquina
                    handler(event.currentTarget.dataset.option);

                })
                let modificaMaquina = document.getElementById('modificaMaquina');
                modificaMaquina.addEventListener('click', (event) => {

                    for (let i of subMenuLi) {
                        i.classList.remove('activo');
                        i.classList = "inactivo";
                    }
                    modificaMaquina.classList = "enlaceNav activo";
                    //aqui el formulario de modificacion de maquina
                    handler(event.currentTarget.dataset.option);

                })
            })
            let menuTecnicos = document.getElementById('menuTecnicos');
            menuTecnicos.addEventListener('click', (event) => {
                for (let i of navBar) {
                    i.classList.remove('activo');
                    i.classList = "inactivo";
                }
                menuTecnicos.classList = "enlaceNav activo";
                // console.log(event.currentTarget.dataset.option);//se puede coger el data-option
                handler(event.currentTarget.dataset.option);

                let subMenu = document.getElementById('subMenu');

                subMenu.replaceChildren();
                subMenu.insertAdjacentHTML('beforeend', `            
                    <li class="">
                        <a class="enlaceNav inactivo option" href="#" id='altaProductor' data-option='altaProductor'>Nuevo Técnico</a>
                    </li>
                    <li class="">
                        <a class="enlaceNav inactivo option" href="#" id='modificaProductor' data-option='modificaProductor'>Modificar Técnico</a>
                    </li>    
                     
                `)
                let subMenuLi = subMenu.querySelectorAll('li a');
                let altaProductor = document.getElementById('altaProductor');
                altaProductor.addEventListener('click', (event) => {

                    for (let i of subMenuLi) {
                        i.classList.remove('activo');
                        i.classList = "inactivo";
                    }
                    altaProductor.classList = "enlaceNav activo";
                    handler(event.currentTarget.dataset.option);


                })
                let modificaProductor = document.getElementById('modificaProductor');
                modificaProductor.addEventListener('click', (event) => {

                    for (let i of subMenuLi) {
                        i.classList.remove('activo');
                        i.classList = "inactivo";
                    }
                    modificaProductor.classList = "enlaceNav activo";

                    // aqui el buscador de clientes
                    handler(event.currentTarget.dataset.option);
                })
            })
            let menuAcerca = document.getElementById('menuAcerca');
            menuAcerca.addEventListener('click', (event) => {
                for (let i of navBar) {
                    i.classList.remove('activo');
                    i.classList = "inactivo";
                }
                menuAcerca.classList = "enlaceNav activo";
                // console.log(event.currentTarget.dataset.option);//se puede coger el data-option
                handler(event.currentTarget.dataset.option);
            })
        }
    }

    /*******************************  APARTADO DE CLIENTES *********************************/
    showNuevoCliente() {
        let today = new Date()
        // let fechaAlta = document.getElementById('fechaAlta');
        let dia = today.getDate();
        let mes = today.getMonth() + 1;
        let year = today.getFullYear();
        if (dia < 10) { dia = '0' + dia };
        if (mes < 10) { mes = '0' + mes };

        let placeholder = year + "-" + mes + "-" + dia;
        // fechaAlta.value = placeholder;
        this.main.replaceChildren();
        this.main.insertAdjacentHTML('afterbegin', `
        <div class='formularioAlta'>
        <section class="cabeceraForm">
                <h3>Alta de Cliente</h3>                  
        </section>
   
        <form role="form" method="POST">
            <section class="editorNuevoCliente">
                <div class="clienteForm">
                    <div class="grupo">
                        <label for="nombreCliente">Nombre*</label>
                        <input class="entradaValor2 editable" type="text" name="nombreCliente" id="nombreCliente"
                            value="" placeholder="Nombre de Cliente" required />
                    </div>
                    <div class="grupo">
                        <label for="direccionCliente">Direccion*</label>
                        <input class="entradaValor2 editable" type="text" name="direccionCliente" id="direccionCliente"
                            value="" placeholder="Dirección" required />
                    </div>
                    <div class="grupo">
                        <label for="poblacionCliente">Población*</label>
                        <input class="entradaValor2 editable" type="text" name="poblacionCliente" id="poblacionCliente"
                            value="" placeholder="Población" required />
                    </div>
                </div>
                <div class="clienteForm">
                    <div class="grupo">
                        <label for="provinciaCliente">Provincia*</label>
                        <input class="entradaValor2" type="text" name="provinciaCliente" id="provinciaCliente" value=""
                            placeholder="Provincia" required />
                    </div>
                    <div class="grupo">
                        <label for="contactoCliente">Contacto</label>
                        <input class="entradaValor2" type="text" name="contactoCliente" id="contactoCliente" value=""
                            placeholder="Contacto"/>
                    </div>
                    <div class="grupo">
                        <label for="telefonoCliente">Teléfono</label>
                        <input class="entradaValor2" type="text" name="telefonoCliente" id="telefonoCliente" value=""
                            placeholder="Teléfono"/>
                    </div>
                </div>
                <div class="clienteForm">
                    <div class="grupo">
                        <label for="emailCliente">Correo</label>
                        <input class="entradaValor2" type="email" name="email" id="email" value=""
                            placeholder="Correo Electrónico"/>
                    </div>
                    <div class="grupo">
                        <label for="fechaAlta">Alta</label>
                        <input class="entradaValor2" type="date" name="fechaAlta" id="fechaAlta" value="${placeholder}" required />
                    </div>
                    
                </div>
            </section>
    
            <section class="botonera">
                <button name="guardarClienteBtn" id="guardarClienteBtn" class="btnForm2 editarBtn">Guardar</button>
                <button type="reset" name="cancelarClienteBtn" id="cancelarClienteBtn" class="btnForm2">Cancelar</button>
            </section>
        </form>
    </div>
            `)


    }
    bindNuevoCliente(handler) {
        // console.log(handler);
        let nombreCliente = document.getElementById('nombreCliente');
        let direccionCliente = document.getElementById('direccionCliente');
        let poblacionCliente = document.getElementById('poblacionCliente');
        let provinciaCliente = document.getElementById('provinciaCliente');
        let contactoCliente = document.getElementById('contactoCliente');
        let telefonoCliente = document.getElementById('telefonoCliente');
        let fechaAltaCliente = document.getElementById('fechaAlta');
        let email = document.getElementById('email');

        nombreCliente.addEventListener('invalid', function () {
            this.setCustomValidity('Introduce un nombre válido para el cliente.');
        })
        nombreCliente.addEventListener('change', function () {
            this.setCustomValidity('');
        })
        direccionCliente.addEventListener('invalid', function () {
            this.setCustomValidity('Introduce una dirección válida para el cliente.');
        })
        direccionCliente.addEventListener('change', function () {
            this.setCustomValidity('');
        })
        poblacionCliente.addEventListener('invalid', function () {
            this.setCustomValidity('La población es obligatoria');
        })
        poblacionCliente.addEventListener('change', function () {
            this.setCustomValidity('');
        })
        provinciaCliente.addEventListener('invalid', function () {
            this.setCustomValidity('La provincia es obligatoria');
        })
        provinciaCliente.addEventListener('change', function () {
            this.setCustomValidity('');
        })
        contactoCliente.addEventListener('invalid', function () {
            this.setCustomValidity('Introduce una persona de contacto');
        })
        contactoCliente.addEventListener('change', function () {
            this.setCustomValidity('');
        })
        telefonoCliente.addEventListener('invalid', function () {
            this.setCustomValidity('El teléfono es necesario.');
        })
        telefonoCliente.addEventListener('change', function () {
            this.setCustomValidity('');
        })
        email.addEventListener('invalid', function () {
            this.setCustomValidity('Introduce una dirección de correo válida.');
        })
        email.addEventListener('change', function () {
            this.setCustomValidity('');
        })

        //gestion del botón guardar nuevo cliente
        let guardarClienteBtn = document.getElementById('guardarClienteBtn');
        guardarClienteBtn.addEventListener('click', (event) => {
            let cliente = {};
            if (nombreCliente.value !== ""
                && direccionCliente.value !== ""
                && poblacionCliente.value !== ""
                && provinciaCliente.value !== "") {
                event.preventDefault();
                cliente.nombre = nombreCliente.value.toLowerCase();
                cliente.direccion = direccionCliente.value.toLowerCase();
                cliente.poblacion = poblacionCliente.value.toLowerCase();
                cliente.provincia = provinciaCliente.value.toLowerCase();
                if (contactoCliente.value !== "") { cliente.contacto = contactoCliente.value.toLowerCase(); } else { cliente.contacto = ""; }
                if (telefonoCliente.value !== "") { cliente.telefono = telefonoCliente.value; } else { cliente.telefono = ""; }
                if (email.value !== "") { cliente.email = email.value.toLowerCase(); } else { cliente.email = ""; }
                cliente.fechaCreacion = fechaAltaCliente.value;
                cliente.bajaCliente = 0;

                handler(cliente);
            }
        })


    }
    showCabeceraBusqueda() {
        this.main.replaceChildren();
        this.main.insertAdjacentHTML('afterbegin', ` 
        <section class="elementoBusqueda">
            <article class="cuadroBusqueda">
                <label for="nombreClienteBusqueda"></label>
                <img src="./images/lupa.png" alt="lupa" style="max-width: 7%;">
                <input class="entradaValor3" type="text" name="nombreClienteBusqueda" id="nombreClienteBusqueda">
            </article>
            <article>
                <span id="nClientes">0</span>
            </article>
        </section>
        <div class="centradorCabecera" class="falsaTabla">
            <section id="cabeceraDatosClientes">
                <article class="art4">
                    <span>ID</span>
                </article>
                <article class="art18">
                    <span>NOMBRE</span>
                </article>             
                <article class="art18">
                    <span>DIRECCION</span>
                </article>
                <article class="art10">
                    <span>POBLACION</span>
                </article>
                <article  class="art8">
                    <span>PROVINCIA</span>
                </article>
                <article  class="art8"> 
                    <span>CONTACTO</span>
                </article>
                <article  class="art8">
                    <span>TELEFONO</span>
                </article>
                <article  class="art10">
                    <span>MAIL</span>
                </article>
                <article  class="art4">
                    <span>BAJA</span>
                </article>
                
                    <!-- <p>&#128393;</p> -->
                    <p>&#x1F527;</p>
                
            </section>
            <section id="datosClientes">

            </section>
        </div>
        
        `)
    }
    //no borrar
    bindBusquedaClientes(handler) {
        let nombreClienteBusqueda = document.getElementById('nombreClienteBusqueda');
        nombreClienteBusqueda.addEventListener('keyup', (event) => {
            // console.log(nombreClienteBusqueda.value);
            handler(nombreClienteBusqueda.value);
        })
    }
    showListadoClientesEncontrados(mapaClientes, handler) {

        let datosClientes = document.getElementById('datosClientes');
        datosClientes.replaceChildren();
        let listadoClientes = Array.from(mapaClientes.values())//.slice(this.currentOffSet, this.currentOffSet + this.pageSize); // Convertir Map a Array y renderizar solo los primeros 20 clientes

        listadoClientes.forEach(element => {
            // console.log(element);
            let cliente;
            let nMaquinasCliente = 0;
            let idCliente;

            if (element.cliente) {
                cliente = element.cliente;
                nMaquinasCliente = element.maquinas.size;
                idCliente = element.cliente.id;
            } else {
                cliente = element;
                idCliente = element.id;
            }
            let nAvisosCliente = 1001;
            let fechaFormateada;
            if (cliente.fechaCreacion) {
                fechaFormateada = new Date(cliente.fechaCreacion).toISOString().split('T')[0];
            }
            else {
                //excepcion
                console.error("la fecha es indefinida")
            }
            let fechaUltimoAviso = "";
            datosClientes.insertAdjacentHTML('beforeend', `
                    <div class="divisor collapsible" id="cliente${cliente.id}">
                        <article class="art4">
                            <span>${cliente.id}</span>
                        </article>
                        <article class="art18">
                            <span>${cliente.nombre}</span>
                        </article>
                        <article class="art18">
                            <span>${cliente.direccion}</span>
                        </article>
                        <article class="art10">
                            <span>${cliente.poblacion}</span>
                        </article>
                        <article class="art8">
                            <span>${cliente.provincia}</span>
                        </article>
                        <article class="art8">
                            <span>${cliente.contacto}</span>
                        </article>
                        <article  class="art8">
                            <span>${cliente.telefono}</span>
                        </article>
                        <article  class="art10">
                            <span>${cliente.email}</span>
                        </article>
                        <article  class="art4">
                            <input type="checkbox" id="bajaClienteChk" class="checkBaja" value=${cliente.bajaCliente} disabled/>
                        </article >
                        <p class="activarDesplegable" id="detalleCliente${cliente.id}" data-idcliente="${cliente.id}">&#11206;</p>
                    </div>
                    <div class='desplegable' id="desplegableCliente${cliente.id}">                         
                    </div>   
                `);


        })

        //numero de coincidencias encontradas
        let nClientes = document.getElementById('nClientes');
        nClientes.innerText = mapaClientes.size;

        //gestion de checked's
        let checkedBajas = document.getElementsByClassName('checkBaja');
        for (const element of checkedBajas) {
            if (element.value == 0) {
                element.checked = false;
            } else {
                element.checked = true;
            }
        };

        //gestion de color de lineas de la falsa tabla
        let divisores = document.querySelectorAll('.divisor');
        let array = Array.from(divisores);
        array.forEach(function (value, key) {
            if (key % 2 != 0) {
                value.classList.remove('divisor');
                value.classList = 'divisorGris collapsible';
            }
        })

        //gestion de collapsible y listener pulsador desplegable

        let coll = document.getElementsByClassName("collapsible");
        let borraDesplegables = () => {
            let desplegables = document.querySelectorAll('.desplegable');
            for (let a = 0; a < desplegables.length; a++) {
                desplegables[a].replaceChildren();
                desplegables[a].insertAdjacentHTML('afterbegin', ``);
            }
        }
        for (let i = 0; i < coll.length; i++) {
            let pulsador = coll[i].getElementsByClassName("activarDesplegable");
            pulsador[0].addEventListener('click', (event) => {
                console.log('pulsado click 1 handler idcliente: ' + event.currentTarget.dataset.idcliente);
                handler(event.currentTarget.dataset.idcliente);
                borraDesplegables();

                if (coll[i].nextElementSibling.classList.contains('visible')) {
                    coll[i].nextElementSibling.classList = 'desplegable';
                    //  coll[i].nextElementSibling.classList.remove('visible');
                    pulsador[0].innerHTML = "&#11206;";
                    ///////////////////
                    let inputEditables = document.querySelectorAll('.visible input');
                    if (inputEditables.length > 0) {
                        let idClienteTemp = inputEditables[0].value;
                        this.deshacerCambiosClientes(idClienteTemp, inputEditables, listadoClientes);
                    }


                } else {
                    for (let j = 0; j < coll.length; j++) {
                        if (coll[j].nextElementSibling.classList.contains('visible')) {
                            //  coll[j].nextElementSibling.classList.remove('visible');
                            coll[j].nextElementSibling.classList = 'desplegable';
                            let pulsadorJ = coll[j].getElementsByClassName("activarDesplegable");
                            pulsadorJ[0].innerHTML = "&#11206;";
                            /////////////////////
                            let inputEditables = document.querySelectorAll('.visible input');
                            if (inputEditables.length > 0) {
                                let idClienteTemp = inputEditables[0].value;
                                this.deshacerCambiosClientes(idClienteTemp, inputEditables, listadoClientes);
                            }
                        }
                    }
                    coll[i].nextElementSibling.classList.remove('desplegable');
                    coll[i].nextElementSibling.classList = 'visible';
                    pulsador[0].innerHTML = "&#11205;";
                    /////////////////////////
                    let inputEditables = document.querySelectorAll('.visible input');
                    if (inputEditables.length > 0) {
                        let idClienteTemp = inputEditables[0].value;
                        this.deshacerCambiosClientes(idClienteTemp, inputEditables, listadoClientes);
                    }

                }
            })
        }
    }
    showDetalleCliente(cliente) {
        console.log('detalle cliente', cliente);
        let datosClientes = document.getElementById('datosClientes');
        let nMaquinasCliente = cliente.maquinas.size;
        let nAvisosCliente = cliente.cuenta;
        let fechaUltimoAviso = cliente.ultimoAviso;
        let desplegableCliente = document.getElementById('desplegableCliente' + cliente.cliente.id);
        desplegableCliente.replaceChildren();
        desplegableCliente.insertAdjacentHTML('afterbegin', ` 
                <form role="form" method="POST" class="formDetalleCliente">                            
                    <section class="editorCliente">
                        <div class="grupo">
                            <label for="idCliente" id="idClienteLabel">Id Cliente</label>
                            <input class="entradaValor2" type="text" name="idCliente" id="idClienteForm"
                            value="${cliente.cliente.id}" readonly/>
                        </div>
                    </section>
                    <section class="editorCliente">
                        <div class="clienteForm">
                            <div class="grupo">
                                <label for="nombreCliente">Nombre</label>
                                <input class="entradaValor2 editable" type="text" name="nombreCliente" id="nombreCliente"
                                value="${cliente.cliente.nombre}" placeholder="Nombre de Cliente" required readonly/>
                            </div>
                            <div class="grupo">
                                <label for="direccionCliente">Direccion</label>  
                                <input class="entradaValor2 editable" type="text" name="direccionCliente" id="direccionCliente"
                                value="${cliente.cliente.direccion}"  placeholder="Dirección" required readonly/>
                            </div>
                            <div class="grupo">
                                <label for="poblacionCliente">Poblacion</label>                  
                                <input class="entradaValor2 editable" type="text" name="poblacionCliente" id="poblacionCliente"
                                value="${cliente.cliente.poblacion}"   placeholder="Población" required readonly/>
                            </div>
                            <div class="grupo">   
                                <label for="provinciaCliente">Provincia</label>                   
                                <input class="entradaValor2" type="text" name="provinciaCliente" id="provinciaCliente"
                                value="${cliente.cliente.provincia}" placeholder="Provincia" required readonly/>
                            </div>
                        </div>       
                        <div class="clienteForm">
                                <div class="grupo">
                                <label for="contactoCliente">Contacto</label>                  
                                <input class="entradaValor2" type="text" name="contactoCliente" id="contactoCliente"
                                value="${cliente.cliente.contacto}" placeholder="Contacto" required readonly/>     
                                </div>
                                <div class="grupo">
                                <label for="telefonoCliente">Teléfono</label>         
                                <input class="entradaValor2" type="text" name="telefonoCliente" id="telefonoCliente"
                                value="${cliente.cliente.telefono}" placeholder="Teléfono" required readonly/>
                            </div>
                            <div class="grupo">
                                <label for="emailCliente">Correo</label> 
                                <input class="entradaValor2" type="email" name="emailCliente" id="emailCliente"
                                value="${cliente.cliente.email}" placeholder="Correo Electrónico" required readonly/>
                            </div>
                            <div class="grupo">
                                <label for="fechaCreacionCliente">Alta</label> 
                                <input class="entradaValor2" type="date" name="fechaCreacionCliente" id="fechaCreacionCliente"
                                value="${cliente.cliente.fechaCreacion}" required readonly/>
                            </div>       
                        </div>  
                            <div class="clienteForm">
                                <div class="grupo">
                                <label for="numeroMaquinas">Parque:</label>                  
                                <input class="entradaValor2 linkView" type="text" name="numeroMaquinas"
                                value="${nMaquinasCliente}" placeholder="Número de máquinas" id="nMaquinasCliente${cliente.cliente.id}" readonly/>     
                                </div>
                                <div class="grupo">
                                <label for="numeroIntervenciones">Asistencias:</label>         
                                <input class="entradaValor2 linkView" type="text" name="numeroIntervenciones" id="nAvisosCliente${cliente.cliente.id}"
                                value="${nAvisosCliente}" placeholder="Cantidad de Asistencias" readonly />
                            </div>
                            <div class="grupo">
                                <label for="ultimaIntervencion">Ultima visita:</label> 
                                <input class="entradaValor2" type="date" name="ultimaIntervencion" id="ultimaIntervencion"
                                value="${fechaUltimoAviso}" placeholder="Ultima intervención" readonly />
                            </div>
                            <div class="grupo">
                                <label for="baja">Baja</label> 
                                <input type="checkbox" id="baja" name="baja" class="checkBaja" value=${cliente.bajaCliente} disabled/>

                            </div>
                                
                        </div>       
        
                    </section>
                             
                    <section class="botonera">
                        <button name="enviarCliente2" id="editarClienteBt" 
                                class="btnForm2 editarBtn">Editar</button>                           
                        <button name="saveFormCliente" id="saveFormClienteBt"
                                class="btnForm2 guardarBtn" disabled>Guardar</button>                         
                        <button name="deshacerCliente" id="deshacerClienteBt" 
                                class="btnForm2 deshacerClienteBtn">Cancelar</button>
                        <button name="eliminarFormCliente" id="eliminarFormClienteBt"
                                class="btnForm2 eliminarBtn">Eliminar</button>                          
                    </section> 
                </form> 
            `);
    }
    bindListadoClientesEncontrados(listadoClientes, handler) {

        //gestion de boton editar Inputs
        let collEditarBtn = document.querySelectorAll(".editarBtn");
        for (let i = 0; i < collEditarBtn.length; i++) {
            collEditarBtn[i].addEventListener('click', (event) => {
                event.preventDefault();
                console.log("pulsado editar btn: " + i);
                let inputEditables = document.querySelectorAll('.visible input');
                // console.log(inputEditables.length);
                for (const input of inputEditables) {
                    //aqui cambiar a editables los inputs.
                    // console.log(input.value);
                    input.readOnly = false;
                    input.style.backgroundColor = "lightyellow";
                    input.disabled = false;
                }
                inputEditables[0].readOnly = true;
                inputEditables[0].style.backgroundColor = "white";
                inputEditables[9].readOnly = true;
                inputEditables[9].style.backgroundColor = "white";
                inputEditables[10].readOnly = true;
                inputEditables[10].style.backgroundColor = "white";
                inputEditables[11].readOnly = true;
                inputEditables[11].style.backgroundColor = "white";

                //activamos el boton guardar
                let collGuardarBtn = document.querySelectorAll(".guardarBtn");
                for (let j = 0; j < collGuardarBtn.length; j++) {
                    collGuardarBtn[i].disabled = false;

                }
            })
        }

        //gestion de boton cancelar
        let collDeshacerBtn = document.querySelectorAll(".deshacerClienteBtn");
        for (let i = 0; i < collDeshacerBtn.length; i++) {
            collDeshacerBtn[i].addEventListener('click', (event) => {
                console.log("pulsado deshacer btn: " + i);
                event.preventDefault();
                let inputEditables = document.querySelectorAll('.visible input');
                if (inputEditables.length > 0) {
                    let idClienteTemp = inputEditables[0].value;
                    this.deshacerCambiosClientes(idClienteTemp, inputEditables, listadoClientes);
                }
            })

        }

        //gestion de boton guardar registros
        let collGuardarBtn = document.querySelectorAll(".guardarBtn");
        for (let i = 0; i < collGuardarBtn.length; i++) {
            collGuardarBtn[i].addEventListener('click', (event) => {
                console.log("pulsado guardar btn: " + i);
                let inputEditables = document.querySelectorAll('.visible input');
                if (inputEditables.length > 0) {
                    let idClienteTemp = inputEditables[0].value;
                    inputEditables[1].addEventListener('invalid', function () {
                        this.setCustomValidity('Introduce un nombre válido para el cliente.');
                    })
                    inputEditables[1].addEventListener('change', function () {
                        this.setCustomValidity('');
                    })
                    inputEditables[2].addEventListener('invalid', function () {
                        this.setCustomValidity('Introduce una dirección válida para el cliente.');
                    })
                    inputEditables[2].addEventListener('change', function () {
                        this.setCustomValidity('');
                    })
                    inputEditables[3].addEventListener('invalid', function () {
                        this.setCustomValidity('La población es obligatoria.');
                    })
                    inputEditables[3].addEventListener('change', function () {
                        this.setCustomValidity('');
                    })
                    inputEditables[4].addEventListener('invalid', function () {
                        this.setCustomValidity('Asigna una provincia.');
                    })
                    inputEditables[4].addEventListener('change', function () {
                        this.setCustomValidity('');
                    })
                    inputEditables[5].addEventListener('invalid', function () {
                        this.setCustomValidity('Indica la persona de contacto.');
                    })
                    inputEditables[5].addEventListener('change', function () {
                        this.setCustomValidity('');
                    })
                    inputEditables[6].addEventListener('invalid', function () {
                        this.setCustomValidity('El teléfono es necesario.');
                    })
                    inputEditables[6].addEventListener('change', function () {
                        this.setCustomValidity('');
                    })
                    inputEditables[7].addEventListener('invalid', function () {
                        this.setCustomValidity('Introduce una dirección de correo válida.');
                    })
                    inputEditables[7].addEventListener('change', function () {
                        this.setCustomValidity('');
                    })

                    let cliente = {};

                    if (inputEditables[1].value !== ""
                        && inputEditables[2].value !== ""
                        && inputEditables[3].value !== ""
                        && inputEditables[4].value !== ""
                        && inputEditables[5].value !== ""
                        && inputEditables[6].value !== ""
                        && inputEditables[7].value !== "") {

                        event.preventDefault();
                        cliente.id = parseInt(inputEditables[0].value);
                        cliente.nombre = inputEditables[1].value;
                        cliente.direccion = inputEditables[2].value;
                        cliente.poblacion = inputEditables[3].value;
                        cliente.provincia = inputEditables[4].value;
                        cliente.contacto = inputEditables[5].value;
                        cliente.telefono = inputEditables[6].value;
                        cliente.email = inputEditables[7].value;
                        if (inputEditables[8].value) {
                            cliente.fechaCreacion = inputEditables[8].value;
                        } else {
                            cliente.fechaCreacion = "";
                        }
                        if (inputEditables[12].checked == true) {
                            cliente.bajaCliente = 1;
                        } else {
                            cliente.bajaCliente = 0;
                        }

                        cliente.update = true;//le pasamos esta propiedad al objeto y al manejador para que identifique si actualizmaos o borramos.

                        handler(cliente);//pasamos el objeto al controlador


                        this.desactivarInputsClientes();

                        //cambiamos los datos de la falsa tabla
                        let selector = "#cliente" + inputEditables[0].value + " span";
                        let collArticles = document.querySelectorAll(selector)
                        for (let j = 0; j < collArticles.length; j++) {
                            collArticles[1].innerHTML = cliente.nombre;
                            collArticles[2].innerHTML = cliente.direccion;
                            collArticles[3].innerHTML = cliente.poblacion;
                            collArticles[4].innerHTML = cliente.provincia;
                            collArticles[5].innerHTML = cliente.contacto;
                            collArticles[6].innerHTML = cliente.telefono;
                            collArticles[7].innerHTML = cliente.email;
                        }
                        let selector2 = "#cliente" + inputEditables[0].value + " input"
                        let collChechBox = document.querySelectorAll(selector2);
                        collChechBox[0].value = cliente.bajaCliente;
                        inputEditables[12].value = cliente.bajaCliente;
                    }
                    let checkedBajas = document.getElementsByClassName('checkBaja');
                    for (const element of checkedBajas) {
                        if (element.value == 0) {
                            element.checked = false;
                        } else {
                            element.checked = true;
                        }
                    };
                }
            })
        }

        //gestion de boton eliminar registros
        let collEliminarBtn = document.querySelectorAll(".eliminarBtn");
        let nombreClienteBusqueda = document.getElementById("nombreClienteBusqueda");
        for (let i = 0; i < collEliminarBtn.length; i++) {
            collEliminarBtn[i].addEventListener('click', (event) => {
                event.preventDefault();
                console.log("pulsado eliminar btn: " + i);
                let inputEditables = document.querySelectorAll('.visible input');
                if (inputEditables.length > 0) {
                    let cliente = {};
                    cliente.id = inputEditables[0].value;
                    cliente.nombre = inputEditables[1].value;
                    // cliente.nombre = inputEditables[1].value;
                    cliente.delete = true;
                    cliente.busqueda = nombreClienteBusqueda.value;
                    handler(cliente); //aqui elmiminamos de la coleccion enviamo


                    // this.showInfoModalRemoveCliente(inputEditables[0].value);// esto en scriptIndice.js


                }
            })
        }
        //gestion de enlace a parque de maquinas de cliente e historial de avisos de cliente
        let inputEditables = document.querySelectorAll('.visible input');
        if (inputEditables.length > 0) {
            let cliente = {};
            cliente.id = parseInt(inputEditables[0].value);

            //parque de maquinas
            let nMaquinasCliente = document.getElementById('nMaquinasCliente' + cliente.id);
            nMaquinasCliente.addEventListener('click', (event) => {
                cliente.parque = true;
                delete cliente.historial;
                handler(cliente);
            });
            nMaquinasCliente.removeEventListener('click', (event));

            //historial de avisos por cliente
            let nAvisosCliente = document.getElementById('nAvisosCliente' + cliente.id);
            nAvisosCliente.addEventListener('click', (event) => {
                cliente.historial = true;
                delete cliente.parque;
                handler(cliente);
            })
            nAvisosCliente.removeEventListener('click', (event));
        }


    }
    desactivarInputsClientes() {
        console.log('desactivar Inputs...')
        let inputEditables = document.querySelectorAll('.centradorCabecera input');
        for (const input of inputEditables) {
            //aqui cambiamos a bloqueados todos los inputs de la pagina.
            input.readOnly = true;
            input.style.backgroundColor = "white";
            // input.disabled = true;
        }
        //desactivamos el boton guardar
        let collGuardarBtn = document.querySelectorAll(".guardarBtn");
        for (let j = 0; j < collGuardarBtn.length; j++) {
            collGuardarBtn[j].disabled = true;
        }

    }
    deshacerCambiosClientes(input, inputEditables, listadoClientes) {
        console.log('Deshacer cambios...');
        console.log('input', input);

        listadoClientes.forEach(function (element) {
            // console.log('element', element);

            // console.log('key', element.id);
            let value;
            if (element.id == input) {
                if (element.cliente) {
                    value = element.cliente;
                } else {
                    value = element;
                }
                // console.log("value", value);
                inputEditables[1].value = value.nombre;
                inputEditables[2].value = value.direccion;
                inputEditables[3].value = value.poblacion;
                inputEditables[4].value = value.provincia;
                inputEditables[5].value = value.contacto;
                inputEditables[6].value = value.telefono;
                inputEditables[7].value = value.email;
                inputEditables[8].value = value.fechaCreacion;
                inputEditables[12].value = value.bajaCliente;
                // console.log(inputEditables[12]);
            }
        })
        this.desactivarInputsClientes();
    }
    cancelarUpdateCliente(cliente) {

        //cambiamos los datos del formulario por los del objeto original
        let inputEditables = document.querySelectorAll('.visible input');
        console.log('length', inputEditables.length);
        console.log('cliente enviado', cliente);
        inputEditables[1].value = cliente.nombre;
        inputEditables[2].value = cliente.direccion;
        inputEditables[3].value = cliente.poblacion;
        inputEditables[4].value = cliente.provincia;
        inputEditables[5].value = cliente.contacto;
        inputEditables[6].value = cliente.telefono;
        inputEditables[7].value = cliente.email;
        inputEditables[8].value = cliente.fechaCreacion;
        inputEditables[12].value = cliente.bajaCliente;

        //cambiamos los datos de la falsa tabla por los del objeot original
        let selector = "#cliente" + inputEditables[0].value + " span";
        let collArticles = document.querySelectorAll(selector)
        // for (let j = 0; j < collArticles.length; j++) {
        collArticles[1].innerHTML = cliente.nombre;
        collArticles[2].innerHTML = cliente.direccion;
        collArticles[3].innerHTML = cliente.poblacion;
        collArticles[4].innerHTML = cliente.provincia;
        collArticles[5].innerHTML = cliente.contacto;
        collArticles[6].innerHTML = cliente.telefono;
        collArticles[7].innerHTML = cliente.email;
        // }
        let selector2 = "#cliente" + inputEditables[0].value + " input"
        let collChechBox = document.querySelectorAll(selector2);
        collChechBox[0].value = cliente.bajaCliente;
        inputEditables[12].value = cliente.bajaCliente;

        this.desactivarInputsClientes();


    }
    showInfoModalRemoveCliente(handler, idCliente) {
        let header = document.getElementsByTagName('header')[0];

        header.insertAdjacentHTML('afterbegin',
            `<!-- MODAL -->
                        <div id="myModal" class="modal">
                            <!-- Modal content -->
                            <div class="modal-content">                                                                                      
                                <section class="">
                                    <article class="cerrar">                                    
                                        <span class="close">&times;</span>
                                    </article>    
                                    <article class="mensaje">  
                                        <h5>¿Confirmas que deseas eliminar este cliente y sus máquinas y avisos asociados?</h5> 
                                    </article>                                          
                                </section>
                                <section class="botonesModal">
                                    <button id='aceptarBtn' class='btnForm2'>Aceptar</button>
                                    <button id='cancelarBtn' class='btnForm2'>Cancelar</button>
                                </section>                                
                            </div>
                        </div>`);

        let modal = document.getElementById("myModal");
        modal.style.display = "block";

        //gestion de botones modal

        //gestion de boton aceptar y confirmar borrado
        let aceptarBtn = document.getElementById('aceptarBtn');
        aceptarBtn.addEventListener('click', () => {

            // deleteCliente(idCliente); //esto esta en scriptIndice.js

            handler(idCliente);
            console.log("cliente " + idCliente + " eliminado.");
            modal.style.display = 'none';
            this.showConfirmModal("cliente " + idCliente + " eliminado.");
        })

        //gestion de boton cancelar
        let cancelarBtn = document.getElementById('cancelarBtn');
        cancelarBtn.addEventListener('click', () => {
            modal.style.display = "none";
        })
        //gestion de boton cerrar
        let span = document.getElementsByClassName("close")[0];
        span.onclick = () => {
            modal.style.display = "none";
        }
        //gestion de pulsar fuera del modal
        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    /*******************************  APARTADO DE MAQUINAS *********************************/

    showNuevaMaquina(mapaClientes) {
        // console.log('mapaClientes', mapaClientes);
        this.main.replaceChildren();
        this.main.insertAdjacentHTML('afterbegin', `
        <div class='formularioAlta'>
            <section class="cabeceraForm">
                <h3>Nueva Maquina</h3>
            </section>
            <form role="form" method="POST">
                <section class="editorNuevaMaquina">
                    <div class="maquinaForm ">
                        <div class="grupo">
                            <label for="modelo">Modelo*</label>
                            <input class="entradaValor2 editable" type="text" name="modelo" id="modelo"
                                value="" placeholder="Modelo" required />
                        </div>
                        <div class="grupo">
                            <label for="chasis">Chasis*</label>
                            <input class="entradaValor2 editable" type="text" name="chasis" id="chasis"
                                value="" placeholder="Chasis" required />
                        </div>
                        <div class="grupo">
                            <label for="cliente">Cliente*</label>
                            <select class="entradaValor2 editable" id="clienteSlt">
                               <option value="sin">Cliente</option>
                            </select>    
                        </div>
                        <div class="grupo">
                            <label for="numero">Numero</label>
                            <input class="entradaValor2 editable" type="text" name="numero" id="numero"
                                value="" placeholder="Número"/>   
                        </div>
                    </div>   
                    <div class="maquinaForm ">
                        <div class="grupoCheck">
                            
                            <input type="checkbox" name="alquilerChk" id="alquilerChk">
                            <label for="alquiler">Alquiler</label>
                        </div>
                        <div class="grupoCheck">
                            <input type="checkbox" name="alquiler" id="contratoChk">   
                            <label for="contratoChk">Contrato</label>
                        </div>
                        <div class="grupoCheck">
                            <input type="checkbox" name="alquiler" id="reacoChk">       
                            <label for="reacoChk">Reaco</label>                        
                        </div>   
                    </div>  
                    <div class="maquinaForm ">
                        <div class="grupo">
                            <label for="fechaCreacion">Alta</label>
                            <input class="entradaValor2" type="date" name="fechaCreacion" id="fechaCreacion" value="" required="">
                        </div>
                        <div class="grupo">
                            <label for="notas">Notas</label>
                            <textarea class="" name="notas" id="notas" placeholder="Notas"></textarea>
                        </div>
    
                    
                    </div>
                </section>
                 <section class="botonera">
                    <button name="guardarMaquinaBtn" id="guardarMaquinaBtn" class="btnForm2 editarBtn">Guardar</button>
                    <button type="reset" name="resetBtn" id="resetBtn" class="btnForm2">Reset</button>
                </section>
                
            </form>
        </div>
            `)
        //gestion de select de cliente    
        let clienteSlt = document.getElementById('clienteSlt');
        mapaClientes.forEach(function (cliente, key) {
            let option = document.createElement('option');
            option.innerHTML = cliente.nombre;
            option.value = cliente.id;
            clienteSlt.appendChild(option);
        })

        let today = new Date()
        let fechaCreacion = document.getElementById('fechaCreacion');
        let dia = today.getDate();
        let mes = today.getMonth() + 1;
        let year = today.getFullYear();
        if (dia < 10) { dia = '0' + dia };
        if (mes < 10) { mes = '0' + mes };

        let placeholder = year + "-" + mes + "-" + dia;
        fechaCreacion.value = placeholder;
    }
    bindNuevaMaquina(handler) {
        let modelo = document.getElementById('modelo');
        let chasis = document.getElementById('chasis');
        let clienteSlt = document.getElementById('clienteSlt');
        let numero = document.getElementById('numero');
        let alquilerChk = document.getElementById('alquilerChk');
        let contratoChk = document.getElementById('contratoChk');
        let reacoChk = document.getElementById('reacoChk');
        let fechaCreacion = document.getElementById('fechaCreacion');
        let notas = document.getElementById('notas');

        modelo.addEventListener('invalid', function () {
            this.setCustomValidity('Introduce el modelo de máquina');
        })
        modelo.addEventListener('change', function () {
            this.setCustomValidity('');
        })
        modelo.addEventListener('input', function () {
            this.value = this.value.toUpperCase();
        })
        chasis.addEventListener('invalid', function () {
            this.setCustomValidity('Introduce el chasis de la máquina');
        })
        chasis.addEventListener('change', function () {
            this.setCustomValidity('');
        })
        chasis.addEventListener('input', function () {
            this.value = this.value.toUpperCase();
        })
        clienteSlt.addEventListener('invalid', function () {
            this.setCustomValidity('Selecciona un cliente');
        })
        clienteSlt.addEventListener('change', function () {
            this.setCustomValidity('');
        })
        let guardarMaquinaBtn = document.getElementById('guardarMaquinaBtn');
        guardarMaquinaBtn.addEventListener('click', (event) => {
            let maquina = {};
            if (modelo.value !== "" && chasis.value !== "" && clienteSlt.value !== "sin") {
                event.preventDefault();
                maquina.modelo = modelo.value.toUpperCase();
                maquina.chasis = chasis.value.toUpperCase();
                maquina.cliente = parseInt(clienteSlt.value);
                maquina.numero = numero.value;
                if (alquilerChk.checked) {
                    maquina.alquiler = 1;
                } else {
                    maquina.alquiler = 0;
                }
                if (contratoChk.checked) {
                    maquina.contrato = 1;
                } else {
                    maquina.contrato = 0;
                }
                if (reacoChk.checked) {
                    maquina.reaco = 1;
                } else {
                    maquina.reaco = 0;
                }

                maquina.fechaCreacion = fechaCreacion.value;
                maquina.notas = notas.value.toUpperCase();
                maquina.baja = 0;
                handler(maquina);
            }
        })
        let resetBtn = document.getElementById('resetBtn');
        resetBtn.addEventListener('click', () => {
            modelo.value = "";
            chasis.value = "";
            clienteSlt.value = "sin";
            numero.value = "";
            alquilerChk.checked = false;
            contratoChk.checked = false;
            reacoChk.checked = false;

            notas.value = "";
            let today = new Date()
            let fechaCreacion = document.getElementById('fechaCreacion');
            let dia = today.getDate();
            let mes = today.getMonth() + 1;
            let year = today.getFullYear();
            if (dia < 10) { dia = '0' + dia };
            if (mes < 10) { mes = '0' + mes };

            let placeholder = year + "-" + mes + "-" + dia;
            fechaCreacion.setAttribute('value', placeholder);
        })
    }
    showCabeceraBusquedaMaquinas() {
        this.main.replaceChildren();
        this.main.insertAdjacentHTML('afterbegin', `   
            <section class="elementoBusqueda">
                <article class="cuadroBusqueda">
                    <label for="nombreMaquinaBusqueda"></label>
                    <img src="./images/lupa.png" alt="lupa" style="max-width: 7%;">
                    <input class="entradaValor3" type="text" name="nombreMaquinaBusqueda" id="nombreMaquinaBusqueda">
                </article>
                <article>
                    <span id="nMaquinas">0</span>
                </article>
            </section>               
            <div class="centradorCabecera" class="falsaTabla">
                <section id="cabeceraDatosClientes">
                    <article class="art10">
                        <span>MODELO</span>
                    </article>  
                    <article class="art4">
                        <span>NUMERO</span>
                    </article>           
                    <article class="art18">
                        <span>CHASIS</span>
                    </article>
                    <article class="art18">
                        <span>CLIENTE</span>
                    </article>
                    <article  class="art10">
                        <span>FECHA</span>
                    </article>
                    <article class="art10">
                        <span>ALQUILER</span>
                    </article>
                    <article  class="art10">
                        <span>REACO</span>
                    </article>
                    <article  class="art10"> 
                        <span>CONTRATO</span>
                    </article>        
                    <article  class="art10">
                        <span>BAJA</span>
                    </article>                    
                        <!-- <p>&#128393;</p> -->
                    <p>&#x1F527;</p>                    
                </section>
                <section id="datosMaquinas">
                </section>
            </div>    
        `);
    }
    bindBusquedaMaquinas(handler) {
        let nombreMaquinaBusqueda = document.getElementById('nombreMaquinaBusqueda');
        nombreMaquinaBusqueda.addEventListener('keyup', (event) => {
            handler(nombreMaquinaBusqueda.value);

        })
    }
    showListadoMaquinasEncontradas(mapaMaquinas, handler) {
        // console.log('mapaMaquinas', mapaMaquinas);
        let datosMaquinas = document.getElementById('datosMaquinas');
        datosMaquinas.replaceChildren();

        let listadoMaquinas = Array.from(mapaMaquinas.values())
        listadoMaquinas.forEach(element => {

            let fechaFormateada = element.maquina.fechaCreacion;

            if (element.maquina.numero == 0) {
                element.maquina.numero = "";
            }
            // console.log('element', element.cliente + " + " + element.avisos);
            let nAvisosMaquina = element.avisos;
            let ultimaIntervencionMaquina// = getUltimaVisitaMaquina(maquina.chasis);
            datosMaquinas.insertAdjacentHTML('beforeend', `
                    <div class="divisor collapsible" id="maquina${element.maquina.id}">
                        <article class="art10">
                            <span>${element.maquina.modelo}</span>
                        </article>
                        <article class="art4">
                            <span>${element.maquina.numero}</span>
                        </article>
                        <article class="art18">
                           <span>${element.maquina.chasis}</span>
                        </article>
                        <article class="art18">
                            <span>${element.cliente}</span>
                        </article>
                        <article class="art10">
                            <span>${fechaFormateada}</span>
                        </article>
                        <article class="art10">
                        <input class="entradaValor2 checkBaja" type="checkbox"
                            value="${element.maquina.alquiler}" disabled />
                        </article>
                        <article class="art10">
                        <input class="entradaValor2 checkBaja" type="checkbox"
                            value="${element.maquina.reaco}" disabled />
                        </article>
                        <article  class="art10">
                        <input class="entradaValor2 checkBaja" type="checkbox"
                            value="${element.maquina.contrato}" disabled />
                        </article>
                        <article  class="art10"> 
                            <input class="entradaValor2 checkBaja" type="checkbox"
                            value="${element.maquina.baja}" disabled />
                        </article>
                        <p class="activarDesplegable" data-chasis="${element.maquina.chasis}">&#11206;</p>
                    </div>
                    <div class='desplegable' id="desplegableMaquina${element.maquina.chasis}">                    
                    </div>   
                `)
        })

        //numero de coincidencias encontradas
        let nMaquinas = document.getElementById('nMaquinas');
        nMaquinas.innerText = listadoMaquinas.length;

        //gestion de color de lineas de la falsa tabla
        let divisores = document.querySelectorAll('.divisor');
        let array = Array.from(divisores);
        array.forEach(function (value, key) {
            if (key % 2 != 0) {
                value.classList.remove('divisor');
                value.classList = 'divisorGris collapsible';
            }
        })

        //gestion de checked's
        let checkedBajas = document.getElementsByClassName('checkBaja');
        for (const element of checkedBajas) {
            if (element.value == 0) {
                element.checked = false;
            } else {
                element.checked = true;
            }
        };
        //gestion de collapsible
        let coll = document.getElementsByClassName("collapsible");
        let borraDesplegables = () => {
            let desplegables = document.querySelectorAll('.desplegable');
            for (let a = 0; a < desplegables.length; a++) {
                desplegables[a].replaceChildren();
                desplegables[a].insertAdjacentHTML('afterbegin', ``);
            }
        }
        for (let i = 0; i < coll.length; i++) {
            let pulsador = coll[i].getElementsByClassName("activarDesplegable");
            pulsador[0].addEventListener('click', (event) => {
                handler(event.currentTarget.dataset.chasis);
                borraDesplegables();
                if (coll[i].nextElementSibling.classList.contains('visible')) {
                    coll[i].nextElementSibling.classList = 'desplegable';
                    pulsador[0].innerHTML = "&#11206;";
                    ///////////////////
                    let notasMaquina = document.querySelectorAll(".visible textarea");
                    let inputEditables = document.querySelectorAll('.visible input');
                    if (inputEditables.length > 0) {
                        let idMaquinaTemp = inputEditables[1].dataset.cliente;
                        let notas = notasMaquina[0];
                        console.log(idMaquinaTemp)
                        //deshacerCambiosMaquinas(idMaquinaTemp, inputEditables, mapaMaquinas, notas);
                    }
                } else {
                    for (let j = 0; j < coll.length; j++) {
                        if (coll[j].nextElementSibling.classList.contains('visible')) {
                            coll[j].nextElementSibling.classList = 'desplegable';
                            let pulsadorJ = coll[j].getElementsByClassName("activarDesplegable");
                            pulsadorJ[0].innerHTML = "&#11206;";
                            /////////////////////
                            let notasMaquina = document.querySelectorAll(".visible textarea");
                            let inputEditables = document.querySelectorAll('.visible input');
                            if (inputEditables.length > 0) {
                                let idMaquinaTemp = inputEditables[1].value;
                                let notas = notasMaquina[0];
                                console.log(idMaquinaTemp)
                                // deshacerCambiosMaquinas(idMaquinaTemp, inputEditables, mapaMaquinas, notas);
                            }


                        }
                    }
                    coll[i].nextElementSibling.classList.remove('desplegable');
                    coll[i].nextElementSibling.classList = 'visible';
                    pulsador[0].innerHTML = "&#11205;";
                    /////////////////////////
                    let notasMaquina = document.querySelectorAll(".visible textarea");
                    let inputEditables = document.querySelectorAll('.visible input');
                    if (inputEditables.length > 0) {
                        let idMaquinaTemp = inputEditables[1].value;
                        let notas = notasMaquina[0];
                        console.log(idMaquinaTemp)
                        //deshacerCambiosMaquinas(idMaquinaTemp, inputEditables, mapaMaquinas, notas);
                    }

                }
            })
        }
    }
    showDetalleMaquina(element, handler) {
        console.log('element maquina', element)

        let imagenMaquina = element.imagen;// = getImagen(maquina.chasis);


        let ultimaVez = "";
        if (element.avisos.size == 0) {
            let fecha = new Date('1999-12-31')
            const year = fecha.getFullYear();
            const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
            const day = String(fecha.getDate()).padStart(2, '0');

            ultimaVez = `${year}-${month}-${day}`;
        } else {
            ultimaVez = element.avisos.values().next().value.fechaInicio;//iterador que devuelve el primer valor de un mapa
        }
        console.log(ultimaVez)

        let desplegableMaquina = document.getElementById('desplegableMaquina' + element.maquina.chasis);
        desplegableMaquina.replaceChildren();
        desplegableMaquina.insertAdjacentHTML('afterbegin', `
            <form role="form" method="POST">
                <section class="editorMaquina">
                    <div class="maquinaForm imagenForm">
                        <img src="${imagenMaquina}" alt="Imagen de la máquina">
                    </div>
                    <div class="maquinaForm">                                                    
                        <div class="grupo">
                            <label for="modeloForm">Modelo</label>
                            <input class="entradaValor2" type="text" name="modeloForm" id="modeloForm"
                            value="${element.maquina.modelo}" placeholder ="Modelo" required readonly/>
                        </div>
                            <div class="grupo">
                            <label for="chasisForm">Chasis</label>
                            <input class="entradaValor2" type="text" name="chasisForm" id="chasisForm"
                            value="${element.maquina.chasis}" data-chasis="${element.maquina.chasis}" data-idMaquina="${element.maquina.id}" 
                            placeholder ="Chasis" required readonly/>
                        </div>
                        <div class="grupo">
                            <label for="numeroForm">Número</label>
                            <input class="entradaValor2" type="text" name="numeroForm" id="numeroForm"
                            value="${element.maquina.numero}" placeholder ="Nº Cliente" readonly/>
                        </div>
                        <div class="grupoCliente grupo">
                            <label for="cliente">Cliente</label>
                            <select class="entradaValor2 editable" id="clienteSlt" disabled>
                                <option value="${element.cliente.id}">${element.cliente.nombre}</option>
                            </select>  
                        </div>
                    </div>                      
                    <div class="maquinaForm contCheck">                               
                            <div class="grupoCheck">                                
                                <input class="entradaValor2 checkBaja" type="checkbox" name="alquilerForm" id="alquilerForm"
                                    value="${element.maquina.alquiler}" disabled />
                                <label for="alquilerForm">Alquiler</label>
                            </div> 
                                            
                            <div class="grupoCheck">
                                <input class="entradaValor2 checkBaja" type="checkbox" name="contratoForm" id="contratoForm"
                                    value="${element.maquina.contrato}" disabled />                                                                    
                                <label for="contratoForm">Contrato</label>
                            </div>
                        
                            <div class="grupoCheck">
                                <input class="entradaValor2 checkBaja" type="checkbox" name="reacoForm" id="reacoForm"
                                    value="${element.maquina.reaco}" disabled />
                                <label for="reacoForm">Reaco</label>        
                            </div>
                            <div class="grupoCheck">
                                <input class="entradaValor2 checkBaja" type="checkbox" name="bajaForm" id="bajaForm"
                                    value="${element.maquina.baja}" disabled />
                                <label for="bajaForm">Baja</label>        
                            </div>
                    </div>
                    <div class="maquinaForm">
                        <div class="grupo">
                            <label for="fechaAltaMaquina">Alta máquina:</label>         
                            <input class="entradaValor2" type="date" name="fechaAltaMaquina" id="fechaAltaMaquina"
                            value="${element.maquina.fechaCreacion}" required readonly />
                        </div>
                            <div class="grupo">
                            <label for="notasForm">Notas</label>
                            <textarea class="entradaValor2 notas" type="text" name="notasForm" id="notasForm" placeholder="Notas"
                            value="${element.maquina.notas}" readonly/>${element.maquina.notas}</textarea>
                        </div>

                            <div class="grupo">
                            <label for="numeroIntervencionesMaquina">Asistencias:</label>         
                            <input class="entradaValor2 linkView" type="text" name="numeroIntervencionesMaquina" id="nAvisosMaquina${element.maquina.id}"
                            value="${element.avisos.size}" placeholder="Cantidad de Asistencias" readonly />
                        </div>
                            <div class="grupo">
                            <label for="ultimaIntervencionMaquina">Última vez:</label>         
                            <input class="entradaValor2" type="date" name="ultimaIntervencionMaquina" id="ultimaIntervencionMaquina"
                            value="${ultimaVez}" placeholder="Última asistencia" readonly />
                        </div>
                        
                        </div>
                </section>
                <section class="botonera">
                    <button name="enviarCliente2" id="editarClienteBt" 
                            class="btnForm2 editarBtn">Editar</button>                           
                    <button name="saveFormCliente" id="saveFormClienteBt"
                            class="btnForm2 guardarBtn" disabled>Guardar</button>                         
                    <button name="cancelarFormCliente" id="cancelarFormClienteBt"
                            class="btnForm2 cancelarBtn">Cancelar</button>
                    <button name="eliminarFormCliente" id="eliminarFormClienteBt"
                            class="btnForm2 eliminarBtn">Eliminar</button>                          
                </section>                          
            </form>    
            
            
            `)
        //gestion de checked's
        let checkedBajas = document.getElementsByClassName('checkBaja');
        for (const element of checkedBajas) {
            if (element.value == 0) {
                element.checked = false;
            } else {
                element.checked = true;
            }
        };

    }
    bindListadoMaquinasEncontradas(element, mapaClientes, handler) {
        console.log('element maquina', element);

        //gestion de boton editar Inputs
        let collEditarBtn = document.querySelectorAll(".editarBtn");
        for (let i = 0; i < collEditarBtn.length; i++) {
            collEditarBtn[i].addEventListener('click', (event) => {
                event.preventDefault();
                console.log("pulsado editar btn: " + i);

                // activamos el boton cancelar
                let collCancelarrBtn = document.querySelectorAll(".cancelarBtn");
                console.log('collCancelarrBtn', collCancelarrBtn.length);
                for (let j = 0; j < collCancelarrBtn.length; j++) {
                    collCancelarrBtn[j].disabled = false;
                }

                let notasMaquina = document.querySelectorAll(".visible textarea");
                let inputEditables = document.querySelectorAll('.visible input');
                let selectMaquina = document.querySelectorAll('.visible select');

                //cambiamos a editables los inputs.
                for (const input of inputEditables) {
                    input.readOnly = false;
                    input.style.backgroundColor = "lightyellow";
                    input.disabled = false;
                }
                //dejamos desactivados los inputs con valores fijos
                inputEditables[8].readOnly = true;
                inputEditables[8].style.backgroundColor = "white";
                inputEditables[9].readOnly = true;
                inputEditables[9].style.backgroundColor = "white";

                //cambiamos a editable el textarea de las notas
                notasMaquina[0].readOnly = false;
                notasMaquina[0].style.backgroundColor = "lightyellow";
                notasMaquina[0].disabled = false;

                //cambiamos a editable el select del campo de cliente.
                selectMaquina[0].style.backgroundColor = "lightyellow";
                selectMaquina[0].disabled = false;

                // añadimos las opciones del resto de clientes disponibles
                mapaClientes.forEach(function (cliente, key) {
                    let option = document.createElement('option');
                    option.innerHTML = mapaClientes.get(key).nombre;
                    option.value = key;
                    if (option.value != selectMaquina[0].value) {
                        selectMaquina[0].appendChild(option);
                    }
                })

                //activamos el boton guardar
                let collGuardarBtn = document.querySelectorAll(".guardarBtn");
                for (let j = 0; j < collGuardarBtn.length; j++) {
                    collGuardarBtn[i].disabled = false;
                }
            })
        }

        //gestion de boton cancelar Inputs
        let collCancelarrBtn = document.querySelectorAll(".cancelarBtn");
        for (let i = 0; i < collCancelarrBtn.length; i++) {
            collCancelarrBtn[i].addEventListener('click', (event) => {
                event.preventDefault();
                console.log("pulsado cancelar btn: " + i);
                let notasMaquina = document.querySelectorAll('.visible textarea');
                let inputEditables = document.querySelectorAll('.visible input');
                if (inputEditables.length > 0) {
                    let notas = notasMaquina[0];
                    this.deshacerCambiosMaquinas(inputEditables, element, notas);
                }
            })
        }

        //gestion de boton guardar registros
        let collGuardarBtn = document.querySelectorAll(".guardarBtn");
        for (let i = 0; i < collGuardarBtn.length; i++) {
            collGuardarBtn[i].addEventListener('click', (event) => {
                console.log("pulsado guardar btn: " + i);

                let inputEditables = document.querySelectorAll('.visible input');
                let selectMaquina = document.querySelectorAll('.visible select');
                let notasMaquina = document.querySelectorAll(".visible textarea");

                if (inputEditables.length > 0) {

                    inputEditables[0].addEventListener('invalid', function () {
                        this.setCustomValidity('Introduce el modelo de la máquina.');
                    })
                    inputEditables[0].addEventListener('change', function () {
                        this.setCustomValidity('');
                    })
                    inputEditables[1].addEventListener('invalid', function () {
                        this.setCustomValidity('El chasis de la máquina es necesario.');
                    })
                    inputEditables[1].addEventListener('change', function () {
                        this.setCustomValidity('');
                    })
                    inputEditables[7].addEventListener('invalid', function () {
                        this.setCustomValidity('La fecha no puede estar vacía.');
                    })
                    inputEditables[7].addEventListener('change', function () {
                        this.setCustomValidity('');
                    })

                    let maquina = {};
                    maquina.id = element.maquina.id;

                    if (inputEditables[0].value !== ""
                        && inputEditables[1].value !== ""
                        && inputEditables[7].value !== "") {

                        event.preventDefault();
                        maquina.modelo = inputEditables[0].value;
                        maquina.chasis = inputEditables[1].value;
                        maquina.numero = inputEditables[2].value;
                        maquina.cliente = parseInt(selectMaquina[0].value);
                        if (inputEditables[3].checked == true) {
                            maquina.alquiler = 1;
                            // inputEditables[3].checked
                        } else {
                            maquina.alquiler = 0;
                        }
                        if (inputEditables[4].checked == true) {
                            maquina.contrato = 1;
                            // inputEditables[4].checked
                        } else {
                            maquina.contrato = 0;
                        }
                        if (inputEditables[5].checked == true) {
                            maquina.reaco = 1;
                            // inputEditables[5].checked
                        } else {
                            maquina.reaco = 0;
                        }
                        if (inputEditables[6].checked == true) {
                            maquina.baja = 1;
                            // inputEditables[6].checked
                        } else {
                            maquina.baja = 0;
                        }
                        maquina.fechaCreacion = inputEditables[7].value;
                        maquina.notas = notasMaquina[0].value;
                        maquina.update = true;

                        // console.log(maquina);

                        //actualizamos el dataset data-chasis por si hubiera cambiado.
                        inputEditables[1].setAttribute('data-chasis', inputEditables[1].value)

                        handler(maquina);//pasamos el objeto al controlador
                        element.maquina = maquina;
                        this.desactivarInputsMaquinas();
                    }
                }
            })
        }

        //gestion de boton eliminar registros
        let collEliminarBtn = document.querySelectorAll(".eliminarBtn");
        for (let i = 0; i < collEliminarBtn.length; i++) {
            collEliminarBtn[i].addEventListener('click', (event) => {
                event.preventDefault();
                console.log("pulsado eliminar btn: " + i);
                let inputEditables = document.querySelectorAll('.visible input');
                if (inputEditables.length > 0) {
                    let maquina = {};
                    maquina.delete = true;
                    maquina.id = element.maquina.id;
                    maquina.chasis = element.maquina.chasis;
                    handler(maquina);
                }
            })
        }

        //gestion de histórico de máquina
        let inputEditables = document.querySelectorAll('.visible input');
        if (inputEditables.length > 0) {
            let maquina = {};
            maquina.id = parseInt(element.maquina.id);
            let nAvisosMaquina = document.getElementById('nAvisosMaquina' + maquina.id);
            nAvisosMaquina.addEventListener('click', (event) => {
                maquina.historial = true;
                handler(maquina);
            })

        }


    }
    desactivarInputsMaquinas() {
        console.log('desactivar Inputs...')
        let inputEditables = document.querySelectorAll('.centradorCabecera input');
        for (const input of inputEditables) {
            //aqui cambiamos a bloqueados todos los inputs de la pagina.
            input.readOnly = true;
            input.style.backgroundColor = "white";
            // input.disabled = true;
        }
        //desactivamos el boton guardar
        let collGuardarBtn = document.querySelectorAll(".guardarBtn");
        for (let j = 0; j < collGuardarBtn.length; j++) {
            collGuardarBtn[j].disabled = true;
        }

        //desactivamos el boton cancelar
        let collCancelarrBtn = document.querySelectorAll(".cancelarBtn");
        console.log('collCancelarrBtn', collCancelarrBtn.length);
        for (let j = 0; j < collCancelarrBtn.length; j++) {
            collCancelarrBtn[j].disabled = true;
        }
        //desactivamos el textarea del form maquinas
        let notasMaquina = document.querySelectorAll(".visible textarea");
        if (notasMaquina) {
            notasMaquina[0].readOnly = true;
            notasMaquina[0].style.backgroundColor = "white";
            notasMaquina[0].disabled = true;
        }
        //desactivamos el select de cliente
        let selectMaquina = document.querySelectorAll('.visible select');
        selectMaquina[0].style.backgroundColor = "white";
        selectMaquina[0].disabled = true;
    }
    deshacerCambiosMaquinas(inputEditables, element, notasMaquinas) {
        // console.log(input)
        console.log('deshacer maquinas.maquina', element)


        inputEditables[0].value = element.maquina.modelo;
        inputEditables[1].value = element.maquina.chasis;
        inputEditables[2].value = element.maquina.numero;
        let grupoCliente = document.querySelectorAll('.visible .grupoCliente');
        grupoCliente[0].replaceChildren();
        grupoCliente[0].insertAdjacentHTML('afterbegin', `
                    <label for="cliente">Cliente</label>
                    <select class="entradaValor2 editable" id="clienteSlt" disabled>
                        <option value="${element.maquina.cliente}">${element.cliente.nombre}</option>
                    </select> 
                    `)
        grupoCliente[0].setAttribute('data-cliente', element.maquina.cliente);
        inputEditables[3].value = element.maquina.alquiler;
        inputEditables[4].value = element.maquina.contrato;
        inputEditables[5].value = element.maquina.reaco;
        inputEditables[6].value = element.maquina.baja;
        inputEditables[7].value = element.maquina.fechaCreacion;
        notasMaquinas.value = element.maquina.notas;
        let checkedBajas = document.querySelectorAll('.checkBaja');
        // console.log('checkedBajas', checkedBajas)
        for (const element of checkedBajas) {
            if (element.value == 0) {
                element.checked = false;
            } else {
                element.checked = true;
            }
        };


        this.desactivarInputsMaquinas();
    }
    showUpdateMaquina(maquina) {
        console.log('show update maquina', maquina);

        //cambiamos los datos del formulario por los del objeto original
        let inputEditables = document.querySelectorAll('.visible input');
        console.log('length', inputEditables.length);
        inputEditables[0].value = maquina.modelo;
        inputEditables[1].value = maquina.chasis;
        inputEditables[2].value = maquina.numero;
        inputEditables[3].value = maquina.alquiler;
        inputEditables[4].value = maquina.contrato;
        inputEditables[5].value = maquina.reaco;
        inputEditables[6].value = maquina.baja;
        inputEditables[7].value = maquina.fechaCreacion;

        //cambiamos los datos de la falsa tabla por los del objeot original
        //asignamos a campos de texto
        let selector = "#maquina" + maquina.id + " span";
        let collArticles = document.querySelectorAll(selector)
        collArticles[0].innerHTML = maquina.modelo;
        collArticles[1].innerHTML = maquina.numero;
        collArticles[2].innerHTML = maquina.chasis;
        collArticles[3].innerHTML = maquina.nombreCliente;
        collArticles[4].innerHTML = maquina.fechaCreacion;
        //asignamos valor a checkbox
        let selector2 = "#maquina" + maquina.id + " input"
        let collChechBox = document.querySelectorAll(selector2);
        collChechBox[0].value = maquina.alquiler;
        collChechBox[1].value = maquina.contrato;
        collChechBox[2].value = maquina.reaco;
        collChechBox[3].value = maquina.baja;
        //pintamos el checkbox segun su valor
        let checkedBajas = document.querySelectorAll('.checkBaja');
        for (const element of checkedBajas) {
            if (element.value == 0) {
                element.checked = false;
            } else {
                element.checked = true;
            }
        };

        this.desactivarInputsMaquinas();
    }

    /*******************************APARTADO DE AVISOS ************************************/

    showNuevoAviso(mapaClientes, handler) {
        // console.log('mapaClientes', mapaClientes);
        this.main.replaceChildren();
        this.main.insertAdjacentHTML('afterbegin', `
        <div class='formularioAltaAviso'>
            <section class="cabeceraForm">
                <h3>Nuevo Aviso</h3>
            </section>
            <form role="form" method="POST">
                <section class="editorNuevoAviso">
                    <div class="avisoForm">
                        <div class="grupo">
                            <label for="clienteSlt">Cliente *</label>
                            <select class="entradaValor2 editable" id="clienteSlt">
                                <option value="sin">...</option>
                            </select>
                        </div>
                        <div class="grupo">
                            <label for="chasisSlt">Chasis *</label>
                            <select class="entradaValor2 editable" id="chasisSlt">
                                <option value="sin">...</option>
                            </select>
                        </div>
                        <div class="grupo">
                            <label for="fechaInicio">Inicio *</label>
                            <input class="entradaValor2" type="date" name="fechaInicio" id="fechaInicio" value="" required="">
                        </div>
                        <div class="grupo">
                            <label for="productorSlt">Asignado</label>
                            <select class="entradaValor2 editable" id="productorSlt" name="productorSlt">
                                <option value="0">...</option>
                            </select>
                        </div>
                    </div>
                    <div class="avisoForm ">
                        <div class="grupo">
                            <label for="averia">Avería *</label>
                            <textarea class="" name="averiaTxt" id="averiaTxt" placeholder="Avería Indicada"></textarea>
                        </div>
                        <div class="grupo">
                            <label for="comentario">Comentario</label>
                            <textarea class="" name="comentarioTxt" id="comentarioTxt" placeholder="Comentario"></textarea>
                        </div>
                        <div class="grupo">
                            <label for="prioridadSlt">Prioridad</label>
                            <select class="entradaValor2 editable" id="prioridadSlt" name="prioridadSlt">                            
                            </select>
                        </div>
                    </div>
                    <div class="avisoForm ">
                        <div class="grupoCheck">
                            <input type="checkbox" name="presupuestoChk" id="presupuestoChk">
                            <label for="presupuestoChk">Presupuesto</label>
                        </div>
                        <div class="grupoCheck">
                            <input type="checkbox" name="aceptadoChk" id="aceptadoChk" disabled>
                            <label for="aceptadoChk">Aceptado</label>
                        </div>
                        <div class="grupoCheck">
                            <input type="checkbox" name="terminadoChk" id="terminadoChk" disabled>
                            <label for="terminadoChk">Terminado</label>
                        </div>
                    </div>
                    <div class="grupoImagen">
                        <img id="imagenMaquina">
                    </div>
                </section>    
                     
                <section class="infoAviso">
                    <label>Cliente:</label>
                    <span id='nAvisosCliente'></span>
                    <label>Máquina:</label>
                    <span id='nAvisosMaquina'></span>
                    <label>Última vez Máquina: </label>
                    <span id='fAvisoMaquina'></span>                
                    <label>Última vez Cliente: </label>
                    <span id='fAvisoCliente'></span>
                </section>
                <section class="botonera">
                    <button name="guardarAvisoBtn" id="guardarAvisoBtn" class="btnForm2 editarBtn">Guardar</button>
                    <button type="reset" name="resetBtn" id="resetBtn" class="btnForm2">Reset</button>
                </section>
                <section class="flechaAvisoCont" id="casette">
                    <article class="flechaAviso">&#x23EE;</article>
                    <article class="flechaAviso">&#x23F4;</article>
                    <input type="number" name="nAvisos" id="nAvisos" value="">
                    <article class="flechaAviso">&#x23F5;</article>
                    <article class="flechaAviso">&#x23ED;</article>
                    <article class="flechaAviso">&#x1F7A3;</article>                   
                </section>  
            </form>
        </div>
        <section id="infoDetalle">
            <section id="infoCliente" class="infoCliente"></section>
            <section id="infoMaquina" class="infoMaquina"></section>
        </section>
    `)

        let clienteSlt = document.getElementById('clienteSlt');
        let infoCliente = document.getElementById('infoCliente');
        let infoMaquina = document.getElementById('infoMaquina');

        let productorSlt = document.getElementById('productorSlt');
        let nAvisosCliente = document.getElementById('nAvisosCliente');
        let fAvisoCliente = document.getElementById('fAvisoCliente');
        let nAvisosMaquina = document.getElementById('nAvisosMaquina');
        let fAvisoMaquina = document.getElementById('fAvisoMaquina');
        let nAvisos = document.getElementById('nAvisos');

        //asignamos los clientes al select
        mapaClientes.forEach(function (cliente, key) {

            let optionCliente = document.createElement('option');
            if (cliente.bajaCliente != 1) {//asignamos los clientes que no estan de baja y tienen maquinas activas

                optionCliente.innerHTML = cliente.nombre;
                optionCliente.value = cliente.id;
                clienteSlt.appendChild(optionCliente);
            }
        })

        // pasar este listener a bindNuevoAviso.

        // pasamos el valor del select cliente al handler para seleccionar las maquinas del cliente.
        // y la informacion de los avisos del cliente
        clienteSlt.addEventListener('change', () => {
            infoCliente.setAttribute('data-cliente', clienteSlt.options[clienteSlt.selectedIndex].text);//capturamos el nombre y se lo pasamos al contenedor
            nAvisosCliente.innerHTML = "";
            fAvisoCliente.innerHTML = "";
            nAvisosMaquina.innerHTML = "";
            fAvisoMaquina.innerHTML = "";
            infoCliente.style.border = "none";
            infoMaquina.style.border = "none";
            infoCliente.style.boxShadow = "none";
            infoMaquina.style.boxShadow = "none";

            handler(parseInt(clienteSlt.value));
        })

        //gestion de fecha inicio de aviso
        let today = new Date()
        let dia = today.getDate();
        let mes = today.getMonth() + 1;
        let year = today.getFullYear();
        if (dia < 10) { dia = '0' + dia };
        if (mes < 10) { mes = '0' + mes };

        let placeholder = year + "-" + mes + "-" + dia;
        fechaInicio.setAttribute('value', placeholder);

        //asignamos las validaciones personalizadas a los campos del formulario
        if (clienteSlt.value === 'sin') {
            clienteSlt.setCustomValidity('Selecciona un cliente')
        }
        clienteSlt.addEventListener('change', (event) => {
            clienteSlt.setCustomValidity('');
        })
        if (chasisSlt.value === 'sin') {
            chasisSlt.setCustomValidity('Selecciona una máquina')
        }
        chasisSlt.addEventListener('change', (event) => {
            chasisSlt.setCustomValidity('');
        })

        if (fechaInicio.value.length === 0) {
            fechaInicio.setCustomValidity('La fecha no es correcta');
        }
        fechaInicio.addEventListener('change', (event) => {
            fechaInicio.setCustomValidity("");
        })

        if (averiaTxt.value.length === 0) {
            averiaTxt.setCustomValidity("Indica lo que le ocurre a la máquina.");
        } else {
            averiaTxt.setCustomValidity("");
        }
        averiaTxt.addEventListener('change', (event) => {
            averiaTxt.setCustomValidity("");
        })
        //asignamos validacion al campo nAvisos para que sea solo numérico
        nAvisos.addEventListener('input', (event) => {
            nAvisos.setCustomValidity("");
            nAvisos.value = nAvisos.value.replace(/[^0-9]/g, '');//elimina cualquier carácter que no sea un número ([^0-9]) y lo reemplaza con una cadena vacía ('').
        })

    }
    bindNuevoAviso(mapaMaquinasCliente, mapaAvisosCliente, mapaProductores, handler) {

        // console.log(mapaAvisosCliente);

        //gestion de select de cliente y chasis
        let clienteSlt = document.getElementById('clienteSlt');
        let chasisSlt = document.getElementById('chasisSlt');
        let fechaInicio = document.getElementById('fechaInicio');
        let productorSlt = document.getElementById('productorSlt');
        let averiaTxt = document.getElementById('averiaTxt');
        let comentarioTxt = document.getElementById('comentarioTxt');
        let prioridadSlt = document.getElementById('prioridadSlt');
        let presupuestoChk = document.getElementById('presupuestoChk');
        let aceptadoChk = document.getElementById('aceptadoChk');
        let terminadoChk = document.getElementById('terminadoChk');
        let guardarAvisoBtn = document.getElementById('guardarAvisoBtn');
        let imagenMaquina = document.getElementById('imagenMaquina');

        //gestion del select de clientes.
        chasisSlt.replaceChildren();
        let optionMaquina = document.createElement('option');
        optionMaquina.setAttribute('value', 'sin');
        optionMaquina.innerHTML = "...";
        imagenMaquina.setAttribute('src', "");
        imagenMaquina.setAttribute('alt', "");
        chasisSlt.appendChild(optionMaquina);

        //borramos la informacion de ultimas averias al cambiar de cliente
        let infoDetalle = document.getElementById('infoDetalle');
        let infoMaquina = document.getElementById('infoMaquina');
        let infoCliente = document.getElementById('infoCliente');

        if (mapaAvisosCliente.size == 0 && infoCliente.hasChildNodes()) {
            infoCliente.replaceChildren();
        }
        if (infoMaquina.hasChildNodes()) {
            infoMaquina.replaceChildren();
        }

        //asignamos los chasis 
        mapaMaquinasCliente.maquinas.forEach(maquina => {
            chasisSlt.insertAdjacentHTML('beforeend', `
                <option value="${maquina.maquina.chasis}"class="table">                        
                    ${maquina.maquina.chasis}                                                  
                </option>`);
        })

        //gestion del select de chasis de maquina
        chasisSlt.addEventListener('change', () => {

            //asigamos la imagen de la maquina seleccionada.
            mapaMaquinasCliente.maquinas.forEach(maquina => {
                if (chasisSlt.value == maquina.maquina.chasis) {
                    imagenMaquina.setAttribute('src', maquina.pathImagen);
                    imagenMaquina.setAttribute('alt', chasisSlt.value);
                }
            })


            // informamos al controlador para que cargue los datos 
            // del chasis seleccionado y su tabla 

            let maquina = {};
            maquina.info = true;
            maquina.chasis = chasisSlt.value;
            handler(maquina);
        })
        // gestion de productores
        productorSlt.replaceChildren();
        mapaProductores.forEach(element => {
            if (element.baja == 0) {
                let optionProductor = document.createElement('option');
                optionProductor.value = element.id;
                optionProductor.innerHTML = element.id;
                productorSlt.appendChild(optionProductor)
            }
        })
        //si no hay un productor seleccionado no se activa el check terminado
        productorSlt.addEventListener('change', (event) => {
            if (productorSlt.value != 0) {
                terminadoChk.disabled = false;
            } else {
                terminadoChk.disabled = true;
                terminadoChk.checked = false;
            }
        })
        //gestion de select prioridad
        for (let i = 5; i > 0; i--) {
            let optionPrioridad = document.createElement('option');
            optionPrioridad.value = i;
            optionPrioridad.innerHTML = i;
            prioridadSlt.appendChild(optionPrioridad);
        }
        //gestion de checkbox presupuestoChk
        presupuestoChk.addEventListener('change', (event) => {
            if (presupuestoChk.checked == true) {
                aceptadoChk.disabled = false;
            } else {
                aceptadoChk.checked = false;
                aceptadoChk.disabled = true;
            }
        })
        //gestion de boton guardar
        guardarAvisoBtn.addEventListener('click', (event) => {

            if (clienteSlt.value !== 'sin' && chasisSlt.value !== 'sin'
                && fechaInicio.value.length > 0 && averiaTxt.value.length > 0) {
                event.preventDefault();
                let aviso = {};
                aviso.idCliente = parseInt(clienteSlt.value);
                aviso.chasis = chasisSlt.value;
                aviso.fechaInicio = new Date(fechaInicio.value);
                productorSlt.addEventListener('change', (event) => {
                    if (productorSlt.value !== 0) {
                        terminadoChk.disabled = false;
                    }
                })



                aviso.productor = parseInt(productorSlt.value);
                aviso.averia = averiaTxt.value.toUpperCase();
                aviso.resolucion = comentarioTxt.value.toUpperCase();
                aviso.prioridad = parseInt(prioridadSlt.value);
                if (presupuestoChk.checked == true) {
                    aviso.presupuesto = 1;
                    aceptadoChk.disabled = false;
                } else {
                    aviso.presupuesto = 0;
                }
                if (aceptadoChk.checked == true) {
                    aviso.aceptado = 1;
                } else {
                    aviso.aceptado = 0;
                }
                if (terminadoChk.checked == true) {
                    aviso.finalizado = 1;
                    aviso.fechaFin = new Date();
                } else {
                    aviso.finalizado = 0;
                    aviso.fechaFin = "";
                }

                aviso.new = true;

                console.log(aviso);

                handler(aviso);
            }

        })

        //gestion de boton reset
        let resetBtn = document.getElementById('resetBtn');
        resetBtn.addEventListener('click', (event) => {
            console.log('reset Avisos pulsado')
            event.preventDefault();
            let aviso = {};
            aviso.reset = true;
            handler(aviso);

        })

    }
    bindFlechaBotones(handler, cantidadAvisos) {
        let flechas = document.getElementsByClassName('flechaAviso');
        let nAvisos = document.getElementById('nAvisos');

        for (const flecha of flechas) {
            flecha.addEventListener('click', (event) => {
                let param = {};
                switch (event.currentTarget.innerHTML) {
                    case '⏮':
                        // nAvisos.value = 1;
                        param.comando = 1;
                        handler(param);
                        break;
                    case '⏴':
                        if (nAvisos.value == 1) {
                            break;
                        } else if (nAvisos.value == "") {
                            // nAvisos.value = cantidadAvisos;
                            param.nAvisos = cantidadAvisos;
                            param.comando = 3;
                            handler(param);
                            break;
                        }
                        param.nAvisos = parseInt(nAvisos.value);
                        param.comando = -1;

                        nAvisos.value = parseInt(nAvisos.value) - 1;
                        handler(param);
                        break;
                    case '⏵':
                        if (nAvisos.value == cantidadAvisos || nAvisos.value == "") {
                            break;
                        }
                        param.nAvisos = parseInt(nAvisos.value);
                        param.comando = 2;

                        handler(param);
                        break;
                    case '⏭':
                        // nAvisos.value = cantidadAvisos;
                        param.nAvisos = cantidadAvisos;
                        param.comando = 3;
                        handler(param);
                        break;
                    case '🞣':
                        nAvisos.value = "";
                        param.nAvisos = "";
                        param.comando = 4;
                        handler(param);
                        break;
                    default: break;
                }
            })

        }
        nAvisos.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                let param = {};
                param.nAvisos = parseInt(nAvisos.value);
                param.comando = 0;
                handler(param);
            }
        })

    }
    bindMostrarAviso(aviso, mapaMaquinas, mapaProductores, pathImagen, handler) {

        console.log('aviso mostrado', aviso);

        let clienteSlt = document.getElementById('clienteSlt');
        let chasisSlt = document.getElementById('chasisSlt');
        let fechaInicio = document.getElementById('fechaInicio');
        let productorSlt = document.getElementById('productorSlt');
        let averiaTxt = document.getElementById('averiaTxt');
        let comentarioTxt = document.getElementById('comentarioTxt');
        let prioridadSlt = document.getElementById('prioridadSlt');
        let presupuestoChk = document.getElementById('presupuestoChk');
        let aceptadoChk = document.getElementById('aceptadoChk');
        let terminadoChk = document.getElementById('terminadoChk');
        let imagenMaquina = document.getElementById('imagenMaquina');
        let guardarAvisoBtn = document.getElementById('guardarAvisoBtn');
        let resetBtn = document.getElementById('resetBtn');
        let nAvisos = document.getElementById('nAvisos');

        nAvisos.value = aviso.id;
        console.log('nAvisos.value: ' + aviso.id + " : ", nAvisos.value);

        //remover los listener
        guardarAvisoBtn.removeEventListener('click', (event) => {
            console.log('listener anulado');
        })
        resetBtn.removeEventListener('click', (event) => {
            console.log('listener anulado');
        })

        // gestioin del select del cliente (con todos los clientes)
        clienteSlt.replaceChildren();
        let optionCliente = document.createElement('option');
        optionCliente.innerHTML = aviso.nombreCliente;
        optionCliente.value = aviso.cliente;
        clienteSlt.appendChild(optionCliente);

        // gestion del select de los chasis del cliente y de las imagenes de las maquinas
        chasisSlt.replaceChildren();
        mapaMaquinas.forEach(function (maquina, key) {

            let optionMaquina = document.createElement('option');
            if (maquina.cliente == aviso.idCliente) {
                optionMaquina.innerHTML = maquina.chasis;
                optionMaquina.value = maquina.chasis;
                if (maquina.chasis == aviso.chasis) {
                    optionMaquina.selected = true;
                    imagenMaquina.setAttribute('src', pathImagen(aviso.chasis));
                    imagenMaquina.setAttribute('alt', aviso.chasis);
                }
                chasisSlt.appendChild(optionMaquina);
            }
        })
        chasisSlt.addEventListener('change', () => {
            imagenMaquina.setAttribute('src', pathImagen(chasisSlt.value));
            imagenMaquina.setAttribute('alt', chasisSlt.value);
        })

        // fecha de inicio de aviso
        fechaInicio.value = aviso.fechaInicio;

        // gestion del select de productores
        let optionsProductor = productorSlt.querySelectorAll('option');
        for (const option of optionsProductor) {
            if (option.value == aviso.productor) {
                option.selected = true;
            }
        }
        productorSlt.replaceChildren();
        mapaProductores.forEach(element => {
            let optionProductor = document.createElement('option');
            optionProductor.value = element.id;
            optionProductor.innerHTML = element.id;
            element.id == aviso.productor ? optionProductor.selected = true : optionProductor.selected = false;
            productorSlt.appendChild(optionProductor)
        })

        // gestion de checked's de formulario
        if (productorSlt.value != 0) {
            terminadoChk.disabled = false;
        }

        productorSlt.addEventListener('change', (event) => {
            if (productorSlt.value != 0) {
                terminadoChk.disabled = false;
            } else {
                terminadoChk.disabled = true;
                terminadoChk.checked = false;
            }
        })

        if (aviso.presupuesto == 1) {
            presupuestoChk.checked = true;
            aceptadoChk.disabled == false;
        } else {
            presupuestoChk.checked = false;
        }
        if (aviso.aceptado == 1) {
            aceptadoChk.checked = true;
        } else {
            aceptadoChk.checked = false;
        }
        if (aviso.finalizado == 1) {
            terminadoChk.checked = true;
        } else {
            terminadoChk.checked = false;
        }

        presupuestoChk.addEventListener('change', (evetn) => {
            if (presupuestoChk.value.isChecked()) {
                aceptadoChk.disabled = false;
            } else {
                aceptadoChk.disabled = true;
            }
        })

        averiaTxt.value = aviso.averia;
        comentarioTxt.value = aviso.resolucion;
        prioridadSlt.value = aviso.prioridad;

        /*****/
        guardarAvisoBtn.disabled = true;
        /****/

        guardarAvisoBtn.addEventListener('click', (event) => {
            event.preventDefault();
        })

        //gestion de boton reset
        resetBtn.addEventListener('click', (event) => {
            console.log('reset Avisos pulsado')
            event.preventDefault();
            let aviso = {};
            aviso.reset = true;
            handler(aviso);

        })




    }
    showInfoAveriasCliente(mapaAvisosCliente, handler) {
        let nAvisosCliente = document.getElementById('nAvisosCliente');
        nAvisosCliente.innerHTML = mapaAvisosCliente.size;
        if (mapaAvisosCliente.size > 0) {
            let fecha = Array.from(mapaAvisosCliente.values())[0].fechaInicio;
            let fAvisoCliente = document.getElementById('fAvisoCliente');
            fAvisoCliente.innerHTML = fecha;
        }


        let infoCliente = document.getElementById('infoCliente');
        let nombreCliente = infoCliente.dataset.cliente;//tomamos el valor pasado por el dataset
        infoCliente.replaceChildren();
        infoCliente.style.border = "1px solid grey";
        infoCliente.style.boxShadow = "0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19)";
        infoCliente.insertAdjacentHTML('beforeend', `             
                    <div class="cabeceraCliente">
                        <h3 id="clienteInfo">${nombreCliente}</h3>
                        <h3 id="nAvisosCliente">${mapaAvisosCliente.size}</h3>
                    </div> 
                    <div class="cabeceraInfoCliente">
                        <article class="">
                            <span>&#10004;</span>
                        </article>
                        <article class="">
                            <span>CHASIS</span>
                        </article>
                        
                        <article class="">
                            <span>F INIC</span>
                        </article>                       
                        <!--
                        <article class="">
                            <span>F FIN</span>
                        </article>
                         -->
                        <article class="">
                            <span>AVERIA</span>
                        </article>
                        <article class="">
                            <span>PROD</span>
                        </article>
                        <article class="">
                            <span>PRE</span>
                        </article>
                        <article class="">
                            <span>OK</span>
                        </article>
                    </div>
                    <div class="contenidoInfoCliente" id="contenidoInfoCliente">
                    </div>        
                `)
        let contenidoInfoCliente = document.getElementById('contenidoInfoCliente');
        contenidoInfoCliente.replaceChildren();
        mapaAvisosCliente.forEach(aviso => {
            let fechaFin;
            if (aviso.fechaFin) {
                fechaFin = aviso.fechaFin
            } else {
                fechaFin = "";
            }
            // let clienteInfo = document.getElementById('clienteInfo');
            // clienteInfo.innerHTML = getCliente(parseInt(aviso.idCliente)).nombre;

            contenidoInfoCliente.insertAdjacentHTML('beforeend', `
                    <div class="divisor avisoClienteDetalle" data-aviso="${aviso.id}">
                        <article class="">
                            <input class="entradaValor2 checkBaja" type="checkbox"
                            value="${aviso.finalizado}" disabled />
                        </article>
                        <article class="">
                            <span>${aviso.chasis}</span>
                        </article>
                        <article class="">
                            <span>${aviso.fechaInicio}</span>
                        </article>
                        <!--
                        <article class="">
                            <span>${fechaFin}</span>
                        </article>
                        -->
                        <article class="">
                            <span  class="detalleAveria">${aviso.averia}</span>
                        </article>
                        <article class="">
                            <span>${aviso.productor}</span>
                        </article>
                        <article class="">
                            <input class="entradaValor2 checkBaja" type="checkbox"
                            value="${aviso.presupuesto}" disabled />
                        </article>
                        <article class="">
                            <input class="entradaValor2 checkBaja" type="checkbox"
                            value="${aviso.aceptado}" disabled />
                        </article>
                    </div>
                `)
        })


        //gestion de color de lineas de la falsa tabla
        let divisores = document.querySelectorAll('#infoCliente .divisor');
        let array = Array.from(divisores);
        array.forEach(function (value, key) {
            if (key % 2 != 0) {
                value.classList.remove('divisor');
                value.classList = 'divisorGris avisoClienteDetalle';
            }
        })

        //gestion de checked baja de cliente
        let checkedBajas = document.getElementsByClassName('checkBaja');
        for (const element of checkedBajas) {
            if (element.value == 0) {
                element.checked = false;
            } else {
                element.checked = true;
            }
        };

        //gestion de manejador de detalle de averia
        let collAvisos = document.querySelectorAll('.avisoClienteDetalle');
        for (const aviso of collAvisos) {
            aviso.addEventListener('click', (event) => {
                let avisoId = aviso.dataset.aviso;
                console.log('avisoId', avisoId)
                handler(parseInt(avisoId));
            })
        }


    }
    showInfoAveriasMaquina(mapaAvisosMaquina, handler) {
        console.log(mapaAvisosMaquina)
        let nAvisosMaquina = document.getElementById('nAvisosMaquina');
        nAvisosMaquina.innerHTML = mapaAvisosMaquina.size;
        let fAvisoMaquina = document.getElementById('fAvisoMaquina');
        let fecha = "";
        if (mapaAvisosMaquina.size > 0) {
            fecha = Array.from(mapaAvisosMaquina.values())[0].fechaInicio;
        }
        fAvisoMaquina.innerHTML = fecha;


        let infoMaquina = document.getElementById('infoMaquina');
        infoMaquina.replaceChildren();
        infoMaquina.style.border = "1px solid grey";
        infoMaquina.style.boxShadow = "0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19)";
        infoMaquina.insertAdjacentHTML('beforeend', `             
                    <div class="cabeceraChasis">
                        <h3 id="chasisInfo"></h3>
                        <h3 id="nAvisosMaquina">${mapaAvisosMaquina.size}</h3>
                    </div> 
                    <div class="cabeceraInfoMaquina">
                        <article class="">
                            <span>&#10004;</span>
                        </article>
                        <article class="">
                            <span>INICIO</span>
                        </article>
                        <!--
                        <article class="">
                            <span>FIN</span>
                        </article>
                        -->
                        <article class="">
                            <span>AVERIA</span>
                        </article>
                        <article class="">
                            <span>PROD</span>
                        </article>
                        <article class="">
                            <span>PRE</span>
                        </article>
                        <article class="">
                            <span>OK</span>
                        </article>
                    </div>
                    <div class="contenidoInfoMaquina" id="contenidoInfoMaquina">
                    </div>        
                `)

        let contenidoInfoMaquina = document.getElementById('contenidoInfoMaquina');
        contenidoInfoMaquina.replaceChildren();
        mapaAvisosMaquina.forEach(aviso => {
            // console.log(aviso)
            let fechaFin;
            if (aviso.fechaFin) {
                fechaFin = aviso.fechaFin;
            } else {
                fechaFin = "";
            }
            let chasisInfo = document.getElementById('chasisInfo');
            chasisInfo.innerHTML = aviso.chasis;

            contenidoInfoMaquina.insertAdjacentHTML('beforeend', `
                    <div class="divisor avisoMaquinaetalle" data-aviso="${aviso.id}">
                        <article class="">
                            <input class="entradaValor2 checkBaja" type="checkbox"
                            value="${aviso.finalizado}" disabled />
                        </article>
                        <article class="">
                            <span>${aviso.fechaInicio}</span>
                        </article>
                        <!--
                        <article class="">
                            <span>${fechaFin}</span>
                        </article>
                        -->
                        <article class="">
                            <span class="detalleAveria">${aviso.averia}</span>
                        </article>
                        <article class="">
                            <span>${aviso.productor}</span>
                        </article>
                        <article class="">
                            <input class="entradaValor2 checkBaja" type="checkbox"
                            value="${aviso.presupuesto}" disabled />
                        </article>
                        <article class="">
                            <input class="entradaValor2 checkBaja" type="checkbox"
                            value="${aviso.aceptado}" disabled />
                        </article>
                    </div>
                `)
        })


        //gestion de color de lineas de la falsa tabla
        let divisores = document.querySelectorAll('#infoMaquina .divisor');
        let array = Array.from(divisores);
        array.forEach(function (value, key) {
            if (key % 2 != 0) {
                value.classList.remove('divisor');
                value.classList = 'divisorGris avisoMaquinaetalle';
            }
        })

        //gestion de checked baja de cliente
        let checkedBajas = document.getElementsByClassName('checkBaja');
        for (const element of checkedBajas) {
            if (element.value == 0) {
                element.checked = false;
            } else {
                element.checked = true;
            }
        };

        //gestion de manejador de detalle de averia
        let collAvisos = document.querySelectorAll('.avisoMaquinaetalle');
        for (const aviso of collAvisos) {
            aviso.addEventListener('click', (event) => {
                let avisoId = aviso.dataset.aviso;
                console.log('avisoId', avisoId)
                handler(parseInt(avisoId));
            })
        }

    }
    showAvisosPendientes(param, avisosPendientes, productoresList, productorSeleccionado) {
        // console.log('el parametro en view es: ' + param);
        // console.log('Avisos pendientes en view:', avisosPendientes);
        // console.log('productores en avisos pendinetes', productoresList);
        // console.log('productor seleccionado', productorSeleccionado);

        if (productorSeleccionado === undefined) {
            productorSeleccionado = 'todos';
        }

        this.main.replaceChildren();

        // opciones de avisos pendientes
        let cabeceraAvisos = document.createElement('section');
        cabeceraAvisos.setAttribute('id', 'cabeceraAvisos')
        this.main.appendChild(cabeceraAvisos);

        // boton refrescar avisos
        let uptAvisosCont = document.createElement('section');
        uptAvisosCont.setAttribute('id', 'uptAvisosCont');
        cabeceraAvisos.appendChild(uptAvisosCont);
        let uptAvisos = document.createElement('article');
        uptAvisos.classList.add('uptAvisos');
        uptAvisos.setAttribute('id', 'uptAvisos');
        uptAvisos.innerHTML = 'ACTUALIZAR';
        uptAvisosCont.appendChild(uptAvisos);

        // botones filtrado de avisos por productor
        let lineaProductores = document.createElement('section');
        lineaProductores.setAttribute('id', 'lineaProductores');
        cabeceraAvisos.appendChild(lineaProductores);
        let productorArtTodos = document.createElement('article');
        if (productorSeleccionado == 'todos') {
            productorArtTodos.classList.add('productorArt', 'activo');
        } else {
            productorArtTodos.classList.add('productorArt', 'inactivo');//
        }
        productorArtTodos.setAttribute('data-productor', 'todos');
        lineaProductores.appendChild(productorArtTodos);
        productorArtTodos.innerHTML = "TODOS";
        productoresList.forEach(productor => {
            let productorArt = document.createElement('article');
            if (productorSeleccionado == productor.id) {
                productorArt.classList.add('productorArt', 'activo');
            } else {

                productorArt.classList.add('productorArt', 'inactivo');//
            }
            productorArt.setAttribute('data-productor', productor.id);
            if (productor.id == 0) {
                lineaProductores.appendChild(productorArt);
                productorArt.innerHTML = "SIN";

            } else if (productor.id != 77) {
                lineaProductores.appendChild(productorArt);
                productorArt.innerHTML = productor.id;
            }
        })

        // cantidad de avisos en pantalla
        let avisosTotales = document.createElement('section');
        cabeceraAvisos.appendChild(avisosTotales);
        let cAvisos = document.createElement('article');
        cAvisos.setAttribute('id', 'cAvisos');
        avisosTotales.appendChild(cAvisos);
        cAvisos.innerHTML = avisosPendientes.size;


        // cabecera de tabla de avisos pendientes 
        this.main.insertAdjacentHTML('beforeend', `
            <div class="cabeceraInfoAvisosPendientes">
                    <article class="">
                        <span>&#10004;</span>
                    </article>
                    <article id="ordenAvisoFecha" class="ordenaTabla" data-orden="fecha">
                        <span>INICIO</span>
                        <!---->
                        <span class="pulsadorOrden">&#11208;</span>
                    </article >
                    <article id="ordenAvisoCliente" class="ordenaTabla" data-orden="cliente">
                        <span>CLIENTE</span>
                        <span class="pulsadorOrden">&#11208;</span>
                    </article>
                    <article class="avisoNumMaqui">
                        <span>Nº</span>
                    </article>
                    <article class="">
                        <span>CHASIS</span>
                    </article>
                    <article id="ordenAvisoPrior" class="ordenaTabla" data-orden="prior">
                        <span>PRIOR</span>
                        <span class="pulsadorOrden">&#11208;</span>
                    </article>
                    <article class="">
                        <span>AVERIA</span>
                    </article>
                    <article class="comentAviso">
                        <span>COMENTARIO</span>
                    </article>
                    <article id="ordenAvisoProd" class="ordenaTabla" data-orden="produ">
                        <span>TÉCNICO</span>
                        <span class="pulsadorOrden">&#11208;</span>
                    </article>
                    <article class="">
                        <span>PRESU</span>
                    </article>
                    <article class="">
                        <span>OK</span>
                    </article>
            </div>
            <div class="contenidoInfoAveria" id="contenidoInfoAveria">
            </div>        
        `);
        let ordenAvisoFecha = document.getElementById('ordenAvisoFecha');
        let ordenAvisoCliente = document.getElementById('ordenAvisoCliente');
        let ordenAvisoPrior = document.getElementById('ordenAvisoPrior');
        let ordenAvisoProd = document.getElementById('ordenAvisoProd');


        // gestion de las flechas de seleccion de orden de columnas
        if (param === 'fechaDesc') {
            for (const hijo of ordenAvisoFecha.children) {

                if (hijo.classList.contains('pulsadorAsc')) {
                    hijo.remove();
                } else if (hijo.classList.contains('pulsadorOrden')) {
                    hijo.remove();
                }
            }
            ordenAvisoFecha.insertAdjacentHTML('beforeend', `
                <span class="pulsadorOrden pulsadorDesc">&#11205;</span>
                `);
        } else if (param === 'fechaAsc') {
            for (const hijo of ordenAvisoFecha.children) {
                if (hijo.classList.contains('pulsadorDesc')) {
                    hijo.remove();
                } else if (hijo.classList.contains('pulsadorOrden')) {
                    hijo.remove();
                }
            }
            ordenAvisoFecha.insertAdjacentHTML('beforeend', `
                <span class="pulsadorOrden pulsadorAsc">&#11206;</span>
                `)
        } else if (param === 'clienteDesc') {
            for (const hijo of ordenAvisoCliente.children) {
                if (hijo.classList.contains('pulsadorAsc' || hijo.classList.contains('pulsadorOrden'))) {
                    hijo.remove();
                } else if (hijo.classList.contains('pulsadorOrden')) {
                    hijo.remove();
                }
            }
            ordenAvisoCliente.insertAdjacentHTML('beforeend', `
                <span class="pulsadorOrden pulsadorDesc">&#11205;</span>
                `);
        } else if (param === 'clienteAsc') {
            for (const hijo of ordenAvisoCliente.children) {
                if (hijo.classList.contains('pulsadorDesc')) {
                    hijo.remove();
                } else if (hijo.classList.contains('pulsadorOrden')) {
                    hijo.remove();
                }
            }
            ordenAvisoCliente.insertAdjacentHTML('beforeend', `
                <span class="pulsadorOrden pulsadorAsc">&#11206;</span>
                `)
        } else if (param === 'priorDesc') {
            for (const hijo of ordenAvisoPrior.children) {
                if (hijo.classList.contains('pulsadorAsc' || hijo.classList.contains('pulsadorOrden'))) {
                    hijo.remove();
                } else if (hijo.classList.contains('pulsadorOrden')) {
                    hijo.remove();
                }
            }
            ordenAvisoPrior.insertAdjacentHTML('beforeend', `
                <span class="pulsadorOrden pulsadorDesc">&#11205;</span>
                `);
        } else if (param === 'priorAsc') {
            for (const hijo of ordenAvisoPrior.children) {
                if (hijo.classList.contains('pulsadorDesc')) {
                    hijo.remove();
                } else if (hijo.classList.contains('pulsadorOrden')) {
                    hijo.remove();
                }
            }
            ordenAvisoPrior.insertAdjacentHTML('beforeend', `
                <span class="pulsadorOrden pulsadorAsc">&#11206;</span>
                `)
        } else if (param === 'produDesc') {
            for (const hijo of ordenAvisoProd.children) {
                if (hijo.classList.contains('pulsadorAsc' || hijo.classList.contains('pulsadorOrden'))) {
                    hijo.remove();
                } else if (hijo.classList.contains('pulsadorOrden')) {
                    hijo.remove();
                }
            }
            ordenAvisoProd.insertAdjacentHTML('beforeend', `
                <span class="pulsadorOrden pulsadorDesc">&#11205;</span>
                `);
        } else if (param === 'produAsc') {
            for (const hijo of ordenAvisoProd.children) {
                if (hijo.classList.contains('pulsadorDesc')) {
                    hijo.remove();
                } else if (hijo.classList.contains('pulsadorOrden')) {
                    hijo.remove();
                }
            }
            ordenAvisoProd.insertAdjacentHTML('beforeend', `
                <span class="pulsadorOrden pulsadorAsc">&#11206;</span>
                `)
        }

        //Ordenamos los avisos en funcion del parametro recibido
        let getAvisos = (param, mapaAvisos) => {
            let sortedMap;
            if (param === 'fechaDesc') {
                sortedMap = new Map([...mapaAvisos.entries()].sort((a, b) => {
                    return new Date(b[1].fechaInicio) - new Date(a[1].fechaInicio);
                }));
            } else if (param === 'fechaAsc') {
                sortedMap = new Map([...mapaAvisos.entries()].sort((a, b) => {
                    return new Date(a[1].fechaInicio) - new Date(b[1].fechaInicio);
                }));
            } else if (param === 'clienteDesc') {
                sortedMap = new Map([...mapaAvisos.entries()].sort((a, b) => {
                    return a[1].idCliente - b[1].idCliente;
                }));
                return sortedMap;
            } else if (param === 'clienteAsc') {
                sortedMap = new Map([...mapaAvisos.entries()].sort((a, b) => {
                    return b[1].idCliente - a[1].idCliente;
                }));
            } else if (param === 'priorDesc') {
                sortedMap = new Map([...mapaAvisos.entries()].sort((a, b) => {
                    return a[1].prioridad - b[1].prioridad;
                }));
                return sortedMap;
            } else if (param === 'priorAsc') {
                sortedMap = new Map([...mapaAvisos.entries()].sort((a, b) => {
                    return b[1].prioridad - a[1].prioridad;
                }));
            } else if (param === 'produDesc') {
                sortedMap = new Map([...mapaAvisos.entries()].sort((a, b) => {
                    return a[1].productor - b[1].productor;
                }));
                return sortedMap;
            } else if (param === 'produAsc') {
                sortedMap = new Map([...mapaAvisos.entries()].sort((a, b) => {
                    return b[1].productor - a[1].productor;
                }));
            }
            return sortedMap;

        }

        //tomamos los avisos y generamos las lineas de todos los avisos
        let contenidoInfoAveria = document.getElementById('contenidoInfoAveria');
        contenidoInfoAveria.setAttribute('data-orden', param);
        contenidoInfoAveria.replaceChildren();

        getAvisos(param, avisosPendientes).forEach(aviso => {
            if (aviso.numeroMaquina == 0) {
                aviso.numeroMaquina = "";
            }
            contenidoInfoAveria.insertAdjacentHTML('beforeend', `
                <div class="divisor lineaAviso" data-aviso="${aviso.id}">
                    <article class="enlazable">
                        <input class="checkBaja checkFinAviso" name="finalizado" data-aviso="${aviso.id}" type="checkbox"
                        value="${aviso.finalizado}"/>
                        <input class="entradaValor2" style="display:none"/>
                    </article>
                    <article class="enlazable fechaSltArt">
                        <input class="entradaValor2 fechaSlt " type="date" value="${aviso.fechaInicio}"/>
                    </article>
                    <article class="enlazable">
                        <input type="text" class="entradaValor2 campoCliente " data-idcliente="${aviso.idCliente} "value="${aviso.nombreCliente}" disabled/>
                    </article>
                    <article class="enlazable campoNumeroArt">
                        <input type="text" class="entradaValor2 campoNumero" value="${aviso.numeroMaquina}" disabled/>
                    </article>
                    <article class="enlazable ">
                        <select class="entradaValor2 editable selectChasis "data-idcliente="${aviso.idCliente}">  
                            <option value="${aviso.chasis}"class="table">${aviso.chasis}</option>                     
                        </select>
                    </article>
                    <article class="enlazable selectPrioArt ">
                        <select class="entradaValor2 editable selectPrio ">  
                           <option value="${aviso.prioridad}"class="table"></option>                     
                        </select>
                    </article>
                    <article class="enlazable">
                        <input class="entradaValor2 campoCliente " type="text" value="${aviso.averia}"/>
                    </article>
                    <article class="enlazable resolucionArt">
                         <input class="entradaValor2 campoCliente " type="text" value="${aviso.resolucion}"/>
                    </article>
                    <article class="enlazable">
                        <select class="entradaValor2 editable selectProd ">
                            <option value="${aviso.productor}" class="table">${aviso.productor}</option>
                        </select>
                    </article>
                    <article class="enlazable presuChkArt">
                        <input class="entradaValor2 checkBaja presuChk" type="checkbox"
                        value="${aviso.presupuesto}"/>
                    </article>
                    <article class="enlazable aceptChkArt">
                        <input class="entradaValor2 checkBaja aceptChk" type="checkbox"
                        value="${aviso.aceptado}" disabled/>
                    </article>
                </div>            
            `)
            //gestion de checkbox de presupuesto y aceptado
            let lineaAviso = document.querySelector(`.lineaAviso[data-aviso="${aviso.id}"]`);
            let presuChk = lineaAviso.getElementsByClassName('presuChk');
            let aceptChk = lineaAviso.getElementsByClassName('aceptChk');
            if (presuChk[0].value == 1) {
                aceptChk[0].disabled = false;
            } else {
                aceptChk[0].value = 0;
                aceptChk[0].checked = false;
                aceptChk[0].disabled = true;
            }

            //gestion de checkbox de finalizado
            let finAvisoChk = lineaAviso.getElementsByClassName('checkFinAviso');
            if (aviso.productor == 0) {
                finAvisoChk[0].disabled = true;
            }

        })
    }
    bindAvisosPendientes(avisosPendientes, handler, aviso) {

        //gestion de la tecla escape
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                document.activeElement.blur(); // Elimina el foco de los elementos activos
                console.log('pulsada la tecla escape');

            }
        })

        //gestion de color de lineas de la falsa tabla
        let divisores = document.querySelectorAll('#contenidoInfoAveria .divisor');
        let array = Array.from(divisores);
        array.forEach(function (value, key) {
            if (key % 2 != 0) {
                value.classList.remove('divisor');
                value.classList = 'divisorGris lineaAviso';
            }
        })

        //gestion de checked
        let checkedBajas = document.getElementsByClassName('checkBaja');
        for (const element of checkedBajas) {


            if (element.value == 0) {
                element.checked = false;
            } else {
                element.checked = true;
            }
        }

        //cargamos los chasis en el select del cliente.
        let selectChasis = document.getElementsByClassName('selectChasis');
        for (const campo of selectChasis) {

            // sustituir por un ternario

            avisosPendientes.infoMaquinas.forEach(maquina => {
                if (maquina.idCliente == parseInt(campo.dataset.idcliente) && maquina.chasis != campo.value) {
                    campo.insertAdjacentHTML('afterbegin', `
                     <option value="${maquina.chasis}"class="table">                        
                         ${maquina.chasis}                                                  
                     </option>`);
                }
            })
        }
        //cargamos los productores en el select con un ternario
        let selectProd = document.getElementsByClassName('selectProd');
        for (const campo of selectProd) {
            let storedProductor = campo.value;
            campo.replaceChildren();
            avisosPendientes.infoProductores.forEach(productor => {
                parseInt(storedProductor) == productor.id ?
                    campo.insertAdjacentHTML('beforeend', `<option value="${productor.id}"class="table" selected>${productor.id}</option>`) :
                    campo.insertAdjacentHTML('beforeend', `<option value="${productor.id}"class="table" >${productor.id}</option>`);
            })
        }

        //cargamos las opciones de prioridad con un ternario
        let selectPrio = document.getElementsByClassName('selectPrio');
        for (const campo of selectPrio) {
            let prioridad = campo.value;
            campo.replaceChildren()
            for (let i = 1; i < 6; i++) {
                parseInt(prioridad) === i ?
                    campo.insertAdjacentHTML('beforeend', `<option value="${i}"class="table" selected>${i}</option>`) :
                    campo.insertAdjacentHTML('beforeend', `<option value="${i}"class="table">${i}</option>`)
            }

            if (campo.value == 1) {
                campo.style.backgroundColor = 'lightcoral';
            } else if (campo.value == 2) {
                campo.style.backgroundColor = 'lightsalmon';
            }
            campo.addEventListener('change', (event) => {
                if (campo.value == 1) {
                    campo.style.backgroundColor = 'lightcoral';
                } else if (campo.value == 2) {
                    campo.style.backgroundColor = 'lightsalmon';
                } else {
                    campo.style.background = 'none';
                }
            })
        }

        //asignamos recordatorio a avisos retrasados mas de 15 dias.
        let fechaSlt = document.getElementsByClassName('fechaSlt');
        Array.from(fechaSlt).forEach(campo => {
            if (new Date(campo.value) < new Date() - 15 * 86400000) {
                campo.style.backgroundColor = 'lightsalmon'
            }

            campo.addEventListener('change', (event) => {
                if (new Date(campo.value) < new Date() - 15 * 86400000) {
                    campo.style.backgroundColor = 'lightsalmon'
                }
            })
        })

        //funcion para actualizar el numero de maquina con el chasis
        let getNumeroMaquina = (chasis) => {
            let numero = 0;
            avisosPendientes.infoMaquinas.forEach(maquina => {
                if (maquina.chasis == chasis) {
                    numero = maquina.numero;
                }
            })
            return numero;
        }

        //gestion de actualizacion de avisos
        let lineasDeAvisos = document.getElementsByClassName('lineaAviso');
        let contenidoInfoAveria = document.getElementById('contenidoInfoAveria');
        for (const element of lineasDeAvisos) {
            let valoresAviso = element.querySelectorAll('.entradaValor2');
            for (const campo of valoresAviso) {
                campo.addEventListener('change', (event) => {
                    //gestion de valor de checked's cambiados
                    if (campo.classList.contains('checkBaja')) {
                        if (campo.checked == true) {
                            campo.setAttribute('value', 1)
                        } else {
                            campo.setAttribute('value', 0)
                        }
                    }


                    if (campo.classList.contains('checkDelete')) {
                        console.log('campo contiene checkDelete', campo);
                        event.preventDefault();
                    }


                    //gestion de numero de máquina
                    if (campo.classList.contains('selectChasis')) {
                        valoresAviso[3].value = getNumeroMaquina(valoresAviso[4].value);//ojo no añadir mas campos entre medias.
                    }

                    //validacion de la fecha
                    if (campo.classList.contains('fechaSlt') && campo.addEventListener('blur', (event) => {
                        let nuevaFecha = new Date(campo.value);
                        console.log(nuevaFecha)
                        if (nuevaFecha.getFullYear() < 2002) {
                            nuevaFecha.setFullYear(2002);
                            campo.value = nuevaFecha.toISOString().split('T')[0];
                        }
                    })) {

                    }

                    // let aviso = {};
                    aviso.id = parseInt(element.dataset.aviso);
                    aviso.idCliente = parseInt(valoresAviso[2].dataset.idcliente);
                    aviso.chasis = valoresAviso[4].value;
                    aviso.averia = valoresAviso[6].value;
                    aviso.resolucion = valoresAviso[7].value;
                    aviso.productor = parseInt(valoresAviso[8].value);
                    aviso.finalizado = parseInt(valoresAviso[0].value);
                    aviso.fechaInicio = new Date(valoresAviso[1].value);
                    if (valoresAviso[0].value == 1) {
                        aviso.fechaFin = new Date();
                    } else {
                        aviso.fechaFin = "";
                    }
                    aviso.presupuesto = parseInt(valoresAviso[9].value);
                    aviso.aceptado = parseInt(valoresAviso[10].value);
                    aviso.prioridad = parseInt(valoresAviso[5].value);

                    aviso.update = true;
                    aviso.orden = contenidoInfoAveria.dataset.orden;

                    handler(aviso);

                }, true)

            }

        }

        //gestion de filtrado por productores
        let productorArtList = document.getElementsByClassName('productorArt');
        for (const productorBtn of productorArtList) {
            productorBtn.addEventListener('click', (event) => {
                aviso.paramProductor = event.currentTarget.dataset.productor;
                // productorArtList.forEach(element => {
                //     element.classList.toggle('inactivo');
                // });
                productorBtn.classList.remove('inactivo');
                productorBtn.classList.add('activo');
                handler(aviso);
            });
        }


        //gestion de las flechas de orden
        let ordenaTabla = document.getElementsByClassName('ordenaTabla');
        for (const campo of ordenaTabla) {
            campo.addEventListener('click', (event) => {
                aviso.orden = "";
                let param = campo.dataset.orden;
                for (const element of campo.children) {
                    if (element.classList.contains('pulsadorAsc')) {
                        element.classList.remove('pulsadorAsc');
                        element.classList.add('pulsadorDesc');
                        aviso.orden = param + 'Desc';


                    } else if (element.classList.contains('pulsadorDesc')) {
                        element.classList.remove('pulsadorDesc');
                        element.classList.add('pulsadorAsc');
                        aviso.orden = param + 'Asc';


                    } else {
                        element.classList.add('pulsadorDesc');
                        aviso.orden = param + 'Desc';

                    }
                }
                handler(aviso);
            })
        }

        //gestion de eliminar aviso
        for (const linea of lineasDeAvisos) {
            let pressTimer;

            linea.addEventListener("mousedown", (event) => {
                pressTimer = window.setTimeout(() => {
                    console.log('pulsado el raton para eliminar');

                    linea.style.backgroundColor = 'rgb(72, 72, 72)';
                    aviso.delete = true;
                    handler(aviso);


                }, 1000);
            });

            linea.addEventListener("mouseup", (event) => {
                clearTimeout(pressTimer);
            });

            linea.addEventListener("mouseout", (event) => {
                clearTimeout(pressTimer);
            });
        }

        //gestion de finalizar avisos
        let uptAvisosBtn = document.getElementById('uptAvisos');
        let avisosFinalizados = document.getElementsByClassName('checkFinAviso');
        uptAvisosBtn.addEventListener('click', (event) => {
            let avisosFinColeccion = new Map();
            for (const aviso of avisosFinalizados) {
                //gestion de valor de checked's cambiados
                if (aviso.classList.contains('checkBaja')) {
                    if (aviso.checked == true) {
                        aviso.setAttribute('value', 1)
                    } else {
                        aviso.setAttribute('value', 0)
                    }
                }
                if (aviso.value == 1) {
                    avisosFinColeccion.set(parseInt(aviso.dataset.aviso), parseInt(aviso.dataset.aviso));
                }
            }
            if (avisosFinColeccion.size > 0) {
                aviso.paramAvisosFinalizados = avisosFinColeccion;
                handler(aviso);
            }
        })


    }

    /******************************* APARTADO DE PRODUCTORES *****************************************/

    showNuevoProductor(mensaje) {
        let error = "";
        if (mensaje) {
            error = mensaje
        }
        this.main.replaceChildren();
        this.main.insertAdjacentHTML('afterbegin', `
        <div class='formularioAltaUsuario'>
            <section class="cabeceraForm">
                <h3>Nuevo Técnico</h3>
            </section>
            <form role="form" method="POST">
                 <div class="grupoLogin">
                    <label for="idTecnico">ID:</label>
                    <input class="" type="text" id="idTecnico" name="idTecnico" placeholder="ID" maxlength="3" pattern="9\\d{2}" required title="Debe ser un número que empiece por 9 y tenga 3 dígitos">                </div>
                <div class="grupoLogin">
                    <label for="nombreTecnico">Nombre:</label>
                    <input class="" type="text" id="nombreTecnico" name="nombreTecnico" placeholder="Nombre" required>
                </div>          
                <section class="botonesModal">
                    <button id='registerBtn' class='btnForm3'>Registrar</button>
                    <button id='cancelarBtn' class='btnForm3'>Cancelar</button>
                </section> 
                <p id="error" class="error">${error}</p> 
            </form>
        </div>
        `);

    }
    bindNuevoProductor(handler) {
        let registerBtn = document.getElementById('registerBtn');
        let cancelarBtn = document.getElementById('cancelarBtn');
        let error = document.getElementById('error');
        let idTecnico = document.getElementById('idTecnico');
        let nombreTecnico = document.getElementById('nombreTecnico');

        idTecnico.addEventListener('invalid', function () {
            this.setCustomValidity('El id es obligatorio');
        })
        idTecnico.addEventListener('change', function () {
            this.setCustomValidity('');
        })
        nombreTecnico.addEventListener('invalid', function () {
            this.setCustomValidity('El nombre es obligatorio');
        })
        nombreTecnico.addEventListener('change', function () {
            this.setCustomValidity('');
        })

        registerBtn.addEventListener('click', (event) => {
            if (idTecnico.value !== "" && nombreTecnico.value !== "") {
                event.preventDefault();
                let tecnico = {};
                tecnico.id = idTecnico.value;
                tecnico.nombre = nombreTecnico.value;
                tecnico.baja = 0;
                handler(tecnico);
            }
        })
        cancelarBtn.addEventListener('click', (event) => {
            event.preventDefault();
            handler();
        })
    }
    showListadoProductores(listadoProductores) {
        this.main.replaceChildren();
        this.main.insertAdjacentHTML('beforeend', `
             <section class="cabeceraEstadisticas"><h3>TÉCNICOS</h3></section>  
            <section id="productoresList">
                <div class="cabeceraInfoProductores">                   
                    <article id="ordenProductorId" class="ordenaTabla" data-orden="id">
                        <span>ID</span>                        
                    </article >         
                    <article id="ordenTecnicoNombre" class="ordenaTabla" data-orden="nombre">
                        <span>NOMBRE</span>                        
                    </article >
                    <article class="ordenaTabla">
                        <span>BAJA</span>
                    </article>
                    <article class="ordenaTabla">
                        <span>OPCIONES</span>
                    </article>
                </div>
                <div class="contenidoInfoProductor" id="contenidoInfoProductor">
                </div>   
            </section>     
        `);

        let contenidoInfoProductor = document.getElementById('contenidoInfoProductor');
        contenidoInfoProductor.replaceChildren();
        //listado de productores
        for (const [clave, productor] of listadoProductores) {
            if (productor.id > 0) {
                contenidoInfoProductor.insertAdjacentHTML('beforeend', `
                    <div class="divisor collapsible lineaProductor" id="productor${productor.id}" data-productor="${productor.id}">                       
                        <article class="enlazable">
                            <input type="text" class="entradaValor2 idProductorClass" value="${productor.id}" readonly  required>
                        </article>
                        <article class="enlazable">
                            <input type="text" class="entradaValor2 nombreProductorClass" value="${productor.nombre}" required>
                        </article>
                         <article class="enlazable">
                            <input class="entradaValor2 checkBaja presuChk" type="checkbox" value="${productor.baja}" />
                        </article>
                         <article id="" class="">         
                            <button class="btnForm4 delProductor" data-productor="${productor.id}">
                                ELIMINAR
                            </button>
                        </article>
                    </div>                   
                `);
            }
        }

        //gestion de color de lineas de la falsa tabla
        let divisores = document.querySelectorAll('.divisor');
        let array = Array.from(divisores);
        array.forEach(function (value, key) {
            if (key % 2 != 0) {
                value.classList.remove('divisor');
                value.classList = 'divisorGris collapsible lineaProductor';
            }
        })

        //gestion de checked's
        let checkedBajas = document.getElementsByClassName('checkBaja');
        for (const element of checkedBajas) {
            if (element.value == 0) {
                element.checked = false;
            } else {
                element.checked = true;
            }
        };

    }
    bindListadoProductores(handler) {

        // gestión de actualización de productores
        let lineasDeProductores = document.getElementsByClassName('lineaProductor');
        let contenidoInfoProductor = document.getElementById('contenidoInfoProductor');
        for (const element of lineasDeProductores) {
            let valoresProductor = element.querySelectorAll('.entradaValor2');
            for (const campo of valoresProductor) {
                let storedId = valoresProductor[0].value;//valor guardado de id
                let storedName = valoresProductor[1].value;//valor guardado de nombre
                let storedBaja = valoresProductor[2].value;//valor guardado de baja
                campo.addEventListener('change', (event) => {

                    // Gestión del valor de los checkboxes cambiados
                    if (campo.classList.contains('checkBaja')) {
                        if (campo.checked) {
                            campo.setAttribute('value', 1);
                        } else {
                            campo.setAttribute('value', 0);
                        }
                    }

                    let productor = {};
                    if (valoresProductor[0].value !== "" && valoresProductor[1].value !== "") {
                        productor.id = valoresProductor[0].value;
                        productor.nombre = valoresProductor[1].value;
                        productor.baja = valoresProductor[2].value;
                        console.log('productor actualizado view', productor);
                        handler(productor);
                    }
                }, true);

                //gestion de campos vacios
                campo.addEventListener('blur', (event) => {
                    campo.style.backgroundColor = 'white';
                    if (campo.value==="") {
                        if(campo.classList.contains('idProductorClass')){
                            campo.value = storedId;
                        }else if(campo.classList.contains('nombreProductorClass')){
                            campo.value = storedName;
                        }
                        
                    }
                },true)
            }
        }



        // gestion para eliminar productores    

        let delProductorCol = document.getElementsByClassName('delProductor');
        for (const delProductorBtn of delProductorCol) {
            delProductorBtn.addEventListener('click', (event) => {
                let productor = {};
                productor.id = parseInt(event.currentTarget.dataset.productor);
                if (productor.update) {
                    delete productor.update;
                }
               
                productor.delProductor = true;
                handler(productor)
            })
        }


    }

    /*******************************  APARTADO DE MODALES y USUARIOS *********************************/

    showLoginModal(handlerLogin, handlerRegistro, mensaje) {
        console.log(mensaje);
        this.header.replaceChildren();

        this.header.insertAdjacentHTML('afterbegin',
            `<!-- MODAL -->
            <div id="myModal" class="modal">
                <!-- Modal content -->
                <div class="modal-content">                                                                                                             
                    <div class="cabeceraFormLogin">                       
                        <h2 id="tituloLogin">Iniciar Sesión</h2>                      
                    </div>
                    <form id="loginForm">
                        <div class="grupoLogin">
                            <label for="username">Usuario:</label>
                            <input class="" id="username" name="username" placeholder="Usuario" required autocomplete="username" autofocus>
                        </div>

                        <div class="grupoLogin">
                            <label for="password">Contraseña:</label>
                            <input class="" type="password" id="password" name="password" placeholder="Password" required autocomplete="password">
                        </div>
                        <div class="botonesModal">
                            <button class="btnForm3" id="aceptarBtn">Entrar</button>
                            <button class="btnForm3" id="newUserBtn">Registrarse</button>
                        </div>
                    </form>
                    <p id="error" class="error">${mensaje}</p>     
                </div>
            </div>`);


        let username = document.getElementById('username');
        let password = document.getElementById('password');
        let error = document.getElementById('error');

        username.addEventListener('invalid', function () {
            this.setCustomValidity('El usuario es obligatorio');
        })
        username.addEventListener('change', function () {

            this.setCustomValidity('');
            if (error.value != "") {
                error.innerHTML = "";
            }
        })
        username.addEventListener('keypress', (event) => {
            if (error.value != "") {
                error.innerHTML = "";
            }
        })
        password.addEventListener('invalid', function () {
            this.setCustomValidity('El password es obligatorio');
        })
        password.addEventListener('change', function () {
            this.setCustomValidity('');
        })

        let modal = document.getElementById("myModal");
        modal.style.display = "block";

        //gestion de botones
        let aceptarBtn = document.getElementById('aceptarBtn');
        aceptarBtn.addEventListener('click', (event) => {

            if (username.value !== "" && password.value !== "") {
                event.preventDefault();

                let user = {};
                user.nombre = username.value;
                user.password = password.value;

                modal.style.display = "none";
                handlerLogin(user);
            }
        })

        let newUserBtn = document.getElementById('newUserBtn');
        newUserBtn.addEventListener('click', (event) => {

            event.preventDefault();


            handlerRegistro();

        })


    }
    showConfirmModal(mensaje, handler) {
        this.header.insertAdjacentHTML('afterbegin',
            `<!-- MODAL -->
                        <div id="myModal" class="modal">
                            <!-- Modal content -->
                            <div class="modal-content">                                                                                      
                                <section class="">
                                    <article class="cerrar">                                    
                                        <span class="close">&times;</span>
                                    </article>    
                                    <article class="mensaje">  
                                        <h7>${mensaje}</h7> 
                                    </article>                                          
                                </section>
                                <section class="botonesModal">
                                    <button id='aceptarBtn' class='btnForm2'>Aceptar</button>
                                </section>                                
                            </div>
                        </div>`);

        let modal = document.getElementById("myModal");
        modal.style.display = "block";
        //gestion de botones
        let aceptarBtn = document.getElementById('aceptarBtn');
        aceptarBtn.addEventListener('click', () => {
            // handler("aceptar");
            modal.style.display = "none";
        })

        //gestion de boton cerrar
        let span = document.getElementsByClassName("close")[0];
        span.onclick = () => {
            modal.style.display = "none";
        }
        //gestion de pulsar fuera del modal
        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
    showConfirmUpdateModal(mensaje) {

        this.header.insertAdjacentHTML('afterbegin',
            `<!-- MODAL -->
                        <div id="myModal" class="modal">
                            <!-- Modal content -->
                            <div class="modal-content">                                                                                      
                                <section class="">
                                    <article class="cerrar">                                    
                                        <span class="close">&times;</span>
                                    </article>    
                                    <article class="mensaje">  
                                        <h7>${mensaje}</h7> 
                                    </article>                                          
                                </section>
                                <section class="botonesModal">
                                    <button id='aceptarBtn' class='btnForm2'>Aceptar</button>
                                </section>                                
                            </div>
                        </div>`);

        let modal = document.getElementById("myModal");
        modal.style.display = "block";
        //gestion de botones
        let aceptarBtn = document.getElementById('aceptarBtn');
        aceptarBtn.addEventListener('click', () => {
            // handler("aceptar");
            modal.style.display = "none";
            // showMainView(refreshInfo);//no necesario
        })

        //gestion de boton cerrar
        let span = document.getElementsByClassName("close")[0];
        span.onclick = () => {
            modal.style.display = "none";
        }
        //gestion de pulsar fuera del modal
        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
    showInfoModalRemoveAviso(handler, idAviso) {
        // let header = document.getElementsByTagName('header')[0];

        this.header.insertAdjacentHTML('afterbegin',
            `<!-- MODAL -->
                    <div id="myModal" class="modal">
                        <!-- Modal content -->
                        <div class="modal-content">                                                                                      
                            <section class="">
                                <article class="cerrar">                                    
                                    <span class="close">&times;</span>
                                </article>    
                                <article class="mensaje">  
                                    <h4>¿Confirmas que deseas eliminar este registro?</h4> 
                                </article>                                          
                            </section>
                            <section class="botonesModal">
                                <button class="btnForm2" id='aceptarBtn'>Aceptar</button>
                                <button class="btnForm2" id='cancelarBtn'>Cancelar</button>
                            </section>                                
                        </div>
                    </div>`);

        let modal = document.getElementById("myModal");
        modal.style.display = "block";
        //gestion de botones
        let aceptarBtn = document.getElementById('aceptarBtn');
        aceptarBtn.addEventListener('click', () => {
            let param = { idAviso: parseInt(idAviso), delete: true }
            handler(param);
            //hacerlo a traves del handler en el controller...
            // deleteAviso(parseInt(idAviso));
            modal.style.display = "none";
            console.log("Aviso " + idAviso + " eliminado.");

            // showConfirmModal("Aviso " + idAviso + " eliminado.");

        })
        let cancelarBtn = document.getElementById('cancelarBtn');
        cancelarBtn.addEventListener('click', () => {
            modal.style.display = "none";
            let param = { cancelar: true };
            handler(param);
            // showAvisosPendientes('fechaDesc');
        })
        //gestion de boton cerrar
        let span = document.getElementsByClassName("close")[0];
        span.onclick = () => {
            modal.style.display = "none";
        }
        //gestion de pulsar fuera del modal
        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
    showModalInfoDetalleAviso(aviso) {
        // console.log('aviso en modal detalle', aviso);
        let header = document.getElementsByTagName('header')[0];
        header.insertAdjacentHTML('afterbegin',
            `<!-- MODAL -->
                <div id="myModal" class="modal">
                    <!-- Modal content -->
                    <div class="modal-content-aviso">
                        <section class="modalAvisoDetalle">
                            <h3>Aviso ID: ${aviso.id}</h3>
                            <article class="cerrar">
                                <span class="close">&times;</span>
                            </article>
                        </section>
                        <section class="editorNuevoAviso">
                            <div class="avisoForm">
                                <div class="grupo">
                                    <label for="">Cliente</label>
                                    <input class="inputModal" value="${aviso.nombreCliente}" readonly>
                                </div>
                                <div class="grupo">
                                    <label for="">Chasis</label>
                                    <input class="inputModal" value="${aviso.chasis}" readonly>
                                </div>
                                <div class="grupo">
                                    <label for="">Inicio</label>
                                    <input class="inputModal" value="${aviso.fechaInicio}" readonly>
                                </div>
                                <div class="grupo">
                                    <label for="">Asignado</label>
                                    <input class="inputModal" value="${aviso.productor}" readonly>
                                </div>
                            </div>
                            <div class="avisoForm ">
                                <div class="grupo">
                                    <label for="">Avería</label>
                                    <textarea class="inputModal" readonly>${aviso.averia}</textarea>
                                </div>
                                <div class="grupo">
                                    <label for="">Comentario</label>
                                    <textarea class="inputModal" readonly>${aviso.resolucion}</textarea>
                                </div>
                                <div class="grupo">
                                    <label for="">Prioridad</label>
                                    <input class="inputModal" value="${aviso.prioridad}" readonly>
                                </div>
                            </div>
                            <div class="avisoForm ">
                                <div class="grupoCheck">
                                    <input type="checkbox" class="checkDetalleAviso" value="${aviso.presupuesto}" id="presuDetallleChk" disabled>
                                    <label for="">Presupuesto</label>
                                </div>
                                <div class="grupoCheck">
                                    <input type="checkbox" class="checkDetalleAviso" value="${aviso.aceptado}" id="aceptadoDetalleChk"disabled>
                                    <label for="">Aceptado</label>
                                </div>
                                <div class="grupoCheck">
                                    <input type="checkbox" class="checkDetalleAviso" value="${aviso.finalizado}" id="terminadoDetalleChk" disabled>
                                    <label for="">Terminado</label>
                                </div>
                            </div>
                            <div class="grupoImagen">
                                <img id="imagenMaquinaDetalle">
                            </div>

                        </section>

                        <section class="botonesModal">
                            <button class="btnForm2" id='aceptarBtn'>Aceptar</button>
                        </section>
                    </div>
                </div> 
            `);

        //cargamos la imagen de la maquina
        let imagenMaquinaDetalle = document.getElementById('imagenMaquinaDetalle');
        imagenMaquinaDetalle.src = aviso.pathImagen;
        imagenMaquinaDetalle.alt = aviso.chasis;


        let colCheckDetalleAviso = document.getElementsByClassName('checkDetalleAviso');
        console.log('colCheckDetalleAviso', colCheckDetalleAviso.length);
        for (const check of colCheckDetalleAviso) {
            if (check.value == 1) {
                check.checked = true;
            } else {
                check.checked = false;
            }
        }

        let modal = document.getElementById("myModal");
        modal.style.display = "block";
        //gestion de botones
        let aceptarBtn = document.getElementById('aceptarBtn');
        aceptarBtn.addEventListener('click', () => {
            modal.style.display = "none";
        })
        //gestion de boton cerrar
        let span = document.getElementsByClassName("close")[0];
        span.onclick = () => {
            modal.style.display = "none";
        }
        //gestion de pulsar fuera del modal
        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
    showInfoModalRemoveMaquina(handler, maquina) {
        console.log('maquina remove modal', maquina);
        let header = document.getElementsByTagName('header')[0];

        header.insertAdjacentHTML('afterbegin',
            `<!-- MODAL -->
                        <div id="myModal" class="modal">
                            <!-- Modal content -->
                            <div class="modal-content">                                                                                      
                                <section class="">
                                    <article class="cerrar">                                    
                                        <span class="close">&times;</span>
                                    </article>    
                                    <article class="mensaje">  
                                        <h4>¿Confirmas que deseas eliminar esta máquina y sus avisos asociados?</h4> 
                                    </article>                                          
                                </section>
                                <section class="botonesModal">
                                    <button id='aceptarBtn' class='btnForm2'>Aceptar</button>
                                    <button id='cancelarBtn' class='btnForm2'>Cancelar</button>
                                </section>                                
                            </div>
                        </div>`);

        let modal = document.getElementById("myModal");
        modal.style.display = "block";

        //gestion de botones modal

        //gestion de boton aceptar y confirmar borrado
        let aceptarBtn = document.getElementById('aceptarBtn');
        aceptarBtn.addEventListener('click', () => {

            handler(maquina.id);
            console.log("Maquina " + maquina.chasis + " eliminada." + maquina.id);
            modal.style.display = 'none';
            this.showConfirmModal("Máquina " + maquina.chasis + " eliminada.");
        })

        //gestion de boton cancelar
        let cancelarBtn = document.getElementById('cancelarBtn');
        cancelarBtn.addEventListener('click', () => {
            modal.style.display = "none";
        })
        //gestion de boton cerrar
        let span = document.getElementsByClassName("close")[0];
        span.onclick = () => {
            modal.style.display = "none";
        }
        //gestion de pulsar fuera del modal
        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
    showNuevoUsuarioModal(handler, mensaje) {
        this.header.replaceChildren();
        this.header.insertAdjacentHTML('afterbegin',
            `<!-- MODAL -->
                <div id="myModal" class="modal">
                    <!-- Modal content -->
                    <div class="modal-content">                                                                                      
                        <section class="cabeceraFormLogin">
                           
                                <h2 id="tituloLogin">Nuevo Registro</h2>
                            
                          <!--   <article class="cerrar">                                    
                                <span class="close">&times;</span>
                            </article>     -->
                                                                    
                        </section>
                    
                        <form id="registerModalForm">
                            <div class="grupoLogin">
                                <label for="username">Usuario:</label>
                                <input class="" id="username" name="username" placeholder="Usuario" required>
                            </div>

                            <div class="grupoLogin">
                                <label for="password">Contraseña:</label>
                                <input class="" type="password" id="password" name="password" placeholder="Password" required>
                            </div>
                                <div class="grupoLogin">
                                <label for="confirmPassword">Confirmar:</label>
                                <input class="" type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" required>
                            </div>
                       
                            <section class="botonesModal">
                                <button id='registerBtn' class='btnForm3'>Registrar</button>
                                <button id='cancelarBtn' class='btnForm3'>Cancelar</button>
                            </section> 
                            <p id="error" class="error">${mensaje}</p> 
                        </form>
                    </div>
                </div>`);

        let modal = document.getElementById("myModal");
        modal.style.display = "block";

        let username = document.getElementById('username');
        let password = document.getElementById('password');
        let confirmPassword = document.getElementById('confirmPassword');
        let error = document.getElementById('error');

        username.addEventListener('invalid', function () {
            this.setCustomValidity('El usuario es obligatorio');
        })
        username.addEventListener('change', function () {
            this.setCustomValidity('');
            if (error.value != "") {
                error.innerHTML = "";
            }
        })
        username.addEventListener('keypress', function () {
            if (error.value != "") {
                error.innerHTML = "";
            }
        })


        password.addEventListener('invalid', function () {
            this.setCustomValidity('El password es obligatorio');

        })
        password.addEventListener('change', function () {
            this.setCustomValidity('');
            if (error.value != "") {
                error.innerHTML = "";
            }
        })

        confirmPassword.addEventListener('invalid', function () {
            this.setCustomValidity('El password es obligatorio');
        })
        confirmPassword.addEventListener('change', function () {
            this.setCustomValidity('');
            if (error.value != "") {
                error.innerHTML = "";
            }
        })

        //gestion del boton registrar
        let registerBtn = document.getElementById('registerBtn');
        registerBtn.addEventListener('click', (event) => {
            console.log('pulsado boton registrar');
            if (username.value !== "" && password.value !== "" && confirmPassword.value !== "") {
                event.preventDefault();
                let pattern = /^([a-zA-Z0-9]){8,10}$/;
                let user = {};

                if (password.value !== confirmPassword.value) {
                    // confirmPassword.setAttribute('placeholder', 'Las contraseñas no coinciden');
                    error.innerHTML = 'Las contraseñas no coinciden';
                } else {
                    if (pattern.test(username.value) && pattern.test(password.value) &&
                        pattern.test(confirmPassword.value)) {
                        user.username = username.value;
                        user.pass = password.value;
                        user.modal = true;
                        modal.style.display = "none";
                        handler(user);
                    } else {
                        error.innerHTML = "Los campos tienen que tener entre 8 y 10 caracteres";
                    }
                }
            }
        })

        //gestion de boton cancelar
        let cancelarBtn = document.getElementById('cancelarBtn');
        cancelarBtn.addEventListener('click', (event) => {
            event.preventDefault();
            // modal.style.display = "none";
            handler();
        })

        //gestion de pulsar fuera del modal
        window.onclick = (event) => {
            if (event.target == modal) {
                // modal.style.display = "none";
                handler();
            }
        }

    }
    showChangePass() {
        this.main.replaceChildren();
        this.main.insertAdjacentHTML('afterbegin', `
             <div id="" class="changePassForm">
                <section class="cabeceraForm">                
                    <h3 id="tituloLogin">Reset Password</h3>                
                </section>
                <form id="">
                    <div class="grupoLogin">
                        <label for="password">Contraseña:</label>
                        <input class="" type="password" id="password" name="password" placeholder="Password" required>
                    </div>
                    <div class="grupoLogin">
                        <label for="confirmPassword">Confirm:</label>
                        <input class="" type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password"
                        required>
                    </div>

                    <section class="botonesModal">
                        <button id='changePassBtn' class='btnForm3'>Cambiar</button>
                        <button id='cancelarBtn' class='btnForm3'>Cancelar</button>
                    </section>
                    <p id="error" class="error"></p>
                </form>
            </div>`);
    }
    bindChangePass(handler, id) {
        let password = document.getElementById('password');
        let confirmPassword = document.getElementById('confirmPassword');
        let error = document.getElementById('error');
        password.addEventListener('invalid', function () {
            this.setCustomValidity('El password es obligatorio');

        })
        password.addEventListener('change', function () {
            this.setCustomValidity('');
            if (error.value != "") {
                error.innerHTML = "";
            }
        })

        confirmPassword.addEventListener('invalid', function () {
            this.setCustomValidity('El password es obligatorio');
        })
        confirmPassword.addEventListener('change', function () {
            this.setCustomValidity('');
            if (error.value != "") {
                error.innerHTML = "";
            }
        })

        //gestion del boton registrar
        let modal = document.getElementById("myModal");

        let changePassBtn = document.getElementById('changePassBtn');
        changePassBtn.addEventListener('click', (event) => {
            console.log('pulsado boton registrar');
            if (password.value !== "" && confirmPassword.value !== "") {
                event.preventDefault();
                let pattern = /^([a-zA-Z0-9]){8,10}$/;
                let user = {};
                user.id = parseInt(id);
                if (password.value !== confirmPassword.value) {
                    // confirmPassword.setAttribute('placeholder', 'Las contraseñas no coinciden');
                    error.innerHTML = 'Las contraseñas no coinciden';
                } else {
                    if (pattern.test(password.value) && pattern.test(confirmPassword.value)) {
                        user.pass = password.value;
                        handler(user);
                        if (modal) {
                            modal.style.display = "none";
                        }
                    } else {
                        error.innerHTML = "Los campos tienen que tener entre 8 y 10 caracteres";
                    }
                }
            }
        });

        //gestion de boton cancelar
        let cancelarBtn = document.getElementById('cancelarBtn');
        cancelarBtn.addEventListener('click', (event) => {
            event.preventDefault();
            console.log('Pulsado boton cancelar');
            let user = {};
            user.cancelar = true;
            handler(user);
            if (modal) {
                modal.style.display = "none";
            }
        })

    }
    showChangePassModal(mensaje) {
        this.header.insertAdjacentHTML('afterbegin',
            `<!-- MODAL -->
            <div id="myModal" class="modal">
                <!-- Modal content -->
                <div class="modal-content">                                                                                                             
                   
                        <section class="cabeceraForm">                
                            <h3 id="tituloLogin">Reset Password</h3>                
                        </section>
                        <form id="">
                            <div class="grupoLogin">
                                <label for="password">Contraseña:</label>
                                <input class="" type="password" id="password" name="password" placeholder="Password" required>
                            </div>
                            <div class="grupoLogin">
                                <label for="confirmPassword">Confirmar:</label>
                                <input class="" type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password"
                                required>
                            </div>

                            <section class="botonesModal">
                                <button id='changePassBtn' class='btnForm3'>Cambiar</button>
                                <button id='cancelarBtn' class='btnForm3'>Cancelar</button>
                            </section>
                            <p id="error" class="error"></p>
                        </form>
                    </div>
                    <p id="error" class="error"></p>     
                
            </div>`);
        let modal = document.getElementById("myModal");
        modal.style.display = "block";

        //gestion de pulsar fuera del modal
        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
    showNuevoUsuario() {
        this.main.replaceChildren();
        this.main.insertAdjacentHTML('afterbegin', `
        <div class='formularioAltaUsuario'>
            <section class="cabeceraForm">
                <h3>Nuevo Usuario</h3>
            </section>
            <form role="form" method="POST">
                 <div class="grupoLogin">
                    <label for="username">Usuario:</label>
                    <input class="" id="username" name="username" placeholder="Usuario" required>
                </div>

                <div class="grupoLogin">
                    <label for="password">Contraseña:</label>
                    <input class="" type="password" id="password" name="password" placeholder="Password" required>
                </div>
                <div class="grupoLogin">
                    <label for="confirmPassword">Confirmar:</label>
                    <input class="" type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" required>
                </div>
                
                <div class="grupoLogin">
                    <label for="rol">Rol:</label>
                    <select class="selectUsuario" id="rol" name="rol" required>
                        <option value="admin">Admin</option>
                        <option value="user" selected>User</option>
                    </select>                    
                </div>
            
                <section class="botonesModal">
                    <button id='registerBtn' class='btnForm3'>Registrar</button>
                    <button id='cancelarBtn' class='btnForm3'>Cancelar</button>
                </section> 
                <p id="error" class="error"></p> 
            </form>
        </div>
        `);
    }
    bindNuevoUsuario(handler, mensaje) {
        let username = document.getElementById('username');
        let password = document.getElementById('password');
        let confirmPassword = document.getElementById('confirmPassword');
        let rol = document.getElementById('rol');

        let error = document.getElementById('error');

        if (mensaje) {
            error.innerHTML = mensaje;
        }

        username.addEventListener('invalid', function () {
            this.setCustomValidity('El usuario es obligatorio');
        })
        username.addEventListener('change', function () {
            this.setCustomValidity('');
            if (error.value != "") {
                error.innerHTML = "";
            }
        })
        username.addEventListener('keypress', function () {
            if (error.value != "") {
                error.innerHTML = "";
            }
        })


        password.addEventListener('invalid', function () {
            this.setCustomValidity('El password es obligatorio');

        })
        password.addEventListener('change', function () {
            this.setCustomValidity('');
            if (error.value != "") {
                error.innerHTML = "";
            }
        })

        confirmPassword.addEventListener('invalid', function () {
            this.setCustomValidity('El password es obligatorio');
        })
        confirmPassword.addEventListener('change', function () {
            this.setCustomValidity('');
            if (error.value != "") {
                error.innerHTML = "";
            }
        })

        //gestion del boton registrar
        let registerBtn = document.getElementById('registerBtn');
        registerBtn.addEventListener('click', (event) => {
            console.log('pulsado boton registrar');
            if (username.value !== "" && password.value !== "" && confirmPassword.value !== "") {
                event.preventDefault();
                let pattern = /^([a-zA-Z0-9]){8,10}$/;
                let user = {};

                if (password.value !== confirmPassword.value) {
                    error.innerHTML = 'Las contraseñas no coinciden';
                } else {
                    if (pattern.test(username.value) && pattern.test(password.value) &&
                        pattern.test(confirmPassword.value)) {
                        user.username = username.value;
                        user.pass = password.value;
                        user.form = true;
                        if (rol) {
                            user.rol = rol.value;
                        }
                        handler(user);
                    } else {
                        error.innerHTML = "Los campos tienen que tener entre 8 y 10 caracteres";
                    }
                }
            }
        })

        //gestion de boton cancelar
        let cancelarBtn = document.getElementById('cancelarBtn');
        cancelarBtn.addEventListener('click', (event) => {
            event.preventDefault();
            // modal.style.display = "none";
            handler();
        })
    }
    showListadoUsuarios(listadoUsuarios) {
        // console.log('param', param);
        // console.log('listadoUsuarios', listadoUsuarios);

        this.main.replaceChildren();
        this.main.insertAdjacentHTML('beforeend', `
             <section class="cabeceraEstadisticas"><h3>USUARIOS</h3></section>  
            <section id="usuariosList">
                <div class="cabeceraInfoUsuarios">                   
                    <article id="ordenUsuarioId" class="ordenaTabla" data-orden="id">
                        <span>ID</span>                        
                    </article >         
                    <article id="ordenUsuarioNombre" class="ordenaTabla" data-orden="nobmre">
                        <span>NOMBRE</span>                        
                    </article >
                    <article id="ordenUsuarioRol" class="ordenaTabla" data-orden="rol">
                        <span>ROL</span>
                    </article>
                    <article class="">
                        <span>BAJA</span>
                    </article>
                    <article class="colDoble">
                        <span>OPCIONES</span>
                    </article>
                </div>
                <div class="contenidoInfoUsuario" id="contenidoInfoUsuario">
                </div>   
            </section>     
        `);

        let contenidoInfoUsuario = document.getElementById('contenidoInfoUsuario');
        contenidoInfoUsuario.replaceChildren();

        for (const [clave, usuario] of listadoUsuarios) {
            // console.log('usuario', usuario);
            contenidoInfoUsuario.insertAdjacentHTML('beforeend', `
                    <div class="divisor collapsible lineaUsuario" id="usuario${usuario.id}" data-usuario="${usuario.id}">                       
                        <article class="">
                            <span>${usuario.id}</span>
                        </article>
                        <article class="enlazable">
                            <input type="text" class="entradaValor2 usernameValor" value="${usuario.username}" required>
                        </article>
                        <article class="enlazable">
                            <select class="entradaValor2 editable selectUsuario" data-idcliente="${usuario.id}">  
                                <option value="${usuario.rol}"class="table">${usuario.rol}</option>                     
                            </select>
                        </article>
                         <article class="enlazable">
                            <input class="entradaValor2 checkBaja presuChk" type="checkbox"
                            value="${usuario.baja}"/>
                        </article>
                         <article id="" class="">                                               
                            <button class="btnForm4 resetPass" data-usuario="${usuario.id}">
                                PASSWORD
                            </button>
                        </article>
                         <article id="" class="">  
                            <button class="btnForm4 delUser" data-usuario="${usuario.id}">
                                ELIMINAR
                            </button>
                        </article>
                    </div>
                   
                `)

        }
        //gestion de color de lineas de la falsa tabla
        let divisores = document.querySelectorAll('.divisor');
        let array = Array.from(divisores);
        array.forEach(function (value, key) {
            if (key % 2 != 0) {
                value.classList.remove('divisor');
                value.classList = 'divisorGris collapsible lineaUsuario';
            }
        })

        //gestion de checked's
        let checkedBajas = document.getElementsByClassName('checkBaja');
        for (const element of checkedBajas) {
            if (element.value == 0) {
                element.checked = false;
            } else {
                element.checked = true;
            }
        };


    }
    bindListadoUsuarios(handler, roles) {

        // Elimina el foco de los elementos activos
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                document.activeElement.blur();
                console.log('pulsada la tecla escape');
            }
        })
        // cargamos las opciones de rol en un ternario
        let selectUsuario = document.getElementsByClassName('selectUsuario');
        for (const campo of selectUsuario) {
            let storedRol = campo.value;
            campo.replaceChildren();
            roles.forEach(rol => {
                storedRol === rol ?
                    campo.insertAdjacentHTML('beforeend', `<option value="${rol}"class="table" selected>${rol}</option>`) :
                    campo.insertAdjacentHTML('beforeend', `<option value="${rol}"class="table" >${rol}</option>`);
            })
        }

        // gestión de actualización del nombre, el rol y la baja del usuario
        let lineasDeUsuario = document.getElementsByClassName('lineaUsuario');
        let contenidoInfoUsuario = document.getElementById('contenidoInfoUsuario');

        for (const element of lineasDeUsuario) {
            let valoresUsuario = element.querySelectorAll('.entradaValor2');
            for (const campo of valoresUsuario) {
                let storedUsername = valoresUsuario[0].value;//valor guardado de username
                campo.addEventListener('change', (event) => {

                    // Gestión del valor de los checkboxes cambiados
                    if (campo.classList.contains('checkBaja')) {
                        if (campo.checked) {
                            campo.setAttribute('value', 1);

                        } else {
                            campo.setAttribute('value', 0);

                        }
                    }
                    // gestion de campo de username no puede estar vacio
                    if (campo.tagName === 'INPUT') {
                        campo.addEventListener('blur', function () {
                            if (campo.value.length === 0) {
                                this.setCustomValidity('El nombre es obligatorio');
                                campo.value = storedUsername;
                            } else {
                                this.setCustomValidity('');
                            }
                        });
                    }
                    //gestion de rol de usuario


                    let usuario = {};
                    usuario.id = parseInt(element.dataset.usuario);
                    if (campo.classList.contains('usernameValor')) {
                        usuario.username = campo.value;
                    }
                    if (campo.classList.contains('checkBaja')) {
                        usuario.baja = campo.value;
                    }
                    if (campo.tagName === 'SELECT') {
                        usuario.rol = campo.value;
                    }
                    usuario.update = true;

                    console.log('usuario', usuario)
                    handler(usuario);

                }, true);
            }
        }

        // gestion para reset de password
        let resetPassCol = document.getElementsByClassName('resetPass');
        for (const resetPassBtn of resetPassCol) {
            resetPassBtn.addEventListener('click', (event) => {
                let usuario = {};
                usuario.id = parseInt(event.currentTarget.dataset.usuario);
                if (usuario.update) {
                    delete usuario.update;
                }
                usuario.resetPass = true;
                handler(usuario)
            })
        }


        // gestion para eliminar perfil de usuario
        let delUserCol = document.getElementsByClassName('delUser');
        for (const delUserBtn of delUserCol) {
            delUserBtn.addEventListener('click', (event) => {
                let usuario = {};
                usuario.id = parseInt(event.currentTarget.dataset.usuario);
                if (usuario.update) {
                    delete usuario.update;
                }
                if (usuario.resetPass) {
                    delete usuario.resetPass;
                }
                usuario.delUser = true;
                handler(usuario)
            })
        }




    }
    showInfoModalRemoveUsuario(handler, usuario) {
        console.log('infomodalremoveusuario', usuario)

        this.header.insertAdjacentHTML('afterbegin',
            `<!-- MODAL -->
                        <div id="myModal" class="modal">
                            <!-- Modal content -->
                            <div class="modal-content">                                                                                      
                                <section class="">
                                    <article class="cerrar">                                    
                                        <span class="close">&times;</span>
                                    </article>    
                                    <article class="mensaje">  
                                        <h4>¿Confirmas que deseas eliminar el perfil de ${usuario.username}?</h4> 
                                    </article>                                          
                                </section>
                                <section class="botonesModal">
                                    <button id='aceptarBtn' class='btnForm2'>Aceptar</button>
                                    <button id='cancelarBtn' class='btnForm2'>Cancelar</button>
                                </section>                                
                            </div>
                        </div>`);

        let modal = document.getElementById("myModal");
        modal.style.display = "block";


        //gestion de boton aceptar y confirmar borrado
        let aceptarBtn = document.getElementById('aceptarBtn');
        aceptarBtn.addEventListener('click', () => {

            handler(usuario);
            modal.style.display = 'none';
        })

        //gestion de boton cancelar
        let cancelarBtn = document.getElementById('cancelarBtn');
        cancelarBtn.addEventListener('click', () => {
            modal.style.display = "none";
        })
        //gestion de boton cerrar
        let span = document.getElementsByClassName("close")[0];
        span.onclick = () => {
            modal.style.display = "none";
        }
        //gestion de pulsar fuera del modal
        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
    showInfoModalRemoveProductor(handler, idProductor) {
        console.log('productor remove modal', idProductor);
        let header = document.getElementsByTagName('header')[0];

        header.insertAdjacentHTML('afterbegin',
            `<!-- MODAL -->
                        <div id="myModal" class="modal">
                            <!-- Modal content -->
                            <div class="modal-content">                                                                                      
                                <section class="">
                                    <article class="cerrar">                                    
                                        <span class="close">&times;</span>
                                    </article>    
                                    <article class="mensaje">  
                                        <h6>¿Confirmas que deseas eliminar este productor?</h6> 
                                    </article>                                          
                                </section>
                                <section class="botonesModal">
                                    <button id='aceptarBtn' class='btnForm2'>Aceptar</button>
                                    <button id='cancelarBtn' class='btnForm2'>Cancelar</button>
                                </section>                                
                            </div>
                        </div>`);

        let modal = document.getElementById("myModal");
        modal.style.display = "block";

        //gestion de botones modal

        //gestion de boton aceptar y confirmar borrado
        let aceptarBtn = document.getElementById('aceptarBtn');
        aceptarBtn.addEventListener('click', () => {

            handler(idProductor);
            console.log("Productor " + idProductor + " eliminada." );
            modal.style.display = 'none';
            this.showConfirmModal("Productor " + idProductor + " eliminado.");
        })

        //gestion de boton cancelar
        let cancelarBtn = document.getElementById('cancelarBtn');
        cancelarBtn.addEventListener('click', () => {
            modal.style.display = "none";
        })
        //gestion de boton cerrar
        let span = document.getElementsByClassName("close")[0];
        span.onclick = () => {
            modal.style.display = "none";
        }
        //gestion de pulsar fuera del modal
        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }




    /************************************* VISTAS PRINCIPALES *******************************/

    showMainView(info, mapa) {
        // console.log(info);
        // console.log(mapa);

        this.main.replaceChildren();
        this.main.insertAdjacentHTML('afterbegin', `
             <section class="cabeceraEstadisticas"><h3>INICIO</h3></section>  
             
            <div class="infoView">
                <div class="grupoInfo">
                    <label for="numeroClientes">Clientes</label>
                    <input class="entradaValor2" type="text" name="numeroClientes" id="numeroClientes"
                        value="${info.nClientes}" readonly/>
                </div>                                                    
                <div class="grupoInfo">
                    <label for="numeroMaquinas">Máquinas</label>
                    <input class="entradaValor2" type="text" name="numeroMaquinas" id="numeroMaquinas"
                        value="${info.nMaquinas}" readonly/>
                </div>            
                <div class="grupoInfo">
                    <label for="numeroAvisos">Avisos</label>
                    <input class="entradaValor2" type="text" name="numeroAvisos" id="numeroAvisos"
                        value="${info.nAvisos}" readonly/>
                </div>
                <div class="grupoInfo">
                    <label for="numeroAvisos">Avisos Pendientes</label>
                    <input class="entradaValor2" type="text" name="numeroAvisos" id="numeroAvisos"
                        value="${info.nAvisosPendientes}" readonly/>
                </div>
                <div class="grupoInfo">
                    <label for="numeroProductores">Productores</label>
                    <input class="entradaValor2" type="text" name="numeroProductores" id="numeroProductores"
                        value="${info.nProductores}" readonly/>
                </div>
                <div class="grupoInfo">
                    <label for="numeroUsuarios">Usuarios</label>
                    <input class="entradaValor2" type="text" name="numeroUsuarios" id="numeroUsuarios"
                        value="${info.nUsuarios}" readonly/>
                </div>
            </div>   
            <section id="estadisticas"></section>                   
        `);

        if (mapa) {

            this.utilChart(mapa.mes, mapa.year);
            this.utilChart(mapa.tecnico, mapa.year)
            this.utilChart(mapa.FiveYears, "Ultimos 5 años")

        }
    }
    showClientesView(mapa) {
        this.main.replaceChildren();
        this.main.insertAdjacentHTML('afterbegin', `
           <section class="cabeceraEstadisticas"><h3>APARTADO DE CLIENTES</h3></section>  
             <section id="estadisticas">                 
        `);
        this.utilChart(mapa.maquinas, "TOP PARQUE CLIENTES");
        this.utilChart(mapa.avisos, "TOP AVISOS CLIENTES")
    }
    showMaquinasView(mapa) {
        this.main.replaceChildren();
        this.main.insertAdjacentHTML('afterbegin', `
           <section class="cabeceraEstadisticas"><h3>APARTADO DE MAQUINAS</h3></section>  
             <section id="estadisticas">                 
        `);
        this.utilChart(mapa.avisos, "TOP ASISTENCIAS A MAQUINAS");
        this.utilChart(mapa.modelos, "TOP MODELOS")
    }
    showAvisosView(mapa) {
        this.main.replaceChildren();
        this.main.insertAdjacentHTML('afterbegin', `
           <section class="cabeceraEstadisticas"><h3>APARTADO DE AVISOS</h3></section>  
             <section id="estadisticas">                 
        `);
        this.utilChart(mapa.mes, "Vista por meses");
        this.utilChart(mapa.tecnico, "Carga de Trabajo")
        this.utilChart(mapa.FiveYears, "Ultimos 5 años")
    }
    showProductoresView(mapa) {
        this.main.replaceChildren();
        this.main.insertAdjacentHTML('afterbegin', `
           <section class="cabeceraEstadisticas"><h3>APARTADO DE PRODUCTORES</h3></section>
                <section id="estadisticas">
        `);
        this.utilChart(mapa.cargaDeTrabajo, "CARGA DE TRABAJO");
        this.utilChart(mapa.topProductores, "TOP PRODUCTORES");
    }
    utilChart(mapa, label) {
        if (mapa) {
            let estadisticas = document.getElementById('estadisticas');
            if (estadisticas) {
                let stadCont = document.createElement('article');
                stadCont.classList.add('estadistica');
                estadisticas.appendChild(stadCont);

                let labels = Object.keys(mapa);
                let values = Object.values(mapa);
                let canvas = document.createElement('canvas');
                stadCont.appendChild(canvas);
                let ctx = canvas.getContext('2d');
                let myBarChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: '', // Deja vacío para evitar el label dentro del gráfico
                            data: values,
                            backgroundColor: ['maroon'],
                            borderWidth: 1,
                            barThickness: 20
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: label,
                                padding: {
                                    top: 10,
                                    bottom: 30
                                },
                                font: {
                                    size: 16
                                },
                                color: 'maroon', // Cambia el color del texto del título
                                backgroundColor: 'white' // Elimina el color de fondo del título

                            },
                            datalabels: {
                                align: 'end',
                                anchor: 'end',
                                color: 'grey',
                                formatter: function (value) {
                                    return value;
                                },
                                font: {
                                    weight: 'bold'
                                }
                            }
                        }
                    },
                    plugins: [ChartDataLabels]
                });
            } else {
                console.error('El elemento con id "estadisticas" no existe.');
            }
        }
    }
    showWhiteView() {
        this.header.replaceChildren();
        this.main.replaceChildren();
    }
    showAcercaView(){
        this.main.replaceChildren();
        this.main.insertAdjacentHTML('afterbegin', `

        <section class="cabeceraEstadisticas"><h3>ACERCA DE</h3></section>
        <div class="infoViewAcerca">
            <div class="grupoInfo">
                <label for="">Versión</label>
                <input class="entradaValor2" type="text" name="" id=""
                    value="1.0" readonly/>
            </div>                                                    
            <div class="grupoInfo">
                <label for="">Fecha</label>
                <input class="entradaValor2" type="text" name="" id=""
                    value="09 de marzo de 2025" readonly/>
            </div>            
            <div class="grupoInfo">
                <label for="">Autor</label>
                <input class="entradaValor2" type="text" name="" id=""
                    value="Antonio Villajos Brunner" readonly/>
            </div>
            <div class="grupoInfo">
                <label for="">Contacto</label>
                <input class="entradaValor2" type="text" name="" id=""
                    value="antonio.villajos.brunner@gmail.com" readonly/>
            </div>
            <div class="grupoImagen">
            <img src="./images/acerca.png" alt="acerca" class="">
            </div>
               

        </div>
        `);

    }

}//fin de clase

export default La2024View;