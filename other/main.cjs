const fs = require("fs");
let pkg = require("../package.json");

function removeScripts() {
    fs.writeFileSync("./package-main.json", JSON.stringify(pkg, null, 2));
    let deps = {};
    pkg.main = "api/index.js";
    pkg.scripts = {};
    pkg.type = "module"
    pkg.devDependencies = {};
    Object.entries(pkg.dependencies).forEach(entry => {
        if(!entry[0].includes("electron")) deps[entry[0]] = entry[1];
    });
    pkg.dependencies = deps;

    fs.writeFileSync("../package.json", JSON.stringify(pkg, null, 2));

    return console.log("Scripts removed..");
}

function restore() {
    fs.writeFileSync("../package.json", fs.readFileSync("./package-main.json").toString());
    console.log("Restored scripts...")
}

function main() {
    if(pkg.scripts && Object.keys(pkg.scripts).length > 0) removeScripts();
    else restore();
}

main();