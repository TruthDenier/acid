const compliments = [
    { text: "Ты - лучик солнца, освещающий каждый мой день.", icon: "☀️" },
    { text: "Твой смех - самая прекрасная мелодия в этом мире.", icon: "🎶" },
    { text: "Каждое мгновение с тобой - бесценный дар.", icon: "🎁" },
    { text: "Твои глаза - целая Вселенная, полная тепла и света.", icon: "🌌" },
    { text: "Ты вдохновляешь меня быть лучше, чем я есть.", icon: "🌟" },
    {
        text: "С тобой каждый обыденный день превращается в сказку.",
        icon: "✨",
    },
    { text: "Твоя энергия заряжает, как сияние звёзд.", icon: "⚡" },
    {
        text: "Ты - самое нежное и прекрасное создание во всей галактике.",
        icon: "🌸",
    },
    { text: "Твоя улыбка способна растопить самый холодный лёд.", icon: "😊" },
];

const additionalCompliments = [
    {
        text: "Ты - моё самое заветное желание, воплощённое в жизнь.",
        icon: "🌠",
    },
    { text: "Твой голос журчит, как ручеёк весной.", icon: "🏞️" },
    { text: "Рядом с тобой я чувствую себя самым счастливым.", icon: "💜" },
    { text: "Твоя доброта - это бескрайний океан.", icon: "🌊" },
    { text: "Ты - моё утешение и моя радость.", icon: "🕊️" },
    { text: "Твой взгляд способен разгадать все тайны мира.", icon: "🔮" },
    { text: "С тобой будущее кажется ярче и увлекательнее.", icon: "🚀" },
    { text: "Ты - причина моего самого искреннего счастья.", icon: "🥰" },
    { text: "Твоя душа чиста, как утренний рассвет.", icon: "🌅" },
    { text: "Ты - моя путеводная звезда в темноте.", icon: "⭐" },
    { text: "Каждый миг с тобой - это магия.", icon: "🪄" },
    { text: "Ты - мелодия, которую я хочу слушать всегда.", icon: "🎧" },
    { text: "Твоё присутствие делает меня сильнее.", icon: "💪" },
    { text: "Ты - самое сладкое, что есть в моей жизни.", icon: "🍬" },
    { text: "В тебе сочетается красота и ум.", icon: "💖📚" },
    { text: "Ты - лучшее, что когда-либо случалось со мной.", icon: "🎉" },
    { text: "Твоё сердце полно тепла и сострадания.", icon: "💞" },
    { text: "Просто ты.", icon: "🤍" },
];

const loveLetters = [
    "Каждый день с тобой - это самое ценное, что у меня есть. Ты делаешь мою жизнь яркой и наполненной смыслом.",
    "Я так счастлив, что ты есть рядом. С тобой я чувствую себя самым удачливым человеком на свете.",
    "Твоя улыбка - это самое красивое, что я видел. Она освещает даже самые темные дни.",
    "Ты - моя муза, мое вдохновение, мой мир.",
    "С тобой каждый обыденный день превращается в приключение. Спасибо, что ты есть.",
    "Ты - самое важное, что случилось со мной в этой жизни.",
    "Твои глаза - моя любимая Вселенная. В них я могу смотреть вечно.",
    "Спасибо за то, что ты такая теплая, нежная и любимая. Ты - моё всё.",
    "Я не представляю свою жизнь без тебя. Ты - моя половинка, мой смысл, моя радость.",
];

const colors = [
    "#FF69B4",
    "#FF1493",
    "#FFC0CB",
    "#FF6347",
    "#FFA07A",
    "#FFD700",
    "#ADFF2F",
    "#6A5ACD",
    "#8A2BE2",
    "#DA70D6",
    "#FF00FF",
    "#00FFFF",
];

// Detect mobile device
const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
    ) || window.innerWidth < 768;

const ANIMATION_DURATIONS = {
    heartFloat: { min: isMobile ? 8 : 6, max: isMobile ? 15 : 12 },
    catFall: { min: isMobile ? 6 : 4, max: isMobile ? 10 : 8 },
    glitterExplosion: isMobile ? 800 : 1200,
    magicRings: 1000,
    messageDisplay: 3500,
    heartRain: { min: isMobile ? 6 : 4, max: isMobile ? 10 : 7 },
    cardClickScale: 400,
    buttonBgChange: 2000,
    complimentHide: 400,
    fireworkFly: 1500,
    fireworkExplosion: 800,
};

