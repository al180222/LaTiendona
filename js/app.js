// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDddSrUFOmZi8aihkW49tAG8NR8tqvLFJM",
    authDomain: "tiendaabarrotes-39dde.firebaseapp.com",
    projectId: "tiendaabarrotes-39dde"
});

const db = firebase.firestore();

firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        window.location.href = "login.html";
    }
});

function showStatistics()
{
    calcularVentas();
    document.getElementById("statistics").style.display = "block";
    document.getElementById("tables").style.display = "none";
    document.getElementsByClassName("dropdown")[0].style.display = "none";
}

function showTables()
{
    calcularVentas();
    document.getElementById("tables").style.display = "block";
    document.getElementById("statistics").style.display = "none";
    document.getElementsByClassName("dropdown")[0].style.display = "block";
}
/*  
'AceitesYGrasas',
'AlimentosDeOrigenAnimal',
'Bebidas saludables',
'Botanas',
'CerealesYTuberculos',
'Cervezas y Cigarros',
'Dulces',
'Enlatados',
'Frutas y verduras',
'Lacteos',
'Leguminosas',
'Refrecos'
*/

let Nombre_1 = document.getElementsByClassName("Nombre-1");
let Disp_1 = document.getElementsByClassName("Disp-1");
let Vend_1 = document.getElementsByClassName("Vend-1");
let Precio_1 = document.getElementsByClassName("Precio-1");
let Prov_1 = document.getElementsByClassName("Prov-1");

let Nombre_2 = document.getElementsByClassName("Nombre-2");
let Disp_2 = document.getElementsByClassName("Disp-2");
let Vend_2 = document.getElementsByClassName("Vend-2");
let Precio_2 = document.getElementsByClassName("Precio-2");
let Prov_2 = document.getElementsByClassName("Prov-2");

let Nombre_3 = document.getElementsByClassName("Nombre-3");
let Disp_3 = document.getElementsByClassName("Disp-3");
let Vend_3 = document.getElementsByClassName("Vend-3");
let Precio_3 = document.getElementsByClassName("Precio-3");
let Prov_3 = document.getElementsByClassName("Prov-3");

let Nombre_4 = document.getElementsByClassName("Nombre-4");
let Disp_4 = document.getElementsByClassName("Disp-4");
let Vend_4 = document.getElementsByClassName("Vend-4");
let Precio_4 = document.getElementsByClassName("Precio-4");
let Prov_4 = document.getElementsByClassName("Prov-4");

let Nombre_5 = document.getElementsByClassName("Nombre-5");
let Disp_5 = document.getElementsByClassName("Disp-5");
let Vend_5 = document.getElementsByClassName("Vend-5");
let Precio_5 = document.getElementsByClassName("Precio-5");
let Prov_5 = document.getElementsByClassName("Prov-5");

let i = 1;
let j = 1;
let categoriaActual = 'a';
let xValue;
let precioActual = 0;

let datosPastel = [];

