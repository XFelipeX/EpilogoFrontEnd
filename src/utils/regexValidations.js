export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validateCpf(cpf) {
  const re = /^([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})$/;

  return re.test(cpf);
}

export function validateCep(cep) {
  const re = /^([0-9]{5}[-]?[0-9]{3})$/;

  return re.test(cep);
}

export function validateNameClient(name) {
  const re = /^(([A-z]{3,})[" "]([A-z]{3,}))([" "]([A-z]{3,})){0,}/;
  console.log(re.test(name));
  return re.test(name);
}
