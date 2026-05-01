let lineScore = 0;
let highScore = 0;
let teamAScore = 0;
let teamBScore = 0;
let currentTeam = "Team A";
let board = [];
const boardSize = 5;

// Prompts — 52 unique entries, no duplicates
const prompts = [
  { text: "🧱 Story of Jericho", verse: "Joshua 6:20" },
  { text: "🌟 Blessed are the poor in spirit", verse: "Matthew 5:3" },
  { text: "🕊️ I leave you peace", verse: "John 14:27" },
  { text: "💪 I can do all things through Christ", verse: "Philippians 4:13" },
  { text: "🌍 Go and make disciples", verse: "Matthew 28:19" },
  { text: "⏳ Parable of the talents", verse: "Matthew 25:14" },
  { text: "👑 David anointed as king", verse: "1 Samuel 16:13" },
  { text: "🕯️ Light of the world", verse: "Matthew 5:14" },
  { text: "🍞 Jesus feeds 5000", verse: "John 6:11" },
  { text: "💖 Love your neighbor", verse: "Mark 12:31" },
  { text: "🌿 Parable of the sower", verse: "Luke 8:4" },
  { text: "⛪ Church unity verse", verse: "Ephesians 4:3" },
  { text: "🕊️ Holy Spirit gift", verse: "Acts 2:38" },
  { text: "🛡️ Armor of God", verse: "Ephesians 6:11" },
  { text: "🌈 Noah's rainbow", verse: "Genesis 9:13" },
  { text: "📖 Hide your word in my heart", verse: "Psalm 119:11" },
  { text: "🙏 Pray without ceasing", verse: "1 Thessalonians 5:17" },
  { text: "👩 Esther's courage", verse: "Esther 4:14" },
  { text: "🕊️ God of hope", verse: "Romans 15:13" },
  { text: "🌟 Blessed are the pure in heart", verse: "Matthew 5:8" },
  { text: "💡 Trust in the Lord with all your heart", verse: "Proverbs 3:5" },
  { text: "🛐 Worship in Spirit and truth", verse: "John 4:24" },
  { text: "👣 Follow in Jesus' footsteps", verse: "1 Peter 2:21" },
  { text: "💬 Acknowledge Him in all your ways", verse: "Proverbs 3:6" },
  { text: "🦁 Daniel and the lions", verse: "Daniel 6:22" },
  { text: "🌊 Jesus walks on water", verse: "Matthew 14:25" },
  { text: "😇 Fruit of the Spirit", verse: "Galatians 5:22" },
  { text: "✝️ Name a disciple", verse: "Matthew 10:2" },
  { text: "🕊️ The peace of God", verse: "Philippians 4:7" },
  { text: "🎵 Psalm of joy", verse: "Psalm 100:1" },
  { text: "📜 Isaiah's calling", verse: "Isaiah 6:8" },
  { text: "🔥 Burning bush", verse: "Exodus 3:2" },
  { text: "💡 If any lacks wisdom", verse: "James 1:5" },
  { text: "🚶 Prodigal son parable", verse: "Luke 15:20" },
  { text: "🍷 Water into wine", verse: "John 2:9" },
  { text: "⚓ Faith is the substance", verse: "Hebrews 11:1" },
  { text: "👼 Angel visits Mary", verse: "Luke 1:26" },
  { text: "🧍 Ten Commandments given", verse: "Exodus 20:1" },
  { text: "💓 For God so loved the world", verse: "John 3:16" },
  { text: "🌟 Blessed are the peacemakers", verse: "Matthew 5:9" },
  { text: "🕊️ Without faith it is impossible", verse: "Hebrews 11:6" },
  { text: "💪 Those who wait on the Lord", verse: "Isaiah 40:31" },
  { text: "📜 God's word is a lamp", verse: "Psalm 119:105" },
  { text: "🌊 Red Sea crossing", verse: "Exodus 14:21" },
  { text: "👑 Solomon asks for wisdom", verse: "1 Kings 3:9" },
  { text: "🍎 Forbidden fruit warning", verse: "Genesis 2:17" },
  { text: "🙌 Be still and know", verse: "Psalm 46:10" },
  { text: "🔑 Knock and the door shall open", verse: "Matthew 7:7" },
  { text: "🌱 Mustard seed faith", verse: "Matthew 17:20" },
  { text: "✨ Created in God's image", verse: "Genesis 1:27" },
  { text: "📣 John the Baptist's message", verse: "Mark 1:4" },
  { text: "🗡️ Sword of the Spirit", verse: "Ephesians 6:17" }
];
// Shuffle helper (Fisher-Yates)
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Initialize board
function createBoard() {
  const grid = document.getElementById("bingoBoard");
  grid.innerHTML = "";
  board = [];

  const shuffledPrompts = shuffle(prompts).slice(0, 25);

  shuffledPrompts.forEach((item, index) => {
    const cell = document.createElement("div");
    cell.className = "bingo-cell";
    cell.textContent = item.text;
    cell.dataset.index = index;
    cell.dataset.verse = item.verse;
    cell.addEventListener("click", () => {
      cell.classList.toggle("completed");
      showVersePopup(item.verse);
      checkWin();
      checkBoardComplete();
      saveScores();
    });
    board.push(cell);
    grid.appendChild(cell);
  });
}

