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
    function addProductor($productor)
    {
        $id = $productor->__get('id');
        $nombre = $productor->__get('nombre');
        $baja = $productor->__get('baja');


        $sql = "INSERT INTO productores (id,nombre,baja)
        VALUES ($id,'$nombre',$baja);";
        $this->ConsultaSimple($sql, $this->param);
    }
    function getProductor($productor)
    {
        $control = false;
        $id = $productor->__get('id');
        $nombre = $productor->__get('nombre');
        $baja = $productor->__get('baja');

        $sql = "SELECT * FROM productores WHERE nombre = '$nombre' and baja ='$baja' or id = $id";
        $this->Consulta($sql, $this->param); //le pasamos los datos a la funcion de la clase padre
        if ($this->datos) {
            foreach ($this->datos as $productor) { //recorremos los datos obtenidos.
                $this->productor = new Productor();
                $this->productor->__set('id', $productor['id']);
                $this->productor->__set('nombre', $productor['nombre']);
                $this->productor->__set('baja', $productor['baja']);
                 $control = true;
            }
        }
        return $control;
    }
    function getProductorPorId($id)
    {
        $control = false;
        
     

        $sql = "SELECT * FROM productores WHERE id = $id";
        $this->Consulta($sql, $this->param); //le pasamos los datos a la funcion de la clase padre
        if ($this->datos) {
            foreach ($this->datos as $productor) { //recorremos los datos obtenidos.
                $this->productor = new Productor();
                $this->productor->__set('id', $productor['id']);
                $this->productor->__set('nombre', $productor['nombre']);
                $this->productor->__set('baja', $productor['baja']);
                 $control = true;
            }
        }
        return $control;
    }
    function updateProductor($productor)
    {
        $id = $productor->__get('id');
        $nombre = $productor->__get('nombre');
        $baja = $productor->__get('baja');
        $sql = "UPDATE productores SET nombre = '$nombre',
        baja = $baja WHERE id = $id;";

        $this->ConsultaSimple($sql, $this->param);
    }
    function updateIdProductor($productor)
    {

        $id = $productor->__get('id');
        $nombre = $productor->__get('nombre');
        $baja = $productor->__get('baja');
        $sql = "UPDATE productores SET id = $id
        WHERE nombre = '$nombre';";

        $this->ConsultaSimple($sql, $this->param);
    }
    function deleteProductor($productorId)
    {
        $sql = "DELETE FROM productores WHERE id = $productorId";
        $this->ConsultaSimple($sql, $this->param);
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
