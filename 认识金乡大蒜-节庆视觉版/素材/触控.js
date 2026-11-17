const screen = document.querySelector('#screen');
const assetRoot = '素材/';
const partPoints = [
  {x:655,y:291,labelX:76,labelY:23,zoom:'78% 52%',observation:'先看外形，再看蒜瓣的排列。'},
  {x:702,y:252,labelX:83,labelY:42,zoom:'85% 44%',observation:'留意外皮的层次和表面纹理。'},
  {x:599,y:369,labelX:77,labelY:75,zoom:'67% 65%',observation:'比较整头蒜与掰下的蒜瓣。'},
  {x:279,y:249,labelX:5,labelY:33,zoom:'10% 44%',observation:'找一找整头蒜底部的圆形根盘。'},
];
const growthObservations = [
  '观察栽种方向：蒜瓣尖朝上，发根的一端朝下。',
  '沿田垄看蒜苗的行列，留意伸出地面的长叶。',
  '看蒜薹细长的茎，区分可食用的蒜薹和地下的蒜头。',
  '看蒜株紧贴土面的基部。蒜头在土下生长，叶片仍伸向地面以上。',
  '看采收机械和出土的蒜株，观察收获时仍留着的根和叶。',
];
const tradePrompts = [
  '规格怎样区分？','为什么要进冷库？','出境前查什么？','鲜蒜和蒜片怎样装？','金乡蒜去了哪里？',
];
const foodProcesses = [
  [
    ['晾晒','新蒜摊开晾晒，待外皮和蒜颈逐步干燥，再整理、修剪。','金乡晾晒.jpg'],
    ['整理','按销售或加工需求分拣。整头蒜可作为鲜蒜供应，一部分则进入加工车间。','加工车间.jpg'],
    ['上桌','整瓣适合炖煮，切片可用于炒菜，拍碎或捣成蒜泥可用于蘸汁。','garlic-chicken.jpg','蒜瓣烧鸡'],
  ],
  [
    ['去皮','将蒜头分瓣、去掉外皮，筛除损伤的蒜瓣。','bulb-shop4.jpg'],
    ['切片脱水','切薄后，水分从蒜瓣内部到表面的距离更短，蒜片更容易干燥。','flakes.jpg'],
    ['用于汤料','干蒜片可加入汤料和复合调味料，也可继续磨成蒜粒或蒜粉。','garlic-soup.jpg','蒜片蔬菜汤'],
  ],
  [
    ['以蒜片为原料','先将鲜蒜加工成脱水蒜片，再进入粉碎工序。','flakes.jpg'],
    ['粉碎筛分','干蒜片粉碎后，用筛分出不同粒径。更细的部分可以制成蒜粉。','powder.jpg'],
    ['拌入腌料','细粉便于均匀拌进腌料或复合调味料。储存和使用时注意防潮。','garlic-marinade.jpg','拌入蒜粉的腌料'],
  ],
  [
    ['鲜蒜入料','对照左边的鲜蒜与右边的黑蒜，先观察加工前后的颜色。','bulb-shop4.jpg'],
    ['控温控湿','熟化阶段，蒜中的糖和含氨基的成分发生美拉德反应，蒜瓣逐渐变深。','black.jpg'],
    ['品尝或做酱','熟化后的瓣肉更软，生蒜辛辣味减弱，可直接品尝或用来调酱汁。','black-garlic-sauce.jpg','黑蒜酱'],
  ],
];
const tradeSources = [
  ['https://www.jining.gov.cn/art/2021/10/27/art_71695_2735907.html','济宁市跨境贸易便利化手册'],
  ['https://scs.moa.gov.cn/gzdt/202411/t20241105_6465731.htm','农民日报 · 走访金乡冷库'],
  ['https://scs.moa.gov.cn/jcyj/202610/t20261009_6488437.htm','农业农村部 · 2026年9月会商材料'],
];
const homeImages = ['bulb-shop4.jpg','field.jpg','加工车间.jpg','sorting.jpg'];
const number = index => String(index + 1).padStart(2,'0');

