<?php
require_once('libreriaPDO.php');
require_once('objetos.php');

class DaoAviso extends DB
{
    public $listado = [];
    public $param = [];
    public $incidence;

    public function __construct()
    {
        parent::__construct();
    }
    function addAviso($aviso)
    {
        $idCliente = $aviso->__get('idCliente');
        $chasis = $aviso->__get('chasis');
        $averia = $aviso->__get('averia');
        $productor = $aviso->__get('productor');
        $finalizado = $aviso->__get('finalizado');
        $fechaInicio = $aviso->__get('fechaInicio');
        $fechaFin = $aviso->__get('fechaFin');
        $resolucion = $aviso->__get('resolucion');
        $presupuesto = $aviso->__get('presupuesto');
        $aceptado = $aviso->__get('aceptado');
        $prioridad = $aviso->__get('prioridad');

        $sql = "INSERT INTO avisos (idCliente,chasis,averia,productor,finalizado,fechainicio,fechafin,resolucion,presupuesto,aceptado,prioridad)
        VALUES ($idCliente,'$chasis','$averia',$productor,$finalizado,'$fechaInicio','$fechaFin','$resolucion',$presupuesto,$aceptado,$prioridad);";
        $this->ConsultaSimple($sql, $this->param);
    }
    function updateAviso($aviso)
    {
        $id = $aviso->__get('id');
        $idCliente = $aviso->__get('idCliente');
        $chasis = $aviso->__get('chasis');
        $averia = $aviso->__get('averia');
        $productor = $aviso->__get('productor');
        $finalizado = $aviso->__get('finalizado');
        $fechaInicio = $aviso->__get('fechaInicio');
        $fechaFin = $aviso->__get('fechaFin');
        $resolucion = $aviso->__get('resolucion');
        $presupuesto = $aviso->__get('presupuesto');
        $aceptado = $aviso->__get('aceptado');
        $prioridad = $aviso->__get('prioridad');

        $sql = "UPDATE avisos SET idCliente = '$idCliente', 
        chasis = '$chasis', averia = '$averia', productor = '$productor', 
        finalizado = '$finalizado', fechainicio = '$fechaInicio', fechafin = '$fechaFin', 
        resolucion = '$resolucion', presupuesto = '$presupuesto', 
        aceptado = '$aceptado', prioridad = '$prioridad' WHERE id = $id;";

        $this->ConsultaSimple($sql, $this->param);
    }
    function deleteAviso($id)
    {
        $sql = "DELETE FROM avisos WHERE id = $id;";
        $this->ConsultaSimple($sql, $this->param);
    }
    function getListadoAvisos()
    {
        $sql = "SELECT * FROM avisos ORDER BY 'fechainicio'";
        $this->Consulta($sql, $this->param); //le pasamos los datos a la funcion de la clase padre
        if ($this->datos) {
            foreach ($this->datos as $aviso) { //recorremos los datos obtenidos.
                $this->incidence = new Aviso();

                $this->incidence->__set('id', $aviso['id']);
                $this->incidence->__set('idcliente', $aviso['idcliente']);
                $this->incidence->__set('chasis', $aviso['chasis']);
                $this->incidence->__set('averia', $aviso['averia']);
                $this->incidence->__set('tecnico', $aviso['productor']);
                $this->incidence->__set('finalizado', $aviso['finalizado']);
                $this->incidence->__set('fechaInicio', $aviso['fechainicio']);
                $this->incidence->__set('fechaFin', $aviso['fechafin']);
                $this->incidence->__set('resolucion', $aviso['resolucion']);
                $this->incidence->__set('presupuesto', $aviso['presupuesto']);
                $this->incidence->__set('aceptado', $aviso['aceptado']);
                $this->incidence->__set('prioridad', $aviso['prioridad']);

                $this->listado[] = $this->incidence;
            }
        }
    }
    function getAvisosPendientes()
    {
        $sql = "SELECT * FROM avisos WHERE finalizado = 0 ORDER BY 'fechainicio'";
        $this->Consulta($sql, $this->param); //le pasamos los datos a la funcion de la clase padre
        if ($this->datos) {
            //    unset( $this->listado);
            foreach ($this->datos as $aviso) { //recorremos los datos obtenidos.
                $this->incidence = new Aviso();

                $this->incidence->__set('id', $aviso['id']);
                $this->incidence->__set('idCliente', $aviso['idcliente']);
                $this->incidence->__set('chasis', $aviso['chasis']);
                $this->incidence->__set('averia', $aviso['averia']);
                $this->incidence->__set('productor', $aviso['productor']);
                $this->incidence->__set('finalizado', $aviso['finalizado']);
                $this->incidence->__set('fechaInicio', $aviso['fechainicio']);
                $this->incidence->__set('fechaFin', $aviso['fechafin']);
                $this->incidence->__set('resolucion', $aviso['resolucion']);
                $this->incidence->__set('presupuesto', $aviso['presupuesto']);
                $this->incidence->__set('aceptado', $aviso['aceptado']);
                $this->incidence->__set('prioridad', $aviso['prioridad']);

                $this->listado[] = $this->incidence;
            }
        }
    }
    function getAvisosPorCliente($idCliente)
    {
        $sql = "SELECT * FROM avisos WHERE idCliente = $idCliente ORDER BY fechainicio desc";
        $this->Consulta($sql, $this->param); //le pasamos los datos a la funcion de la clase padre
        if ($this->datos) {
            foreach ($this->datos as $aviso) { //recorremos los datos obtenidos.
                $this->incidence = new Aviso();

                $this->incidence->__set('id', $aviso['id']);
                $this->incidence->__set('idCliente', $aviso['idcliente']);
                $this->incidence->__set('chasis', $aviso['chasis']);
                $this->incidence->__set('averia', $aviso['averia']);
                $this->incidence->__set('productor', $aviso['productor']);
                $this->incidence->__set('finalizado', $aviso['finalizado']);
                $this->incidence->__set('fechaInicio', $aviso['fechainicio']);
                $this->incidence->__set('fechaFin', $aviso['fechafin']);
                $this->incidence->__set('resolucion', $aviso['resolucion']);
                $this->incidence->__set('presupuesto', $aviso['presupuesto']);
                $this->incidence->__set('aceptado', $aviso['aceptado']);
                $this->incidence->__set('prioridad', $aviso['prioridad']);

                $this->listado[] = $this->incidence;
            }
        }
    }
    function getAvisosPorChasis($chasis)
    {
        $sql = "SELECT * FROM avisos WHERE chasis = '$chasis' ORDER BY fechainicio desc";
        $this->Consulta($sql, $this->param); //le pasamos los datos a la funcion de la clase padre
        if ($this->datos) {
            foreach ($this->datos as $aviso) { //recorremos los datos obtenidos.
                $this->incidence = new Aviso();

                $this->incidence->__set('id', $aviso['id']);
                $this->incidence->__set('idCliente', $aviso['idcliente']);
                $this->incidence->__set('chasis', $aviso['chasis']);
                $this->incidence->__set('averia', $aviso['averia']);
                $this->incidence->__set('productor', $aviso['productor']);
                $this->incidence->__set('finalizado', $aviso['finalizado']);
                $this->incidence->__set('fechaInicio', $aviso['fechainicio']);
                $this->incidence->__set('fechaFin', $aviso['fechafin']);
                $this->incidence->__set('resolucion', $aviso['resolucion']);
                $this->incidence->__set('presupuesto', $aviso['presupuesto']);
                $this->incidence->__set('aceptado', $aviso['aceptado']);
                $this->incidence->__set('prioridad', $aviso['prioridad']);

                $this->listado[] = $this->incidence;
            }
        }
    }
    function getAvisoPorId($idAviso)
    {
        $sql = "SELECT * FROM avisos WHERE id = '$idAviso'";
        $this->Consulta($sql, $this->param); //le pasamos los datos a la funcion de la clase padre
        if ($this->datos) {
            foreach ($this->datos as $aviso) { //recorremos los datos obtenidos.
                $this->incidence = new Aviso();

                $this->incidence->__set('id', $aviso['id']);
                $this->incidence->__set('idCliente', $aviso['idcliente']);
                $this->incidence->__set('chasis', $aviso['chasis']);
                $this->incidence->__set('averia', $aviso['averia']);
                $this->incidence->__set('productor', $aviso['productor']);
                $this->incidence->__set('finalizado', $aviso['finalizado']);
                $this->incidence->__set('fechaInicio', $aviso['fechainicio']);
                $this->incidence->__set('fechaFin', $aviso['fechafin']);
                $this->incidence->__set('resolucion', $aviso['resolucion']);
                $this->incidence->__set('presupuesto', $aviso['presupuesto']);
                $this->incidence->__set('aceptado', $aviso['aceptado']);
                $this->incidence->__set('prioridad', $aviso['prioridad']);

                // $this->listado[] = $this->incidence;
            }
        }
    }

