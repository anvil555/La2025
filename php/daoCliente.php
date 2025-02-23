<?php
require_once('libreriaPDO.php');
require_once('objetos.php');

class Daocliente extends DB
{
    public $listado = [];
    public $cadena = [];
    public $param = [];
    public $customer;

    public function __construct()
    {
        parent::__construct();
    }

    function addCliente($cliente)
    {
        $nombre = $cliente->__get('nombre');
        $direccion = $cliente->__get('direccion');
        $poblacion = $cliente->__get('poblacion');
        $provincia = $cliente->__get('provincia');
        $contacto = $cliente->__get('contacto');
        $telefono = $cliente->__get('telefono');
        $mail1 = $cliente->__get('mail1');
        $fecha = $cliente->__get('fechaCreacion');
        $baja = $cliente->__get('bajaCliente');

        $sql = "INSERT INTO clientes (nombre,direccion,poblacion,provincia,contacto,telefono,email,fechacreacion,bajacliente) 
        VALUES ('$nombre','$direccion','$poblacion','$provincia','$contacto','$telefono','$mail1','$fecha',$baja);";
        $this->ConsultaSimple($sql, $this->param);
    }
    function compruebacliente($nombre)
    {
        $control = false;
        $sql = "SELECT * FROM `clientes` where nombre = '$nombre';";
        $this->Consulta($sql, $this->param);
        if ($this->datos) {
            $control = true;
        }
        return $control;
    }
    function getIdCliente($nombre)
    {
        $id = 0;
        $sql = "SELECT * FROM `clientes` where nombre = '$nombre';";
        $this->Consulta($sql, $this->param);
        if ($this->datos) {
            foreach ($this->datos as $cliente) { //recorremos los datos obtenidos.
                $id = $cliente['id'];
            }
        }
        return $id;
    }
    function getCuentaClientes()
    {
        $cuenta = 0;
        $sql = "SELECT count(*) as 'Cuenta' FROM `clientes`;";
        $this->Consulta($sql, $this->param);
        if ($this->datos && is_array($this->datos)) {
            // print_r($this->datos);
            $cuenta = $this->datos[0]['Cuenta'];
        }
        return $this->datos[0]['Cuenta'];
    }
    function getListadoClientes()
    {
        // $this->listado = []; //vaciamos el array.
        $sql = "SELECT * FROM clientes ORDER BY nombre"; //creamos la instruccion SQL
        $this->Consulta($sql, $this->param); //le pasamos los datos a la funcion de la clase padre
        if ($this->datos) {
            foreach ($this->datos as $cliente) { //recorremos los datos obtenidos.
                $id = $cliente['id'];
                $nombre = $cliente['nombre'];
                $direccion = $cliente['direccion'];
                $poblacion = $cliente['poblacion'];
                $provincia = $cliente['provincia'];
                $contacto = $cliente['contacto'];
                $telefono = $cliente['telefono'];
                $email = $cliente['email'];
                $fechaCreacion = $cliente['fechacreacion'];
                $bajaCliente = $cliente['bajacliente'];

                $this->customer = new Cliente();

                $this->customer->__set('id', $id);
                $this->customer->__set('nombre', $nombre);
                $this->customer->__set('direccion', $direccion);
                $this->customer->__set('poblacion', $poblacion);
                $this->customer->__set('provincia', $provincia);
                $this->customer->__set('contacto', $contacto);
                $this->customer->__set('telefono', $telefono);
                $this->customer->__set('email', $email);
                $this->customer->__set('fechaCreacion', $fechaCreacion);
                $this->customer->__set('bajaCliente', $bajaCliente);

                $this->listado[] = $this->customer;
            }
            // return $this->listado;
        }
    }
    function getCliente($id)
    {
        $control = false;
        $sql = "SELECT * FROM `clientes` where id = '$id';";
        $this->Consulta($sql, $this->param);
        if ($this->datos) {
            foreach ($this->datos as $cliente) { //recorremos los datos obtenidos.
                $id = $cliente['id'];
                $nombre = $cliente['nombre'];
                $direccion = $cliente['direccion'];
                $poblacion = $cliente['poblacion'];
                $provincia = $cliente['provincia'];
                $contacto = $cliente['contacto'];
                $telefono = $cliente['telefono'];
                $email = $cliente['email'];
                $fecha = $cliente['fechacreacion'];
                $baja = $cliente['bajacliente'];

                $this->customer = new Cliente();

                $this->customer->__set('id', $id);
                $this->customer->__set('nombre', $nombre);
                $this->customer->__set('direccion', $direccion);
                $this->customer->__set('poblacion', $poblacion);
                $this->customer->__set('provincia', $provincia);
                $this->customer->__set('contacto', $contacto);
                $this->customer->__set('telefono', $telefono);
                $this->customer->__set('email', $email);
                $this->customer->__set('fechaCreacion', $fecha);
                $this->customer->__set('bajaCliente', $baja);
            }
            return $this->customer;
        }
    }
    function getClientePorNombre($nombre)
    {
        $control = false;
        $sql = "SELECT * FROM `clientes` where nombre = '$nombre';";
        $this->Consulta($sql, $this->param);
        if ($this->datos) {
            foreach ($this->datos as $cliente) { //recorremos los datos obtenidos.
                $id = $cliente['id'];
                $nombre = $cliente['nombre'];
                $direccion = $cliente['direccion'];
                $poblacion = $cliente['poblacion'];
                $provincia = $cliente['provincia'];
                $contacto = $cliente['contacto'];
                $telefono = $cliente['telefono'];
                $email = $cliente['email'];
                $fecha = $cliente['fechacreacion'];
                $baja = $cliente['bajacliente'];

                $this->customer = new Cliente();

                $this->customer->__set('id', $id);
                $this->customer->__set('nombre', $nombre);
                $this->customer->__set('direccion', $direccion);
                $this->customer->__set('poblacion', $poblacion);
                $this->customer->__set('provincia', $provincia);
                $this->customer->__set('contacto', $contacto);
                $this->customer->__set('telefono', $telefono);
                $this->customer->__set('email', $email);
                $this->customer->__set('fecha', $fecha);
                $this->customer->__set('baja', $baja);
            }
            return $this->customer;
        }
    }
    function busquedaClientes($cliente)
    {
        $sql = "SELECT * FROM clientes where nombre like '%$cliente%' 
        OR poblacion like '%$cliente%' 
        OR provincia like '%$cliente%'
        OR id like '%$cliente%'
        ORDER BY nombre"; //creamos la instruccion SQL
        $this->Consulta($sql, $this->param); //le pasamos los datos a la funcion de la clase padre
        if ($this->datos) {
            foreach ($this->datos as $cliente) { //recorremos los datos obtenidos.
                $id = $cliente['id'];
                $nombre = $cliente['nombre'];
                $direccion = $cliente['direccion'];
                $poblacion = $cliente['poblacion'];
                $provincia = $cliente['provincia'];
                $contacto = $cliente['contacto'];
                $telefono = $cliente['telefono'];
                $email = $cliente['email'];
                $fechaCreacion = $cliente['fechacreacion'];
                $bajaCliente = $cliente['bajacliente'];

                $this->customer = new Cliente();

                $this->customer->__set('id', $id);
                $this->customer->__set('nombre', $nombre);
                $this->customer->__set('direccion', $direccion);
                $this->customer->__set('poblacion', $poblacion);
                $this->customer->__set('provincia', $provincia);
                $this->customer->__set('contacto', $contacto);
                $this->customer->__set('telefono', $telefono);
                $this->customer->__set('email', $email);
                $this->customer->__set('fechaCreacion', $fechaCreacion);
                $this->customer->__set('bajaCliente', $bajaCliente);

                $this->listado[] = $this->customer;
            }
            // return $this->listado;
        }
    }
    function updateCliente($cliente)
    {
        if ($cliente instanceof Cliente) { //Si el parámetro es un objeto de la clase Alumno obtenemos sus propiedades
            $id = $cliente->__get('id');
            $nombre = $cliente->__get('nombre');
            $direccion = $cliente->__get('direccion');
            $poblacion = $cliente->__get('poblacion');
            $provincia = $cliente->__get('provincia');
            $contacto = $cliente->__get('contacto');
            $telefono = $cliente->__get('telefono');
            $email = $cliente->__get('email');
            $fechaCreacion = $cliente->__get('fechaCreacion');
            $bajacliente = $cliente->__get('bajaCliente');

            $sql = "UPDATE clientes SET 
                        nombre='$nombre',
                        direccion='$direccion',
                        poblacion='$poblacion',
                        provincia='$provincia',
                        contacto='$contacto',
                        telefono='$telefono',
                        email='$email',
                        fechacreacion='$fechaCreacion',
                        bajacliente='$bajacliente'
                        WHERE id ='$id';";

            $this->ConsultaSimple($sql, $this->param); //le pasamos los datos a la funcion de la clase padre.
        }
    }
    function removeCliente($idCliente)
    {
        $sql = "DELETE FROM clientes WHERE id='$idCliente';";
        $this->ConsultaSimple($sql, $this->param); //le pasamos los datos a la funcion de la clase padre.

    }