const ANIMATION_DELAYS = {
    heartFloat: isMobile ? 500 : 250,
    catFall: isMobile ? 300 : 150,
    sparkleCreation: isMobile ? 30 : 20,
    magicRingCreation: 100,
    heartSpawn: isMobile ? 300 : 150,
};

// Reduce elements on mobile for performance
const MAX_FLOATING_HEARTS = isMobile ? 8 : 15;
const MAX_FALLING_CATS = isMobile ? 3 : 8;
const GLITTER_COUNT = isMobile ? 15 : 30;
const HEART_RAIN_COUNT = isMobile ? 3 : 5;

let heartRainInterval;
let floatingHeartInterval;
let fallingCatInterval;

let kissCount = parseInt(localStorage.getItem("kissCount")) || 0;

const initialCompliments = [...compliments];

const startDate = new Date(2026, 1, 8, 12, 0);

function updateTimeTogether() {
    const now = new Date();
    const diff = now - startDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const timeElement = document.getElementById("timeTogether");
    if (timeElement)
        timeElement.textContent = `Мы знакомы уже: ${days} дней ${hours} часов ${minutes} минут 💖`;

    document.getElementById("kissCount").textContent = kissCount;
}

function ensureContainers() {
    if (!document.getElementById("floatingHearts")) {
        const div = document.createElement("div");
        div.id = "floatingHearts";
        div.className = "floating-hearts";
        document.body.appendChild(div);
    }
    if (!document.getElementById("catsContainer")) {
        const div = document.createElement("div");
        div.id = "catsContainer";
        div.className = "cats-container";
        document.body.appendChild(div);
    }
    if (!document.getElementById("pop-up-text")) {
        const div = document.createElement("div");
        div.id = "pop-up-text";
        div.className = "pop-up-text";
        const p = document.createElement("p");
        p.id = "pop-up-message";
        div.appendChild(p);
        document.body.appendChild(div);
    }
}

function createFloatingHeart() {
    // Limit hearts on mobile
    const heartsContainer = document.getElementById("floatingHearts");
    if (!heartsContainer) return;

    // Check current heart count
    const currentHearts = heartsContainer.children.length;
    if (currentHearts >= MAX_FLOATING_HEARTS) return;

    const heart = document.createElement("div");
    heart.classList.add("heart");
    const heartSymbols = [
        "❤️",
        "🧡",
        "💛",
        "💚",
        "💙",
        "💜",
        "🩷",
        "💖",
        "💗",
        "💓",
        "💞",
        "💕",
        "❣️",
        "💌",
    ];
    heart.textContent =
        heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = isMobile
        ? Math.random() * 15 + 12 + "px"
        : Math.random() * 25 + 15 + "px";
    heart.style.animationDuration =
        Math.random() *
            (ANIMATION_DURATIONS.heartFloat.max -
                ANIMATION_DURATIONS.heartFloat.min) +
        ANIMATION_DURATIONS.heartFloat.min +
        "s";
    // GPU acceleration for mobile
    if (isMobile) {
        heart.style.willChange = "transform, opacity";
        heart.style.transform = "translateZ(0)";
    }
    heartsContainer.appendChild(heart);
    setTimeout(() => {
        heart.remove();
    }, ANIMATION_DURATIONS.heartFloat.max * 1000);
}

function createFallingCat() {
    // Limit cats on mobile
    const catsContainer = document.getElementById("catsContainer");
    if (!catsContainer) return;

    const currentCats = catsContainer.children.length;
    if (currentCats >= MAX_FALLING_CATS) return;

    const cat = document.createElement("div");
    cat.classList.add("falling-cat");
    const catSymbols = ["🐱", "😺", "😸", "😹", "😻", "🐈", "🐾"];
    cat.textContent = catSymbols[Math.floor(Math.random() * catSymbols.length)];
    cat.style.left = Math.random() * 100 + "%";
    cat.style.fontSize = isMobile
        ? Math.random() * 15 + 18 + "px"
        : Math.random() * 25 + 20 + "px";
    cat.style.animationDuration =
        Math.random() *
            (ANIMATION_DURATIONS.catFall.max -
                ANIMATION_DURATIONS.catFall.min) +
        ANIMATION_DURATIONS.catFall.min +
        "s";
    if (isMobile) {
        cat.style.willChange = "transform, opacity";
        cat.style.transform = "translateZ(0)";
    }
    catsContainer.appendChild(cat);
    setTimeout(() => {
        cat.remove();
    }, ANIMATION_DURATIONS.catFall.max * 1000);
}

