const words = [
  { ru: "кот", ko: "고양이" },
  { ru: "собака", ko: "강아지" },
  { ru: "дом", ko: "집" },
  { ru: "мяч", ko: "공" }
];

let cards = [];
let flippedCards = [];
const board = document.getElementById("game-board");
const restartBtn = document.getElementById("restart-btn");

function initGame() {
  board.innerHTML = "";
  flippedCards = [];

  // 러시아어, 한글 카드 섞어서 생성
  cards = [];
  words.forEach(w => {
    cards.push({ text: w.ru, pair: w.ko });
    cards.push({ text: w.ko, pair: w.ko });
  });

  cards.sort(() => Math.random() - 0.5);

  cards.forEach((c, i) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.pair = c.pair;
    card.textContent = "?";
    card.addEventListener("click", () => flipCard(card, c.text));
    board.appendChild(card);
  });
}

function flipCard(card, text) {
  if (card.classList.contains("flipped") || card.classList.contains("matched")) return;
  if (flippedCards.length === 2) return;

  card.classList.add("flipped");
  card.textContent = text;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 800);
  }
}

function checkMatch() {
  const [c1, c2] = flippedCards;
  if (c1.dataset.pair === c2.dataset.pair) {
    c1.classList.add("matched");
    c2.classList.add("matched");
  } else {
    c1.classList.remove("flipped");
    c2.classList.remove("flipped");
    c1.textContent = "?";
    c2.textContent = "?";
  }
  flippedCards = [];

  if (document.querySelectorAll(".matched").length === cards.length) {
    setTimeout(() => alert("🎉 모두 맞췄어요!"), 300);
  }
}

restartBtn.addEventListener("click", initGame);

initGame();