    function getClientesParaAvisosSQL()
    {
        $sql = "SELECT clientes.*, count(maquinas.cliente) AS cuenta_maquinas 
                FROM maquinas JOIN clientes 
                ON clientes.id=maquinas.cliente 
                WHERE clientes.bajacliente=0 AND maquinas.baja=0 
                GROUP BY maquinas.cliente 
                ORDER BY clientes.nombre ASC;";
        $this->Consulta($sql, $this->param);
        if ($this->datos) {
            foreach ($this->datos as $cliente) { //recorremos los datos obtenidos.
                $id = $cliente['id'];
                $nombre = $cliente['nombre'];
                $direccion = $cliente['direccion'];
                $poblacion = $cliente['poblacion'];
                $provincia = $cliente['provincia'];
                $contacto = $cliente['contacto'];
                $telefono = $cliente['telefono'];
                $email = $cliente['email'];
                $fechaCreacion = $cliente['fechacreacion'];
                $bajaCliente = $cliente['bajacliente'];

                $this->customer = new Cliente();

                $this->customer->__set('id', $id);
                $this->customer->__set('nombre', $nombre);
                $this->customer->__set('direccion', $direccion);
                $this->customer->__set('poblacion', $poblacion);
                $this->customer->__set('provincia', $provincia);
                $this->customer->__set('contacto', $contacto);
                $this->customer->__set('telefono', $telefono);
                $this->customer->__set('email', $email);
                $this->customer->__set('fechaCreacion', $fechaCreacion);
                $this->customer->__set('bajaCliente', $bajaCliente);

                $this->listado[] = $this->customer;
            }
            // return $this->listado;
        }
    }
    function setAltaCliente($idCliente)
    {
        $sql = "UPDATE clientes SET bajacliente=0 WHERE id='$idCliente';";
        $this->ConsultaSimple($sql, $this->param);
    }
    function getClientesDeAlta()
    {
        $sql = "SELECT * FROM clientes WHERE bajacliente=0 ORDER BY nombre";
        $this->Consulta($sql, $this->param);
        if ($this->datos) {
            foreach ($this->datos as $cliente) { //recorremos los datos obtenidos.
                $id = $cliente['id'];
                $nombre = $cliente['nombre'];
                $direccion = $cliente['direccion'];
                $poblacion = $cliente['poblacion'];
                $provincia = $cliente['provincia'];
                $contacto = $cliente['contacto'];
                $telefono = $cliente['telefono'];
                $email = $cliente['email'];
                $fechaCreacion = $cliente['fechacreacion'];
                $bajaCliente = $cliente['bajacliente'];

                $this->customer = new Cliente();

                $this->customer->__set('id', $id);
                $this->customer->__set('nombre', $nombre);
                $this->customer->__set('direccion', $direccion);
                $this->customer->__set('poblacion', $poblacion);
                $this->customer->__set('provincia', $provincia);
                $this->customer->__set('contacto', $contacto);
                $this->customer->__set('telefono', $telefono);
                $this->customer->__set('email', $email);
                $this->customer->__set('fechaCreacion', $fechaCreacion);
                $this->customer->__set('bajaCliente', $bajaCliente);

                $this->listado[] = $this->customer;
            }
            // return $this->listado;
        }
    }
    function getCuentaAvisosPorProductor($anio)
    {
        $sql = "SELECT productores.id AS idProductor, COUNT(avisos.id) AS CuentaAvisos
                FROM productores
                JOIN avisos ON productores.id = avisos.productor
                WHERE YEAR(avisos.fechainicio) = $anio
                GROUP BY productores.id;";

        $this->Consulta($sql, $this->param);

        $resultados = [];
        if ($this->datos && is_array($this->datos)) {
            foreach ($this->datos as $dato) {
                $resultados[] = [
                    'idProductor' => $dato['idProductor'],
                    'CuentaAvisos' => $dato['CuentaAvisos']
                ];
            }
        }

        return $resultados;
    }

    function getTopClientesMaquinas(){
        $sql="SELECT clientes.nombre AS NOMBRE, count(maquinas.cliente) as TOTAL 
        from maquinas join clientes on clientes.id=maquinas.cliente 
        where clientes.bajacliente=0 and maquinas.baja=0 
        GROUP by maquinas.cliente order by TOTAL desc limit 10;";
        $this->Consulta($sql, $this->param);
        $cuenta = [];
        foreach ($this->datos as $row) {
            $cuenta[$row['NOMBRE']] = $row['TOTAL'];
        }
        return $cuenta;
    }
    function getTopClientesAvisos(){
        $sql="SELECT clientes.nombre AS NOMBRE, count(avisos.idcliente) as TOTAL 
        from avisos join clientes on clientes.id=avisos.idcliente 
        where clientes.bajacliente=0 GROUP by avisos.idcliente 
        order by TOTAL desc limit 10;";
        $this->Consulta($sql, $this->param);
        $cuenta = [];
        foreach ($this->datos as $row) {
            $cuenta[$row['NOMBRE']] = $row['TOTAL'];
        }
        return $cuenta;
    }
}
