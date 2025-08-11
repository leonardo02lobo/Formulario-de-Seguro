const formulario = document.getElementById("formulario")
const data = {}

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    const elementos = formulario.elements;
    data["nombres"] = elementos[0].value;
    data["apellidos"] = elementos[1].value;
    data["correo"] = elementos[2].value;
    data["fotoLicencia"] = elementos[3].value;
    data["fotoSeguro"] = elementos[4].value;

    console.log(data);
});