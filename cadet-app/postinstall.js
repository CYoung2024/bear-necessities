const chalk = require("chalk");
const { readFile, writeFile, copyFile } = require("fs").promises;

console.log(chalk.green("here"));

function log(...args) {
  console.log(chalk.yellow("[react-native-maps]"), ...args);
}

reactNativeMaps = async function () {
  log(
    "📦 Creating web compatibility of react-native-maps using an empty module loaded on web builds"
  );
  const modulePath = "node_modules/react-native-maps";
  await writeFile(
    `${modulePath}/lib/index.web.js`,
    "module.exports = {}",
    "utf-8"
  );
  await copyFile(
    `${modulePath}/lib/index.d.ts`,
    `${modulePath}/lib/index.web.d.ts`
  );
  const pkg = JSON.parse(await readFile(`${modulePath}/package.json`));
  pkg["react-native"] = "lib/index.js";
  pkg["main"] = "lib/index.web.js";
  await writeFile(
    `${modulePath}/package.json`,
    JSON.stringify(pkg, null, 2),
    "utf-8"
  );
  log("✅ script ran successfully");
};

reactNativeMaps();

// https://github.com/react-native-maps/react-native-maps/issues/4641#:~:text=what%20it%27s%20worth%2C-,I%20got%20this%20to%20work,-by%20adding%20a
// npm install to run postinstall.js