let idProductos = [['3PMXoENXuID1BBHJoThV', 'R19eSOs2hXqco3O00GjV', 'ZcMK4xFAXg0GUXDqz6K5', 'kWUNBMJvAtyJac2bplAj', 'xjJkL3xapeSg9n2OmYNV'],
                    ['1xJnftjIIbCee4bmjCNJ', 'A9maXtNzJr8KKd2P2PhY', 'D8pxuvYDsc2ktnaTV9GC', 'I8jBBnybDJU37AtGpeoY', 'LoKA7PkF8hMqjdnQlcWz'],
                    ['7rchST6qHF7a4AoqSmyJ', 'DRsMDWLvN10NRurlhdQL', 'OIbY3TGYF2zQahe8L0Ux', 'WhKCuy1b8ptF74dXsogd', 'p9SuvtSuhBHjHfPvErmM'],
                    ['8DK6mpXBVDdvF3OKASk6', 'DlSutli3iVw6t1oBNOPQ', 'a4Hv9AcZDiBWZFuY4DvD', 'gOA729VYPGWUFPSIxUlB', 'hAd8WbbpiBzrx6zAMUB7'],
                    ['Q9NtBL2dilUDFfW0IvmQ', 'XHnnpgEHr5ISp6yaheyj', 'eLliMULB2bHxDAW5fNzW', 'oGI3Rgh2ILHS1fvuwAdP', 'r0kjjRO7T4T9q1XUXAmY'],
                    ['2G56icy9oSxzZmY0NtHs', '9p6TH7qGCTafomE0whO5', 'c3iLGCC2NNYI8l7n9d1n', 'ikmWCX2iA0ZeHo70NPpq', 'wR9vUR1661pYlfokPiRE'],
                    ['8KYRxdqarAAJnxoI0ucx', 'AWJjfuPja60Rjv4NTSE6', 'LdIQ87HxvssFvRUpRFMi', 'gWw2L3KYHbfVkFlMbHYz', 'iId3dGbL2mWjsil7Qz9r'],
                    ['2tifLMykZLcalRZ5X1KI', '3MR2P12BwQldZ4lCdD3B', '4IUkNBPPptbYUjHQu2C5', 'lUB6iFmPjYiu5om0dBja', 'sMR7HMtk11CAbCISN6CG'],
                    ['94yugLxNlaNk0i9LoKH0', 'Nbxf9avSj5zDarhhUZqt', 'PaZflaOku9HcNSQpoEpx', 'YYUSeMYPD1Hh8X0zZrqZ', 'kiHEvuJ7Ffnq8IGqeQkU'],
                    ['6kGbGRwlgFbiCuzfjcdl', 'GCljWYKXmjxBlCcWoFwg', 'WGozk7qdVoPg7abhQVAU', 'hepukEi4QLaD0TzFn2XP', 'r1yhqZFBFo694rF2IxK6'],
                    ['6kMepBRpT3UoUoda68XJ', 'Mc8c6gmWE0cTjGABoPct', 'RvTeFgaeTzuVs1QgcOBv', 'fg40OvwhYZuMLJdxRFoJ', 'lUBDgtjwvWmmk9QPkoqA'],
                    ['2JtLtKXE6i5ly7fIQnff', '7ZTgKjih2g6Wd180e3oD', 'P1I2QUYjIbByMK4W2Iw9', 'PscnucDmd8OhZHAhXwvY', 'u1PPB9Lwg8avJ5DEaSxZ']];              


function showData(a)
{
    calcularVentas();
    categoriaActual = a
    db.collection(a).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            doc.data().Nombre;
            {
                switch (i) {
                    case 1:
                        Nombre_1[0].innerHTML = doc.data().Nombre; Nombre_1[1].innerHTML = doc.data().Nombre;
                        Disp_1[0].innerHTML = doc.data().Disponibles; Disp_1[1].innerHTML = doc.data().Disponibles; 
                        Vend_1[0].innerHTML = doc.data().Vendidos; Vend_1[1].innerHTML = doc.data().Vendidos;
                        Precio_1[0].innerHTML = doc.data().Precio; Precio_1[1].innerHTML = doc.data().Precio;
                        Prov_1[0].innerHTML = doc.data().Proveedor;
                        break;
                    case 2:
                        Nombre_2[0].innerHTML = doc.data().Nombre; Nombre_2[1].innerHTML = doc.data().Nombre;
                        Disp_2[0].innerHTML = doc.data().Disponibles; Disp_2[1].innerHTML = doc.data().Disponibles; 
                        Vend_2[0].innerHTML = doc.data().Vendidos; Vend_2[1].innerHTML = doc.data().Vendidos;
                        Precio_2[0].innerHTML = doc.data().Precio; Precio_2[1].innerHTML = doc.data().Precio;
                        Prov_2[0].innerHTML = doc.data().Proveedor;
                        break;
                    case 3:
                        Nombre_3[0].innerHTML = doc.data().Nombre; Nombre_3[1].innerHTML = doc.data().Nombre;
                        Disp_3[0].innerHTML = doc.data().Disponibles; Disp_3[1].innerHTML = doc.data().Disponibles; 
                        Vend_3[0].innerHTML = doc.data().Vendidos; Vend_3[1].innerHTML = doc.data().Vendidos;
                        Precio_3[0].innerHTML = doc.data().Precio; Precio_3[1].innerHTML = doc.data().Precio;
                        Prov_3[0].innerHTML = doc.data().Proveedor;
                        break;
                    case 4:
                        Nombre_4[0].innerHTML = doc.data().Nombre; Nombre_4[1].innerHTML = doc.data().Nombre;
                        Disp_4[0].innerHTML = doc.data().Disponibles; Disp_4[1].innerHTML = doc.data().Disponibles; 
                        Vend_4[0].innerHTML = doc.data().Vendidos; Vend_4[1].innerHTML = doc.data().Vendidos;
                        Precio_4[0].innerHTML = doc.data().Precio; Precio_4[1].innerHTML = doc.data().Precio;
                        Prov_4[0].innerHTML = doc.data().Proveedor;
                        break;
                    case 5:
                        Nombre_5[0].innerHTML = doc.data().Nombre; Nombre_5[1].innerHTML = doc.data().Nombre;
                        Disp_5[0].innerHTML = doc.data().Disponibles; Disp_5[1].innerHTML = doc.data().Disponibles; 
                        Vend_5[0].innerHTML = doc.data().Vendidos; Vend_5[1].innerHTML = doc.data().Vendidos;
                        Precio_5[0].innerHTML = doc.data().Precio; Precio_5[1].innerHTML = doc.data().Precio;
                        Prov_5[0].innerHTML = doc.data().Proveedor;
                        break;
                }
                i = i + 1;
            }
        });
    });
    i = 1;
}

