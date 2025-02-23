<?php
require_once('daoCliente.php');
$daoCliente = new DaoCliente();
if (isset($_POST['removeCliente'])) {
    $id = $_POST['removeCliente'];
    $daoCliente->removeCliente($id);
    $respuesta = "Cliente " . $id . " eliminado php";
    echo $respuesta;
} else if (isset($_POST['updateCliente'])) {
    $jsonObj = $_POST['updateCliente'];
    $data = json_decode($jsonObj);
    // var_dump($data);
    $id = $data->id;
    $nombre = $data->nombre;
    $direccion = $data->direccion;
    $poblacion = $data->poblacion;
    $provincia = $data->provincia;
    $contacto = $data->contacto;
    $telefono = $data->telefono;
    $email = $data->email;
    $fechaCreacion = $data->fechaCreacion;
    $bajaCliente = $data->bajaCliente;

    $cliente = new Cliente();

    $cliente->__set('id', $id);
    $cliente->__set('nombre', $nombre);
    $cliente->__set('direccion', $direccion);
    $cliente->__set('poblacion', $poblacion);
    $cliente->__set('provincia', $provincia);
    $cliente->__set('contacto', $contacto);
    $cliente->__set('telefono', $telefono);
    $cliente->__set('email', $email);
    $cliente->__set('fechaCreacion', $fechaCreacion);
    $cliente->__set('bajaCliente', $bajaCliente);

    $daoCliente->updateCliente($cliente);
    $respuesta = "Cliente actualizado php";
    echo $respuesta;
} else if (isset($_POST['addCliente'])) {
    $cliente = new Cliente();
    $jsonObj = $_POST['addCliente'];
    $data = json_decode($jsonObj);
    // var_dump($data);

    $nombre = $data->nombre;
    $direccion = $data->direccion;
    $poblacion = $data->poblacion;
    $provincia = $data->provincia;
    $contacto = $data->contacto;
    $telefono = $data->telefono;
    $mail1 = $data->email;
    $fechaCreacion = $data->fechaCreacion;
    $bajaCliente = $data->bajaCliente;

    $cliente->__set('nombre', $nombre);
    $cliente->__set('direccion', $direccion);
    $cliente->__set('poblacion', $poblacion);
    $cliente->__set('provincia', $provincia);
    $cliente->__set('contacto', $contacto);
    $cliente->__set('telefono', $telefono);
    $cliente->__set('mail1', $mail1);
    $cliente->__set('fechaCreacion', $fechaCreacion);
    $cliente->__set('bajaCliente', $bajaCliente);

    // var_dump($cliente);

    if ($daoCliente->compruebacliente($nombre) == false) {
        $daoCliente->addCliente($cliente);
        echo "Cliente " . $cliente->__get('nombre') . " añadido con éxito";
    } else {
        echo "El cliente " . $cliente->__get('nombre') . " ya está en el sistema.";
    }
} else if (isset($_POST['getCliente'])) {
    $nombre = $_POST['getCliente'];
    echo $daoCliente->getIdCliente(nombre: $nombre);
} else if (isset($_POST['getCuentaClientes'])) {
    $cuenta = $daoCliente->getCuentaClientes();
    echo $cuenta;
} else if (isset($_POST['getIdCliente'])) {
    $nombre = $_POST['getIdCliente'];
    echo $daoCliente->getIdCliente(nombre: $nombre);
} else if (isset($_POST['getClientePorId'])) {
    $id = $_POST['getClientePorId'];
    $daoCliente->getCliente($id);
    $myJSON = json_encode($daoCliente->customer); //////aqui /////////
    echo $myJSON;
} else if (isset($_POST['busquedaClientes'])) {
    $cliente = $_POST['busquedaClientes'];
    $daoCliente->busquedaClientes($cliente);
    $myJSON = json_encode($daoCliente->listado);
    // var_dump($myJSON);
    echo $myJSON;
} else if (isset($_POST['getListadoClientes'])) {
    $daoCliente->getListadoClientes();
    $clientes = json_encode($daoCliente->listado);
    echo $clientes;
} else if (isset($_POST['getClientesParaAvisosSQL'])) {
    $daoCliente->getClientesParaAvisosSQL();
    $clientes = json_encode($daoCliente->listado);
    echo $clientes;
} else if (isset($_POST['getClientePorNombre'])) {
    $nombre = $_POST['getClientePorNombre'];
    $daoCliente->getClientePorNombre($nombre);
    $cliente = json_encode($daoCliente->customer);
    echo $cliente;
} else if (isset($_POST['setAltaCliente'])) {
    $idCliente = $_POST['setAltaCliente'];
    $daoCliente->setAltaCliente($idCliente);
    $respuesta = "Cliente " . $idCliente . " dado de alta php";
    echo $respuesta;
} else if (isset($_POST['getClientesDeAlta'])) {
    $daoCliente->getClientesDeAlta();
    $clientes = json_encode($daoCliente->listado);
    echo $clientes;
} else if (isset($_POST['getCuentaAvisosPorProductor'])) {
    $anio = $_POST['getCuentaAvisosPorProductor']; // Aseguramos que el año sea un entero
    $avisos = $daoCliente->getCuentaAvisosPorProductor($anio);
    $resultadosLimpios = [];

    foreach ($avisos as $aviso) {
        $resultadosLimpios[] = [
            'idProductor' => $aviso['idProductor'],
            'CuentaAvisos' => $aviso['CuentaAvisos']
        ];
    }

    echo json_encode($resultadosLimpios);
} else if (isset($_POST['getTopClientesMaquinas'])) {
    $cuenta = $daoCliente->getTopClientesMaquinas();
    echo json_encode($cuenta);
} else if (isset($_POST['getTopClientesAvisos'])) {
    $cuenta = $daoCliente->getTopClientesAvisos();
    echo json_encode($cuenta);
}