// Verse popup animation
function showVersePopup(verse) {
  const popup = document.getElementById("versePopup");
  popup.textContent = `📖 ${verse}`;
  popup.classList.remove("hidden");
  popup.classList.add("show");
  setTimeout(() => {
    popup.classList.remove("show");
    popup.classList.add("hidden");
  }, 3000);
}

// Check for bingo lines
function checkWin() {
  const lines = [];

  // Rows and columns
  for (let r = 0; r < boardSize; r++) {
    lines.push([...Array(boardSize)].map((_, i) => r * boardSize + i));
  }
  for (let c = 0; c < boardSize; c++) {
    lines.push([...Array(boardSize)].map((_, i) => i * boardSize + c));
  }

  // Diagonals
  lines.push([0, 6, 12, 18, 24]);
  lines.push([4, 8, 12, 16, 20]);

  let newLines = 0;

  lines.forEach(line => {
    const allCompleted = line.every(i => board[i].classList.contains("completed"));
    const alreadyScored = line.every(i => board[i].classList.contains("winning"));
    if (allCompleted && !alreadyScored) {
      line.forEach(i => board[i].classList.add("winning"));
      newLines++;
    }
  });

  if (newLines > 0) {
    lineScore += newLines;
    if (currentTeam === "Team A") teamAScore += newLines;
    else teamBScore += newLines;
    if (lineScore > highScore) highScore = lineScore;

    updateScoresUI();
    saveScores();

    document.getElementById("bingoFeedback").textContent =
      `🏆 You completed ${newLines} new line${newLines > 1 ? "s" : ""}!`;
    showEncouragement(lineScore);
  }
}

// Update all UI scores
function updateScoresUI() {
  document.getElementById("lineScore").textContent = lineScore;
  document.getElementById("highScore").textContent = highScore;
  document.getElementById("teamAScore").textContent = teamAScore;
  document.getElementById("teamBScore").textContent = teamBScore;
}

// Reset board
function resetBingo() {
  lineScore = 0;
  teamAScore = 0;
  teamBScore = 0;
  highScore = 0;
  updateScoresUI();
  document.getElementById("bingoFeedback").textContent = "";
  document.getElementById("encouragementMessage").textContent = "🌱 Ready for a fresh start!";
  createBoard();
  saveScores();
}

// Encouragement messages
function showEncouragement(score) {
  const message = document.getElementById("encouragementMessage");
  if (score < 2) message.textContent = "🙌 Great start!";
  else if (score < 5) message.textContent = "🔥 You're warming up!";
  else if (score < 10) message.textContent = "💥 Bingo Pro in the making!";
  else message.textContent = "👑 Bingo Legend! Scripture master unlocked!";
}

// Fullscreen toggle
function toggleFullscreen() {
  const elem = document.documentElement;
  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch(err => alert(`Error: ${err.message}`));
  } else {
    document.exitFullscreen();
  }
}

