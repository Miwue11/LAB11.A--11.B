import { bancosPorCodigo, DatosIBAN } from "./model";
import {
  normalizarIban,
  validarFormatoIbanEspanol,
  validarIbanConIbantools,
  extraerComponentesIban,
} from "./regex";

const obtenerNombreBanco = (codigoBanco: string): string => {
  return bancosPorCodigo[codigoBanco] || "Banco no encontrado";
};

const limpiarContenedorResultados = (): void => {
  const contenedor = document.getElementById("IBAN");
  if (contenedor) {
    contenedor.textContent = "";
  }
};

const mostrarResultado = (mensaje: string, datos?: DatosIBAN): void => {
  const contenedor = document.getElementById("IBAN");
  if (!contenedor) return;

  limpiarContenedorResultados();

  const divResultado = document.createElement("div");
  divResultado.classList.add("datos-IBAN");

  const mensajeElem = document.createElement("p");
  mensajeElem.textContent = mensaje;
  divResultado.appendChild(mensajeElem);

  if (datos) {
    datos.nombreBanco = obtenerNombreBanco(datos.codigoBanco);

    const codigoBancoElem = document.createElement("p");
    codigoBancoElem.textContent = `Código de banco: ${datos.codigoBanco}`;
    divResultado.appendChild(codigoBancoElem);

    const nombreBancoElem = document.createElement("p");
    nombreBancoElem.textContent = `Nombre del banco: ${datos.nombreBanco}`;
    divResultado.appendChild(nombreBancoElem);

    const sucursalElem = document.createElement("p");
    sucursalElem.textContent = `Código de sucursal: ${datos.codigoSucursal}`;
    divResultado.appendChild(sucursalElem);

    const controlNacElem = document.createElement("p");
    controlNacElem.textContent = `Dígito de control nacional: ${datos.controlNacional}`;
    divResultado.appendChild(controlNacElem);

    const cuentaElem = document.createElement("p");
    cuentaElem.textContent = `Número de cuenta: ${datos.numeroCuenta}`;
    divResultado.appendChild(cuentaElem);
  }
  contenedor.appendChild(divResultado);
};

document.addEventListener("DOMContentLoaded", () => {
  const inputIban = document.getElementById("buscador") as HTMLInputElement;
  const boton = document.getElementById("lupa")?.parentElement;

  if (boton) {
    boton.addEventListener("click", () => {
      const ibanSinNormalizar = inputIban.value.trim();
      const ibanNormalizado = normalizarIban(ibanSinNormalizar);
      if (!validarFormatoIbanEspanol(ibanNormalizado)) {
        mostrarResultado(
          "El IBAN no tiene el formato correcto (debe ser 'ES' seguido de 22 dígitos)."
        );
        return;
      }

      if (!validarIbanConIbantools(ibanNormalizado)) {
        mostrarResultado(
          "El IBAN está bien formado, pero no es válido (los dígitos de control no coinciden)."
        );
        return;
      }

      const datosIban = extraerComponentesIban(ibanNormalizado);
      if (!datosIban) {
        mostrarResultado("Error al extraer los datos del IBAN.");
        return;
      }

      mostrarResultado("El IBAN está bien formado y es válido.", datosIban);
    });
  }
});
