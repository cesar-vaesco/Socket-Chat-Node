const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/auth/'
    : 'https://restserver-curso-fher.herokuapp.com/api/auth/';


let usuario = null;
let socket = null;


//Referencias al HTML


const txtIud     = document.querySelector('#txtIud');
const txtMensaje = document.querySelector('#txtMensaje');
const ulUsuarios = document.querySelector('#ulUsuarios');
const ulMensajes = document.querySelector('#ulMensajes');
const btnSalir   = document.querySelector('#btnSalir');



//Validar el token del localstorage

const validarJWT = async () => {

    const token = localStorage.getItem('token') || '';
    if (token.length <= 10) {
        window.location = 'index.html';
        throw new Error('No hay token en el servidor')
    }

    const resp = await fetch(url, {
        headers: { 'x-token': token }
    });

    const { usuario: userDB, token: tokenDB } = await resp.json();
    /*console.log(userDB, tokenDB); */
    localStorage.setItem('token', tokenDB);
    usuario = userDB;

    document.title = usuario.nombre;

    await conectarSocket();


}

const conectarSocket = async () => {

    socket = io({
        'extraHeaders':{
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', () => {
        console.log('Socket onLine');
    });

    socket.on('disconnect', () => {
        console.log('Socket OFFLine');
    });

    socket.on('recibir-mensaje', () => {

    });

    socket.on('usuarios-activos', () => {

    });

    socket.on('mensaje-privado', () => {

    });
}

const main = async () => {

    await validarJWT();

}


main();


/*  */
