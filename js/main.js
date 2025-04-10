const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
const tablaListasCompras = document.getElementById("tablaListasCompras");
const cuerpoTabla = tablaListasCompras.getElementsByTagName("tbody").item(0);

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("preoductosTotal");
const precioTotal = document.getElementById("precioTotal");

// Numeracion de la primera columna de la tabla
let cont = 0;
let costoTotal = 0;
let totalEnProductos = 0;

function validarCantidad(){
    if(txtNumber.value.trim().length<=0){
        return false;
    } //leght<=0

    if(isNaN(txtNumber.value)){
        return false;
    }//isNaN

    
    //Numero
    //Mayor de 0
    return true;
} //ValidarCantidad

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();

    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtName.style.border="";
    txtNumber.style.border="";
    
    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    if(txtName.value.length <= 3 ){
        txtName.style.border="solid medium red";
        alertValidacionesTexto.innerHTML="<strong>El Nombre del producto no es correcto </strong>";
        alertValidaciones.style.display="block";
    } //leght>=3

    if(! validarCantidad()){
        txtNumber.style.border="solid medium red";
        alertValidacionesTexto.innerHTML +="<br/>La cantidad no es correcta</strong>";
        alertValidaciones.style.display="block";

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
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        costoTotal += precio * Number(txtNumber.value);
        precioTotal.innerText = "$ " + costoTotal.toFixed(2);
        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;
        
        contadorProductos.innerText = cont;
        
        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();
    }//if isValid

}) //btnAgregar