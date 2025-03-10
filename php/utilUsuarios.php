<?php
require_once('daoUsuario.php');
$daoUsuario = new DaoUsuario();

if (isset($_POST['username']) && isset($_POST['pass'])) {
    $user = new Usuario();
    $username = $_POST['username'];
    $pass = $_POST['pass'];
    $user->__set('username', $username);
    $user->__set('pass', $pass);
    $daoUsuario->getUser($user);

    if ($daoUsuario->user) {
        session_start(); //iniciamos la sesion en el servidor y le pasamos los paramtros del id y el nombre de usuario
        $_SESSION['user_id'] = $daoUsuario->user->__get('id'); // Almacena el ID del usuario en la sesión
        $_SESSION['username'] = $daoUsuario->user->__get('username'); // Almacena el nombre de usuario en la sesión
        $_SESSION['rol'] = $daoUsuario->user->__get('rol'); // Almacena el rol de usuario en la sesión

        echo json_encode(["status" => "success", "user" => $daoUsuario->user]);
    } else {
        echo json_encode(["status" => "error", "message" => "Credenciales incorrectas " . $username . " " . $pass]);
    }
} else if (isset($_POST['addUser'])) {
    $control = false;
    $usuario = new Usuario();
    $jsonObj = $_POST['addUser'];
    // echo $jsonObj;
    $data = json_decode($jsonObj);
    // var_dump($data);

    $username = $data->username;
    $pass = $data->pass;
    $rol = $data->rol;
    $baja = $data->baja;

    $usuario->__set('username', $username);
    $usuario->__set('pass', $pass);
    $usuario->__set('rol', $rol);
    $usuario->__set('baja', $baja);

    // var_dump($daoUsuario->getUser($usuario));

    if ($daoUsuario->getUser($usuario) == false) {
        $daoUsuario->addUser($usuario);
        // $control=true;

        echo "true";
        // echo "Usuario " . $usuario->__get('username') . " añadido con éxito";
        // return $control;
    } else {
        echo "false";
        // echo "El usuario " . $usuario->__get('username') . " ya está en el sistema.";
        // return $control;
    }
} else if (isset($_POST['updateUsuario'])) {
    $usuario = new Usuario();
    $jsonObj = $_POST['updateUsuario'];
    $data = json_decode($jsonObj);
    $id = $data->id;
    $username = $data->username;
    // $pass = $data->pass;
    $rol = $data->rol;
    $baja = $data->baja;

    $usuario->__set('id', $id);
    $usuario->__set('username', $username);
    // $usuario->__set('pass', $pass);
    $usuario->__set('rol', $rol);
    $usuario->__set('baja', $baja);

    $daoUsuario->updateUser($usuario);
    $respuesta = "Usuario actualizado php";
    echo $respuesta;
} else if (isset($_POST['updatePass'])) {
    $jsonObj = $_POST['updatePass'];
    $data = json_decode($jsonObj);
    if ($data) {
        $userId = $data->id;
        $pass = $data->pass;
        $daoUsuario->updatePass($userId, $pass);
        $respuesta = "Pass actualizado php";
    }
    echo $respuesta;
} else if (isset($_POST['removeUsuario'])) {
    $id = $_POST['removeUsuario'];
    $daoUsuario->deleteUser($id);
    $respuesta = "Usuario " . $id . " eliminado php";
    echo $respuesta;
} else if (isset($_POST['getListadoUsuarios'])) {
    $daoUsuario->getListadoUsuarios();
    $listado = $daoUsuario->listado;
    $respuesta = json_encode($listado);
    echo $respuesta;
} else if (isset($_POST['getServerSession'])) {
    session_start();
    if (isset($_SESSION['user_id']) && isset($_SESSION['username']) && isset($_SESSION['rol'])) {
        $usuario = new Usuario();
        $usuario->__set('id', $_SESSION['user_id']);
        $usuario->__set('username', $_SESSION['username']);
        $usuario->__set('rol', $_SESSION['rol']);

        echo json_encode($usuario);
    }
} else if (isset($_POST['cerrarSesion'])) {
    session_unset();
    if (isset($_SESSION['user_id']) && isset($_SESSION['username']) && isset($_SESSION['rol'])) {
        $usuario = new Usuario();
        $usuario->__set('id', $_SESSION['user_id']);
        $usuario->__set('username', $_SESSION['username']);
        $usuario->__set('rol', $_SESSION['rol']);

        echo json_encode($usuario);
    } else {
        echo "Se ha cerrado la sesión.";
    }
    // session_destroy();
    echo " Sesión servidor cerrada php";
} else if (isset($_POST['getCuentaUsuarios'])) {
    $cuenta = $daoUsuario->getCuentaUsuarios();
    echo $cuenta;
} else if (isset($_POST['getUsuarioPorId'])) {
    $userId = $_POST['getUsuarioPorId'];
    $daoUsuario->getUsuarioPorId($userId);
    $respuesta = json_encode($daoUsuario->user);
    echo $respuesta;
}

//password_hash
// $2y$10$3K5P0MgD9cSfuzDzMFVKkux7U4BxErkodUVgdzCjnduVMnVPM9L2u
// $2y$10$HNAcoyrUoA4t91Wvqni0duH5mDPeHX9DjZFz5gOns0tD7sQpyxf8i

//sha1 
//a08f08bac39aeae6c9580ade7aa8387b5a0e7428