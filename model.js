/* eslint-disable no-loop-func */
const { count } = require('console');
const inquirer = require('inquirer');
const fs = require('fs').promises;

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
          console.info(`Хорош, у тебя уже ${count} баллов`);
        } else if (answers.point === 25) {
          console.info(`ТЫ НАСТОЯЩИЙ ПРОГРАМИСТ ДЕРЖИ ${count} БАЛЛОВ`);
        }
        console.info(`Не хорош, у тебя все так же ${count} баллов`);
      });
  }
  console.clear();
  if (count <= 10) {
    console.log(`В сумме ты заработал ${count} баллов. СЛАБОВАТО!`);
  } else if (count > 10 && count <= 20) {
    console.log(`В сумме ты заработал ${count} баллов. ПРИЕМЛЕМО!`);
  } else if (count > 20) {
    console.log(`В сумме ты заработал ${count} баллов. ГЕНИЙ!`);
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
          console.info(`Хорош, у тебя уже ${(count += 10)} баллов.`);
          return;
        }
        console.info(`Не хорош, теперь у тебя всего ${count -= 5} баллов.`);
      });
  }
}
temaFilm();
