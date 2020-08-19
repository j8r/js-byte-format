"use strict"
import fs from "fs"

fs.readdirSync("./test").forEach((file) => {
    import("./" + file)
})
