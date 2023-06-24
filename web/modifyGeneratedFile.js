const fs = require('fs')

// Read the file
fs.readFile('generated-api/runtime.ts', 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }

  // Insert the import statement at the beginning of the file
  let result = `import { ApiKeyMiddleware } from '@/ApiKeyMiddleware'\n` + data

  // Replace the DefaultConfig with the updated middleware
  result = result.replace(
    'export const DefaultConfig = new Configuration()',
    'export const DefaultConfig = new Configuration({ middleware: [ApiKeyMiddleware] })'
  )

  // Write the file back out
  fs.writeFile('generated-api/runtime.ts', result, 'utf8', function (err) {
    if (err) return console.log(err)
  })
})
