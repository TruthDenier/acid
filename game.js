/**
 * Три в ряд - Бонусы активируются при свайпе/клике
 */

(function() {
    'use strict';

    const CONFIG = {
        ROWS: 6,
        COLS: 6,
        GEMS: [
            { emoji: '🔴', name: 'red' },
            { emoji: '🔵', name: 'blue' },
            { emoji: '🟢', name: 'green' },
            { emoji: '🟡', name: 'yellow' },
            { emoji: '🟣', name: 'purple' },
            { emoji: '🟠', name: 'orange' }
        ],
        BONUSES: {
            bomb: { emoji: '💣', radius: 1 },
            rocket: { emoji: '🚀', radius: 2 },
            super: { emoji: '⭐', radius: 3 }
        }
    };

    const state = {
        board: [],
        score: 0,
        moves: 0,
        combo: 0,
        highScore: 0,
        newHighScoreShown: false,
        isAnimating: false
    };

    const DOM = {};

    function init() {
        cacheElements();
        loadHighScore();
        createBoard();
        renderBoard();
        attachEvents();
    }

    function cacheElements() {
        DOM.board = document.getElementById('board');
        DOM.score = document.getElementById('score');
        DOM.moves = document.getElementById('moves');
        DOM.combo = document.getElementById('combo');
        DOM.highScore = document.getElementById('highScore');
        DOM.comboStat = document.getElementById('comboStat');
        DOM.messageOverlay = document.getElementById('messageOverlay');
        DOM.messageText = document.getElementById('messageText');
        DOM.restartBtn = document.getElementById('restartBtn');
    }

    function loadHighScore() {
        const saved = localStorage.getItem('match3_highScore');
        state.highScore = saved ? parseInt(saved, 10) : 0;
        DOM.highScore.textContent = state.highScore;
    }

    function saveHighScore() {
        if (state.score > state.highScore) {
            state.highScore = state.score;
            localStorage.setItem('match3_highScore', state.highScore);
            DOM.highScore.textContent = state.highScore;
            if (!state.newHighScoreShown) {
                state.newHighScoreShown = true;
                showMessage('🏆 Новый рекорд!');
            }
        }
    }

    function createBoard() {
        state.board = [];
        for (let r = 0; r < CONFIG.ROWS; r++) {
            state.board[r] = [];
            for (let c = 0; c < CONFIG.COLS; c++) {
                let gem;
                do {
                    gem = getRandomGem();
                } while (wouldMatch(r, c, gem));
                state.board[r][c] = { ...gem };
            }
        }
    }

    function getRandomGem() {
        return CONFIG.GEMS[Math.floor(Math.random() * CONFIG.GEMS.length)];
    }

    function wouldMatch(r, c, gem) {
        if (!gem) return false;
        const n = gem.name;
        if (c >= 2) {
            const p1 = state.board[r][c-1]?.name;
            const p2 = state.board[r][c-2]?.name;
            if (p1 === n && p2 === n) return true;
        }
        if (r >= 2) {
            const p1 = state.board[r-1]?.[c]?.name;
            const p2 = state.board[r-2]?.[c]?.name;
            if (p1 === n && p2 === n) return true;
        }
        return false;
    }

    function renderBoard() {
        DOM.board.innerHTML = '';
        for (let r = 0; r < CONFIG.ROWS; r++) {
            for (let c = 0; c < CONFIG.COLS; c++) {
                const cell = document.createElement('div');
                cell.className = 'game-cell';
                cell.dataset.row = r;
                cell.dataset.col = c;
                updateCellVisual(cell, state.board[r][c]);
                DOM.board.appendChild(cell);
            }
        }
        updateStats();
    }

    function updateCellVisual(cell, gem) {
        if (!cell || !gem) return;
        cell.textContent = gem.emoji;
        cell.classList.remove('bonus-cell', 'bonus-bomb', 'bonus-rocket', 'bonus-super');
        if (gem.isBonus) {
            cell.classList.add('bonus-cell', `bonus-${gem.bonusType}`);
        }
    }

    // Drag & Drop
    let dragStart = null;
    let touchStartEl = null;

    document.addEventListener('mousedown', e => {
        const cell = e.target.closest('.game-cell');
        if (!cell || state.isAnimating) return;
        
        dragStart = {
            el: cell,
            r: parseInt(cell.dataset.row),
            c: parseInt(cell.dataset.col),
            x: e.clientX,
            y: e.clientY
        };
        cell.classList.add('dragging');
    });

    document.addEventListener('mousemove', e => {
        if (!dragStart) return;
        
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        
        if (Math.abs(dx) > 30 || Math.abs(dy) > 30) {
            const dir = getDir(dx, dy);
            if (dir) {
                dragStart.el.classList.remove('dragging');
                attemptSwap(dragStart.r, dragStart.c, dir);
                dragStart = null;
            }
        }
    });

    document.addEventListener('mouseup', () => {
        if (dragStart?.el) dragStart.el.classList.remove('dragging');
        dragStart = null;
    });

    // Touch
    document.addEventListener('touchstart', e => {
        const cell = e.target.closest('.game-cell');
        if (!cell || state.isAnimating) return;
        
        touchStartEl = {
            el: cell,
            r: parseInt(cell.dataset.row),
            c: parseInt(cell.dataset.col),
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
        cell.classList.add('dragging');
    }, { passive: true });

    document.addEventListener('touchmove', e => {
        if (!touchStartEl || state.isAnimating) return;
        
        const dx = e.touches[0].clientX - touchStartEl.x;
        const dy = e.touches[0].clientY - touchStartEl.y;
        
        if (Math.abs(dx) > 40 || Math.abs(dy) > 40) {
            const dir = getDir(dx, dy);
            if (dir) {
                touchStartEl.el.classList.remove('dragging');
                attemptSwap(touchStartEl.r, touchStartEl.c, dir);
                touchStartEl = null;
            }
        }
    }, { passive: true });

    document.addEventListener('touchend', () => {
        if (touchStartEl?.el) touchStartEl.el.classList.remove('dragging');
        touchStartEl = null;
    });

    // Клик для активации бонуса
    DOM.board?.addEventListener('click', e => {
        const cell = e.target.closest('.game-cell');
        if (!cell || state.isAnimating) return;
        
        const r = parseInt(cell.dataset.row);
        const c = parseInt(cell.dataset.col);
        const gem = state.board[r]?.[c];
        
        // Если это бонус - активируем по клику
        if (gem?.isBonus) {
            activateBonusAt(r, c);
        }
    });

    function getDir(dx, dy) {
        if (Math.abs(dx) > Math.abs(dy)) {
            return Math.abs(dx) > 30 ? (dx > 0 ? 'right' : 'left') : null;
        } else {
            return Math.abs(dy) > 30 ? (dy > 0 ? 'down' : 'up') : null;
        }
    }

    function attemptSwap(r, c, dir) {
        if (state.isAnimating) return;
        
        const nr = r + (dir === 'down' ? 1 : dir === 'up' ? -1 : 0);
        const nc = c + (dir === 'right' ? 1 : dir === 'left' ? -1 : 0);
        
        if (nr < 0 || nr >= CONFIG.ROWS || nc < 0 || nc >= CONFIG.COLS) return;
        
        state.isAnimating = true;
        
        // Проверяем есть ли бонус в одной из клеток перед свайпом
        const gem1 = state.board[r][c];
        const gem2 = state.board[nr][nc];
        
        let bonusActivated = false;
        
        // Активируем бонус если он есть в любой из клеток
        if (gem1?.isBonus) {
            activateBonusAt(r, c);
            bonusActivated = true;
        } else if (gem2?.isBonus) {
            activateBonusAt(nr, nc);
            bonusActivated = true;
        }
        
        if (bonusActivated) {
            return; // Анимация уже запущена
        }
        
        // Обычный свайп
        swap(r, c, nr, nc);
        
        setTimeout(() => {
            const matches = findMatches();
            
            if (matches.length > 0) {
                state.moves++;
                handleMatches(matches);
            } else {
                const c1 = getCell(r, c);
                const c2 = getCell(nr, nc);
                c1?.classList.add('invalid-swap');
                c2?.classList.add('invalid-swap');
                
                setTimeout(() => {
                    swap(r, c, nr, nc);
                    c1?.classList.remove('invalid-swap');
                    c2?.classList.remove('invalid-swap');
                    state.isAnimating = false;
                }, 200);
            }
        }, 200);
    }

    function activateBonusAt(r, c) {
        const gem = state.board[r]?.[c];
        if (!gem?.isBonus) return;
        
        const bonus = CONFIG.BONUSES[gem.bonusType];
        if (!bonus) return;
        
        // Собираем все клетки для взрыва
        const toRemove = new Map();
        const centerKey = `${r}-${c}`;
        
        for (let dr = -bonus.radius; dr <= bonus.radius; dr++) {
            for (let dc = -bonus.radius; dc <= bonus.radius; dc++) {
                const nr = r + dr;
                const nc = c + dc;
                if (nr >= 0 && nr < CONFIG.ROWS && nc >= 0 && nc < CONFIG.COLS) {
                    const key = `${nr}-${nc}`;
                    toRemove.set(key, { r: nr, c: nc });
                }
            }
        }
        
        // Анимация и удаление
        toRemove.forEach((cell, key) => {
            const el = getCell(cell.r, cell.c);
            if (el) el.classList.add('matched');
            state.board[cell.r][cell.c] = null;
        });
        
        state.score += 50;
        showMessage('💥 Бонус активирован!');
        
        updateStats();
        
        setTimeout(() => {
            dropDown();
        }, 350);
    }

    function swap(r1, c1, r2, c2) {
        const t = state.board[r1][c1];
        state.board[r1][c1] = state.board[r2][c2];
        state.board[r2][c2] = t;
        
        const c1el = getCell(r1, c1);
        const c2el = getCell(r2, c2);
        updateCellVisual(c1el, state.board[r1][c1]);
        updateCellVisual(c2el, state.board[r2][c2]);
    }

    function getCell(r, c) {
        return DOM.board.querySelector(`[data-row="${r}"][data-col="${c}"]`);
    }

    function findMatches() {
        const matches = [];
        
        for (let r = 0; r < CONFIG.ROWS; r++) {
            let c = 0;
            while (c < CONFIG.COLS) {
                const gem = state.board[r][c];
                if (!gem) { c++; continue; }
                
                let len = 1;
                while (c + len < CONFIG.COLS && state.board[r][c + len]?.name === gem.name) {
                    len++;
                }
                
                if (len >= 3) {
                    const cells = [];
                    for (let i = 0; i < len; i++) cells.push({ r, c: c + i });
                    matches.push({ cells, gem, len });
                }
                c += len;
            }
        }
        
        for (let c = 0; c < CONFIG.COLS; c++) {
            let r = 0;
            while (r < CONFIG.ROWS) {
                const gem = state.board[r][c];
                if (!gem) { r++; continue; }
                
                let len = 1;
                while (r + len < CONFIG.ROWS && state.board[r + len]?.[c]?.name === gem.name) {
                    len++;
                }
                
                if (len >= 3) {
                    const cells = [];
                    for (let i = 0; i < len; i++) cells.push({ r: r + i, c });
                    matches.push({ cells, gem, len });
                }
                r += len;
            }
        }
        
        return matches;
    }

    function handleMatches(matches) {
        const toRemove = new Map();
        let pendingBonus = null;
        let totalCells = 0;
        
        matches.forEach(m => {
            totalCells += m.cells.length;
            
            m.cells.forEach(cell => {
                const key = `${cell.r}-${cell.c}`;
                if (!toRemove.has(key)) {
                    toRemove.set(key, cell);
                }
                
                const gem = state.board[cell.r]?.[cell.c];
                if (gem?.isBonus) {
                    const bonus = CONFIG.BONUSES[gem.bonusType];
                    if (bonus) {
                        for (let dr = -bonus.radius; dr <= bonus.radius; dr++) {
                            for (let dc = -bonus.radius; dc <= bonus.radius; dc++) {
                                const nr = cell.r + dr;
                                const nc = cell.c + dc;
                                if (nr >= 0 && nr < CONFIG.ROWS && nc >= 0 && nc < CONFIG.COLS) {
                                    const k = `${nr}-${nc}`;
                                    if (!toRemove.has(k)) {
                                        toRemove.set(k, { r: nr, c: nc });
                                    }
                                }
                            }
                        }
                        state.score += 25;
                    }
                }
            });
            
            if (m.len >= 4) {
                const center = m.cells[Math.floor(m.cells.length / 2)];
                pendingBonus = { 
                    r: center.r, 
                    c: center.c,
                    type: m.len >= 6 ? 'super' : m.len >= 5 ? 'rocket' : 'bomb'
                };
            }
        });
        
        toRemove.forEach((cell, key) => {
            const el = getCell(cell.r, cell.c);
            if (el) el.classList.add('matched');
            state.board[cell.r][cell.c] = null;
        });
        
        state.combo++;
        let points = totalCells * 10 * state.combo;
        if (totalCells > 3) points += (totalCells - 3) * 15 * state.combo;
        state.score += points;
        
        if (state.combo > 1) {
            showMessage(`🔥 x${state.combo} +${points}`);
            DOM.comboStat.classList.add('active');
            setTimeout(() => DOM.comboStat.classList.remove('active'), 400);
        }
        
        updateStats();
        
        setTimeout(() => {
            if (pendingBonus) {
                state.board[pendingBonus.r][pendingBonus.c] = {
                    ...CONFIG.BONUSES[pendingBonus.type],
                    isBonus: true,
                    bonusType: pendingBonus.type,
                    name: getRandomGem().name
                };
            }
            dropDown();
        }, 350);
    }

    function dropDown() {
        for (let c = 0; c < CONFIG.COLS; c++) {
            let writeRow = CONFIG.ROWS - 1;
            
            for (let r = CONFIG.ROWS - 1; r >= 0; r--) {
                if (state.board[r][c]) {
                    if (r !== writeRow) {
                        state.board[writeRow][c] = state.board[r][c];
                        state.board[r][c] = null;
                    }
                    writeRow--;
                }
            }
            
            for (let r = writeRow; r >= 0; r--) {
                state.board[r][c] = getRandomGem();
            }
        }
        
        renderBoardSmooth();
        
        setTimeout(() => {
            const newMatches = findMatches();
            if (newMatches.length > 0) {
                setTimeout(() => handleMatches(newMatches), 300);
            } else {
                state.combo = 0;
                updateStats();
                state.isAnimating = false;
                saveHighScore();
            }
        }, 350);
    }

    function renderBoardSmooth() {
        renderBoard();
        
        const cells = DOM.board.children;
        Array.from(cells).forEach((cell, i) => {
            cell.style.opacity = '0';
            cell.style.transform = 'translateY(-15px)';
            
            setTimeout(() => {
                cell.style.transition = 'all 0.2s ease-out';
                cell.style.opacity = '1';
                cell.style.transform = 'translateY(0)';
            }, i * 12);
        });
    }

    function updateStats() {
        DOM.score.textContent = state.score;
        DOM.moves.textContent = state.moves;
        DOM.combo.textContent = state.combo;
    }

    function showMessage(text) {
        DOM.messageText.textContent = text;
        DOM.messageOverlay.classList.add('show');
        setTimeout(() => DOM.messageOverlay.classList.remove('show'), 1000);
    }

    function resetGame() {
        state.score = 0;
        state.moves = 0;
        state.combo = 0;
        state.isAnimating = false;
        state.newHighScoreShown = false;
        createBoard();
        renderBoard();
        showMessage('🔄 Новая игра');
    }

    function attachEvents() {
        DOM.restartBtn?.addEventListener('click', resetGame);
        document.addEventListener('keydown', e => { if (e.key === 'r' || e.key === 'R') resetGame(); });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
