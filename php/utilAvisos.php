<?php
require_once('daoAviso.php');
$daoAviso = new DaoAviso();
if (isset($_POST['addAviso'])) {
    $aviso = new Aviso();
    $jsonObj = $_POST['addAviso'];
    $data = json_decode($jsonObj);
    // var_dump($data);

    $idCliente = $data->idCliente;
    $chasis = $data->chasis;
    $averia = $data->averia;
    $productor = $data->productor;
    $finalizado = $data->finalizado;
    $fechaInicio = $data->fechaInicio;
    $fechaFin = $data->fechaFin;
    $resolucion = $data->resolucion;
    $presupuesto = $data->presupuesto;
    $aceptado = $data->aceptado;
    $prioridad = $data->prioridad;

    $aviso->__set('idCliente', $idCliente);
    $aviso->__set('chasis', $chasis);
    $aviso->__set('averia', $averia);
    $aviso->__set('productor', $productor);
    $aviso->__set('finalizado', $finalizado);
    $aviso->__set('fechaInicio', $fechaInicio);
    $aviso->__set('fechaFin', $fechaFin);
    $aviso->__set('resolucion', $resolucion);
    $aviso->__set('presupuesto', $presupuesto);
    $aviso->__set('aceptado', $aceptado);
    $aviso->__set('prioridad', $prioridad);

    $daoAviso->addAviso($aviso);
    $respuesta = "Aviso añadido php";
    echo $respuesta;
} else if (isset($_POST['updateAviso'])) {
    $aviso = new Aviso();
    $jsonObj = $_POST['updateAviso'];
    $data = json_decode($jsonObj);
    // var_dump($data);

    $id = $data->id;
    $idCliente = $data->idCliente;
    $chasis = $data->chasis;
    $averia = $data->averia;
    $productor = $data->productor;
    $finalizado = $data->finalizado;
    $fechaInicio = $data->fechaInicio;
    $fechaFin = $data->fechaFin;
    $resolucion = $data->resolucion;
    $presupuesto = $data->presupuesto;
    $aceptado = $data->aceptado;
    $prioridad = $data->prioridad;

    $aviso->__set('id', $id);
    $aviso->__set('idCliente', $idCliente);
    $aviso->__set('chasis', $chasis);
    $aviso->__set('averia', $averia);
    $aviso->__set('productor', $productor);
    $aviso->__set('finalizado', $finalizado);
    $aviso->__set('fechaInicio', $fechaInicio);
    $aviso->__set('fechaFin', $fechaFin);
    $aviso->__set('resolucion', $resolucion);
    $aviso->__set('presupuesto', $presupuesto);
    $aviso->__set('aceptado', $aceptado);
    $aviso->__set('prioridad', $prioridad);

    $daoAviso->updateAviso($aviso);
    $respuesta = "Aviso actualizado php";
    echo $respuesta;
} else if (isset($_POST['deleteAviso'])) {
    $id = $_POST['deleteAviso'];
    $daoAviso->deleteAviso($id);
    $respuesta = "Aviso eliminado php";
    echo $respuesta;
} else if (isset($_POST['getListadoAvisos'])) {
    $daoAviso->getListadoAvisos();
    $avisos = json_encode($daoAviso->listado);
    echo $avisos;
} else if (isset($_POST['getAvisosPorCliente'])) {
    $idCliente = $_POST['getAvisosPorCliente'];
    $daoAviso->getAvisosPorCliente($idCliente);
    $avisos = json_encode($daoAviso->listado);
    echo $avisos;
} else if (isset($_POST['getAvisosPorChasis'])) {
    $chasis = $_POST['getAvisosPorChasis'];
    $daoAviso->getAvisosPorChasis($chasis);
    echo json_encode($daoAviso->listado);
} else if (isset($_POST['getAvisoPorId'])) {
    $idAviso = $_POST['getAvisoPorId'];
    $daoAviso->getAvisoPorId($idAviso);
    echo json_encode($daoAviso->incidence);
} else if (isset($_POST['getFirstAviso'])) {
    $daoAviso->getFirstAviso();
    echo json_encode($daoAviso->incidence);
} else if (isset($_POST['getLastAviso'])) {
    $daoAviso->getLastAviso();
    echo json_encode($daoAviso->incidence);
} else if (isset($_POST['getNextAviso'])) {
    $idAviso = $_POST['getNextAviso'];
    $daoAviso->getNextAviso($idAviso);
    echo json_encode($daoAviso->incidence);
} else if (isset($_POST['getPrevAviso'])) {
    $idAviso = $_POST['getPrevAviso'];
    $daoAviso->getPrevAviso($idAviso);
    echo json_encode($daoAviso->incidence);
} else if (isset($_POST['getCuentaAvisos'])) {
    $cuenta =  $daoAviso->getCuentaAvisos();
    echo $cuenta;
} else if (isset($_POST['getAvisosPendientes'])) {
    $daoAviso->getAvisosPendientes();
    $avisos = json_encode($daoAviso->listado);
    echo $avisos;
} else if (isset($_POST['getCuentaAvisosMaquina'])) {
    $chasis = $_POST['getCuentaAvisosMaquina'];
    $cuenta =  $daoAviso->getCuentaAvisosMaquina($chasis);
    echo $cuenta;
} else if (isset($_POST['getCuentaAvisosCliente'])) {
    $idCliente = $_POST['getCuentaAvisosCliente'];
    $cuenta =  $daoAviso->getCuentaAvisosCliente($idCliente);
    echo $cuenta;
} else if (isset($_POST['getCuentaAvisosPendientes'])) {
    $cuenta =  $daoAviso->getCuentaAvisosPendientes();
    echo $cuenta;
} else if (isset($_POST['getAvisosPendientesPorProductor'])) {
    $productor = $_POST['getAvisosPendientesPorProductor'];
    $daoAviso->getAvisosPendientesPorProductor($productor);
    echo json_encode($daoAviso->listado);
} else if (isset($_POST['setEndAviso'])) {
    $idAviso = $_POST['setEndAviso'];
    echo $idAviso;
    $daoAviso->setEndAviso($idAviso);
    $respuesta = "Aviso finalizado php";
    echo $respuesta;
} else if (isset($_POST['getAvisosPorAnio'])) {
    $year = $_POST['getAvisosPorAnio'];
    $cuenta = $daoAviso->getAvisosPorAnio($year);
    echo json_encode($cuenta);
} else if (isset($_POST['getAvisosPorMeses'])) {
    $year = $_POST['getAvisosPorMeses'];
    $cuenta = $daoAviso->getAvisosPorMeses($year);
    echo json_encode($cuenta);
} else if (isset($_POST['getAvisosLastFiveYears'])) {
    $cuenta = $daoAviso->getAvisosLastFiveYears();
    echo json_encode($cuenta);
} else if (isset($_POST['removeAvisosPorCliente'])) {
    $idCliente = $_POST['removeAvisosPorCliente'];
    $daoAviso->removeAvisosPorCliente($idCliente);
    echo "Avisos cliente " . $idCliente . " eliminados php";
} else if (isset($_POST['removeAvisosPorChasis'])) {
    $chasis = $_POST['removeAvisosPorChasis'];
    $daoAviso->removeAvisosPorChasis($chasis);
    echo "Avisos maquina " . $chasis . " eliminados php";
} else if (isset($_POST['getCargaDeTrabajo'])) {
    $year = $_POST['getCargaDeTrabajo'];
    $cuenta = $daoAviso->getCargaDeTrabajo();
    echo json_encode($cuenta);
} else if (isset($_POST['getTopProductores'])) {
    $year = $_POST['getTopProductores'];
    $cuenta = $daoAviso->getTopProductores();
    echo json_encode($cuenta);
}
