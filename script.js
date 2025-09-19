const wordPool = [
  { ru: "кот", ko: "고양이" },
  { ru: "собака", ko: "강아지" },
  { ru: "дом", ko: "집" },
  { ru: "мяч", ko: "공" },
  { ru: "мама", ko: "엄마" },
  { ru: "папа", ko: "아빠" },
  { ru: "книга", ko: "책" },
  { ru: "яблоко", ko: "사과" },
  { ru: "нос", ko: "코" },
  { ru: "ухо", ko: "귀" },
  { ru: "рука", ko: "손" },
  { ru: "нога", ko: "다리" },
  { ru: "глаз", ko: "눈" },
  { ru: "рот", ko: "입" },
  { ru: "дерево", ko: "나무" },
  { ru: "цветок", ko: "꽃" },
  { ru: "солнце", ko: "태양" },
  { ru: "луна", ko: "달" },
  { ru: "звезда", ko: "별" },
  { ru: "машина", ko: "자동차" },
  { ru: "велосипед", ko: "자전거" },
  { ru: "поезд", ko: "기차" },
  { ru: "самолёт", ko: "비행기" },
  { ru: "школа", ko: "학교" },
  { ru: "море", ko: "바다" },
  { ru: "гора", ko: "산" },
  { ru: "река", ko: "강" },
  { ru: "друг", ko: "친구" },
  { ru: "игра", ko: "게임" },
  { ru: "вода", ko: "물" }
];

let cards = [];
let flippedCards = [];
const board = document.getElementById("game-board");
const restartBtn = document.getElementById("restart-btn");

function initGame() {
  board.innerHTML = "";
  flippedCards = [];

  // 🔹 무작위 4쌍 선택
  const chosen = getRandomItems(wordPool, 4);

  cards = [];
  chosen.forEach(w => {
    cards.push({ text: w.ru, pair: w.ko });
    cards.push({ text: w.ko, pair: w.ko });
  });

  cards = shuffle(cards);

  cards.forEach(c => {
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

// Fisher–Yates shuffle
function shuffle(array) {
  let current = array.length, random;
  while (current !== 0) {
    random = Math.floor(Math.random() * current);
    current--;
    [array[current], array[random]] = [array[random], array[current]];
  }
  return array;
}

// 배열에서 랜덤 n개 뽑기
function getRandomItems(array, n) {
  const copy = [...array];
  shuffle(copy);
  return copy.slice(0, n);
}

restartBtn.addEventListener("click", initGame);

initGame();
