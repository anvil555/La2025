<?php
require_once('libreriaPDO.php');
require_once('objetos.php');

class DaoProductor extends DB
{
    public $listado = [];
    public $param = [];
    public $productor;
    public function __construct()
    {
        parent::__construct();
    }
    function getListadoProductores()
    {
        $sql = "SELECT * FROM productores ORDER BY id";
        $this->Consulta($sql, $this->param);
        if ($this->datos) {
            foreach ($this->datos as $productor) { //recorremos los datos obtenidos.
                $id = $productor['id'];
                $nombre = $productor['nombre'];
                $baja = $productor['baja'];

                $this->productor = new Productor();

                $this->productor->__set('id', $id);
                $this->productor->__set('nombre', $nombre);
                $this->productor->__set('baja', $baja);

                $this->listado[] = $this->productor;
            }
        }
    }
    function getCuentaProductores()
    {
        $sql = "SELECT COUNT(*) FROM productores";
        $this->Consulta($sql, $this->param);
            $cuenta = $this->datos[0][0];   
        return $cuenta;
    }
}
