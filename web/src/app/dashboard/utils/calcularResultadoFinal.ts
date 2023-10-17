export default function calcularResultadoFinal(respPositiva:string | undefined, respNegativa:string | undefined){
  let resultadoFinal;

  if(respPositiva === 'GOSTARIA'){

    if(respNegativa === 'GOSTARIA')
      resultadoFinal = 'QUESTIONAVEL';

    else if(respNegativa === 'ESPERADO')
      resultadoFinal = 'ATRATIVO';

    else if(respNegativa === 'NAO IMPORTA')
      resultadoFinal = 'ATRATIVO';

    else if(respNegativa === 'CONVIVO COM ISSO')
      resultadoFinal = 'ATRATIVO';

    else if(respNegativa === 'NAO GOSTARIA')
      resultadoFinal = 'PERFORMANCE'

  } else if (respPositiva === 'ESPERADO') {

    if(respNegativa = 'GOSTARIA')
      resultadoFinal = 'REVERSO';

    else if(respNegativa === 'ESPERADO')
      resultadoFinal = 'INDIFERENTE';

    else if(respNegativa === 'NAO IMPORTA')
      resultadoFinal = 'INDIFERENTE';

    else if(respNegativa === 'CONVIVO COM ISSO')
      resultadoFinal = 'INDIFERENTE';

    else if(respNegativa === 'NAO GOSTARIA')
      resultadoFinal = 'DEVE SER FEITO'

  } else if(respPositiva === 'NAO IMPORTA' ) {

    if(respNegativa = 'GOSTARIA')
      resultadoFinal = 'REVERSO';

    else if(respNegativa === 'ESPERADO')
      resultadoFinal = 'INDIFERENTE';

    else if(respNegativa === 'NAO IMPORTA')
      resultadoFinal = 'INDIFERENTE';

    else if(respNegativa === 'CONVIVO COM ISSO')
      resultadoFinal = 'INDIFERENTE';

    else if(respNegativa === 'NAO GOSTARIA')
      resultadoFinal = 'DEVE SER FEITO'

  } else if(respPositiva === 'CONVIVO COM ISSO' ) {

    if(respNegativa = 'GOSTARIA')
      resultadoFinal = 'REVERSO';

    else if(respNegativa === 'ESPERADO')
      resultadoFinal = 'INDIFERENTE';

    else if(respNegativa === 'NAO IMPORTA')
      resultadoFinal = 'INDIFERENTE';

    else if(respNegativa === 'CONVIVO COM ISSO')
      resultadoFinal = 'INDIFERENTE';

    else if(respNegativa === 'NAO GOSTARIA')
      resultadoFinal = 'DEVE SER FEITO'

  } else if(respPositiva === 'NAO GOSTARIA' ) {

    if(respNegativa = 'GOSTARIA')
      resultadoFinal = 'REVERSO';

    else if(respNegativa === 'ESPERADO')
      resultadoFinal = 'REVERSO';

    else if(respNegativa === 'NAO IMPORTA')
      resultadoFinal = 'REVERSO';

    else if(respNegativa === 'CONVIVO COM ISSO')
      resultadoFinal = 'REVERSO';

    else if(respNegativa === 'NAO GOSTARIA')
      resultadoFinal = 'QUESTIONAVEL'
  }

  return resultadoFinal;
}
