<?php
require_once('daoMaquina.php');
$daoMaquina = new DaoMaquina();
if (isset($_POST['removeMaquina'])) {
    $id = $_POST['removeMaquina'];
    echo $id;
    $daoMaquina->removeMaquina($id);
    $respuesta = "Maquina " . $id . " eliminada php";
    echo $respuesta;
} else if (isset($_POST['updateMaquina'])) {
    $jsonObj = $_POST['updateMaquina'];
    $data = json_decode($jsonObj);
    // var_dump($data);
    $id = $data->id;
    $modelo = $data->modelo;
    $chasis = $data->chasis;
    $cliente = $data->cliente;
    $fechaCreacion = $data->fechaCreacion;
    $alquiler = $data->alquiler;
    $contrato = $data->contrato;
    $reaco = $data->reaco;
    $baja = $data->baja;
    $notas = $data->notas;
    $numero = $data->numero;

    $maquina = new Maquina();

    $maquina->__set('id', $id);
    $maquina->__set('modelo', $modelo);
    $maquina->__set('chasis', $chasis);
    $maquina->__set('cliente', $cliente);
    $maquina->__set('fechaCreacion', $fechaCreacion);
    $maquina->__set('alquiler', $alquiler);
    $maquina->__set('contrato', $contrato);
    $maquina->__set('reaco', $reaco);
    $maquina->__set('baja', $baja);
    $maquina->__set('notas', $notas);
    $maquina->__set('numero', $numero);


    $daoMaquina->updateMaquina($maquina);
    $respuesta = "Maquina actualizada php";
    echo $respuesta;
} else if (isset($_POST['addMaquina'])) {
    $maquina = new Maquina();
    $jsonObj = $_POST['addMaquina'];
    $data = json_decode($jsonObj);
    // var_dump($data);

    $modelo = $data->modelo;
    $chasis = $data->chasis;
    $cliente = $data->cliente;
    $fechaCreacion = $data->fechaCreacion;
    $alquiler = $data->alquiler;
    $contrato = $data->contrato;
    $reaco = $data->reaco;
    $baja = $data->baja;
    $notas = $data->notas;
    $numero = $data->numero;

    $maquina->__set('modelo', $modelo);
    $maquina->__set('chasis', $chasis);
    $maquina->__set('cliente', $cliente);
    $maquina->__set('fechaCreacion', $fechaCreacion);
    $maquina->__set('alquiler', $alquiler);
    $maquina->__set('contrato', $contrato);
    $maquina->__set('reaco', $reaco);
    $maquina->__set('baja', $baja);
    $maquina->__set('notas', $notas);
    $maquina->__set('numero', $numero);

    if ($daoMaquina->compruebaMaquina($chasis) == false) {
        $daoMaquina->addMaquina($maquina);
        echo "Maquina " . $maquina->__get('chasis') . " añadida con éxito";
    } else {
        echo "La máquina " . $maquina->__get('chasis') . " ya está en el sistema.";
    }
} else if (isset($_POST['getMaquinasCliente'])) {
    $id = $_POST['getMaquinasCliente'];
    $listado = $daoMaquina->getMaquinasCliente($id);
    $respuesta = json_encode($listado);
    echo $respuesta;
} else if (isset($_POST['getMaquinaPorChasis'])) {
    $chasis = $_POST['getMaquinaPorChasis'];
    $daoMaquina->getMaquinaPorChasis($chasis);
    $maquina = json_encode($daoMaquina->carretilla);
    echo $maquina;
} else if (isset($_POST['getCuentaMaquinas'])) {
    $cuenta = $daoMaquina->getCuentaMaquinas();
    echo $cuenta;
} else if (isset($_POST['getListadoMaquinas'])) {
    $daoMaquina->getListadoMaquinas();
    $listado = $daoMaquina->listado;
    $respuesta = json_encode($listado);
    echo $respuesta;
} else if (isset($_POST['compruebaMaquina'])) {
    $chasis = $_POST['compruebaMaquina'];
    $respuesta = $daoMaquina->compruebaMaquina($chasis);
    echo $respuesta;
} else if (isset($_POST['getIdMaquina'])) {
    $chasis = $_POST['getIdMaquina'];
    $respuesta = $daoMaquina->getIdMaquina($chasis);
    echo $respuesta;
} else if (isset($_POST['busquedaMaquinas'])) {
    $maquina = $_POST['busquedaMaquinas'];
    $daoMaquina->busquedaMaquinas($maquina);
    $myJSON = json_encode($daoMaquina->listado);
    echo $myJSON;
} else if (isset($_POST['getCuentaMaquinasCliente'])) {
    $idCliente = $_POST['getCuentaMaquinasCliente'];
    $cuenta = $daoMaquina->getCuentaMaquinasCliente($idCliente);
    echo $cuenta;
} else if (isset($_POST['getMaquinaPodIdSQL'])) {
    $idMaquina = $_POST['getMaquinaPodIdSQL'];
    $daoMaquina->getMaquinaPodIdSQL($idMaquina);
    $maquina = json_encode($daoMaquina->carretilla);
    echo $maquina;
} else if (isset($_POST['setBajaMaquinasCliente'])) {
    $id = $_POST['setBajaMaquinasCliente'];
    $daoMaquina->setBajaMaquinasCliente($id);
    $respuesta = "Maquinas de cliente " . $id . " dadas de baja php";
    echo $respuesta;
} else if (isset($_POST['getTopMaquinasAvisos'])) {
    $cuenta = $daoMaquina->getTopMaquinasAvisos();
    echo json_encode($cuenta);
} else if (isset($_POST['getModelos'])) {
    $cuenta = $daoMaquina->getModelos();
    echo json_encode($cuenta);
}