// Team switcher
function setTeam(team) {
  currentTeam = team;
  document.getElementById("teamA").classList.remove("active");
  document.getElementById("teamB").classList.remove("active");
  document.getElementById(team === "Team A" ? "teamA" : "teamB").classList.add("active");
}

// Firestore: Save scores
function saveScores() {
  db.collection("bibleBingoScores").doc(userId).set({
    lineScore,
    highScore,
    teamAScore,
    teamBScore
  }).catch(error => console.error("Error saving scores:", error));
}

// Firestore: Load scores
function loadScores() {
  db.collection("bibleBingoScores").doc(userId).get().then(doc => {
    if (doc.exists) {
      const data = doc.data();
      lineScore = data.lineScore || 0;
      highScore = data.highScore || 0;
      teamAScore = data.teamAScore || 0;
      teamBScore = data.teamBScore || 0;
    }
    updateScoresUI();
  }).catch(error => {
    console.error("Error loading scores:", error);
    updateScoresUI();
  });
}

function startGame() {
  document.getElementById("instructionsOverlay").style.display = "none";
  document.querySelector(".bingo-container").classList.remove("hidden");
  loadScores();
  createBoard();
}

// Check if the entire board is completed → show end screen
function checkBoardComplete() {
  const allCells = document.querySelectorAll(".bingo-cell");
  const allCompleted = Array.from(allCells).every(c => c.classList.contains("completed"));
  if (!allCompleted) return;

  // Small delay so the last cell animation plays
  setTimeout(() => {
    const endScreen = document.getElementById("endScreen");
    document.getElementById("endLines").textContent = lineScore;
    document.getElementById("endTeamA").textContent = teamAScore;
    document.getElementById("endTeamB").textContent = teamBScore;

    // Dynamic end message
    let msg = "";
    if (lineScore >= 10) msg = "👑 Bingo Legend! Scripture master unlocked!";
    else if (lineScore >= 5) msg = "💥 Bingo Pro in the making!";
    else if (lineScore >= 2) msg = "🔥 Great effort — you're warming up!";
    else if (lineScore >= 1) msg = "🙌 Nice start — keep going!";
    else msg = "📖 Board filled! Try to complete more lines next time.";
    document.getElementById("endMessage").textContent = msg;

    // Show winner info in subtitle
    let subtitle = "You filled the entire board!";
    if (teamAScore > teamBScore) subtitle += " 🔴 Team A wins!";
    else if (teamBScore > teamAScore) subtitle += " 🔵 Team B wins!";
    else if (teamAScore > 0) subtitle += " It's a tie!";
    document.getElementById("endSubtitle").textContent = subtitle;

    endScreen.classList.remove("hidden");
  }, 600);
  // Gamification
  if(typeof NBTT!=='undefined'){
    var result={score:lineScore,teamAScore:teamAScore,teamBScore:teamBScore};
    var saveResult=NBTT.saveScore('bible-bingo',result);
    result._beatPB=saveResult.isNewBest;
    NBTT.showPersonalBest('bible-bingo',endScreen,result);
    NBTT.checkAchievements('bible-bingo',result);
    NBTT.checkDailyChallenge('bible-bingo',result);
  }
}

// Play Again from end screen
function playAgain() {
  document.getElementById("endScreen").classList.add("hidden");
  resetBingo();
}

// Add event listener for start button
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  if (startBtn) {
    startBtn.addEventListener("click", startGame);
  }
});

// Orientation detection
function checkOrientation() {
  const overlay = document.getElementById("rotateOverlay");
  if (!overlay) return;
  const isPortrait = window.innerHeight > window.innerWidth;
  const isMobile = window.innerWidth < 900;
  if (isPortrait && isMobile) {
    overlay.classList.remove("hidden");
  } else {
    overlay.classList.add("hidden");
  }
}

window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);

// Init
window.addEventListener("DOMContentLoaded", () => {
  // Show instructions overlay on load
  document.getElementById("instructionsOverlay").style.display = "flex";
  document.querySelector(".bingo-container").classList.add("hidden");
  checkOrientation();
});
