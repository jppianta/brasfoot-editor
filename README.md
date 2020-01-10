Ferramenta para edição de dados do jogo Brasfoot usando arquivos Yaml

Um arquivo para descrição de um clube poderia ser feita a partir da seguinte forma:

```yaml
pais: 29
estado: 22
forca_inicial: 19
cor1: '#409fff'
cor2: '#000000'
id: gremio
nome: Grêmio
estadio:
  nome: Arena do Grêmio
  capacidade: 55358
tecnico:
  nome: Renato Gaúcho
  pais: 29
```

### Tabela de tradução de Características
| Valor | Característica |
| ----- | -------------- |
| 0 | Colocacão |
| 1 | Defesa de Pênalti |
| 2 | Reflexo |
| 3 | Saída de Gol |
| 4 | Armação |
| 5 | Cabeceio |
| 6 | Cruzamento |
| 7 | Desarme |
| 8 | Drible |
| 9 | Finalização |
| 10 | Marcação |
| 11 | Passe |
| 12 | Resistencia |
| 13 | Velocidade |

### Tabela de tradução de Posições
| Valor | Posição |
| ----- | ------- |
| 0 | Goleiro |
| 1 | Lateral |
| 2 | Zagueiro |
| 3 | Meio Campo |
| 4 | Atacante |

## Como usar
`node index.js <funcao> -e <pasta-entrada> -s <pasta-saida>`

Funções disponiveis são:

paraYaml - Traduz arquivos .ban do Brasfoot em arquivos do tipo .yml

paraBrasfoot - Cria arquivo .ban do Brasfoot a partir de arquivos .yml