function createHeartRain() {
    if (heartRainInterval) clearInterval(heartRainInterval);
    const interval = isMobile ? 3000 : 2000;
    heartRainInterval = setInterval(() => {
        if (Math.random() > (isMobile ? 0.7 : 0.8)) {
            const count = isMobile ? HEART_RAIN_COUNT : 5;
            for (let i = 0; i < count; i++) {
                setTimeout(
                    () => {
                        const heart = document.createElement("div");
                        heart.innerHTML = ["❤️", "💖", "💕", "💗"][
                            Math.floor(Math.random() * 4)
                        ];
                        heart.style.position = "fixed";
                        heart.style.left = Math.random() * 100 + "%";
                        heart.style.top = "-50px";
                        heart.style.fontSize = isMobile
                            ? Math.random() * 12 + 12 + "px"
                            : Math.random() * 20 + 15 + "px";
                        heart.style.pointerEvents = "none";
                        heart.style.zIndex = "9994";
                        heart.style.willChange = "transform, opacity";
                        document.body.appendChild(heart);
                        const duration =
                            Math.random() *
                                (ANIMATION_DURATIONS.heartRain.max -
                                    ANIMATION_DURATIONS.heartRain.min) +
                            ANIMATION_DURATIONS.heartRain.min;
                        heart.animate(
                            [
                                {
                                    top: "-50px",
                                    transform: "rotate(0deg)",
                                    opacity: 1,
                                },
                                {
                                    top: `${window.innerHeight + 50}px`,
                                    transform: `rotate(${Math.random() * 360}deg)`,
                                    opacity: 0,
                                },
                            ],
                            {
                                duration: duration * 1000,
                                easing: "linear",
                                fill: "forwards",
                            },
                        );
                        setTimeout(() => {
                            heart.remove();
                        }, duration * 1000);
                    },
                    i * (isMobile ? 150 : 100),
                );
            }
        }
    }, interval);
}

function renderCompliments(complimentsArray = initialCompliments) {
    const grid = document.getElementById("complimentsGrid");
    grid.innerHTML = "";
    complimentsArray.forEach((compliment, index) => {
        const card = document.createElement("div");
        card.classList.add("compliment-card");
        card.setAttribute("data-index", index);
        const icon = document.createElement("div");
        icon.classList.add("compliment-icon");
        icon.textContent = compliment.icon;
        const text = document.createElement("div");
        text.classList.add("compliment-text");
        text.textContent = compliment.text;
        card.appendChild(icon);
        card.appendChild(text);
        card.addEventListener("click", (e) => {
            handleCardClick(e, card, compliment);
        });
        card.addEventListener("mouseenter", (e) => createWaveEffect(card, e));
        grid.appendChild(card);
        card.animate(
            [
                { opacity: 0, transform: "scale(0.8) translateY(20px)" },
                { opacity: 1, transform: "scale(1) translateY(0px)" },
            ],
            {
                duration: 500,
                easing: "ease-out",
                delay: index * 60,
                fill: "forwards",
            },
        );
    });
}

function hideCompliments() {
    const cards = document.querySelectorAll(".compliment-card");
    let animations = [];
    cards.forEach((card, index) => {
        const animation = card.animate(
            [
                { opacity: 1, transform: "scale(1) translateY(0px)" },
                { opacity: 0, transform: "scale(0.8) translateY(-20px)" },
            ],
            {
                duration: 400,
                easing: "ease-in",
                delay: index * 40,
                fill: "forwards",
            },
        );
        animations.push(animation);
    });
    return Promise.all(animations.map((anim) => anim.finished));
}

function getRandomCompliments() {
    const shuffled = [...additionalCompliments].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
}

