module.exports = function (content, fields) {
  const lines = []
  let line = []
  
  let inQuote = false
  let buf = ''
  for (let i = 0; i < content.length; ++i) {
    let chr = content[i]
    if (inQuote) {
      if (chr === '"') {
        inQuote = false
      } else {
        buf += chr
      }
      continue
    }
  
    switch (chr) {
      case ',':
        line.push(buf)
        buf = ''
        break
      case '"':
        inQuote = !inQuote
        break
      case '\r': // @todo: find a better way to handle \r
        break
      case '\n':
        line.push(buf)
        buf = ''
        lines.push(line)
        line = []
        break
      default:
        buf += chr
        break
    }
  }
  
  if (line.length) {
    lines.push(line)
  }

  return Array.isArray(fields) ? lines.map(line => fields.reduce((obj, field, i) => {
    if (field) {
      obj[field] = line[i]
    }
    return obj
  }, {})) : lines
}