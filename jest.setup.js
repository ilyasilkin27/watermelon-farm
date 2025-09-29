// Make a basic DOM skeleton resembling index.html areas used by app.js
document.body.innerHTML = `
  <header class="header">
    <div class="controls">
      <button id="plantBtn" class="btn">Посадить арбуз</button>
      <button id="harvestBtn" class="btn">Собрать урожай</button>
      <button id="sellBtn" class="btn btn--primary">Продать арбузы</button>
    </div>
  </header>
  <main class="main">
    <aside class="sidebar">
      <div class="panel"><div id="stats" class="stats"></div></div>
      <div class="panel"><div id="log" class="log"></div></div>
    </aside>
    <section class="field" id="field"></section>
  </main>
  <template id="cardTemplate">
    <button class="card" data-type="watermelon">
      <span class="emoji" aria-hidden="true">🍉</span>
      <span class="name"></span>
      <span class="size"></span>
      <span class="status badge"></span>
    </button>
  </template>
  <template id="weedTemplate">
    <div class="card card--weed" data-type="weed">
      <span class="emoji" aria-hidden="true">🌿</span>
      <span class="name">Сорняк</span>
      <span class="size">–</span>
      <span class="status badge">мешает</span>
    </div>
  </template>
`

