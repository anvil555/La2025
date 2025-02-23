<?php
require_once('libreriaPDO.php');
require_once('objetos.php');

class DaoMaquina extends DB
{
    public $listado = [];
    public $param = [];
    public $carretilla;

    public function __construct()
    {
        parent::__construct();
    }
    function addMaquina($maquina)
    {
        $modelo = $maquina->__get('modelo');
        $chasis = $maquina->__get('chasis');
        $cliente = $maquina->__get('cliente');
        $fechaCreacion = $maquina->__get('fechaCreacion');
        $alquiler = $maquina->__get('alquiler');
        $contrato = $maquina->__get('contrato');
        $reaco = $maquina->__get('reaco');
        $baja = $maquina->__get('baja');
        $notas = $maquina->__get('notas');
        $numero = $maquina->__get('numero');


        $sql = "INSERT INTO maquinas (modelo,chasis,cliente,fechacreacion,alquiler,contrato,reaco,baja,notas,numero) 
        VALUES ('$modelo','$chasis','$cliente','$fechaCreacion','$alquiler','$contrato','$reaco','$baja','$notas','$numero');";
        $this->ConsultaSimple($sql, $this->param);
    }
    function compruebaMaquina($chasis)
    {
        $control = false;
        $sql = "SELECT * FROM `maquinas` where chasis = '$chasis';";
        $this->Consulta($sql, $this->param);
        if ($this->datos) {
            $control = true;
        }

        return $control;
    }
    function getListadoMaquinas()
    {
        $sql = "SELECT * FROM maquinas ORDER BY 'chasis'";
        $this->Consulta($sql, $this->param); //le pasamos los datos a la funcion de la clase padre
        if ($this->datos) {
            foreach ($this->datos as $maquina) { //recorremos los datos obtenidos.
                $id = $maquina['id'];
                $modelo = $maquina['modelo'];
                $chasis = $maquina['chasis'];
                $cliente = $maquina['cliente'];
                $fechaCreacion = $maquina['fechacreacion'];
                $alquiler = $maquina['alquiler'];
                $contrato = $maquina['contrato'];
                $reaco = $maquina['reaco'];
                $baja = $maquina['baja'];
                $notas = $maquina['notas'];
                $numero = $maquina['numero'];

                $this->carretilla = new Maquina();

                $this->carretilla->__set('id', $id);
                $this->carretilla->__set('modelo', $modelo);
                $this->carretilla->__set('chasis', $chasis);
                $this->carretilla->__set('cliente', $cliente);
                $this->carretilla->__set('fechaCreacion', $fechaCreacion);
                $this->carretilla->__set('alquiler', $alquiler);
                $this->carretilla->__set('contrato', $contrato);
                $this->carretilla->__set('reaco', $reaco);
                $this->carretilla->__set('baja', $baja);
                $this->carretilla->__set('notas', $notas);
                $this->carretilla->__set('numero', $numero);

                $this->listado[] = $this->carretilla;
            }
        }
    }
    function getMaquinasCliente($idCliente)
    {
        $listadoCliente = [];
        $sql = "SELECT * FROM `maquinas` WHERE cliente = '$idCliente' ORDER BY chasis;";
        $this->Consulta($sql, $this->param);
        if ($this->datos) {
            foreach ($this->datos as $maquina) { //recorremos los datos obtenidos.
                $modelo = $maquina['modelo'];
                $chasis = $maquina['chasis'];
                $cliente = $maquina['cliente'];
                $fechaCreacion = $maquina['fechacreacion'];
                $alquiler = $maquina['alquiler'];
                $contrato = $maquina['contrato'];
                $reaco = $maquina['reaco'];
                $baja = $maquina['baja'];
                $notas = $maquina['notas'];
                $numero = $maquina['numero'];

                $this->carretilla = new Maquina();

                $this->carretilla->__set('modelo', $modelo);
                $this->carretilla->__set('chasis', $chasis);
                $this->carretilla->__set('cliente', $cliente);
                $this->carretilla->__set('fechaCreacion', $fechaCreacion);
                $this->carretilla->__set('alquiler', $alquiler);
                $this->carretilla->__set('contrato', $contrato);
                $this->carretilla->__set('reaco', $reaco);
                $this->carretilla->__set('baja', $baja);
                $this->carretilla->__set('notas', $notas);
                $this->carretilla->__set('numero', $numero);

                $listadoCliente[] = $this->carretilla;
            }

            return $listadoCliente;
        }
    }
    function removeMaquina($id)
    {
        $sql = "DELETE FROM `maquinas` WHERE id = '$id';";
        $this->ConsultaSimple($sql, $this->param);
    }
    function updateMaquina($maquina)
    {
        if ($maquina instanceof Maquina) {
        }
        $id = $maquina->__get('id');
        $modelo = $maquina->__get('modelo');
        $chasis = $maquina->__get('chasis');
        $cliente = $maquina->__get('cliente');
        $fechaCreacion = $maquina->__get('fechaCreacion');
        $alquiler = $maquina->__get('alquiler');
        $contrato = $maquina->__get('contrato');
        $reaco = $maquina->__get('reaco');
        $baja = $maquina->__get('baja');
        $notas = $maquina->__get('notas');
        $numero = $maquina->__get('numero');

        $sql = "UPDATE `maquinas` SET `modelo`='$modelo',`cliente`='$cliente',`chasis`='$chasis',`fechacreacion`='$fechaCreacion',`alquiler`='$alquiler',`contrato`='$contrato',`reaco`='$reaco',`baja`='$baja',`notas`='$notas',`numero`='$numero' WHERE id = '$id';";
        $this->ConsultaSimple($sql, $this->param);
    }
    function getMaquinaPorChasis($chasis)
    {
        $sql = "SELECT * FROM `maquinas` WHERE chasis = '$chasis';";
        $this->Consulta($sql, $this->param);
        if ($this->datos) {
            foreach ($this->datos as $maquina) { //recorremos los datos obtenidos.
                $id = $maquina['id'];
                $modelo = $maquina['modelo'];
                $chasis = $maquina['chasis'];
                $cliente = $maquina['cliente'];
                $fechaCreacion = $maquina['fechacreacion'];
                $alquiler = $maquina['alquiler'];
                $contrato = $maquina['contrato'];
                $reaco = $maquina['reaco'];
                $baja = $maquina['baja'];
                $notas = $maquina['notas'];
                $numero = $maquina['numero'];

                $this->carretilla = new Maquina();

                $this->carretilla->__set('id', $id);
                $this->carretilla->__set('modelo', $modelo);
                $this->carretilla->__set('chasis', $chasis);
                $this->carretilla->__set('cliente', $cliente);
                $this->carretilla->__set('fechaCreacion', $fechaCreacion);
                $this->carretilla->__set('alquiler', $alquiler);
                $this->carretilla->__set('contrato', $contrato);
                $this->carretilla->__set('reaco', $reaco);
                $this->carretilla->__set('baja', $baja);
                $this->carretilla->__set('notas', $notas);
                $this->carretilla->__set('numero', $numero);

                $this->listado[] = $this->carretilla;
            }
        }
    }
    function getCuentaMaquinas()
    {
        $sql = "SELECT COUNT(*) FROM maquinas;";
        $this->Consulta($sql, $this->param);
        $cuenta = $this->datos[0][0];
        return $cuenta;
    }
    function getIdMaquina($chasis)
    {
        $id = 0;
        $sql = "SELECT id FROM maquinas WHERE chasis = '$chasis';";
        $this->Consulta($sql, $this->param);
        if ($this->datos) {
            foreach ($this->datos as $maquina) { //recorremos los datos obtenidos.
                $id = $maquina['id'];
            }
        }
        return $id;
    }
    function busquedaMaquinas($chasis)
    {
        $sql = "SELECT * FROM `maquinas` WHERE chasis LIKE '%$chasis%' OR modelo LIKE '%$chasis%'
        OR cliente IN (SELECT id FROM clientes WHERE nombre LIKE '%$chasis%' 
        OR poblacion LIKE '%$chasis%' 
        OR provincia LIKE '%$chasis%' 
        OR id LIKE '%$chasis%') ORDER BY cliente;";

        $this->Consulta($sql, $this->param);
        if ($this->datos) {
            foreach ($this->datos as $maquina) { //recorremos los datos obtenidos.

                $this->carretilla = new Maquina();

                $this->carretilla->__set('id',  $maquina['id']);
                $this->carretilla->__set('modelo', $maquina['modelo']);
                $this->carretilla->__set('chasis', $maquina['chasis']);
                $this->carretilla->__set('cliente', $maquina['cliente']);
                $this->carretilla->__set('fechaCreacion',  $maquina['fechacreacion']);
                $this->carretilla->__set('alquiler', $maquina['alquiler']);
                $this->carretilla->__set('contrato', $maquina['contrato']);
                $this->carretilla->__set('reaco', $maquina['reaco']);
                $this->carretilla->__set('baja',  $maquina['baja']);
                $this->carretilla->__set('notas', $maquina['notas']);
                $this->carretilla->__set('numero', $maquina['numero']);

                $this->listado[] = $this->carretilla;
            }
        }
    }
    function getCuentaMaquinasCliente($idCliente)
    {
        $sql = "SELECT COUNT(*) FROM maquinas WHERE cliente=$idCliente;";
        $this->Consulta($sql, $this->param);
        $cuenta = $this->datos[0][0];
        return $cuenta;
    }
    function getMaquinaPodIdSQL($idMaquina)
    {
        $sql = "SELECT * FROM `maquinas` WHERE id = '$idMaquina';";
        $this->Consulta($sql, $this->param);
        if ($this->datos) {
            foreach ($this->datos as $maquina) { //recorremos los datos obtenidos.
                $id = $maquina['id'];
                $modelo = $maquina['modelo'];
                $chasis = $maquina['chasis'];
                $cliente = $maquina['cliente'];
                $fechaCreacion = $maquina['fechacreacion'];
                $alquiler = $maquina['alquiler'];
                $contrato = $maquina['contrato'];
                $reaco = $maquina['reaco'];
                $baja = $maquina['baja'];
                $notas = $maquina['notas'];
                $numero = $maquina['numero'];

                $this->carretilla = new Maquina();

                $this->carretilla->__set('id', $id);
                $this->carretilla->__set('modelo', $modelo);
                $this->carretilla->__set('chasis', $chasis);
                $this->carretilla->__set('cliente', $cliente);
                $this->carretilla->__set('fechaCreacion', $fechaCreacion);
                $this->carretilla->__set('alquiler', $alquiler);
                $this->carretilla->__set('contrato', $contrato);
                $this->carretilla->__set('reaco', $reaco);
                $this->carretilla->__set('baja', $baja);
                $this->carretilla->__set('notas', $notas);
                $this->carretilla->__set('numero', $numero);

                $this->listado[] = $this->carretilla;
            }
        }
    }
    function setBajaMaquinasCliente($idCliente)
    {
        $sql = "UPDATE `maquinas` SET `baja` = 1 WHERE cliente = '$idCliente';";
        $this->ConsultaSimple($sql, $this->param);
    }
    function getTopMaquinasAvisos()
    {
        $sql = "SELECT chasis AS CHASIS,count(*) as TOTAL 
        from avisos group by chasis 
        order by TOTAL desc limit 10;
";
        $this->Consulta($sql, $this->param);
        $cuenta = [];
        foreach ($this->datos as $row) {
            $cuenta[$row['CHASIS']] = $row['TOTAL'];
        }
        return $cuenta;
    }
    function getModelos()
    {
        $sql = "SELECT LEFT(modelo, 1) AS MODELO, COUNT(*) AS TOTAL 
        FROM maquinas GROUP BY LEFT(modelo, 1) 
        order by TOTAL desc;";
        $this->Consulta($sql, $this->param);
        $cuenta = [];
        foreach ($this->datos as $row) {
            $cuenta[$row['MODELO']] = $row['TOTAL'];
        }
        return $cuenta;
    }
    function getSeries()
    {
        $sql = "";
    }
}