    function getFirstAviso()
    {
        $sql = "SELECT * FROM avisos ORDER BY id asc LIMIT 1;";
        $this->Consulta($sql, $this->param); //le pasamos los datos a la funcion de la clase padre
        if ($this->datos) {
            foreach ($this->datos as $aviso) { //recorremos los datos obtenidos.
                $this->incidence = new Aviso();

                $this->incidence->__set('id', $aviso['id']);
                $this->incidence->__set('idCliente', $aviso['idcliente']);
                $this->incidence->__set('chasis', $aviso['chasis']);
                $this->incidence->__set('averia', $aviso['averia']);
                $this->incidence->__set('productor', $aviso['productor']);
                $this->incidence->__set('finalizado', $aviso['finalizado']);
                $this->incidence->__set('fechaInicio', $aviso['fechainicio']);
                $this->incidence->__set('fechaFin', $aviso['fechafin']);
                $this->incidence->__set('resolucion', $aviso['resolucion']);
                $this->incidence->__set('presupuesto', $aviso['presupuesto']);
                $this->incidence->__set('aceptado', $aviso['aceptado']);
                $this->incidence->__set('prioridad', $aviso['prioridad']);

                // $this->listado[] = $this->incidence;
            }
        }
    }
    function getLastAviso()
    {
        $sql = "SELECT * FROM avisos ORDER BY id desc LIMIT 1;";
        $this->Consulta($sql, $this->param); //le pasamos los datos a la funcion de la clase padre
        if ($this->datos) {
            foreach ($this->datos as $aviso) { //recorremos los datos obtenidos.
                $this->incidence = new Aviso();

                $this->incidence->__set('id', $aviso['id']);
                $this->incidence->__set('idCliente', $aviso['idcliente']);
                $this->incidence->__set('chasis', $aviso['chasis']);
                $this->incidence->__set('averia', $aviso['averia']);
                $this->incidence->__set('productor', $aviso['productor']);
                $this->incidence->__set('finalizado', $aviso['finalizado']);
                $this->incidence->__set('fechaInicio', $aviso['fechainicio']);
                $this->incidence->__set('fechaFin', $aviso['fechafin']);
                $this->incidence->__set('resolucion', $aviso['resolucion']);
                $this->incidence->__set('presupuesto', $aviso['presupuesto']);
                $this->incidence->__set('aceptado', $aviso['aceptado']);
                $this->incidence->__set('prioridad', $aviso['prioridad']);

                // $this->listado[] = $this->incidence;
            }
        }
    }
    function getNextAviso($idAviso)
    {
        $sql = "SELECT * FROM avisos WHERE id > $idAviso ORDER BY id asc LIMIT 1;";
        $this->Consulta($sql, $this->param); //le pasamos los datos a la funcion de la clase padre
        if ($this->datos) {
            foreach ($this->datos as $aviso) { //recorremos los datos obtenidos.
                $this->incidence = new Aviso();

                $this->incidence->__set('id', $aviso['id']);
                $this->incidence->__set('idCliente', $aviso['idcliente']);
                $this->incidence->__set('chasis', $aviso['chasis']);
                $this->incidence->__set('averia', $aviso['averia']);
                $this->incidence->__set('productor', $aviso['productor']);
                $this->incidence->__set('finalizado', $aviso['finalizado']);
                $this->incidence->__set('fechaInicio', $aviso['fechainicio']);
                $this->incidence->__set('fechaFin', $aviso['fechafin']);
                $this->incidence->__set('resolucion', $aviso['resolucion']);
                $this->incidence->__set('presupuesto', $aviso['presupuesto']);
                $this->incidence->__set('aceptado', $aviso['aceptado']);
                $this->incidence->__set('prioridad', $aviso['prioridad']);

                // $this->listado[] = $this->incidence;
            }
        }
    }
    function getPrevAviso($idAviso)
    {
        $sql = "SELECT * FROM avisos WHERE id < $idAviso ORDER BY id desc LIMIT 1;";
        $this->Consulta($sql, $this->param); //le pasamos los datos a la funcion de la clase padre
        if ($this->datos) {
            foreach ($this->datos as $aviso) { //recorremos los datos obtenidos.
                $this->incidence = new Aviso();

                $this->incidence->__set('id', $aviso['id']);
                $this->incidence->__set('idCliente', $aviso['idcliente']);
                $this->incidence->__set('chasis', $aviso['chasis']);
                $this->incidence->__set('averia', $aviso['averia']);
                $this->incidence->__set('productor', $aviso['productor']);
                $this->incidence->__set('finalizado', $aviso['finalizado']);
                $this->incidence->__set('fechaInicio', $aviso['fechainicio']);
                $this->incidence->__set('fechaFin', $aviso['fechafin']);
                $this->incidence->__set('resolucion', $aviso['resolucion']);
                $this->incidence->__set('presupuesto', $aviso['presupuesto']);
                $this->incidence->__set('aceptado', $aviso['aceptado']);
                $this->incidence->__set('prioridad', $aviso['prioridad']);

                // $this->listado[] = $this->incidence;
            }
        }
    }

