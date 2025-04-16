import { isValidIBAN } from "ibantools";
import { IBANData } from "./model";

export const normalizarIban = (iban: string): string => {
  return iban.replace(/[\s-]/g, "").toUpperCase();
};

export const validarFormatoIbanEspanol = (iban: string): boolean => {
  const patron = /^ES\d{22}$/;
  return patron.test(iban);
};

export const validarIbanConIbantools = (iban: string): boolean => {
  return isValidIBAN(iban);
};

export const extraerComponentesIban = (iban: string): IBANData => {
  const regex = /^([A-Z]{2})(\d{2})(\d{4})(\d{4})(\d{2})(\d{10})$/;
  const resultado = iban.match(regex);
  if (!resultado) throw new Error("Formato de IBAN no válido");
  return {
    nombreBanco: resultado[1],
    controlIban: resultado[2],
    codigoBanco: resultado[3],
    codigoSucursal: resultado[4],
    controlNacional: resultado[5],
    numeroCuenta: resultado[6],
  };
};
