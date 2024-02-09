/* eslint-disable no-loop-func */
const inquirer = require('inquirer');
const fs = require('fs').promises;
const chalk = require('chalk');

async function temaMemes() {
  const read = JSON.parse(await fs.readFile('./QuizMemes.json', 'utf-8'));
  let count = 0;
  for (let i = 0; i < read.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const quizz = await inquirer
      .prompt([
        {
          type: 'list',
          name: 'point',
          message: `${read[i].question}`,
          choices: [
            {
              name: `${read[i].answers[0]}`,
              value: read[i].points[0],
            },
            {
              name: `${read[i].answers[1]}`,
              value: read[i].points[1],
            },
            {
              name: `${read[i].answers[2]}`,
              value: read[i].points[2],
            },
          ],
        },
      ])
      .then((answers) => {
        count += answers.point;
        if (answers.point === 5) {
          console.info(chalk.yellow(`Хорош, у тебя уже ${count} баллов`));
          return;
        }
        if (answers.point === -25) {
          console.info(
            chalk.red('ТЫ НАСТОЯЩИЙ ПРОГРАМИСТ ОТНИМЕМ У ТЕБЯ 25 БАЛЛОВ')
          );
          console.info(chalk.yellow(`У тебя ${count} баллов`));
          return;
        }
        if (answers.point === 50) {
          console.info(
            chalk.green('АХ ТЫ ПРОКАЗНИК)))) УВАЖАЕМ, ВОТ ТЕБЕ 50 БАЛЛОВ')
          );
          console.info(chalk.yellow(`У тебя ${count} баллов`));
          return;
        }
        console.info(
          chalk.yellow(`Не хорош, у тебя все так же ${count} баллов`)
        );
      });
  }
  console.clear();
  if (count <= 15) {
    console.log(
      chalk.yellow(`В сумме ты заработал ${count} баллов. СЛАБОВАТО!`)
    );
  } else if (count > 15 && count <= 35) {
    console.log(
      chalk.yellow(`🎉В сумме ты заработал ${count} баллов. ПРИЕМЛЕМО!🎉`)
    );
  } else if (count < 35) {
    console.log(
      chalk.yellow(`🎉🎉В сумме ты заработал ${count} баллов. ГЕНИЙ!🎉🎉`)
    );
  }
}
// temaMemes();

async function temaFilm() {
  const read = JSON.parse(await fs.readFile('./QuizFilm.json', 'utf-8'));
  let count = 0;
  for (let i = 0; i < read.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const films = await inquirer
      .prompt([
        {
          name: 'quizFilm',
          message: `${read[i].question}`,
        },
      ])
      .then((answers) => {
        if (answers.quizFilm === read[i].answers) {
          console.info(
            chalk.green(`Хорош, у тебя уже ${(count += 10)} баллов.`)
          );
          return;
        }
        console.info(
          chalk.yellow(
            `Не хорош, теперь у тебя всего ${(count -= 5)} баллов.`
          ) + chalk.green(`\nПравильный ответ: ${read[i].answers}`)
        );
      });
  }
  console.clear();
  if (count <= 20) {
    console.log(
      chalk.yellow(`В сумме ты заработал ${count} баллов. СЛАБОВАТО!`)
    );
  } else if (count > 20 && count <= 40) {
    console.log(
      chalk.yellow(`🎉В сумме ты заработал ${count} баллов. ПРИЕМЛЕМО!🎉`)
    );
  } else if (count > 40) {
    console.log(
      chalk.yellow(`🎉🎉В сумме ты заработал ${count} баллов. ГЕНИЙ!🎉🎉`)
    );
  }
}
// temaFilm();

module.exports = { temaMemes, temaFilm };