    function getCuentaAvisos()
    {
        $cuenta = 0;
        $sql = "SELECT count(*) as 'Cuenta' FROM `avisos`;";
        $this->Consulta($sql, $this->param);
        $cuenta = $this->datos[0][0];
        return $cuenta;
    }
    function getCuentaAvisosPendientes()
    {
        $cuenta = 0;
        $sql = "SELECT count(*) as 'Cuenta' FROM `avisos` where finalizado=0;";
        $this->Consulta($sql, $this->param);
        $cuenta = $this->datos[0][0];
        return $cuenta;
    }
    function getCuentaAvisosMaquina($chasis)
    {
        $cuenta = 0;
        $sql = "SELECT count(*) as 'Cuenta' FROM `avisos` where chasis='$chasis';";
        $this->Consulta($sql, $this->param);
        $cuenta = $this->datos[0][0];
        return $cuenta;
    }
    function getCuentaAvisosCliente($idCliente)
    { {
            $sql = "SELECT COUNT(*) FROM avisos WHERE idcliente=$idCliente;";
            $this->Consulta($sql, $this->param);
            $cuenta = $this->datos[0][0];
            return $cuenta;
        }
    }
    function getAvisosPendientesPorProductor($productor)
    {
        $sql = "SELECT * FROM avisos WHERE finalizado = 0 and productor=$productor ORDER BY 'fechainicio'";
        $this->Consulta($sql, $this->param); //le pasamos los datos a la funcion de la clase padre
        if ($this->datos) {
            //    unset( $this->listado);
            foreach ($this->datos as $aviso) { //recorremos los datos obtenidos.
                $this->incidence = new Aviso();

                $this->incidence->__set('id', $aviso['id']);
                $this->incidence->__set('idCliente', $aviso['idcliente']);
                $this->incidence->__set('chasis', $aviso['chasis']);
                $this->incidence->__set('averia', $aviso['averia']);
                $this->incidence->__set('productor', $aviso['productor']);
                $this->incidence->__set('finalizado', $aviso['finalizado']);
                $this->incidence->__set('fechaInicio', $aviso['fechainicio']);
                $this->incidence->__set('fechaFin', $aviso['fechafin']);
                $this->incidence->__set('resolucion', $aviso['resolucion']);
                $this->incidence->__set('presupuesto', $aviso['presupuesto']);
                $this->incidence->__set('aceptado', $aviso['aceptado']);
                $this->incidence->__set('prioridad', $aviso['prioridad']);

                $this->listado[] = $this->incidence;
            }
        }
    }
    function setEndAviso($idAviso)
    {
        $fechaFin = date("Y-m-d H:i:s");
        $sql = "UPDATE avisos SET finalizado = 1, fechafin = '$fechaFin' WHERE id = $idAviso;";

        $this->ConsultaSimple($sql, $this->param);
    }
    function getAvisosPorAnio($year)
    {
        $sql = "SELECT productor, COUNT(*) as TOTAL 
        FROM avisos WHERE YEAR(fechainicio) = $year 
        AND PRODUCTOR>899 GROUP BY productor;";
        $this->Consulta($sql, $this->param);
        $cuenta = [];
        foreach ($this->datos as $row) {
            $cuenta[$row['productor']] = $row['TOTAL'];
        }

        return $cuenta;
    }
    function getAvisosPorMeses($year)
    {
        $sql = "SELECT MONTH(fechainicio) AS mes, COUNT(*) AS TOTAL
                FROM avisos
                WHERE YEAR(fechainicio) = YEAR(CURDATE())
                GROUP BY MONTH(fechainicio)
                ORDER BY MONTH(fechainicio);";
        $this->Consulta($sql, $this->param);
        $cuenta = [];
        foreach ($this->datos as $row) {
            $cuenta[$row['mes']] = $row['TOTAL'];
        }

        return $cuenta;
    }
    function getAvisosLastFiveYears()
    {
        $sql = "SELECT COUNT(*) as TOTAL, YEAR(fechainicio) as AÑO 
        FROM avisos WHERE YEAR(fechainicio) 
        BETWEEN YEAR(CURDATE()) - 5 AND YEAR(CURDATE()) 
        GROUP BY YEAR(fechainicio);
";
        $this->Consulta($sql, $this->param);
        $cuenta = [];
        foreach ($this->datos as $row) {
            $cuenta[$row['AÑO']] = $row['TOTAL'];
        }
        return $cuenta;
    }
}
