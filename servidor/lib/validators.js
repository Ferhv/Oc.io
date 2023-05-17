// Función para validar el formato del email
export const esValidoEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const esValidoDNI = dni => /^\d{8}[A-HJ-NP-TV-Z]$/.test(dni);
export const esFechaValida = date => /^\d{4}-\d{2}-\d{2}$/.test(date);
export const esTelefonoValido = telefono => /^\d{9}$/.test(telefono);
export const esValidoCIF = cif => /^[A-HJNP-SUW]{1}\d{7}[0-9A-J]$/.test(cif);

