<?php
require_once('libreriaPDO.php');
require_once('objetos.php');

class DaoUsuario extends DB
{

    public $listado = [];
    public $param = [];
    public $user;

    public function __construct()
    {
        parent::__construct();
    }

    function addUser($usuario)
    {
        $username = $usuario->__get('username');
        $pass = hash('sha1', $usuario->__get('pass'));
        $rol = $usuario->__get('rol');
        $baja = $usuario->__get('baja');


        $sql = "INSERT INTO usuarios (username,pass,rol,baja)
        VALUES ('$username','$pass','$rol',$baja);";
        $this->ConsultaSimple($sql, $this->param);
    }

    function getUser($usuario)
    {   $control = false;
        $username = $usuario->__get('username');
        $pass = (hash('sha1', $usuario->__get('pass')));
        $sql = "SELECT * FROM usuarios WHERE username = '$username' and pass ='$pass'";
        $this->Consulta($sql, $this->param); //le pasamos los datos a la funcion de la clase padre
        if ($this->datos) {
            foreach ($this->datos as $usuario) { //recorremos los datos obtenidos.
                $this->user = new Usuario();
                $this->user->__set('id', $usuario['id']);
                $this->user->__set('username', $usuario['username']);
                $this->user->__set('pass', $usuario['pass']);
                $this->user->__set('rol', $usuario['rol']);
                $this->user->__set('baja', $usuario['baja']);
               $control=true;
            }
        }
        return $control;
    }
    function updateUser($usuario)
    {
        $id = $usuario->__get('id');
        $username = $usuario->__get('username');
        // $pass = (hash('sha1', $usuario->__get('pass')));
        $rol = $usuario->__get('rol');
        $baja = $usuario->__get('baja');
        $sql = "UPDATE usuarios SET username = '$username',
        rol = '$rol', baja = $baja WHERE id = $id;";

        $this->ConsultaSimple($sql, $this->param);
    }
    function updatePass($id, $pass){
        $hashedPass = hash('sha1', $pass);
        $sql = "UPDATE usuarios SET pass = '$hashedPass' WHERE id = $id;";

        $this->ConsultaSimple($sql, $this->param);
    }
    function deleteUser($userId){
        $sql = "DELETE FROM usuarios WHERE id = $userId;";
        $this->ConsultaSimple($sql, $this->param);

    }
    function getListadoUsuarios(){
        $sql = "SELECT * FROM `usuarios` order by rol asc, username asc;"; 
        $this->Consulta($sql, $this->param);
        if ($this->datos) {
                
                foreach ($this->datos as $usuario) { //recorremos los datos obtenidos.
                    $this->user = new Usuario();
                    $this->user->__set('id', $usuario['id']);
                    $this->user->__set('username', $usuario['username']);
                    $this->user->__set('pass', $usuario['pass']);
                    $this->user->__set('rol', $usuario['rol']);
                    $this->user->__set('baja', $usuario['baja']);
               
                    $this->listado[] = $this->user;

                }
            
        }
    }
    function getUsuarioPorId($id){
        $sql = "SELECT * FROM usuarios WHERE id= $id;";
        $this->Consulta($sql, $this->param); //le pasamos los datos a la funcion de la clase padre
        if ($this->datos) {
            foreach ($this->datos as $usuario) { //recorremos los datos obtenidos.
                $this->user = new Usuario();
                $this->user->__set('id', $usuario['id']);
                $this->user->__set('username', $usuario['username']);
                // $this->user->__set('pass', $usuario['pass']);
                $this->user->__set('rol', $usuario['rol']);
                $this->user->__set('baja', $usuario['baja']);
            }
        }
    }    
    function getCuentaUsuarios()
    {
        $sql = "SELECT COUNT(*) FROM usuarios";
        $this->Consulta($sql, $this->param);
            $cuenta = $this->datos[0][0];   
        return $cuenta;
    }
}
