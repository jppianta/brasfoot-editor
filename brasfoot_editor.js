const io = require('java.io');
const fs = require('fs');
const yaml = require('js-yaml');

function parseArgs(args) {
  const func = args[0];
  var inputFolder, outputFolder;

  const iIdx = args.indexOf('-e');
  if (iIdx >= 0) {
    inputFolder = args[iIdx + 1];
  }

  const oIdx = args.indexOf('-s');
  if (oIdx >= 0) {
    outputFolder = args[oIdx + 1];
  }

  switch (func) {
    case 'paraYaml':
      toYamlFolder(inputFolder, outputFolder);
      break;
    case 'paraBrasfoot':
      toBrasfootFolder(inputFolder, outputFolder);
      break;
  }
}

parseArgs(process.argv.slice(2))

const InputObjectStream = io.InputObjectStream;
const OutputObjectStream = io.OutputObjectStream;

function createPlayerSerializedObj(playerYaml) {
  return {
    '$': {
      'aid': playerYaml.extra.aid || 0,
      'a': playerYaml.nome,
      'b': playerYaml.estrela,
      'c': playerYaml.pais,
      'd': playerYaml.idade,
      'e': playerYaml.posicao,
      'f': playerYaml.titular ? 1 : 0,
      'j': playerYaml.top_mundial,
      'i': playerYaml.lado === 'Direito' ? 1 : 0,
      'g': playerYaml.caracteristicas[0],
      'h': playerYaml.caracteristicas[1],
      'hash': playerYaml.extra.hash || 0,
      'sid': playerYaml.extra.sid || 0,
      'tid': playerYaml.extra.tid || 0,
    },
    '$class': {
      'fields': [
        { 'type': 'I', 'name': 'aid' },
        { 'type': 'Z', 'name': 'b' },
        { 'type': 'I', 'name': 'c' },
        { 'type': 'I', 'name': 'd' },
        { 'type': 'I', 'name': 'e' },
        { 'type': 'I', 'name': 'f' },
        { 'type': 'I', 'name': 'g' },
        { 'type': 'I', 'name': 'h' },
        { 'type': 'I', 'name': 'hash' },
        { 'type': 'I', 'name': 'i' },
        { 'type': 'Z', 'name': 'j' },
        { 'type': 'I', 'name': 'sid' },
        { 'type': 'I', 'name': 'tid' },
        { 'type': 'L', 'name': 'a', 'classname': 'Ljava/lang/String;' }
      ],
      'flags': 2,
      'name': 'e.g',
      'serialVersionUID': '16',
      'superClass': null
    }
  }
}

function createSerializedObjectFromYaml(yamlObj) {
  const numberOfPlayers = yamlObj.jogadores && yamlObj.jogadores.length || 0;
  const numberOfYouthPlayers = yamlObj.jogadores_base && yamlObj.jogadores_base.length || 0;

  const template = {
    '$': {
      'aid': 0,
      'id': 0,
      'sid': 0,
      'tid': 0,
      'vid': 185,
      'valid': true,
      'l': {
        '_$': [],
        '$': {
          'size': numberOfPlayers,
          'capacity': numberOfPlayers
        },
        '$class': {
          'fields': [{ 'type': 'I', 'name': 'size' }],
          'flags': 3,
          'name': 'java.util.ArrayList',
          'serialVersionUID': '8683452581122892189',
          'superClass': null
        }
      },
      'm': {
        '_$': [],
        '$': {
          'size': numberOfYouthPlayers,
          'capacity': numberOfYouthPlayers
        },
        '$class': {
          'fields': [{ 'type': 'I', 'name': 'size' }],
          'flags': 3,
          'name': 'java.util.ArrayList',
          'serialVersionUID': '8683452581122892189',
          'superClass': null
        }
      },
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
      case 'poder_investimento':
        template['$'].n = value;
        break;
      case 'jogadores':
        template['$'].l['_$'] = value.map(jogador => createPlayerSerializedObj(jogador));
        break;
      case 'jogadores_base':
        template['$'].m['_$'] = value.map(jogador => createPlayerSerializedObj(jogador));
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

const extraMap = {
  n: {},
  o: {}
};

function addToExtraMap(data) {
  const o = data.extra.o;

  if (!extraMap.o[o]) {
    extraMap.o[o] = [data.id];
  } else {
    extraMap.o[o].push(data.id);
  }
}

function parsePlayerSerializedObject(obj) {
  const result = {};
  const info = obj['$'];
  result.nome = info.a;
  result.estrela = info.b;
  result.pais = info.c;
  result.idade = info.d;
  result.posicao = info.e;
  result.titular = info.f === 1;
  result.top_mundial = info.j;
  result.lado = info.i === 1 ? 'Direito' : 'Esquerdo'
  result.caracteristicas = [
    info.g,
    info.h
  ]
  result.extra = {
    aid: info.aid,
    hash: info.hash,
    sid: info.sid,
    tid: info.tid
  }
  return result;
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
  result.poder_investimento = info.n;
  result.extra = {
    id: info.id,
    o: info.o
  }

  result.jogadores = info.l['_$'].map(info => parsePlayerSerializedObject(info));
  result.jogadores_base = info.m['_$'].map(info => parsePlayerSerializedObject(info));

  return result;
}

function readYaml(path) {
  const buf = fs.readFileSync(path, 'utf8');
  return yaml.safeLoad(buf);
}

function writeYamlObj(obj, path) {
  fs.writeFileSync(path, yaml.safeDump(obj))
}

function writeSerializedObj(obj, path) {
  fs.writeFileSync(path, OutputObjectStream.writeObject(obj));
}

function toYamlFolder(inputFolder, outputFolder) {
  fs.readdir(inputFolder, function (err, files) {
    //handling error
    if (err) {
      // eslint-disable-next-line no-console
      return console.log("Unable to scan directory: " + err);
    }
    //listing all files using forEach
    files = files.filter(file => file.endsWith(".ban"));

    files.forEach(file => {
      const obj = readSerializedObj(`${inputFolder}/${file}`);
      const yml = createYamlFromSerializedObject(obj);
      writeYamlObj(yml, `${outputFolder}/${file.replace('.ban', '.yml')}`);
    });
  });
}

function toBrasfootFolder(inputFolder, outputFolder) {
  fs.readdir(inputFolder, function (err, files) {
    //handling error
    if (err) {
      // eslint-disable-next-line no-console
      return console.log("Unable to scan directory: " + err);
    }
    //listing all files using forEach
    files = files.filter(file => file.endsWith(".yml"));

    files.forEach(file => {
      const obj = readYaml(`${inputFolder}/${file}`);
      const ser = createSerializedObjectFromYaml(obj);
      writeSerializedObj(ser, `${outputFolder}/${file.replace('.yml', '.ban')}`);
    });
  });
}


// console.log(normalizedObj)

// $ => Info
// a => Pais do Clube
// b => Estado do Clube
// c => Forca Inicial do Clube
// cor1 => Cor Principal
// cor2 => Cor Secundario
// d => ID do Clube
// e => Nome do Clube
// f => Nome do Estadio
// g => Capacidade do Estadio
// h => Nome do Treinador
// i => Pais do Treinador
// l => Jogadores Elenco Principal
// m => Jogadores Base
// n => Poder de Investimento -> Vai de 1 a 5

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