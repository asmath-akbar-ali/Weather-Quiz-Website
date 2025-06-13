const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");

let correctAnswer = "";

async function loadQuestion() {
  optionsEl.innerHTML = "Loading...";
  questionEl.textContent = "";
  nextBtn.style.display = "none";

  const res = await fetch("https://opentdb.com/api.php?amount=1&category=17&difficulty=easy&type=multiple");
  const data = await res.json();
  const questionData = data.results[0];

  const question = decodeHTML(questionData.question);
  correctAnswer = decodeHTML(questionData.correct_answer);
  const incorrectAnswers = questionData.incorrect_answers.map(decodeHTML);
  const answers = shuffle([correctAnswer, ...incorrectAnswers]);

  questionEl.textContent = question;
  optionsEl.innerHTML = "";

  answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.classList.add("option");
    btn.textContent = answer;
    btn.onclick = () => handleAnswer(btn, answer);
    optionsEl.appendChild(btn);
  });
}

function handleAnswer(selectedBtn, answer) {
  const optionButtons = document.querySelectorAll(".option");
  optionButtons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    }
  });

  if (answer === correctAnswer) {
    selectedBtn.classList.add("correct");
  } else {
    selectedBtn.classList.add("wrong");
  }

  nextBtn.style.display = "inline-block";
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

window.onload = loadQuestion;