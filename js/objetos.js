
class Maquina {
    #id; #modelo; #chasis; #cliente; #fechaCreacion; #alquiler; #contrato; #reaco; #baja; #notas; #numero;
    constructor() {
    }

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value;
    }
    get modelo() {
        return this.#modelo;
    }
    set modelo(value) {
        this.#modelo = value;
    }
    get chasis() {
        return this.#chasis;
    }
    set chasis(value) {
        this.#chasis = value;
    }
    get cliente() {
        return this.#cliente;
    }
    set cliente(value) {
        this.#cliente = value;
    }
    get fechaCreacion() {
        return this.#fechaCreacion;
    }
    set fechaCreacion(value) {
        this.#fechaCreacion = value;
    }
    get alquiler() {
        return this.#alquiler;
    }
    set alquiler(value) {
        this.#alquiler = value;
    }
    get contrato() {
        return this.#contrato;;
    }
    set contrato(value) {
        this.#contrato = value;
    }
    get reaco() {
        return this.#reaco;
    }
    set reaco(value) {
        this.#reaco = value;
    }
    get baja() {
        return this.#baja;
    }
    set baja(value) {
        this.#baja = value;
    }
    get notas() {
        return this.#notas;
    }
    set notas(value) {
        this.#notas = value;
    }
    get numero() {
        return this.#numero;
    }
    set numero(value) {
        this.#numero = value;
    }
}
class Cliente {

    #id; #nombre; #direccion; #poblacion; #provincia; #contacto; #telefono; #email; #fechaCreacion; #bajaCliente;

    constructor() {
    }

    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(value) {
        this.#nombre = value;
    }

    get direccion() {
        return this.#direccion;
    }

    set direccion(value) {
        this.#direccion = value;
    }

    get poblacion() {
        return this.#poblacion;
    }

    set poblacion(value) {
        this.#poblacion = value;
    }

    get provincia() {
        return this.#provincia;
    }

    set provincia(value) {
        this.#provincia = value;
    }

    get contacto() {
        return this.#contacto;
    }

    set contacto(value) {
        this.#contacto = value;
    }
    get telefono() {
        return this.#telefono;
    }

    set telefono(value) {
        this.#telefono = value;
    }
    get email() {
        return this.#email;
    }

    set email(value) {
        this.#email = value;
    }

    get fechaCreacion() {
        return this.#fechaCreacion;
    }

    set fechaCreacion(value) {
        this.#fechaCreacion = value;
    }
    get bajaCliente() {
        return this.#bajaCliente;
    }

    set bajaCliente(value) {
        this.#bajaCliente = value;
    }
}
class Aviso {
    #id; #idCliente; #chasis; #averia; #productor; #finalizado; #fechaInicio; #fechaFin; #resolucion; #presupuesto; #aceptado; #prioridad;
    constructor() { }
    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value;
    }
    get idCliente() {
        return this.#idCliente;
    }
    set idCliente(value) {
        this.#idCliente = value;
    }
    get chasis() {
        return this.#chasis;
    }
    set chasis(value) {
        this.#chasis = value;
    }
    get averia() {
        return this.#averia;
    }
    set averia(value) {
        this.#averia = value;
    }
    get productor() {
        return this.#productor;
    }
    set productor(value) {
        this.#productor = value;
    }
    get finalizado() {
        return this.#finalizado;
    }
    set finalizado(value) {
        this.#finalizado = value;
    }
    get fechaInicio() {
        return this.#fechaInicio;
    }
    set fechaInicio(value) {
        this.#fechaInicio = value;
    }
    get fechaFin() {
        return this.#fechaFin;
    }
    set fechaFin(value) {
        this.#fechaFin = value;
    }
    get resolucion() {
        return this.#resolucion;
    }
    set resolucion(value) {
        this.#resolucion = value;
    }
    get presupuesto() {
        return this.#presupuesto;
    }
    set presupuesto(value) {
        this.#presupuesto = value;
    }
    get aceptado() {
        return this.#aceptado;
    }
    set aceptado(value) {
        this.#aceptado = value;
    }
    get prioridad() {
        return this.#prioridad;
    }
    set prioridad(value) {
        this.#prioridad = value;
    }
}
class Productor {
    #id; #nombre; #baja;
    constructor() {
    }

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value;
    }
    get nombre() {
        return this.#nombre;
    }
    set nombre(value) {
        this.#nombre = value;
    }
    get baja() {
        return this.#baja;
    }
    set baja(value) {
        this.#baja = value;
    }
}
class Usuario {
    #id; #username; #pass; #rol; #baja;
    constructor(){
    }
    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value;
    }
    get username() {
        return this.#username;
    }
    set username(value) {
        this.#username = value;
    }
    get pass() {
        return this.#pass;
    }
    set pass(value) {
        this.#pass = value;
    }
    get rol() {
        return this.#rol;
    }
    set rol(value) {
        this.#rol = value;
    }
    get baja() {
        return this.#baja;
    }
    set baja(value) {
        this.#baja = value;
    }
}

/**
 * exportamos los objetos 
 */
export { Cliente, Maquina, Aviso, Productor, Usuario };