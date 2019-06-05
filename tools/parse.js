const fs = require('fs')
const override = require('./override.json')
const readCsv = require('./read-csv')

const enClean = en => en.toLowerCase().replace(/<([A-Za-z/]+)>/g, '').replace(/–/g, '-')

const csvCache = {}
const tryTranslate = function (fileName, en, idCol = 0, contentCol = 1, outputCol = contentCol) {
  let csv = csvCache[fileName]
  if (!csv) {
    csv = csvCache[fileName] = {
      cn: readCsv(fs.readFileSync(`./gamedata/cn/${fileName}.csv`, 'utf-8')).reduce((arr, line) => {
        arr[+line[idCol]] = line
        return arr
      }, []),
      en: readCsv(fs.readFileSync(`./gamedata/en/${fileName}.csv`, 'utf-8')).reduce((arr, line) => {
        arr[+line[idCol]] = enClean(line[contentCol])
        return arr
      }, [])
    }
  }

  let id = csv.en.indexOf(enClean(en))
  if (!id) {
    console.warn(`Failed to locate "${en}" from "${fileName}"`)
    return null
  }

  if (csv.cn[id]) {
    return csv.cn[id][outputCol]
  } else {
    console.warn(`No matching id #${id} for "${enClean(en)}" in "${fileName}"`)
    return null
  }
}

const parseLocation = function (location) {
  return location.split('\n').map(loc => {
    if (loc === 'Default') {
      return { type: 'special', text: '自动习得' }
    }

    let [place, mob] = loc.split('—')
    if (place.includes(',y') || place.includes('x,')) {
      let match = /([a-zA-Z ]+) \(x?(\d+)x?,y?(\d+)y?(,z?(\d+)z?)?\)/.exec(place.trim())
      return {
        type: 'map',
        map: tryTranslate('PlaceName', match[1].trim()),
        rank: null,
        position: [+match[2], +match[3], +match[4] || 0],
        mob: tryTranslate('BNpcName', mob.trim())
      }
    }

    if (place.includes('FATE')) {
      let match = /([a-zA-Z ]+) \(([a-zA-Z ]+) FATE\)/.exec(place.trim())
      return {
        type: 'fate',
        map: tryTranslate('PlaceName', match[1].trim()),
        name: tryTranslate('Fate', match[2].trim(), 0, 28),
        mob: tryTranslate('BNpcName', mob.trim())
      }
    }

    if (place.includes('Elite Mark)')) {
      let match = /([a-zA-Z ]+) \(Rank ([A-Z]) Elite Mark\)/.exec(place.trim())
      return {
        type: 'map',
        map: tryTranslate('PlaceName', match[1].trim()),
        rank: match[2],
        position: [],
        mob: tryTranslate('BNpcName', mob.trim())
      }
    }

    if (place.includes('Wayward Gaheel Ja')) {
      let match = /Learn (\d+) spells/.exec(place.trim())
      if (match) {
        return {
          type: 'special',
          text: `学习 ${match[1]} 个技能后可从[乌尔达哈来生回廊]的[异男子嘎希迦]处获得[天青图腾]`
        }
      }
      
      match = /Clear (\d+) Stages/.exec(place.trim())
      if (match) {
        return {
          type: 'special',
          text: `完成 ${match[1]} 种假面狂欢关卡后可从[乌尔达哈来生回廊]的[异男子嘎希迦]处获得[天青图腾]`
        }
      }
      console.log(place, mob)
    }

    let placeType = tryTranslate('CompleteJournal', place.trim(), 0, 6, 5)
    let placeName = tryTranslate('CompleteJournal', place.trim(), 0, 6)

    switch (placeType) {
      case '157': // 迷宫 Dungeon
        return {
          type: 'dungeon',
          name: placeName,
          mob: tryTranslate('BNpcName', mob.trim())
        }
      case '158': // 大型 Raidicon
        return {
          type: 'raid',
          name: placeName,
          mob: tryTranslate('BNpcName', mob.trim())
        }
      case '159': // 讨伐 Trail
        return {
          type: 'trail',
          name: placeName,
          mob: tryTranslate('BNpcName', mob.trim())
        }
        break
      default:
        console.log(place, mob)
        break
    }
  })
}

const content = fs.readFileSync('./spells.csv', 'utf-8')

// [
//   "No.",
//   "Icon",
//   "",
//   "Spell",
//   "Aspect / Damage",
//   "Rank",
//   "Description",
//   "Notes",
//   "Location",
//   "Level",
//   "Instance\r"
// ],
let spells = readCsv(content, ['no', , , 'spell', 'aspect', 'rank', 'description', 'notes', 'location', 'level',])

// remove table header
spells.shift()

spells = spells.map((row, i) => {
  if (override[row.no]) {
    Object.assign(row, override[row.no])
  }
  row.icon = row.spell.replace(/ /g, '_') + '.png'

  row.spell = tryTranslate('Action', row.spell)
  // row.description = tryTranslate('ActionTransient', row.description)
  // row.notes = tryTranslate('AozActionTransient', row.notes)

  row.method = parseLocation(row.location)
  // Object.assign(row, map[i])
  return row
})

fs.writeFileSync('spells.json', JSON.stringify(spells, null, 2))