function calcularVentas()
{
    db.collection("Ventas").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            doc.data().Total;
            {
                switch(j)
                {
                    case 1:
                        datosPastel[0] = doc.data().Total;
                        document.getElementById("cellCantidad-1").innerHTML = doc.data().Total;
                        break;
                    case 2:
                        datosPastel[1] = doc.data().Total;
                        document.getElementById("cellCantidad-2").innerHTML = doc.data().Total;
                        break;
                    case 3:
                        datosPastel[2] = doc.data().Total;
                        document.getElementById("cellCantidad-3").innerHTML = doc.data().Total;
                        break;
                    case 4:
                        datosPastel[3] = doc.data().Total;
                        document.getElementById("cellCantidad-4").innerHTML = doc.data().Total;
                        break;
                    case 5:
                        datosPastel[4] = doc.data().Total;
                        document.getElementById("cellCantidad-5").innerHTML = doc.data().Total;
                        break;
                    case 6:
                        datosPastel[5] = doc.data().Total;
                        document.getElementById("cellCantidad-6").innerHTML = doc.data().Total;
                        break;
                    case 7:
                        datosPastel[6] = doc.data().Total;
                        document.getElementById("cellCantidad-7").innerHTML = doc.data().Total;
                        break;
                    case 8:
                        datosPastel[7] = doc.data().Total;
                        document.getElementById("cellCantidad-8").innerHTML = doc.data().Total;
                        break;
                    case 9:
                        datosPastel[8] = doc.data().Total;
                        document.getElementById("cellCantidad-9").innerHTML = doc.data().Total;
                        break;
                    case 10:
                        datosPastel[9] = doc.data().Total;
                        document.getElementById("cellCantidad-10").innerHTML = doc.data().Total;
                        break;
                    case 11:
                        datosPastel[10] = doc.data().Total;
                        document.getElementById("cellCantidad-11").innerHTML = doc.data().Total;
                        break;
                    case 12:
                        datosPastel[11] = doc.data().Total;
                        document.getElementById("cellCantidad-12").innerHTML = doc.data().Total;
                        break;
                    case 13:
                        document.getElementById("ventasTotales").innerHTML = doc.data().Total;
                        break;
                }
                j = j + 1;
            }
        });
    });
    j = 1;

    return;
}
function modifyData(b,c)
{
    if(categoriaActual == 'AceitesYGrasas')
        xValue = 0;
    else if(categoriaActual == 'AlimentosDeOrigenAnimal')
        xValue = 1;
    else if(categoriaActual == 'Bebidas saludables')
        xValue = 2;
    else if(categoriaActual == 'Botanas')
        xValue = 3;   
    else if(categoriaActual == 'CerealesYTuberculos')
        xValue = 4;
    else if(categoriaActual == 'Cervezas y Cigarros')
        xValue = 5;
    else if(categoriaActual == 'Dulces')
        xValue = 6;
    else if(categoriaActual == 'Enlatados')
        xValue = 7;
    else if(categoriaActual == 'Frutas y verduras')
        xValue = 8;
    else if(categoriaActual == 'Lacteos')
        xValue = 9;
    else if(categoriaActual == 'Leguminosas')
        xValue = 10;
    else if(categoriaActual == 'Refrecos')
        xValue = 11;

    if(c == 1)
    {
        closeErrorDiv();
        db.collection(categoriaActual).doc(idProductos[xValue][b-1]).update({
            Disponibles: firebase.firestore.FieldValue.increment(1),
        })
        .then(function() {
            //showData(categoriaActual);
            let classname = "Disp-" + b.toString();
            var docRef = db.collection(categoriaActual).doc(idProductos[xValue][b-1]);

            docRef.get().then(function(doc) {
                if (doc.exists) {
                    document.getElementsByClassName(classname)[0].innerHTML = doc.data().Disponibles;
                    document.getElementsByClassName(classname)[1].innerHTML = doc.data().Disponibles;
                } else {
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
            calcularVentas();
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }

    if(c == 2)
    {
        closeErrorDiv();
        let classname = "Disp-" + b.toString();
        if(document.getElementsByClassName(classname)[0].textContent == "0" || document.getElementsByClassName(classname)[1].textContent == "0")
        {
            document.getElementById("errorDivMessage").innerHTML = "No hay más productos de este tipo para vender";
            openErrorDiv();
        }
        else 
        {
            let idcell = "Precio-" + b.toString();

            db.collection(categoriaActual).doc(idProductos[xValue][b-1]).update({
                Disponibles: firebase.firestore.FieldValue.increment(-1),
                Vendidos: firebase.firestore.FieldValue.increment(1),
            })
            .then(function() {
                console.log("Venta hecha");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });

            db.collection("Ventas").doc(categoriaActual).update({
                Total: firebase.firestore.FieldValue.increment(parseInt(document.getElementsByClassName(idcell)[0].textContent)),
            })
            .then(function() {
                console.log("Venta registrada");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });

            db.collection("Ventas").doc("TotalVentas").update({
                Total: firebase.firestore.FieldValue.increment(parseInt(document.getElementsByClassName(idcell)[0].textContent)),
            })
            .then(function() {
                let classname1 = "Disp-" + b.toString();
                let classname2 = "Vend-" + b.toString();
                var docRef = db.collection(categoriaActual).doc(idProductos[xValue][b-1]);
    
                docRef.get().then(function(doc) {
                    if (doc.exists) {
                        document.getElementsByClassName(classname1)[0].innerHTML = doc.data().Disponibles;
                        document.getElementsByClassName(classname2)[0].innerHTML = doc.data().Vendidos;
                        document.getElementsByClassName(classname1)[1].innerHTML = doc.data().Disponibles;
                        document.getElementsByClassName(classname2)[1].innerHTML = doc.data().Vendidos;
                    } else {
                        console.log("No such document!");
                    }
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });
                calcularVentas();
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        }
        calcularVentas();
    }

    if(c == 3)
    {
        document.getElementById("inputDiv").style.display = "block";
        precioActual = b;

        closeErrorDiv()
    }

    if(c == 4)
    {
        closeErrorDiv();
        let classname = "Disp-" + b.toString();
        if(document.getElementsByClassName(classname)[0].textContent == "0" || document.getElementsByClassName(classname)[1].textContent == "0")
        {
            document.getElementById("errorDivMessage").innerHTML = "No hay productos de este tipo para retirar";
            openErrorDiv();
        }
        else 
        {
            db.collection(categoriaActual).doc(idProductos[xValue][b-1]).update({
                Disponibles: firebase.firestore.FieldValue.increment(-1),
            })
            .then(function() {
                var docRef = db.collection(categoriaActual).doc(idProductos[xValue][b-1]);
    
                docRef.get().then(function(doc) {
                    if (doc.exists) {
                        document.getElementsByClassName(classname)[0].innerHTML = doc.data().Disponibles;
                        document.getElementsByClassName(classname)[1].innerHTML = doc.data().Disponibles;
                    } else {
                        console.log("No such document!");
                    }
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });
                calcularVentas();
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        }
    }

    if(c == 5)
    {
        closeErrorDiv();
        let classname = "Vend-" + b.toString();
        if(document.getElementsByClassName(classname)[0].textContent == "0" || document.getElementsByClassName(classname)[1].textContent == "0")
        {
            document.getElementById("errorDivMessage").innerHTML = "No se pueden devolver ventas de este producto";
            openErrorDiv();
        }
        else 
        {
            let idcell = "Precio-" + b.toString();

            db.collection(categoriaActual).doc(idProductos[xValue][b-1]).update({
                Disponibles: firebase.firestore.FieldValue.increment(1),
                Vendidos: firebase.firestore.FieldValue.increment(-1),
            })
            .then(function() {
                console.log("Venta devuelta");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });

            db.collection("Ventas").doc(categoriaActual).update({
                Total: firebase.firestore.FieldValue.increment(-1 * parseInt(document.getElementsByClassName(idcell)[0].textContent)),
            })
            .then(function() {
                console.log("Venta devuelta registrada");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });

            db.collection("Ventas").doc("TotalVentas").update({
                Total: firebase.firestore.FieldValue.increment(-1 * parseInt(document.getElementsByClassName(idcell)[0].textContent)),
            })
            .then(function() {
                let classname1 = "Disp-" + b.toString();
                let classname2 = "Vend-" + b.toString();
                var docRef = db.collection(categoriaActual).doc(idProductos[xValue][b-1]);
    
                docRef.get().then(function(doc) {
                    if (doc.exists) {
                        document.getElementsByClassName(classname1)[0].innerHTML = doc.data().Disponibles;
                        document.getElementsByClassName(classname1)[1].innerHTML = doc.data().Disponibles;
                        document.getElementsByClassName(classname2)[0].innerHTML = doc.data().Vendidos;
                        document.getElementsByClassName(classname2)[1].innerHTML = doc.data().Vendidos;
                    } else {
                        console.log("No such document!");
                    }
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });
                calcularVentas();
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });           
        }
    }
    calcularVentas();
}

function changePrice(event)
{
    if(event.keyCode == 13)
    {
        if(document.getElementById("precioInput").value <= 0)
        {
            document.getElementById("errorDivMessage").innerHTML = "El precio no puede ser menor o igual a 0";
            openErrorDiv();
        }
        else
        {
            db.collection(categoriaActual).doc(idProductos[xValue][precioActual-1]).update({
                Precio: document.getElementById("precioInput").value,
            })
            .then(function() {    
                document.getElementById("precioInput").value = "";
                document.getElementById("inputDiv").style.display = "none";
                showData(categoriaActual);
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            })
        }
    }
}

function closeInputDiv()
{
    document.getElementById("inputDiv").style.display = "none";
    document.getElementById("precioInput").value = "";
}

function openErrorDiv()
{
    document.getElementById("errorDiv").style.display = "block";
}

function closeErrorDiv()
{
    document.getElementById("errorDiv").style.display = "none";
}

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Aceites y grasas', 'Alimentos de origen animal', 'Bebidas saludables', 
                'Botanas', 'Cereales y tuberculos', 'Cervezas y cigarros', 'Dulces', 'Enlatados', 
                'Frutas y verduras', 'Lacteos', 'Leguminosas', 'Refrescos'],
        datasets: [{
            label: '# de ventas',
            data: datosPastel,
            backgroundColor: [
                '#008000',
                '#FF0000',
                '#800000',
                '#FFFF00',
                '#808000',
                '#00FF00',
                '#00FFFF',
                '#008080',
                '#0000FF',
                '#000080',
                '#FF00FF',
                '#800080'
            ],
            borderColor: [
                '#008000',
                '#FF0000',
                '#800000',
                '#FFFF00',
                '#808000',
                '#00FF00',
                '#00FFFF',
                '#008080',
                '#0000FF',
                '#000080',
                '#FF00FF',
                '#800080'
            ],
            borderWidth: 1
        }]
    }
});

function logOut(){
    firebase.auth().signOut().then(function(){
        console.log('Se salio de la sesion');   
    })
    .catch(function(){
    });
}