const screens = document.querySelectorAll(".screen");
const chooseSweetBtn = document.querySelectorAll(".choose_sweet_btn");
const startButton = document.getElementById("start_btn");
const gameNode = document.getElementById("game_container");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");

let seconds = 0;
let score = 0;
let selectedSweet = {};

startButton.addEventListener("click", () => {
  screens[0].classList.remove("visible");
  screens[1].classList.add("visible");
});

chooseSweetBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const img = btn.querySelector("img");
    const src = img.getAttribute("src");

    selectedSweet = { src };

    screens[1].classList.remove("visible");
    screens[2].classList.add("visible");

    startGame();
  });
});

function startGame() {
  setInterval(increaseTime, 1000);
  createSweet();
}

function increaseTime() {
  seconds++; // Увеличиваем счетчик на 1 секунду
  timeEl.innerHTML = `Время: ${seconds}`; // Обновляем отображение времени
}

function createSweet() {
  const { x, y } = getRandomLocation();
  const sweet = document.createElement("img");
  sweet.src = selectedSweet.src;

  sweet.classList.add("sweet");
  sweet.style.display = "block";
  sweet.style.top = `${y}px`;
  sweet.style.left = `${x}px`;
  //sweet.style.transform = `rotate(${Math.random() * 360}) deg`;  //Вертим элемент на 360 градусов

  sweet.addEventListener("click", catchSweet);

  gameNode.appendChild(sweet); //вставляем элемент на страницу
}

function getRandomLocation() {
  //получаем рандомные коордиинаты для появления объекта
  const width = window.innerWidth; //Ширина всего экрана
  const height = window.innerHeight; // Высота всего экрана

  const x = Math.random() * width - 100; // Отступ от элементов 100пикс
  const y = Math.random() * height - 100;

  return { x, y };
}

function catchSweet() {
  increaseScore();

  this.remove();
  addSweet();
}

function addSweet() {
  setTimeout(createSweet, 1000);
}

function increaseScore() {
    score++; // Увеличиваем счетчик на 1 секунду
  scoreEl.innerHTML = `Счет: ${score}`; // Обновляем отображение времени
}
