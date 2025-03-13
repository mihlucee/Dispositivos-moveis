import { soma, subtracao, multiplicacao, divisao } from './calculadora.js';

console.log("Soma: ", soma(10, 5));
console.log("Subtração: ", subtracao(10, 5));
console.log("Multiplicação: ", multiplicacao(10, 5));
console.log("Divisão: ", divisao(10, 5));

// Importar um módulo externo, uma biblioteca

import moment from 'moment';
function calcularIdade(anoNascimento) {
    const anoAtual = moment().year();
    return anoAtual - anoNascimento;

}
const anoNascimento = 2005;
const idade = calcularIdade(anoNascimento);
console.log(`Idade: ${idade} anos`);