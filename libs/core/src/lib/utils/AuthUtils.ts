import { GET_DOTS, HAS_NUMBER, HAS_ONLY_LETTERS, HAS_SPECIAL_CHARACTER_NOT_DOT, USERNAME_REGEX } from "../regex";

const MIN_USER_NAME_LENGTH = 3;
const MAX_USER_NAME_LENGTH = 30;
const MIN_USER_PASSWORD_LENGTH = 8;
const MAX_USER_PASSWORD_LENGTH = 30;

interface ValidateAuthResponse {
  valid: boolean,
  message: string,
}
/**
 * Validação de username
 * Regras:
 *  - Deve dar match com padrão USERNAME_REGEX
 *  - Deve conter apenas letras
 *  - Deve conter apenas um ponto
 *  - Não deve ter caracteres especiais
 * @param username usuário
 */
export function validateUsername(username: string): ValidateAuthResponse {
  if(!username) return {valid: false, message: 'Usuário não informado'};
  if(typeof username !== 'string') return {valid: false, message: 'Usuário inválido'};
  if(username.length < MIN_USER_NAME_LENGTH) return {valid: false, message: `Usuário muito curto, mínimo ${MIN_USER_NAME_LENGTH} caracteres`};
  if(username.length > MAX_USER_NAME_LENGTH) return {valid: false, message: `Usuário muito longo, máximo ${MAX_USER_NAME_LENGTH} caracteres`};
  if(username.includes(' ')) return {valid: false, message: 'Usuário não pode conter espaços'};
  if(HAS_NUMBER.test(username)) return {valid: false, message: 'Usuário não pode conter números'};
  if(HAS_SPECIAL_CHARACTER_NOT_DOT.test(username)) return {valid: false, message: 'Usuário não pode conter caracteres especiais'};

  const username_dots = username.match(GET_DOTS);

  if(!username_dots || username_dots == null || ( username_dots || [])?.length > 1) return {
    valid: false,
    message: 'Usuário deve estar no formato nome.sobrenome'
  };

  const regexMatch = USERNAME_REGEX.test(username);

  const usernameWithoutDot = username.replace('.', '');
  const onlyLetters = HAS_ONLY_LETTERS.test(usernameWithoutDot);

  if(!regexMatch) return {valid: false, message: 'Usuário inválido. Deve conter apenas letras e um ponto ex: nome.sobrenome'};
  if(!onlyLetters) return {valid: false, message: 'Usuário inválido. Deve conter apenas letras e um ponto ex: nome.sobrenome'};
  return {valid: true, message: 'Usuário válido'};
}

export function validatePassword(password: string): ValidateAuthResponse{
  if(!password) return {valid: false, message: 'Senha não informada'};
  if(
      typeof password !== 'string' ||
      password.length < MIN_USER_PASSWORD_LENGTH ||
      password.length > MAX_USER_PASSWORD_LENGTH
  ) return {valid: false, message: 'Senha inválida'};
  return {valid: true, message: 'Senha válida'};
}
