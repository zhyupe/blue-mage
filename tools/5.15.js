const readCsv = require('./read-csv')
const fs = require('fs')

const actionFields = ['id', 'name']
actionFields[3] = 'icon'
const actionList = readCsv(fs.readFileSync('./Action.csv').toString(), actionFields)
const aozActionList = readCsv(fs.readFileSync('./AozAction.csv').toString(), ['id', 'action'])

const x = aozActionList.map((item) => {
  const action = actionList.find(l => l.id === item.action)
  return {
    no: item.id,
    spell: action && action.name,
    level: 99,
    icon: action && `${action.icon}.png`.padStart(10, '0'),
    method: [],
  }
}).filter(x => x.no > 49).filter(x => !!x.spell)

console.log(x)

const oldFile = JSON.parse(fs.readFileSync('./spells.json').toString())

for (const spell of x) {
  if (!oldFile.find(l => l.no === spell.no)) {
    oldFile.push(spell)
  }
}

fs.writeFileSync('./spells.json', JSON.stringify(oldFile, null, 2))
