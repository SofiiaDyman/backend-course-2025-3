const { Command } = require('commander');
const fs = require('fs');

const program = new Command();

program
  .requiredOption('-i, --input <file>', 'input file path')
  .option('-o, --output <file>', 'output file path')
  .option('-d, --display', 'display output to console')
  .option('-v, --variety', 'display flower variety')
  .option('-l, --length <value>', 'display only flowers with petal length greater than value', parseFloat);

program.parse(process.argv);
const options = program.opts();

// Перевірка на існування файлу
if (!fs.existsSync(options.input)) {
    console.error("Cannot find input file");
    process.exit(1);
}

// Читання JSON
const data = JSON.parse(fs.readFileSync(options.input, 'utf8'));