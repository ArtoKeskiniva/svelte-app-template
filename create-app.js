import fs from "node:fs"
import path from "node:path"

if (process.argv.length < 4) {
    console.log("USAGE: node create-app.js <name> <directory>")
    process.exit(1)
}

const appName = process.argv[2]
const directory = process.argv[3]
const destination = path.join(directory, appName)

if (fs.existsSync(destination)) {
    console.log(`Destination directory ${destination} exists, aborting`)
    process.exit(1)
}

console.log("Creating app in %s", destination)

fs.cpSync(import.meta.dirname, destination, { recursive: true})

fs.rmSync(path.join(destination, "create-app.js"))
fs.rmSync(path.join(destination, "README.md"))
fs.renameSync(path.join(destination, "README-template.md"), path.join(destination, "README.md"))

for (const name of ["index.html", "package.json", "README.md", "src/App.svelte"]) {
    const filename = path.join(destination, name)
    const content = fs.readFileSync(filename, "utf8")
    fs.writeFileSync(filename, content.replace(/svelte-app-template/g, appName))
}
