# Ферма арбузов 🍉 (Vanilla JS)

Мини-игра для практики функций-конструкторов, прототипов, массивов, DOM и событий.

## Запуск

1. Требуется Node.js 18+.
2. Установки зависимостей нет. Запуск:

```bash
node server.js
```

Откройте `http://localhost:3000`.

## Пошаговое решение для студентов

### Шаг 1: Создайте функцию-конструктор

```javascript
function Watermelon(name, size) {
  this.name = name;
  this.size = size;
}

Watermelon.prototype.grow = function() {
  this.size += 1;
};
```

### Шаг 2: Создайте массив для хранения

```javascript
const watermelons = [];
```

### Шаг 3: Создайте функции-помощники

```javascript
function generateName() {
  // Ваш код
}

function getStatus(size) {
  // Ваш код
}
```

### Шаг 4: Создайте функцию отображения

```javascript
function createWatermelonCard(watermelon) {
  const card = document.createElement('div');
  // Ваш код
  return card;
}
```

### Шаг 5: Создайте функцию посадки

```javascript
function plantWatermelon() {
  // Ваш код
}
```

### Шаг 6: Добавьте обработчики событий

```javascript
document.getElementById('plantBtn').addEventListener('click', plantWatermelon);
```

### Шаг 7: Создайте функции сбора и продажи

```javascript
function harvest() {
  // Ваш код
}

function sell() {
  // Ваш код
}
```

### Шаг 8: Добавьте CSS стили

```css
.watermelon-card {
  /* Ваши стили */
}
```

### Шаг 9: Добавьте HTML кнопки

```html
<button id="plantBtn">Посадить арбуз</button>
```

## Игровые правила
- Кнопка «Посадить арбуз» добавляет арбуз со случайным именем и размером 1–10.
- Клик по арбузу вызывает метод `grow()` и увеличивает размер на 1.
- При размере 15 арбуз лопается и исчезает.
- Статус: маленький (<6), средний (6–11), огромный (≥12).
- Сорняки 🌿 появляются случайно (30%) и занимают место, но не растут.
- «Собрать урожай» — выводит список арбузов.
- «Продать арбузы» — суммирует размеры как «монеты» и очищает поле.

## Структура
- `server.js` — статический сервер.
- `public/index.html` — разметка и кнопки управления.
- `public/style.css` — стили и визуальная шкала размеров через font-size.
- `public/app.js` — логика игры, конструктор `Watermelon` и прототип `grow`.
