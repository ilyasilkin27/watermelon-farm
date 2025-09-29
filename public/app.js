// Ферма арбузов — Vanilla JS реализация по README
// Конструктор и прототип
function Watermelon(name, size) {
  this.name = name
  this.size = size
}

Watermelon.prototype.grow = function () {
  this.size += 1
}

// Состояние игры
const watermelons = []
let coins = 0

// DOM ссылки
const fieldEl = document.getElementById('field')
const statsEl = document.getElementById('stats')
const logEl = document.getElementById('log')
const plantBtn = document.getElementById('plantBtn')
const harvestBtn = document.getElementById('harvestBtn')
const sellBtn = document.getElementById('sellBtn')

// Вспомогательные функции
const NAMES = [
  'Астра',
  'Блик',
  'Вихрь',
  'Глянец',
  'Дюшес',
  'Искра',
  'Комета',
  'Лайм',
  'Мята',
  'Нектар',
  'Оникс',
  'Плющ',
  'Румба',
  'Сфера',
  'Тонус',
  'Ультра',
  'Фреш',
  'Хруст',
  'Цитрус',
  'Янтарь',
]

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const generateName = () => {
  const idx = getRandomInt(0, NAMES.length - 1)
  return `${NAMES[idx]}-${getRandomInt(100, 999)}`
}

const getStatus = (size) => {
  if (size >= 12) return 'огромный'
  if (size >= 6) return 'средний'
  return 'маленький'
}

const addLog = (text) => {
  const item = document.createElement('div')
  const time = new Date().toLocaleTimeString('ru-RU', { hour12: false })
  item.textContent = `[${time}] ${text}`
  logEl.appendChild(item)
  logEl.scrollTop = logEl.scrollHeight
}

const updateStats = () => {
  const total = watermelons.length
  const weeds = fieldEl.querySelectorAll('[data-type="weed"]').length
  const big = watermelons.filter((w) => w.size >= 12).length
  const medium = watermelons.filter((w) => w.size >= 6 && w.size <= 11).length
  const small = watermelons.filter((w) => w.size <= 5).length

  statsEl.innerHTML = ''
  const lines = [
    `Всего арбузов: ${total}`,
    `Маленькие: ${small}`,
    `Средние: ${medium}`,
    `Огромные: ${big}`,
    `Сорняков: ${weeds}`,
    `Монеты: ${coins}`,
  ]

  lines.forEach((text) => {
    const div = document.createElement('div')
    div.textContent = text
    statsEl.appendChild(div)
  })
}

// Отрисовка карточки арбуза
const createWatermelonCard = (watermelon) => {
  const tpl = document.getElementById('cardTemplate')
  const node = tpl.content.firstElementChild.cloneNode(true)

  node.querySelector('.name').textContent = watermelon.name
  node.querySelector('.size').textContent = `размер: ${watermelon.size}`
  node.querySelector('.status').textContent = getStatus(watermelon.size)

  node.dataset.size = String(watermelon.size)
  node.classList.toggle('card--big', watermelon.size >= 12 && watermelon.size < 15)
  node.classList.toggle('card--huge', watermelon.size >= 15)

  node.addEventListener('click', () => {
    // Клик по сорняку игнорируем
    if (node.dataset.type === 'weed') return

    watermelon.grow()
    if (watermelon.size >= 15) {
      // Лопается и исчезает
      const idx = watermelons.indexOf(watermelon)
      if (idx !== -1) watermelons.splice(idx, 1)
      node.remove()
      addLog(`${watermelon.name} лопнул при размере ${watermelon.size} и исчез`)
      updateStats()
      return
    }

    // Обновить визуально
    node.dataset.size = String(watermelon.size)
    node.querySelector('.size').textContent = `размер: ${watermelon.size}`
    node.querySelector('.status').textContent = getStatus(watermelon.size)
    node.classList.toggle('card--big', watermelon.size >= 12)
    addLog(`${watermelon.name} вырос до ${watermelon.size}`)
    updateStats()
  })

  return node
}

// Сорняк
const createWeedCard = () => {
  const tpl = document.getElementById('weedTemplate')
  return tpl.content.firstElementChild.cloneNode(true)
}

// Посадка: с вероятностью 30% появляется сорняк, иначе арбуз размера 1–10
const plantWatermelon = () => {
  const isWeed = Math.random() < 0.3
  if (isWeed) {
    const weed = createWeedCard()
    fieldEl.appendChild(weed)
    addLog('На грядке вырос сорняк 🌿')
    updateStats()
    return
  }

  const size = getRandomInt(1, 10)
  const wm = new Watermelon(generateName(), size)
  watermelons.push(wm)
  const card = createWatermelonCard(wm)
  fieldEl.appendChild(card)
  addLog(`Посажен арбуз ${wm.name} (размер ${wm.size})`)
  updateStats()
}

// Урожай: выводим список арбузов в лог
const harvest = () => {
  if (watermelons.length === 0) {
    addLog('Урожай пуст — арбузов нет')
    return
  }
  addLog('Список арбузов:')
  watermelons
    .slice()
    .sort((a, b) => b.size - a.size)
    .forEach((w) => addLog(`• ${w.name} — размер ${w.size} (${getStatus(w.size)})`))
}

// Продажа: суммируем размеры как монеты и очищаем поле
const sell = () => {
  const sum = watermelons.reduce((acc, w) => acc + w.size, 0)
  const weeds = fieldEl.querySelectorAll('[data-type="weed"]')
  if (sum === 0 && weeds.length === 0) {
    addLog('Продавать нечего')
    return
  }
  coins += sum
  addLog(`Продано арбузов на сумму ${sum} монет. Баланс: ${coins}`)
  watermelons.splice(0, watermelons.length)
  // Очистить поле полностью
  fieldEl.innerHTML = ''
  updateStats()
}

// Привязка событий
plantBtn.addEventListener('click', plantWatermelon)
harvestBtn.addEventListener('click', harvest)
sellBtn.addEventListener('click', sell)

// Первичная инициализация
updateStats()
addLog('Добро пожаловать на «Ферму арбузов»! Нажмите «Посадить арбуз».')

// Экспорт для тестов / UMD-стиль
const __api = {
  Watermelon,
  generateName,
  getStatus,
  createWatermelonCard,
  plantWatermelon,
  harvest,
  sell,
  watermelons,
  get coins() {
    return coins
  },
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = __api
} else if (typeof window !== 'undefined') {
  window.WatermelonFarm = __api
}

