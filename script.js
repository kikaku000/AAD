/* ==========================================================================
   【圖片資源設置】
   ========================================================================== */
const ASSETS = {
  backgrounds: {
    room: "https://images.plurk.com/3FkvQr4fKOmNlcAXHB6pVC.png ",
    room2: "https://images.plurk.com/3Ef8rTQgXwtXJCQHI0cwW5.png ",
    entrance: "https://images.plurk.com/2Ty9BELXv58im9Q36UThsk.png",
    street: "https://images.plurk.com/4Q6lweD2QSmqzPdFCJXx26.png",
    ending: "https://images.plurk.com/4OsqoJaDhmPlQb6A6vn9kO.png  "
  },
  characters: {
    protagonist_normal: "https://images.plurk.com/6XdMRTSTEv2LGO7pTI2Hpt.png",
    protagonist_糾結: "https://images.plurk.com/3a7dYkPw6LBrptDlXVll5T.png",
    protagonist_超糾結: "https://images.plurk.com/1jOom5sQjhy7f3zzkZm1gS.png",
    protagonist_愁眉: "https://images.plurk.com/5SGLrDhyTb4AR42j7wkfaF.png",
    protagonist_整裝: "https://images.plurk.com/3IgsXzwXKuzqjqjImT91nn.png",
    protagonist_認真愁: "https://images.plurk.com/gRpG9Ir4rmvPkwstwR5Di.png",
    protagonist_決心: "https://images.plurk.com/7l0RtsDsgXo4tQQyOQHluk.png"
  },
  player: "https://images.plurk.com/46EowJmJTngIV1nr967cOe.png ",
  pixelAnimals: [
    "https://images.plurk.com/4YdjWh97UBstE9gFK74Wu4.png",
    "https://images.plurk.com/1favROXJI5vJN7UcO2Be2N.png",
    "https://images.plurk.com/1xnVBjDS22PA8X5jVSZhGM.png"
    
  ]
};

const playerImg = new Image();
playerImg.src = ASSETS.player;

const loadedAnimalImages = [];
ASSETS.pixelAnimals.forEach((url) => {
  const img = new Image();
  img.src = url;
  loadedAnimalImages.push(img);
});

const introLines = [
  "「動物應該享有站立、臥倒、轉身、梳理自己與伸展四肢的自由。」",
  "",
  "(An animal should at least have sufficient freedom of movement to be able without difficulty,",
  "to turn round, groom itself, get up, lie down and stretch its limbs.)",
  "",
  "—— 《布蘭貝爾報告》 1965 英國   ——"
];

const scriptPhase2 = [
  { speaker: "貓屋敷霞", text: "還有好多頁啊......", bgKey: "room", charKey: "protagonist_normal" },
  { text: "此刻的貓屋敷霞望著天花板，一臉生無可戀的模樣 \n在家等待開學的日子實在難熬，何況他只是為了補那門沒考到試才被當的學分。", bgKey: "room" },
  { speaker: "貓屋敷霞", text: "好無聊......難道我這幾天要一直這樣嗎？", bgKey: "room", charKey: "protagonist_愁眉" },
  { speaker: "腦", text: "去看看被理事長賣給遊樂園的動物們吧？\n聽說賣給狂野西境主題區之類的了，你也很想念小灰不是嗎。", bgKey: "room2", charKey: "protagonist_愁眉" },
  { speaker: "貓屋敷霞", text: "......但是快開學了，而且最近是小紅的忌日耶。這樣顯得我好渣喔。\n在九州發誓過我會好好讀書的。", bgKey: "room", charKey: "protagonist_認真愁" },
  { speaker: "腦", text: "一天而已，明天加倍努力就好啦，時間還那麼多。\n難道小灰就不重要嗎......", bgKey: "room", charKey: "protagonist_糾結" },
  { speaker: "貓屋敷霞", text: "可是可是......", bgKey: "room", charKey: "protagonist_超糾結" },
  { speaker: "腦", text: "你  真  的  不  想  去  看  他  們  嗎  ？", bgKey: "room", charKey: "protagonist_normal" },
  { speaker: "貓屋敷霞", text: "......", bgKey: "room", charKey: "protagonist_超糾結", triggerGameChoice: true }
];

