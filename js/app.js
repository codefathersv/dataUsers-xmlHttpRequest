(() => {

    // obtenemos el boton mostrar datos
    const $datosBtn = document.getElementById("datos");

    // asignamos el evento
    $datosBtn.addEventListener("click", (e) => {

        // instanciamos objeto AJAX
        const xhr = new XMLHttpRequest();
        const $filas = document.getElementById("filas");

        // asignamos evento 
        xhr.addEventListener("readystatechange", (e) => {

            // se evalua que la operacion sea completada
            if (xhr.readyState !== 4) return;

            // se evalua que la respuesta sea exitosa
            if (xhr.status >= 200 && xhr.status < 300) {

                console.log("Exito");

                let json = JSON.parse(xhr.responseText);
                // console.log(json);

                json.forEach(el => {

                    $filas.innerHTML += `
                        <tr>
                            <td>${el.name}</td>
                            <td>${el.email}</td>
                            <td>${el.phone}</td>
                        </tr>
                    `;

                })

                $datosBtn.disabled = true;

            } else { // en caso de no ser exitosa

                console.log("Error");
                let message = xhr.statusText || "Ocurrio un error";
                $filas.innerHTML = `
                    <tr>
                        <td colspan="3">Error ${xhr.status}: ${message}</td>
                    </tr>
                `;

            }

        })

        xhr.open("GET", "https://jsonplaceholder.typicode.com/users");

        xhr.send();

    })


})();