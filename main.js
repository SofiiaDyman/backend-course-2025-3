// 1 частина 
// Підключення стороннього модуля commander та вбудованого модуля fs
const { Command } = require('commander');
const fs = require('fs');

// Створення об'єкта програми для роботи з аргументамим
const program = new Command();

// Опис аргументів командного рядка
program
  .requiredOption('-i, --input <file>', 'input file path')
  .option('-o, --output <file>', 'output file path')
  .option('-d, --display', 'display output to console')
  .option('-v, --variety', 'display flower variety')
  .option('-l, --length <value>', 'display only flowers with petal length greater than value', parseFloat);

program.parse(process.argv);  // Розбір аргументів командного рядка
const options = program.opts();  // Отримання об'єкта з усіма параметрами

// Перевірка обов'язкового параметра input
if (!options.input) {
    console.error("Please, specify input file");
    process.exit(1);
}

// Перевірка існування файлу
if (!fs.existsSync(options.input)) {
    console.error("Cannot find input file");
    process.exit(1);
}

//2 частина
// Читання JSON
const data = JSON.parse(fs.readFileSync(options.input, 'utf8'));

// Фільтрація за довжиною пелюстки, якщо задано
let result = data;
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

// Запис у файл
if (options.output) {
    fs.writeFileSync(options.output, outputLines.join('\n'));
}
