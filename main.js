// 1 частина 
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

// 2 частина - 

let result = data;

// Фільтр за довжиною пелюстки
if (options.length) {
    result = result.filter(flower => flower.petal.length > options.length);
}

// Формування рядків для виводу
const outputLines = result.map(flower => {
    let line = `${flower.petal.length} ${flower.petal.width}`;
    if (options.variety) line += ` ${flower.variety}`;
    return line;
});

// Вивід у консоль
if (options.display) {
    console.log(outputLines.join('\n'));
}

// Запис у файл, якщо задано
if (options.output) {
    fs.writeFileSync(options.output, outputLines.join('\n'));
}