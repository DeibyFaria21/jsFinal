/* let productosCategoría = [] */

let dentroCarrito = JSON.parse(localStorage.getItem("productosElegidos")) || [];

let divTarjetas = document.getElementsByClassName("cajaTarjetas");
let contenidoCarrito = document.getElementById("contenidoCarrito");
contenidoCarrito.className = "contenidoCarritoHtml";

    let encabezadoTarjetas = document.createElement("h2");
    encabezadoTarjetas.innerHTML = ("Teclados Full Size<br>Mecánicos y Membrana");
    encabezadoTarjetas.className = "encabezadoTarjetas"
    divTarjetas[0].appendChild(encabezadoTarjetas);


fetch("productos.json")
    .then(response => response.json())
    .then(data => {
    data.forEach((teclado) => {
    let tarjeta = document.createElement("div");
    tarjeta.setAttribute("class","card col-md-3 m-3");
    divTarjetas[0].appendChild(tarjeta);

        let tarjetaImagen = document.createElement("img");
        tarjetaImagen.setAttribute("class","card-img-top mt-3 mb-3 border border-2 border-dark");
        tarjetaImagen.setAttribute("src",teclado.imagen);
        tarjeta.appendChild(tarjetaImagen);

        let tarjetaTitulo = document.createElement("h4");
        tarjetaTitulo.setAttribute("class","card-title text-center");
        tarjetaTitulo.innerText = (teclado.nombre);
        tarjeta.appendChild(tarjetaTitulo);

        let tarjetaParrafo = document.createElement("p");
        tarjetaParrafo.setAttribute("class","card-text text-center mt-2");
        tarjetaParrafo.innerText = (teclado.descripcion);
        tarjeta.appendChild(tarjetaParrafo);

        let tarjetaPrecio = document.createElement("h5");
        tarjetaPrecio.setAttribute("class","card-title text-center");
        tarjetaPrecio.innerText = ("$ " + teclado.valor);
        tarjeta.appendChild(tarjetaPrecio);

        let botonAgregar = document.createElement("button");
        botonAgregar.className = "botonAgregar";
        botonAgregar.innerText = "Agregar al carrito";
        tarjeta.appendChild(botonAgregar);

                
        botonAgregar.addEventListener("click", () => {
            const index = dentroCarrito.findIndex((producto) => producto.id === teclado.id);
            if (index !== -1) {
                dentroCarrito[index].cantidad++;
            } else {
                dentroCarrito.push({
                    imagen: teclado.imagen,
                    id: teclado.id,
                    titulo: teclado.nombre,
                    valor: teclado.valor,
                    cantidad: 1
                });
            }

            refreshCarrito();
            guardadoTemporal();
            Toastify({
                text: "Producto agregado...",
                    offset: {
                    x: 20, 
                    y: 210,
                    },
                    duration: 1500,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "top", 
                    position: "right", 
                    stopOnFocus: true, 
                    style: {
                        borderRadius: "10px",
                        background: "#147550",                        
                    },
                }).showToast();
                console.log(dentroCarrito);
            })
        })
    })
    
    
    let botonCarrito = document.querySelector(".botonCarrito");
    
    botonCarrito.addEventListener("click", () => {
        refreshCarrito();
    });


    function refreshCarrito(){
    contenidoCarrito.innerHTML = "";
    contenidoCarrito.style.display = "block";
    const contenidoCarritoTitulo = document.createElement("div");
    contenidoCarritoTitulo.setAttribute("class","tituloCarrito");
    contenidoCarritoTitulo.innerHTML = "<h2>Productos Aregados al Carrito de Compra</h2>";
    contenidoCarrito.appendChild(contenidoCarritoTitulo);

    const contenidoCarritoCerrar = document.createElement("h2");
    contenidoCarritoCerrar.setAttribute("class","cerrarCarrito");
    contenidoCarritoCerrar.innerText = "🔴"
    contenidoCarritoTitulo.appendChild(contenidoCarritoCerrar);
    
    contenidoCarritoCerrar.addEventListener(("click"), () => {
        contenidoCarrito.style.display = "none";
    });
    
    const contenidoCarritoTotal = document.createElement("div");
    contenidoCarritoTotal.setAttribute("class","totalCarrito");
    contenidoCarritoTotal.innerHTML = "<h2>Total: $ </h2>";
    contenidoCarrito.appendChild(contenidoCarritoTotal);

    const totalCarrito = dentroCarrito.reduce((total, producto) => total + producto.valor * producto.cantidad, 0);
    let contCarritoTotal = document.createElement("h2");
    contCarritoTotal.className = "contCarritoTotal";
    contCarritoTotal.innerHTML = totalCarrito;
    contenidoCarritoTotal.appendChild(contCarritoTotal);
    
    dentroCarrito.forEach((teclado) => {
        let tecladoElegido = document.createElement("div");
        tecladoElegido.setAttribute("class","productoElegido");
        
        let tecladoElegidoImagen = document.createElement("img");
        tecladoElegidoImagen.className = "tecladoElegidoImagen";
        tecladoElegidoImagen.setAttribute("src",teclado.imagen);
        tecladoElegido.appendChild(tecladoElegidoImagen);
        
        let tecladoElegidoId = document.createElement("h4");
        tecladoElegidoId.className = "tecladoElegidoId";
        tecladoElegidoId.innerHTML = "ID: " + teclado.id;
        tecladoElegido.appendChild(tecladoElegidoId);
        
            let tecladoElegidoTitulo = document.createElement("h3");
            tecladoElegidoTitulo.className = "tecladoElegidoTitulo";
            tecladoElegidoTitulo.innerText = teclado.titulo;
            tecladoElegido.appendChild(tecladoElegidoTitulo);
            
            let tecladoElegidoCantidad = document.createElement("h4");
            tecladoElegidoCantidad.className = "tecladoElegidoCantidad";
            tecladoElegidoCantidad.innerText = "Cantidad: " + teclado.cantidad;
            tecladoElegido.appendChild(tecladoElegidoCantidad);
            
            let tecladoElegidoPrecio = document.createElement("h3");
            tecladoElegidoPrecio.className = "tecladoElegidoPrecio";
            tecladoElegidoPrecio.innerText = "$ " + teclado.valor;
            tecladoElegido.appendChild(tecladoElegidoPrecio);
            
            let tecladoElegidoEliminar = document.createElement("button");
            tecladoElegidoEliminar.className = "tecladoElegidoEliminar";
            tecladoElegidoEliminar.innerText = "Eliminar";
            tecladoElegido.appendChild(tecladoElegidoEliminar);
            
            contenidoCarrito.appendChild(tecladoElegido);

        tecladoElegidoEliminar.addEventListener('click', () => {
            const id = teclado.id;
    
            dentroCarrito = dentroCarrito.filter((producto) => producto.id !== id);
            
            Toastify({
            text: "Producto eliminado...",
            offset: {
                x: 20, 
                y: 210,
            },
            duration: 1500,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "bottom", 
            position: "left", 
            stopOnFocus: true, 
            style: {
                borderRadius: "10px",
                background: "#910a00",                        
            },
            }).showToast();
    
    
            refreshCarrito();
            guardadoTemporal();
        });
    });
}



let guardadoTemporal = () => {
    localStorage.setItem("productosElegidos", JSON.stringify(dentroCarrito));
};

JSON.parse(localStorage.getItem("productosElegidos"));
