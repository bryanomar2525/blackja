let mazo = [] 
let figuras = ["C", "D", "H", "S"]
let alfabeticos = ["A", "J", "Q", "K"]
let cartas_jugador =[]
let valores_jugador = []
let puntucion_jugador = 0

// Variables para la PC (respetando tu mismo estilo)
let valores_pc = []
let puntuacion_pc = 0

const boton_iniciar_juego = document.getElementById("boton_juego_nuevo");
const boton_pedir = document.getElementById("boton_pedir_carta")
const boton_parar = document.getElementById("boton_parar") // Agregamos tu tercer botón
const mesa_jugador = document.getElementById("cartas_jugador")
const mesa_pc = document.getElementById("cartas_pc") // Agregamos la mesa de la PC

const suma = (cartas_suma)=>{
    //v_carta = cartas_suma[0]
    let bandera_as = 0
    let valores_suma = 0
    cartas_suma.map((carta)=>{
        let valor = parseInt(carta)

        if(valor){
            console.log(valor)
            valores_suma = valores_suma + valor
        }
        else{
            if (carta[0]=='A'){
                bandera_as = 1
                }else{
                console.log("EL valor no es númerico")
                valores_suma = valores_suma + 10
            }
        }
        if(bandera_as==1){
            if ((valores_suma+11)<21)
                valores_suma = valores_suma + 11
            else
                valores_suma = valores_suma + 1
        }
        console.log(`la suma es ${valores_suma}`)
    })
    return valores_suma
}

const crear_mazo = ()=>{
    mazo = []
    for (let figura of figuras) {
        for(let valor=2; valor<=10; valor++){
            mazo.push(`${valor}${figura}`)
            //console.log(`${valor}${figura}`)
        }
    }
    for (let figura of figuras) {
        for(let alfabetico of alfabeticos){
            mazo.push(`${alfabetico}${figura}`)
        }
    }
    
    mazo = _.shuffle(mazo)
    console.log(mazo)

    // Limpiamos las cartas del jugador
    valores_jugador.map((carta_mesa)=>{
     const carta_eliminar = document.getElementById(carta_mesa)
     if (carta_eliminar) carta_eliminar.remove()
    })

    // Limpiamos las cartas de la PC de la misma manera
    valores_pc.map((carta_mesa)=>{
     const carta_eliminar = document.getElementById(carta_mesa)
     if (carta_eliminar) carta_eliminar.remove()
    })

    cartas_jugador =[]
    valores_jugador = []
    puntucion_jugador = 0

    // Reiniciamos los datos de la PC para el juego nuevo
    valores_pc = []
    puntuacion_pc = 0

    return mazo
}

const pedir_carta =()=>{
    //ToDo: Dibujar la carta.
    carta = mazo.pop()
    valores_jugador.push(carta)
    const carta_img = document.createElement("img");
    carta_img.setAttribute ("src", `cartas/${carta}.png`) // Ruta corregida
    carta_img.setAttribute("id",`${carta}`)
    carta_img.setAttribute("class","carta")
    mesa_jugador.append(carta_img);
    puntucion_jugador = suma(valores_jugador)
    if (puntucion_jugador>21){
        alert("Has perdido!!!")
    }
    //console.log(mazo);
    //console.log(valores_jugador);
}

// Función para que la PC juegue automáticamente al presionar Parar
const parar = ()=>{
    // La PC pide cartas automáticamente mientras tenga menos de 17 puntos
    while (puntuacion_pc < 17 && puntucion_jugador <= 21) {
        let carta_pc = mazo.pop()
        valores_pc.push(carta_pc)

        const carta_img = document.createElement("img");
        carta_img.setAttribute("src", `cartas/${carta_pc}.png`);
        carta_img.setAttribute("id", `${carta_pc}`);
        carta_img.setAttribute("class", "carta");
        mesa_pc.append(carta_img);

        puntuacion_pc = suma(valores_pc)
    }

    // Comparamos los resultados finales
    if (puntuacion_pc > 21) {
        alert("¡Ganaste! La PC se pasó de 21")
    } else if (puntuacion_pc > puntucion_jugador) {
        alert("Gana la PC")
    } else if (puntucion_jugador > puntuacion_pc) {
        alert("¡Ganaste tú!")
    } else {
        alert("Es un empate")
    }
}

boton_iniciar_juego.addEventListener("click",crear_mazo);
boton_pedir.addEventListener("click", pedir_carta);
boton_parar.addEventListener("click", parar); // Conectamos tu tercer botón