function createGlitterExplosion(x, y) {
    const count = isMobile ? GLITTER_COUNT : 30;
    const distance = isMobile ? 120 : 200;

    for (let i = 0; i < count; i++) {
        setTimeout(
            () => {
                const glitter = document.createElement("div");
                glitter.innerHTML = ["✨", "💖", "🌟", "💫"][
                    Math.floor(Math.random() * 4)
                ];
                glitter.style.position = "fixed";
                glitter.style.left = x + "px";
                glitter.style.top = y + "px";
                glitter.style.fontSize = isMobile
                    ? Math.random() * 12 + 8 + "px"
                    : Math.random() * 20 + 10 + "px";
                glitter.style.pointerEvents = "none";
                glitter.style.zIndex = "10000";
                if (isMobile) {
                    glitter.style.willChange = "transform, opacity";
                }
                const hue = Math.floor(Math.random() * 360);
                glitter.style.textShadow = `0 0 8px hsl(${hue}, 100%, 70%)`;
                document.body.appendChild(glitter);
                const angle =
                    (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
                const animDistance = Math.random() * distance + 50;
                glitter.animate(
                    [
                        {
                            transform: "translate(-50%, -50%) scale(0)",
                            opacity: 1,
                        },
                        {
                            transform: `translate(calc(-50% + ${Math.cos(angle) * animDistance}px), calc(-50% + ${Math.sin(angle) * animDistance}px)) scale(1)`,
                            opacity: 0,
                        },
                    ],
                    {
                        duration: isMobile ? 700 : 1000,
                        easing: "cubic-bezier(0.19, 1, 0.22, 1)",
                        fill: "forwards",
                    },
                );
                setTimeout(
                    () => {
                        glitter.remove();
                    },
                    isMobile ? 700 : 1000,
                );
            },
            i * (isMobile ? 30 : 20),
        );
    }
}

function showMessage(message, isSpecial = false) {
    const msgDiv = document.getElementById("pop-up-text");
    const msgP = document.getElementById("pop-up-message");
    if (!msgDiv || !msgP) return;
    msgP.innerHTML = message;
    msgDiv.style.visibility = "visible";
    msgDiv.style.pointerEvents = "auto";
    const props = isSpecial
        ? {
              padding: "30px 50px",
              background: "linear-gradient(45deg, #FF69B4, #EE82EE)",
              boxShadow: "0 0 80px rgba(255,105,180,0.9)",
              border: "4px solid #FFC0CB",
              fontSize: "32px",
              color: "#fff",
              textShadow: "0 0 5px #fff",
          }
        : {
              padding: "20px 40px",
              background: "rgba(255,255,255,0.95)",
              boxShadow: "0 20px 40px rgba(255,105,180,0.5)",
              border: "2px solid #FBCFE2",
              fontSize: "24px",
              color: "#83184b",
          };
    Object.assign(msgDiv.style, props);
    msgDiv.classList.add("active");
    msgDiv.animate(
        [
            { opacity: 0, transform: "translate(-50%, -50%) scale(0.5)" },
            { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        ],
        { duration: 500, fill: "forwards" },
    );
    setTimeout(() => {
        msgDiv.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 500,
            fill: "forwards",
        }).onfinish = () => {
            msgDiv.style.visibility = "hidden";
            msgDiv.style.pointerEvents = "none";
            msgDiv.classList.remove("active");
        };
    }, 3000);
}

function setupMagneticButton() {
    const button = document.getElementById("superMagicButton");
    if (!button) return;
    document.addEventListener("mousemove", (e) => {
        const rect = button.getBoundingClientRect();
        const bc = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
        };
        const d = Math.hypot(e.clientX - bc.x, e.clientY - bc.y);
        if (d < 150) {
            const s = Math.max(0, 150 - d) * 0.005;
            button.style.transform = `translate(${(e.clientX - bc.x) * s}px, ${(e.clientY - bc.y) * s}px)`;
            button.style.boxShadow = `0 10px 20px rgba(255,105,180,${s * 20})`;
        } else {
            if (button.style.transform) {
                button.style.transform = "";
                button.style.boxShadow = "";
            }
        }
    });
    button.addEventListener("mouseleave", () => {
        button.style.transform = "";
        button.style.boxShadow = "";
    });
}

function createWaveEffect(card, event) {
    const rect = card.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.classList.add("card-ripple");
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    card.appendChild(ripple);
    ripple.animate(
        [
            { width: "0px", height: "0px", opacity: 1 },
            { width: "150px", height: "150px", opacity: 0 },
        ],
        { duration: 600, easing: "ease-out", fill: "forwards" },
    ).onfinish = () => ripple.remove();
}

function activateCommonAnimations(e) {
    createGlitterExplosion(e.clientX, e.clientY);
}

function handleCardClick(e, card, compliment) {
    activateCommonAnimations(e);
    card.animate(
        [
            { transform: "scale(1)", boxShadow: "" },
            {
                transform: "scale(1.1)",
                boxShadow: "0 0 30px rgba(255,105,180,0.7)",
            },
            { transform: "scale(1)", boxShadow: "" },
        ],
        { duration: 400, easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)" },
    );
    showMessage(`💖 ${compliment.text} 💖`, true);
}

