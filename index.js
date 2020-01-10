const io = require('java.io');
const fs = require('fs');
const yaml = require('js-yaml');

const InputObjectStream = io.InputObjectStream;
const OutputObjectStream = io.OutputObjectStream;

function createSerializedObjectFromYaml(yamlObj) {
  const template = {
    '$': {
      'aid': 0,
      'id': 0,
      'sid': 0,
      'tid': 0,
      'valid': true
    },
    '$class': {
      'fields': [
        { 'type': 'I', 'name': 'a' },
        { 'type': 'I', 'name': 'aid' },
        { 'type': 'I', 'name': 'b' },
        { 'type': 'I', 'name': 'c' },
        { 'type': 'I', 'name': 'g' },
        { 'type': 'I', 'name': 'i' },
        { 'type': 'I', 'name': 'id' },
        { 'type': 'I', 'name': 'n' },
        { 'type': 'I', 'name': 'o' },
        { 'type': 'I', 'name': 'sid' },
        { 'type': 'I', 'name': 'tid' },
        { 'type': 'Z', 'name': 'valid' },
        { 'type': 'I', 'name': 'vid' },
        { 'type': 'L', 'name': 'cor1', 'classname': 'Ljava/lang/String;' },
        { 'type': 'L', 'name': 'cor2', 'classname': 'Ljava/lang/String;' },
        { 'type': 'L', 'name': 'd', 'classname': 'Ljava/lang/String;' },
        { 'type': 'L', 'name': 'e', 'classname': 'Ljava/lang/String;' },
        { 'type': 'L', 'name': 'f', 'classname': 'Ljava/lang/String;' },
        { 'type': 'L', 'name': 'h', 'classname': 'Ljava/lang/String;' },
        { 'type': 'L', 'name': 'l', 'classname': 'Ljava/util/ArrayList;' },
        { 'type': 'L', 'name': 'm', 'classname': 'Ljava/util/ArrayList;' }
      ],
      'flags': 2,
      'name': 'e.t',
      'serialVersionUID': '16',
      'superClass': null
    }
  }

  function applyValueOnTemplate(key, value) {
    switch (key) {
      case 'pais':
        template['$'].a = value;
        break;
      case 'estado':
        template['$'].b = value;
        break;
      case 'forca_inicial':
        template['$'].c = value;
        break;
      case 'cor1':
        template['$'].cor1 = value;
        break;
      case 'cor2':
        template['$'].cor2 = value;
        break;
      case 'id':
        template['$'].d = value;
        break;
      case 'nome':
        template['$'].e = value;
        break;
      case 'estadio':
        template['$'].f = value.nome;
        template['$'].g = value.capacidade;
        break;
      case 'tecnico':
        template['$'].h = value.nome;
        template['$'].i = value.pais;
        break;
    }
  }

  Object.keys(yamlObj).forEach((key) => {
    applyValueOnTemplate(key, yamlObj[key]);
  });

  return template
}

function readSerializedObj(path) {
  const buf = fs.readFileSync(path);
  const inp = new InputObjectStream(buf, true);
  return inp.readObject()
}

function createYamlFromSerializedObject(obj) {
  const result = {};
  const info = obj['$'];
  result.pais = info.a;
  result.estado = info.b;
  result.forca_inicial = info.c;
  result.cor1 = info.cor1;
  result.cor2 = info.cor2;
  result.id = info.d;
  result.nome = info.e;
  result.estadio = {
    nome: info.f,
    capacidade: info.g
  }
  result.tecnico = {
    nome: info.h,
    pais: info.i
  }
  return result;
  // this.players = info.l['_$'].map(info => new Player(info, this.strengh))
}

function readYaml(path) {
  const buf = fs.readFileSync(path, 'utf8');
  return yaml.safeLoad(buf);
}

function writeYamlObj(obj, path) {
  fs.writeFileSync(path, yaml.safeDump(obj))
}

// console.log(normalizedObj)

// $ => Info
// a => Pais do Clube
// b => Estado do Clube
// c => Forca Inicial do Clube
// cor1 => Cor Principal
// cor2 => Cor Secundaria∂
// d => ID do Clube
// e => Nome do Clube
// f => Nome do Estadio
// g => Capacidade do Estadio
// h => Nome do Treinador
// i => Pais do Treinador
// l => Jogadores Elenco Principal
// m => Jogadores Base

// Jogador Elenco Principal
// a => Nome
// b => Estrela
// c => Pais
// d => Idade
// e => Posicao
// f => Titular -> 1 = Verdadeiro, 0 - Falso
// j => Top Mundial
// i => Lado -> 1 = Direito, 0 = Esquerdo

// g and h => Características -> 
// Goleiro Apenas
// -------
// 1 -> Colocacão
// 2 -> Defesa de Pênalti
// 3 -> Reflexo
// 4 -> Saída de Gol
// -------
// Apenas Não Goleiro
// -------
// 4 -> Armação 
// 5 -> Cabeceio
// 6 -> Cruzamento
// 7 -> Desarme
// 8 -> Drible
// 9 -> Finalização
// 10 -> Marcação
// 11 -> Passe
// 12 -> Resistencia
// 13 -> Velocidade
// -------