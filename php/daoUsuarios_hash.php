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
        // $pass = (hash('sha1', $usuario->__get('password')));
        $pass = password_hash($usuario->__get('pass'),PASSWORD_DEFAULT);

        $rol = $usuario->__get('rol');
        $baja = $usuario->__get('baja');


        $sql = "INSERT INTO usuarios (username,pass,rol,baja)
        VALUES ('$username','$pass','$rol',$baja);";
        $this->ConsultaSimple($sql, $this->param);
    }
    function getUser($user)
    {
        $username = $user->__get('username');
        $pass = trim($user->__get('pass')); // Eliminar espacios en blanco adicionales
        $sql = "SELECT * FROM usuarios WHERE username = ?";
        $params = [$username];
        $this->Consulta($sql, $params); // Le pasamos los datos a la función de la clase padre
    
        if ($this->datos) {
            foreach ($this->datos as $usuario) { // Recorremos los datos obtenidos.
                // Depuración de valores
                echo "Pass ingresado (sin espacios): " . $pass . "\n";
                echo "Hash en base de datos: " . $usuario['pass'] . "\n";
    
                // Verificamos la contraseña usando password_verify
                $hashedPass = password_verify($pass, $usuario['pass']);
                echo "Resultado de password_verify: " . ($hashedPass ? "true" : "false") . "\n";
    
                if ($hashedPass) {
                    $this->user = new Usuario();
                    $this->user->__set('id', $usuario['id']);
                    $this->user->__set('username', $usuario['username']);
                    $this->user->__set('pass', $usuario['pass']);
                    $this->user->__set('rol', $usuario['rol']);
                    $this->user->__set('baja', $usuario['baja']);
                    return $this->user; // Devolvemos el usuario autenticado
                } else {
                    echo "Contraseña incorrecta\n";
                }
            }
        } else {
            echo "Usuario no encontrado\n";
        }
        return null; // Retornamos null si la autenticación falla
    }
    
    
    function updateUser($usuario)
    {
        $id = $usuario->__get('id');
        $username = $usuario->__get('username');
        // $pass = (hash('sha1', $usuario->__get('password')));
        $pass = password_hash($usuario->__get('password'),PASSWORD_DEFAULT);

        $rol = $usuario->__get('rol');
        $baja = $usuario->__get('baja');
        $sql = "UPDATE usuarios SET username = '$username', pass = '$pass',
        rol = '$rol', baja = $baja WHERE id = $id;";

        $this->ConsultaSimple($sql, $this->param);
    }

    function deleteUser($userId){
        $sql = "DELETE FROM usuarios WHERE id = $userId;";
        $this->ConsultaSimple($sql, $this->param);

    }

    function getListadoUsuarios(){
        $sql = "SELECT * FROM `usuarios` order by rol and id desc;"; 
        $this->Consulta($sql, $this->param);
        if ($this->datos) {
            foreach ($this->datos as $usuario) { 
                foreach ($this->datos as $usuario) { //recorremos los datos obtenidos.
                    $this->user = new Usuario();
                    $this->user->__set('id', $usuario['id']);
                    $this->user->__set('username', $usuario['username']);
                    $this->user->__set('password', $usuario['pass']);
                    $this->user->__set('rol', $usuario['rol']);
                    $this->user->__set('baja', $usuario['baja']);
               
                    $this->listado[] = $this->user;

                }
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
                $this->user->__set('password', $usuario['pass']);
                $this->user->__set('rol', $usuario['rol']);
                $this->user->__set('baja', $usuario['baja']);
            }
        }
    }
}