const scriptPhase4 = [
  { speaker: "貓屋敷霞", text: "……算了！我要出門！動物是自由的、我也是自由的———", bgKey: "room", charKey: "protagonist_決心" },
  { text: "謬論一般的主張。\n但很多時候人總是能這樣輕易說服自己，貓屋敷霞更是一把好手。\n此刻他的思緒早已飄到遙遠的地方。", bgKey: "entrance", charKey: "protagonist_normal" },
  { speaker: "貓屋敷霞", text: "帽子、圍巾、重要物品放進背包——啊，學生證也帶著吧，也許買吃的會打折。", bgKey: "entrance" },
  { speaker: "貓屋敷霞", text: "很好、出發吧！", bgKey: "street", charKey: "protagonist_整裝", triggerExitChoice: true }
];

const endingLines = [

  "遊樂園，乘載一切美好事物的所在。",
  "小霞記得自己穿越了大門，迎面而來的是有些異樣的微風，不過他渾然不覺，自由的氣息讓他不自覺張開雙臂。",
  "滿心期待著久違的動物王國、也許能見到小灰或是其他牛的大穀倉、沿路販售的吉拿棒與棉花糖。",
  "一定是愉快的一天！小霞在心中如此想道。",
  "至少到醒來之前是的———"
];

let audioCtx = null;
let soundEnabled = true;

// 初始化音訊與播放背景音樂 (BGM)
function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const bgm = document.getElementById('bgmAudio');
  if (bgm) {
    bgm.volume = 0.18;
    if (bgm.paused) {
      bgm.play().catch(e => {
        console.log("等待玩家互動解鎖音訊");
      });
    }
  }
}

