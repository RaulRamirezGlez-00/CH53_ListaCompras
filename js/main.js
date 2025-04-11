//definir dos variables para cada elemento a validar
//id=variable
//si en un imput pido valor. trim es para quitar los espacios

const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0); //tagName contiene varios elementos, por eso se usa item; para especificar el elemento
const contadorProductos = document.getElementById("contadorProductos");
const totalProductos = document.getElementById("totalProductos");
const productosTotal = document.getElementById("productosTotal");
const btnClear = document.getElementById("btnClear");

// Numeracion de la primera columna de la tabla
let cont = 0;
let costoTotal = 0;
let totalEnProductos = 0;
let datos = []; //new Array();

function validarCantidad(){
    if(txtNumber.value.trim().length<=0){
        return false;
    } //leght<=0

    if(isNaN(txtNumber.value)){
        return false;
    }//isNaN

    if(Number(txtNumber.value)<=0){ //lo convierte en numero y tiene que ser mayor o igual a 0
        return false;
    }

    return true;
} //ValidarCantidad

//precio por producto al azar

function getPrecio(){
    return Math.round((Math.random() *10000)) / 100;
    
};

// Validar el nombre
btnAgregar.addEventListener("click", function(event){
    event.preventDefault();

    let isValid = true; // benadera para verificar que las validaciones se cumplen 

    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtName.style.border="";
    txtNumber.style.border="";
    
    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    if(txtName.value.length <3 ){
        txtName.style.border="solid medium red";
        alertValidacionesTexto.innerHTML="<strong>El Nombre del producto no es correcto </strong>";
        alertValidaciones.style.display="block";
        isValid=false; //Es falso cuando no cumple las validaciones
    } //leght>=3

    if(! validarCantidad()){
        txtNumber.style.border="solid medium red";
        alertValidacionesTexto.innerHTML +="<br/><strong>La cantidad no es correcta</strong>"; //Trae los dos textos si ambos estan mal
        alertValidaciones.style.display="block";
        isValid=false;
    } //validarCantidad

    if(isValid){ //si paso las validaciones
        cont++;
        let precio = getPrecio();
        let row = `<tr>
                     <td>${cont}</td>
                     <td>${txtName.value}</td>
                     <td>${txtNumber.value}</td>
                     <td>${precio}</td>
                    </tr>`;
            let elemento = { // Se crea un objeto "nombre": valor. Es formato JSON
                "cont" : cont,
                "nombre" : txtName.value,
                "cantidad" : txtNumber.value,
                "precio" : precio
            };
        datos.push(elemento); // El objeto se guarda en el array

        localStorage.setItem("datos", JSON.stringify(datos)); // Guarda el array en el local storage en string
         
        cuerpoTabla.insertAdjacentHTML("beforeend", row); // Añade celddas nuevas hacia abajo
        
        contadorProductos.innerText = cont;
       costoTotal+= precio * Number (txtNumber.value);
       precioTotal.innerText = "$" + costoTotal.toFixed(2);
       totalEnProductos+= Number (txtNumber.value);
       productosTotal.innerText = totalEnProductos;
       
        txtName.value = "";
        txtNumber.value = ""; 
        txtName.focus(); // El puntero parpade en el name 
    };
});


window.addEventListener("load", function(event){
    event.preventDefault();
    
    if(localStorage.getItem("datos")!=null){
        datos = JSON.parse(localStorage.getItem("datos"));
    }

    datos.forEach((d) =>{
        let row = `<tr>
                     <td>${d.cont}</td>
                     <td>${d.nombre}</td>
                     <td>${d.cantidad}</td>
                     <td>${d.precio}</td>
                     </tr>`
            cuerpoTabla.insertAdjacentHTML("beforeend", row);
    });

    if(this.localStorage.getItem("resumen")!=null){
        let resumen = JSON.parse(this.localStorage.getItem("resumen"));

        costoTotal = resumen.costoTotal;
        totalEnProductos = resumen.totalEnProductos;
        cont = resumen.cont;
    }
    precioTotal.innerText = "$" + costoTotal.toFixed(2);
    productosTotal.innerText = totalEnProductos;
    contadorProductos.innerText = cont;
    
});

// Funcion para limpiar todo (resumen, datos, campo y agregar alerta)
btnClear.addEventListener("click", function(event){
    event.preventDefault();

localStorage.clear();

location.reload();

})
