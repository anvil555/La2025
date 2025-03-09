<?php
require_once('daoProductor.php');
$daoProductor = new DaoProductor();
if (isset($_POST['getCuentaProductores'])) {
    $cuenta = $daoProductor->getCuentaProductores();
    echo $cuenta;
} else if (isset($_POST['getListadoProductores'])) {
    $daoProductor->getListadoProductores();
    $listado = json_encode($daoProductor->listado);
    echo $listado;
} else if (isset($_POST['deleteProductor'])) {
    $daoProductor->deleteProductor($_POST['deleteProductor']);
    echo "Productor Eliminado php";
} else if (isset($_POST['getProductor'])) {
    $jsonObj = $_POST['getProductor'];
    $data = json_decode($jsonObj);
    $productor = new Productor();
    $productor->__set('id',  $data->id);
    $productor->__set('nombre',  $data->nombre);
    $productor->__set('baja',  $data->baja);
    $productor = $daoProductor->getProductor($productor);
    echo json_encode($productor);
} else if (isset($_POST['getProductorPorId'])) {
    $id = $_POST['getProductorPorId'];
    $productor = $daoProductor->getProductorPorId($id);
    echo json_encode($productor);
} else if (isset($_POST['addProductor'])) {
    $jsonObj = $_POST['addProductor'];
    $data = json_decode($jsonObj);
    $productor = new Productor();
    $productor->__set('id',  $data->id);
    $productor->__set('nombre',  $data->nombre);
    $productor->__set('baja',  $data->baja);
    if ($daoProductor->getProductor($productor) == false) {
        $daoProductor->addProductor($productor);
        echo "Productor " . $data->id . " añadido php";
    } else {
        echo "Este productor ya está registrado";
    }
} else if (isset($_POST['updateProductor'])) {
    $jsonObj = $_POST['updateProductor'];
    $data = json_decode($jsonObj);
    $productor = new Productor();
    $productor->__set('id',  $data->id);
    $productor->__set('nombre',  $data->nombre);
    $productor->__set('baja',  $data->baja);
    $daoProductor->updateProductor($productor);
} else if (isset($_POST['updateIdProductor'])) {
    $jsonObj = $_POST['updateIdProductor'];
    $data = json_decode($jsonObj);
    $productor = new Productor();
    $productor->__set('id',  $data->id);
    $productor->__set('nombre',  $data->nombre);
    $productor->__set('baja',  $data->baja);
    $daoProductor->updateIdProductor($productor);
}