function playTone(freq, type = 'sine', duration = 0.08, volume = 0.1) {
  if (!soundEnabled) return;
  try {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(volume, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) { }
}

function playTypingSound() { playTone(800 + Math.random() * 200, 'triangle', 0.03, 0.03); }
function playHitSound() { playTone(120, 'sawtooth', 0.3, 0.3); }
function playSuspenseSound() { playTone(90, 'sine', 1.2, 0.2); }

let introLineIndex = 0;
let introCharIndex = 0;
let isTyping = false;

function initIntroPage() {
  introLineIndex = 0;
  introCharIndex = 0;
  const container = document.getElementById('introText');
  if (container) {
    container.innerHTML = "";
    typeNextIntroLine();
  }
}

function typeNextIntroLine() {
  const container = document.getElementById('introText');
  if (!container) return;

  if (introLineIndex < introLines.length) {
    isTyping = true;
    const currentLine = introLines[introLineIndex];

    if (introCharIndex < currentLine.length) {
      container.innerHTML += currentLine.charAt(introCharIndex);
      introCharIndex++;
      if (introCharIndex % 2 === 0) playTypingSound();
      setTimeout(typeNextIntroLine, 35);
    } else {
      container.innerHTML += "<br>";
      introLineIndex++;
      introCharIndex = 0;
      setTimeout(typeNextIntroLine, 350);
    }
  } else {
    isTyping = false;
    const btn = document.getElementById('introNextBtn');
    if (btn) btn.classList.remove('opacity-0');
  }
}

function advanceIntro() {
  playTone(523.25, 'sine', 0.15, 0.1);
  window.location.href = "story.html";
}

let currentScript = [];
let scriptIndex = 0;
let typingTimer = null;

function initStoryPage() {
  currentScript = scriptPhase2;
  scriptIndex = 0;
  renderDialog();
}

function startPhase4() {
  currentScript = scriptPhase4;
  scriptIndex = 0;
  const sceneTitle = document.getElementById('sceneTitle');
  const chapterBadge = document.getElementById('chapterBadge');
  if (sceneTitle) sceneTitle.innerText = "出門前夕 · 玄關";
  if (chapterBadge) chapterBadge.innerText = "CHAPTER 02";
  renderDialog();
}

function renderDialog() {
  const item = currentScript[scriptIndex];
  const speakerName = document.getElementById('speakerName');

  if (speakerName) {
    const speakerTag = speakerName.parentElement;
    if (!item.speaker || item.speaker === "旁白" || item.speaker.trim() === "") {
      if (speakerTag) speakerTag.classList.add('hidden');
    } else {
      speakerName.innerText = item.speaker;
      if (speakerTag) speakerTag.classList.remove('hidden');
    }
  }

  const bgLayer = document.getElementById('bgImageLayer');
  if (bgLayer) {
    if (item.bgKey && ASSETS.backgrounds[item.bgKey]) {
      bgLayer.style.backgroundImage = `url('${ASSETS.backgrounds[item.bgKey]}')`;
      bgLayer.style.opacity = "0.35";
    } else {
      bgLayer.style.backgroundImage = "none";
    }
  }

  const spriteImg = document.getElementById('characterSprite');
  if (spriteImg) {
    if (item.charKey && ASSETS.characters[item.charKey]) {
      spriteImg.src = ASSETS.characters[item.charKey];
      spriteImg.classList.remove('hidden');
    } else {
      spriteImg.classList.add('hidden');
    }
  }

  const dialogText = document.getElementById('dialogText');
  const cursor = document.getElementById('dialogCursor');
  const choiceBox = document.getElementById('choiceContainer');

  if (cursor) cursor.classList.add('hidden');
  if (choiceBox) {
    choiceBox.classList.add('opacity-0', 'pointer-events-none');
    choiceBox.innerHTML = "";
  }

  typeText(dialogText, item.text, 35, () => {
    if (cursor) cursor.classList.remove('hidden');
    if (item.triggerGameChoice) {
      showChoiceButton("幫助小霞排除雜念吧！", "fa-gamepad", enterMiniGame);
    } else if (item.triggerExitChoice) {
      showChoiceButton("出門前往遊樂園！", "fa-door-open", enterPhase5);
    }
  });
}

function handleDialogClick() {
  initAudio();
  const item = currentScript[scriptIndex];

  if (isTyping) {
    clearInterval(typingTimer);
    const dialogText = document.getElementById('dialogText');
    if (dialogText) dialogText.innerText = item.text;
    isTyping = false;
    const cursor = document.getElementById('dialogCursor');
    if (cursor) cursor.classList.remove('hidden');

    if (item.triggerGameChoice) {
      showChoiceButton("幫助小霞排除雜念吧！", "fa-gamepad", enterMiniGame);
    } else if (item.triggerExitChoice) {
      showChoiceButton("出門前往遊樂園！", "fa-door-open", enterPhase5);
    }
    return;
  }

  if (item.triggerGameChoice || item.triggerExitChoice) return;

  if (scriptIndex < currentScript.length - 1) {
    playTone(400, 'sine', 0.05, 0.05);
    scriptIndex++;
    renderDialog();
  }
}

function showChoiceButton(text, iconClass, onClickFunc) {
  const choiceBox = document.getElementById('choiceContainer');
  if (!choiceBox) return;

  choiceBox.innerHTML = `
    <button id="dynamicChoiceBtn" class="jp-btn w-full py-3 px-6 rounded-xl text-white text-sm md:text-base shadow-xl flex items-center justify-center gap-3 animate-bounce pointer-events-auto">
      <span>${text}</span>
    </button>
  `;
  choiceBox.classList.remove('opacity-0', 'pointer-events-none');
  const btn = document.getElementById('dynamicChoiceBtn');
  if (btn) {
    btn.onclick = (e) => {
      e.stopPropagation();
      onClickFunc();
    };
  }
}

function typeText(element, text, speed = 35, callback = null) {
  if (!element) return;
  isTyping = true;
  element.innerText = "";
  let i = 0;
  clearInterval(typingTimer);

  typingTimer = setInterval(() => {
    if (i < text.length) {
      element.innerText += text.charAt(i);
      if (i % 2 === 0) playTypingSound();
      i++;
    } else {
      clearInterval(typingTimer);
      isTyping = false;
      if (callback) callback();
    }
  }, speed);
}

/* ==========================================================================
   階段三：小遊戲 Canvas Engine
   ========================================================================== */
let canvas, ctx;
let gameLoopReq = null;
let player = { x: 0, y: 0, width: 48, height: 48, speed: 6.5 };
let thoughts = [];
let gameStartTime = 0;
let isGameOver = false;
let isCountingDown = false;
let countdownValue = 3;
let keys = { left: false, right: false, up: false, down: false };
let mouse = { x: 0, y: 0, isMoved: false };

function enterMiniGame() {
  playTone(587.33, 'triangle', 0.2);
  document.getElementById('phaseVN').classList.add('hidden');
  const miniGame = document.getElementById('phaseMiniGame');
  miniGame.classList.remove('hidden');
  miniGame.classList.add('flex');

  initCanvas();
  startCountdownAndGame();
}

function initCanvas() {
  canvas = document.getElementById('gameCanvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  resizeCanvas();

  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('orientationchange', () => {
    setTimeout(resizeCanvas, 200);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = true;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = true;
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') keys.up = true;
    if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') keys.down = true;
  });
  window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = false;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = false;
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') keys.up = false;
    if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') keys.down = false;
  });

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.isMoved = true;
  });

  canvas.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
      mouse.isMoved = true;
    }
  }, { passive: true });

  const leftBtn = document.getElementById('btnTouchLeft');
  const rightBtn = document.getElementById('btnTouchRight');
  const setLeft = (val) => (e) => { e.preventDefault(); keys.left = val; };
  const setRight = (val) => (e) => { e.preventDefault(); keys.right = val; };

  if (leftBtn && rightBtn) {
    leftBtn.ontouchstart = setLeft(true); leftBtn.ontouchend = setLeft(false);
    leftBtn.onmousedown = setLeft(true); leftBtn.onmouseup = setLeft(false);
    rightBtn.ontouchstart = setRight(true); rightBtn.ontouchend = setRight(false);
    rightBtn.onmousedown = setRight(true); rightBtn.onmouseup = setRight(false);
  }
}