function sendKiss() {
    kissCount++;
    document.getElementById("kissCount").textContent = kissCount;

    localStorage.setItem("kissCount", kissCount);

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const kiss = document.createElement("div");
            kiss.innerHTML = ["💋", "😘", "🥰", "💖"][
                Math.floor(Math.random() * 4)
            ];
            kiss.style.position = "fixed";
            kiss.style.left = centerX + "px";
            kiss.style.top = centerY + "px";
            kiss.style.fontSize = "30px";
            kiss.style.pointerEvents = "none";
            kiss.style.zIndex = "10000";
            document.body.appendChild(kiss);

            const angle = (i / 10) * Math.PI * 2;
            const distance = 100 + Math.random() * 100;

            kiss.animate(
                [
                    { transform: "translate(-50%, -50%) scale(0)", opacity: 1 },
                    {
                        transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(1.5)`,
                        opacity: 0,
                    },
                ],
                { duration: 1000, easing: "ease-out", fill: "forwards" },
            );

            setTimeout(() => {
                kiss.remove();
            }, 1000);
        }, i * 50);
    }

    showMessage("💋 Целую тебя крепко-крепко! 💋", true);
}

function openLoveLetter() {
    const modal = document.getElementById("loveLetterModal");
    const letterText = document.getElementById("randomLetter");

    const randomLetter =
        loveLetters[Math.floor(Math.random() * loveLetters.length)];
    letterText.textContent = randomLetter;

    modal.classList.add("active");
    createGlitterExplosion(window.innerWidth / 2, window.innerHeight / 2);
}

function closeLoveLetter() {
    const modal = document.getElementById("loveLetterModal");
    modal.classList.remove("active");
}

function setupSuperMagicButton() {
    const button = document.getElementById("superMagicButton");
    button.addEventListener("click", (e) => {
        activateCommonAnimations(e);
        createHeartRain();
        hideCompliments().then(() => {
            renderCompliments(getRandomCompliments());
        });
        showMessage("✨ Комплименты обновлены! ✨", true);
    });

    document.getElementById("kissButton").addEventListener("click", (e) => {
        activateCommonAnimations(e);
        sendKiss();
    });

    document.getElementById("secretButton").addEventListener("click", (e) => {
        activateCommonAnimations(e);
        openLoveLetter();
    });
}

window.addEventListener("load", () => {
    ensureContainers();
    renderCompliments();
    setupSuperMagicButton();
    setupMagneticButton();
    updateTimeTogether();
    setInterval(updateTimeTogether, 60000);

    document
        .getElementById("modalClose")
        .addEventListener("click", closeLoveLetter);

    // Optimized intervals for mobile
    const heartInterval = isMobile ? 1200 : 800;
    const rainInterval = isMobile ? 5000 : 3000;

    floatingHeartInterval = setInterval(createFloatingHeart, heartInterval);
    heartRainInterval = setInterval(createHeartRain, rainInterval);
});

// Handle visibility change - pause animations when tab is hidden
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        clearInterval(floatingHeartInterval);
        clearInterval(heartRainInterval);
    } else {
        floatingHeartInterval = setInterval(
            createFloatingHeart,
            isMobile ? 1200 : 800,
        );
        heartRainInterval = setInterval(
            createHeartRain,
            isMobile ? 5000 : 3000,
        );
    }
});

// Prevent zoom on double-tap for buttons
if (isMobile) {
    document.addEventListener(
        "dblclick",
        function (event) {
            event.preventDefault();
        },
        { passive: false },
    );

    // Add touch feedback
    document
        .querySelectorAll(".magic-button, .secret-button, .kiss-button")
        .forEach((button) => {
            button.addEventListener(
                "touchstart",
                function () {
                    this.style.transform = "scale(0.95)";
                },
                { passive: true },
            );
            button.addEventListener(
                "touchend",
                function () {
                    this.style.transform = "";
                },
                { passive: true },
            );
        });
}

const style = document.createElement("style");
style.textContent = `
    .card-ripple { position: absolute; border-radius: 50%; transform: translate(-50%, -50%); background: rgba(255,105,180,0.4); pointer-events: none; z-index: 0; }
`;
document.head.appendChild(style);
