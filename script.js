



class Usuario {
    constructor(nombre, contraseña) {
        this.nombre = nombre;
        this.contraseña = contraseña;
    }
}

class SistemaUsuarios {
    constructor() {
        // Cargar usuarios desde localStorage al iniciar la clase
        this.usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        this.usuarioActual = null;
    }

    guardarUsuarios() {
        // Guardar la lista de usuarios en localStorage
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }

    registrar(nombre, contraseña) {
        const usuarioExistente = this.usuarios.find(usuario => usuario.nombre === nombre);
        if (!usuarioExistente) {
            this.usuarios.push(new Usuario(nombre, contraseña));
            this.guardarUsuarios(); // Guardar usuarios en localStorage
            alert('Registro exitoso');
            window.location.href = 'index.html'; // Redirige a la página de inicio de sesión
        } else {
            alert('El usuario ya existe');
        }
    }

    iniciarSesion(nombre, contraseña) {
        const usuario = this.usuarios.find(usuario => usuario.nombre === nombre && usuario.contraseña === contraseña);
        if (usuario) {
            this.usuarioActual = usuario;
            localStorage.setItem('usuarioActual', JSON.stringify(usuario)); // Guardar usuario actual en localStorage
            window.location.href = 'game.html'; // Redirige a la página del juego
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    }

    cerrarSesion() {
        this.usuarioActual = null;
        localStorage.removeItem('usuarioActual'); // Eliminar el usuario actual de localStorage
        window.location.href = 'index.html'; // Redirige a la página de inicio de sesión
    }
}

class Juego {
    constructor() {
        this.opciones = ['piedra', 'papel', 'tijeras'];
    }

    jugar(opcionUsuario) {
        const opcionMaquina = this.opciones[Math.floor(Math.random() * 3)];
        const resultado = this.determinarGanador(opcionUsuario, opcionMaquina);
        return `Tu elegiste ${opcionUsuario}. La máquina eligió ${opcionMaquina}. ${resultado}`;
    }

    determinarGanador(opcionUsuario, opcionMaquina) {
        if (opcionUsuario === opcionMaquina) return '¡Es un empate!';
        if (
            (opcionUsuario === 'piedra' && opcionMaquina === 'tijeras') ||
            (opcionUsuario === 'papel' && opcionMaquina === 'piedra') ||
            (opcionUsuario === 'tijeras' && opcionMaquina === 'papel')
        ) {
            return '¡Ganaste!';
        } else {
            return '¡Perdiste!';
        }
    }
}

const sistemaUsuarios = new SistemaUsuarios();
const juego = new Juego();
// Eventos de Registro
if (document.getElementById('register-btn')) {
    document.getElementById('register-btn').addEventListener('click', (event) => {
        event.preventDefault(); // Evita el comportamiento predeterminado de enviar el formulario
        const nombre = document.getElementById('register-username').value;
        const contraseña = document.getElementById('register-password').value;
        if (nombre && contraseña) {
            sistemaUsuarios.registrar(nombre, contraseña);
        } else {
            alert('Por favor, completa todos los campos');
        }
    });
}




// Eventos de Inicio de Sesión
if (document.getElementById('login-btn')) {
    document.getElementById('login-btn').addEventListener('click', () => {
        const nombre = document.getElementById('login-username').value;
        const contraseña = document.getElementById('login-password').value;
        if (nombre && contraseña) {
            sistemaUsuarios.iniciarSesion(nombre, contraseña);
        } else {
            alert('Por favor, completa todos los campos');
        }
    });
}

// Eventos del Juego
if (document.querySelectorAll('.game-btn').length > 0) {
    document.querySelectorAll('.game-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const opcionUsuario = event.target.dataset.choice;
            const resultado = juego.jugar(opcionUsuario);
            document.getElementById('game-result').innerText = resultado;
        });
    });
}

// Evento de Cerrar Sesión
if (document.getElementById('logout-btn')) {
    document.getElementById('logout-btn').addEventListener('click', () => {
        sistemaUsuarios.cerrarSesion();
    });
}