function resizeCanvas() {
  const wrapper = document.getElementById('canvasWrapper');
  if (wrapper && canvas) {
    canvas.width = wrapper.clientWidth;
    canvas.height = wrapper.clientHeight;
    if (player) {
      player.x = canvas.width / 2 - player.width / 2;
      player.y = canvas.height / 2 + 30;
      mouse.x = player.x + player.width / 2;
      mouse.y = player.y + player.height / 2;
    }
  }
}

function startCountdownAndGame() {
  resizeCanvas();
  player.x = canvas.width / 2 - player.width / 2;
  player.y = canvas.height / 2 + 30;
  mouse.x = player.x + player.width / 2;
  mouse.y = player.y + player.height / 2;
  thoughts = [];
  isGameOver = false;
  isCountingDown = true;
  countdownValue = 3;

  const overlay = document.getElementById('gameOverlay');
  if (overlay) {
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
  }

  const timerEl = document.getElementById('gameTimer');
  if (timerEl) timerEl.innerText = "03.00s";

  if (gameLoopReq) cancelAnimationFrame(gameLoopReq);

  playTone(440, 'sine', 0.15);

  const countdownInterval = setInterval(() => {
    countdownValue--;
    if (countdownValue > 0) {
      playTone(440, 'sine', 0.15);
    } else if (countdownValue === 0) {
      playTone(880, 'triangle', 0.25);
    } else {
      clearInterval(countdownInterval);
      isCountingDown = false;
      gameStartTime = Date.now();
      gameLoop();
      return;
    }
  }, 1000);

  function countdownLoop() {
    if (!isCountingDown) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (playerImg.complete && playerImg.naturalWidth !== 0) {
      ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
    } else {
      ctx.fillStyle = '#f08b93';
      ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#fcd3c1";
    ctx.font = "bold 48px 'DotGothic16', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(countdownValue > 0 ? countdownValue : "GO!", canvas.width / 2, canvas.height / 2);

    gameLoopReq = requestAnimationFrame(countdownLoop);
  }

  countdownLoop();
}

function gameLoop() {
  if (isGameOver || isCountingDown) return;

  const elapsed = (Date.now() - gameStartTime) / 1000;
  const remainingTimer = Math.max(0, 5 - elapsed);
  const timerEl = document.getElementById('gameTimer');
  if (timerEl) timerEl.innerText = remainingTimer.toFixed(2) + "s";

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (keys.left) player.x -= player.speed;
  if (keys.right) player.x += player.speed;
  if (keys.up) player.y -= player.speed;
  if (keys.down) player.y += player.speed;

  if (mouse.isMoved) {
    const targetX = mouse.x - player.width / 2;
    const targetY = mouse.y - player.height / 2;
    player.x += (targetX - player.x) * 0.25;
    player.y += (targetY - player.y) * 0.25;
  }

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const circleRadius = (canvas.width / 2) - 22;

  const playerCenterX = player.x + player.width / 2;
  const playerCenterY = player.y + player.height / 2;
  const dx = playerCenterX - centerX;
  const dy = playerCenterY - centerY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > circleRadius) {
    const angle = Math.atan2(dy, dx);
    const clampedCenterX = centerX + circleRadius * Math.cos(angle);
    const clampedCenterY = centerY + circleRadius * Math.sin(angle);
    player.x = clampedCenterX - player.width / 2;
    player.y = clampedCenterY - player.height / 2;
  }

  if (playerImg.complete && playerImg.naturalWidth !== 0) {
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
  } else {
    ctx.fillStyle = '#f08b93';
    ctx.fillRect(player.x, player.y, player.width, player.height);
  }

  if (elapsed < 5.0) {
    if (Math.random() < 0.06) spawnThought(false);
  } else {
    for (let i = 0; i < 4; i++) spawnThought(true);
  }

  for (let i = thoughts.length - 1; i >= 0; i--) {
    let t = thoughts[i];
    t.y += t.speed;

    if (t.img && t.img.complete) {
      ctx.drawImage(t.img, t.x, t.y, t.width, t.height);
    } else {
      ctx.fillStyle = "#f08b93";
      ctx.fillRect(t.x, t.y, t.width, t.height);
    }

    if (
      player.x < t.x + t.width &&
      player.x + player.width > t.x &&
      player.y < t.y + t.height &&
      player.y + player.height > t.y
    ) {
      triggerGameFailure();
      return;
    }

    if (t.y > canvas.height + 50) thoughts.splice(i, 1);
  }

  gameLoopReq = requestAnimationFrame(gameLoop);
}