function photo(file, alt = '', extra = '') {
  return `<img src="${assetRoot + file}" alt="${alt}" ${extra}>`;
}

function festivalBrand() {
  return photo('logo.png','金乡大蒜节','class="brand"');
}

function idleScreen() {
  return `<section class="idle">
    <div class="idle-inner">
      <header class="idle-header">${festivalBrand()}</header>
      <div class="idle-copy">
        <h1 tabindex="-1">认识<strong>金乡大蒜</strong></h1>
        <p>一瓣蒜，一方水土</p>
        <button class="start" data-route="explore">触摸开始 <span aria-hidden="true">→</span></button>
      </div>
      <div class="idle-art" aria-hidden="true">
        <div class="idle-arch"></div>
        ${photo('海报花形.svg','','class="idle-flower"')}
        ${photo('蒜农.svg','','class="idle-farmer"')}
        <div class="ridge ridge-lilac"></div>
        <div class="ridge ridge-sage"></div>
        <div class="ridge ridge-plum"></div>
      </div>
    </div>
  </section>`;
}

function homeScreen() {
  const entries = topics.map(({id,name}, index) => `
    <button class="entry entry-${id}" data-route="${id}">
      <span class="entry-media">${photo(homeImages[index])}</span>
      <span class="entry-label"><strong>${name}</strong><span aria-hidden="true">↗</span></span>
      <small>${exhibitGuide[id].caption}</small>
    </button>`).join('');
  return `<section class="home">
    <header class="home-top">${festivalBrand()}
    <button class="return-idle" data-route=""><span aria-hidden="true">←</span> 返回待机页</button></header>
    <div class="explore">
      <div class="explore-heading">
        <h1 tabindex="-1">探索金乡大蒜</h1><p>选择一个主题，开始探索</p>
      </div>
      <div class="entries">${entries}</div>
    </div>
  </section>`;
}

function toggle(route, label, active, className = '') {
  return `<button class="${className}" data-route="${route}" aria-pressed="${active}">${label}</button>`;
}

function reading(topic, item, source) {
  const guide = exhibitGuide[topic.id];
  const [url,label] = source || [guide.link,guide.linkLabel];
  return `<article class="reading">
    <span class="reading-tag">${item.tag}</span>
    <h2 tabindex="-1">${item.title}</h2>
    ${item.text.map(paragraph=>`<p>${paragraph}</p>`).join('')}
    <details><summary>${guide.moreTitle}</summary><p>${guide.moreText}</p></details>
    <a class="source-link" href="${url}" target="_blank" rel="noopener">${label} ↗</a>
  </article>`;
}

function chapterHeader(topic) {
  const nav = topics.map(({id,name},i) => `<button data-route="${id}" ${topic.id===id?'aria-current="page"':''}>
    <span aria-hidden="true">${number(i)}</span> ${name}</button>`).join('');
  return `<header class="topbar"><div class="topbar-inner">
    <button class="back" data-route="explore"><span aria-hidden="true">←</span> 主题总览</button>
    <nav aria-label="切换科普板块">${nav}</nav>
  </div></header>
  <header class="chapter"><div><p>${exhibitGuide[topic.id].fact}</p><h1 tabindex="-1">${topic.name}</h1></div>
    <div class="chapter-actions"><p class="hint">${topic.hint}</p>${nextChapter(topic)}</div></header>`;
}

function nextChapter(topic) {
  const next = topics[topics.indexOf(topic) + 1];
  const label = next ? `下一主题 · ${next.name}` : '返回主题总览';
  return `<button class="chapter-next" data-route="${next?.id ?? 'explore'}">${label} <span aria-hidden="true">↗</span></button>`;
}

