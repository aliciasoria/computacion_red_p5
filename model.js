const Sequelize = require("sequelize");
const options = {logging:false};
const sequelize = new Sequelize("sqlite:quizzes.sqlite",options);
// 1 DEFINICION
//const quiz =
sequelize.define('quiz',
{question:
  {type: Sequelize.STRING,
  unique: {msg:"ya existe esta pregunta"},
  validate:{notEmpty:{msg: "La pregunta no puede estar vacia"}}},
answer:
  {type: Sequelize.STRING,
  validate: {notEmpty:{msg: "La respuesta no puede estar vacia"}}}
});

// 2 INICIALIZACION
sequelize.sync()
//por que no hacer un const quiz y aqui poner quiz.count()
.then(()=>sequelize.models.quiz.count())//devuelve el count
.then(count=>{
  if(!count){//if (count === 0)
    return sequelize.models.quiz.bulkCreate([
      {question: "Capital de Italia", answer: "Roma"},
      {question: "Capital de Francia", answer: "París"},
      {question: "Capital de España", answer: "Madrid"},
      {question: "Capital de Portugal", answer: "Lisboa"}
    ]);
  }
}) //cuando acaba el then pongo un .catch
.catch(error => {console.log(error); })
module.exports = sequelize;
