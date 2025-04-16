const textarea = document.getElementById("buscador") as HTMLTextAreaElement;
const button = document.getElementById("extraer-btn") as HTMLButtonElement;
const resultDiv = document.getElementById("HTML") as HTMLDivElement;
const regex = /<img[^>]*src="([^"]+)"[^>]*>/g;

const clickBoton = () => {
  button.addEventListener("click", () => {
    const contenido = textarea.value;
    const imagenes = contenido.matchAll(regex);
    resultDiv.innerHTML = "";
    for (const acierto of imagenes) {
      const url = acierto[1];
      const texto = document.createElement("a");
      texto.href = url;
      texto.textContent = url;
      texto.target = "_blank";
      const textoAMostrar = document.createElement("div");
      textoAMostrar.appendChild(texto);
      resultDiv.appendChild(textoAMostrar);
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  clickBoton();
});
