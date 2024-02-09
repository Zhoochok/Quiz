const inquirer = require('inquirer');
const fs = require('fs').promises;
const { temaMemes, temaFilm } = require('./model');
const chalk = require('chalk');

async function start() {
  await inquirer
    .prompt([
      {
        type: 'list',
        name: 'themes',
        message: chalk.magenta('Выбери тему квиза'),
        choices: ['Угадай фильм по эмодзи', 'Продолжи фразу...'],
      },
    ])
    .then((answers) => {
      if (answers.themes === 'Угадай фильм по эмодзи') {
        console.clear();
        console.log(chalk.magenta('Вы выбрали тему "Фильмы по эмодзи"'));
        temaFilm();
      } else if (answers.themes === 'Продолжи фразу...') {
        console.clear();
        console.log(chalk.magenta('Вы выбрали тему "Продолжи фразу..."'));
        temaMemes();
      }
    });
}

start();