function spawnThought(isTrapBatch = false) {
  const randomIndex = Math.floor(Math.random() * loadedAnimalImages.length);
  const animalImg = loadedAnimalImages[randomIndex];
  const size = 52;

  thoughts.push({
    x: Math.random() * (canvas.width - size),
    y: -size,
    width: size,
    height: size,
    img: animalImg,
    speed: isTrapBatch ? 7 + Math.random() * 6 : 2.5 + Math.random() * 2.5
  });
}

function triggerGameFailure() {
  isGameOver = true;
  playHitSound();

  const container = document.getElementById('gameContainer');
  if (container) {
    container.classList.add('shake-animation');
    setTimeout(() => container.classList.remove('shake-animation'), 600);
  }

  const overlay = document.getElementById('gameOverlay');
  if (overlay) {
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
  }
}

function endMiniGameAndReturn() {
  playTone(440, 'sine', 0.1);
  document.getElementById('phaseMiniGame').classList.add('hidden');
  const phaseVN = document.getElementById('phaseVN');
  phaseVN.classList.remove('hidden');
  phaseVN.classList.add('flex');
  startPhase4();
}

/* ==========================================================================
   階段五：懸念結局邏輯（打字機效果 + 純白置中版）
   ========================================================================== */
function enterPhase5() {
  playSuspenseSound();
  document.getElementById('phaseVN').classList.add('hidden');
  const phase5 = document.getElementById('phaseEnding');
  phase5.classList.remove('hidden');
  phase5.classList.add('flex');

  const endingBg = document.getElementById('endingBgLayer');
  if (endingBg && ASSETS.backgrounds.ending) {
    endingBg.style.backgroundImage = `url('${ASSETS.backgrounds.ending}')`;
  }

  const container = document.getElementById('endingTextContainer');
  if (container) container.innerHTML = "";

  let lineIdx = 0;

  function typeEndingLine() {
    if (lineIdx < endingLines.length) {
      const p = document.createElement('p');

      // 🌟 全部改為純白色、文字置中 (`text-center`)
      if (lineIdx === endingLines.length - 1) {
        p.className = "my-3 text-white font-bold text-sm md:text-base tracking-widest dialogue-text text-center";
      } else {
        p.className = "my-3 text-white font-medium text-sm md:text-base tracking-wide dialogue-text text-center";
      }

      if (container) container.appendChild(p);

      typeText(p, endingLines[lineIdx], 40, () => {
        lineIdx++;
        setTimeout(typeEndingLine, 500);
      });
    } else {
      setTimeout(() => {
        const actions = document.getElementById('endingActions');
        if (actions) actions.classList.remove('opacity-0');
      }, 500);
    }
  }

  typeEndingLine();
}