function specimen(topic, item, index) {
  const lines = partPoints.map(({x,y,labelX,labelY}, i) => {
    const start = labelX * 10 + (i===3 ? 111 : 0);
    return `<path class="${i===index?'is-active':''}" d="M${start} ${labelY * 5.67 + 16} H${i===3?x-36:x+26} L${x} ${y}"/>
      <circle class="${i===index?'is-active':''}" cx="${x}" cy="${y}" r="8"/>`;
  }).join('');
  const pins = partPoints.map(({labelX,labelY}, i) => `<button class="pin" style="left:${labelX}%;top:${labelY}%"
    data-route="parts:${i}" aria-pressed="${i===index}">${content.parts[i].tab}</button>`).join('');
  const partControls = content.parts.map(({tab}, i) => toggle(`parts:${i}`,tab,i===index)).join('');
  const observation = partPoints[index];
  return `<div class="specimen-layout">
    <figure><div class="specimen">
      ${photo('bulb-shop4.jpg','金乡白皮蒜的整头、蒜瓣和根盘','class="specimen-image"')}
      <svg class="wires" viewBox="0 0 1000 567" aria-hidden="true">${lines}</svg>${pins}
    </div>
    <figcaption>${photoCredits.bulb}</figcaption>
    <div class="part-controls" aria-label="选择观察部位">${partControls}</div>
    </figure>
    <div class="specimen-notes">${reading(topic,item)}
      <div class="observation"><div class="zoom" style="background-position:${observation.zoom}" aria-hidden="true"></div>
      <div><strong>局部观察 · ${item.tab}</strong><p>${observation.observation}</p></div></div>
    </div>
  </div>`;
}

function growth(topic, item, index) {
  const timeline = content.growth.map((stage,i) => toggle(`growth:${i}`, `
    ${photo(stage.image,'',stage.focus?`style="object-position:${stage.focus}"`:'')}
    <span class="timeline-text"><small>${stage.tag.split(' · ')[0]}</small><strong>${stage.tab}</strong></span>`,i===index)).join('');
  const credit = item.creditUrl
    ? `<a class="photo-source" href="${item.creditUrl}" target="_blank" rel="noopener">${item.credit} ↗</a>`
    : item.credit;
  return `<div class="timeline" aria-label="金乡大蒜农时">${timeline}</div>
    <div class="growth-layout">
      <figure><div class="growth-photo">${photo(item.image,item.alt || item.tab,item.focus?`style="object-position:${item.focus}"`:'')}
      <span class="photo-label">${item.tag}</span></div><figcaption>${credit}</figcaption>
      <div class="field-note"><strong>看图提示</strong><span>${growthObservations[index]}</span></div></figure>
      ${reading(topic,item)}
    </div>`;
}

function productComparison(item) {
  return `<div class="comparison">
    <div>${photo(item.compare,item.before)}<span>${item.before}</span></div>
    <span class="compare-arrow" aria-hidden="true">→</span>
    <div>${photo(item.image,item.tab)}<span>加工后 · ${item.tab}</span></div>
  </div>`;
}

function food(topic, item, index, subIndex) {
  const products = content.food.map(({tab,image},i) => toggle(`food:${i}`,`${photo(image)}<strong>${tab}</strong>`,i===index)).join('');
  const steps = foodProcesses[index];
  const [stepTitle, stepText, stepImage, dish] = steps[subIndex] || steps[0];
  const process = steps.map(([label],i)=>toggle(`food:${index}:${i}`,label,(subIndex<0?0:subIndex)===i)).join('');
  const imageCredit = index===0 ? '金乡新蒜晾晒｜方建兵 摄 · 金乡鑫诺生产车间｜周艺伟 摄' : item.credit;
  const overview = index===0 ? `<div class="processing-field">
    <div>${photo('金乡晾晒.jpg','金乡新蒜晾晒现场')}<span>收获后 · 摊开晾晒</span></div>
    <div>${photo('加工车间.jpg','金乡鑫诺蒜制品生产车间')}<span>加工车间 · 整理与加工</span></div>
  </div>` : productComparison(item);
  return `<div class="product-shelf" aria-label="选择蒜制品">${products}</div>
    <div class="food-layout"><div><figure>${overview}<figcaption>${imageCredit}</figcaption></figure>
      <div class="process-steps" aria-label="加工与用途">${process}</div>
      <div class="process-detail">${photo(stepImage, dish || stepTitle)}<div><strong>${stepTitle}</strong><p>${stepText}</p>${dish ? `<small class="dish-note">${dish} · 示意</small>` : ''}</div></div>
    </div>${reading(topic,item)}</div>`;
}

