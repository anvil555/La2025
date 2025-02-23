<?php
require_once('daoProductor.php');
$daoProductor = new DaoProductor();
if(isset($_POST['getCuentaProductores'])){
    $cuenta = $daoProductor->getCuentaProductores();
    echo $cuenta;
}else if(isset($_POST['getListadoProductores'])){
    $daoProductor->getListadoProductores();
    $listado = json_encode($daoProductor->listado);
    echo $listado;
}