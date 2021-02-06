const express = require('express');
const app = express();
const connection = require('./database/database');
const Questions = require('./database/Questions');
const Answers = require('./database/Answers');

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
testConnection();
async function testConnection() {
  try {
    await connection.authenticate();
  } catch (e) {
    console.error(e);
  }
}

app.get('/', async (req, res) => {
  try {
    const questions = await listQuestions();
    res.render('index', {
      questions: questions,
    });
  } catch (e) {
    res.send(`Erro: ${e}`);
  }
});

app.post('/perguntar', async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;

    await createQuestion(title, description);
    res.redirect('/');
  } catch (e) {
    res.send(`Erro ${e}`);
  }
});

app.get('/perguntar', (req, res) => {
  res.render('makeQuestion');
});

app.get('/pergunta/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const question = await getSingleQuestion(id);
    const answers = await getAnswers(id);

    res.render('question', {
      question,
      answers,
    });
  } catch (error) {
    res.send(`Erro: ${e}`);
  }
});

app.post('/responder', async (req, res) => {
  try {
    const text = req.body.text;
    const questionId = req.body.questionId;

    await createAnswer(text, questionId);
    res.redirect(`/pergunta/${questionId}`);
  } catch (e) {
    res.send(`Erro: ${e}`);
  }
});

async function getSingleQuestion(id) {
  const question = await Questions.findByPk(id, {
    raw: true,
  });
  return question;
}

async function createQuestion(title, description) {
  await Questions.create({
    title,
    description,
  });
}

async function createAnswer(text, questionId) {
  await Answers.create({
    text,
    questionId,
  });
}
async function getAnswers(questionId) {
  const getAnswers = await Answers.findAll({
    where: { questionId },
    raw: true,
  });
  return getAnswers;
}
async function listQuestions() {
  const questions = await Questions.findAll({
    order: [['ID', 'DESC']],
  });
  return questions;
}
app.listen(8080, () => {
  console.log('server running');
});