function tradeMap(index) {
  const points = [[60.97,21.55],[45.2,46.01],[46.7,93.26]];
  const markers = destinations.map(({name},i)=>`<button class="map-point" style="left:${points[i][0]}%;top:${points[i][1]}%"
    data-route="trade:4:${i}" aria-label="查看${name}" aria-pressed="${i===index}"></button>`).join('');
  return `<div class="trade-map">${photo('出口目的地.png','金乡与越南、印度尼西亚的贸易联系示意地图')}${markers}</div>
    <div class="destinations" aria-label="选择贸易案例">
      ${destinations.map(({name},i)=>toggle(`trade:4:${i}`,name,i===index)).join('')}
    </div>`;
}

function trade(topic, item, index, subIndex) {
  const route = content.trade.map(({tab},i)=>toggle(`trade:${i}`, `
    <span class="route-number">${number(i)}</span><span><strong>${tab}</strong><small>${tradePrompts[i]}</small></span>`,i===index)).join('');
  const readingItem = item.map && destinations[subIndex] ? destinations[subIndex] : item;
  const media = item.map ? tradeMap(subIndex) : `<div class="trade-photo">${photo(item.image,item.alt || item.tab)}</div>`;
  return `<div class="trade-layout">
    <div class="trade-route" aria-label="大蒜出口流程">${route}</div>
    <figure>${media}<figcaption>${item.credit}</figcaption></figure>
    ${reading(topic,readingItem,item.map ? tradeSources[subIndex] : undefined)}
  </div>`;
}

const pageDesigns = {parts:specimen, growth, food, trade};

function render() {
  const [id, rawIndex, rawSubIndex] = location.hash.slice(1).split(':');
  const topic = topics.find(item=>item.id===id);
  if (!topic) {
    screen.innerHTML = id === 'explore' ? homeScreen() : idleScreen();
    return;
  }
  const index = content[id][Number(rawIndex)] ? Number(rawIndex) : 0;
  const subIndex = [0,1,2].includes(Number(rawSubIndex)) ? Number(rawSubIndex) : -1;
  screen.innerHTML = `<section class="page page-${id}">${chapterHeader(topic)}
    <div class="chapter-content">${pageDesigns[id](topic,content[id][index],index,subIndex)}</div>
  </section>`;
}

screen.addEventListener('click', event => {
  const button = event.target.closest('button[data-route]');
  if (!button) return;
  const route = button.dataset.route;
  const [id] = location.hash.slice(1).split(':');
  if (button.hasAttribute('aria-current') && id === route) return;
  location.hash = route;
});
window.addEventListener('hashchange', event => {
  const active = document.activeElement;
  const matches = () => [...screen.querySelectorAll('button[data-route]')].filter(button=>button.dataset.route===active?.dataset.route);
  const position = matches().indexOf(active);
  const previous = new URL(event.oldURL).hash.split(':')[0];
  const changedTopic = previous !== location.hash.split(':')[0];
  render();
  if (changedTopic) {
    window.scrollTo(0,0);
    screen.querySelector('h1')?.focus({preventScroll:true});
  } else if (position >= 0) {
    matches()[position]?.focus({preventScroll:true});
  }
});
render();
