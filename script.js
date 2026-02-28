const compliments = [
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
    {
        text: "Ты - моя любимая Даша, и я ценю тебя больше всего на свете!",
        icon: "💖",
    },
];

const additionalCompliments = [
    {
        text: "Ты - моё самое заветное желание, воплощённое в жизнь.",
        icon: "🌠",
    },
    { text: "Твой голос журчит, как ручеёк весной.", icon: "🏞️" },
    { text: "Рядом с тобой я чувствую себя самым счастливым.", icon: "💜" },
    { text: "Ты как чашка горячего какао в frosty вечер.", icon: "☕" },
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

const ANIMATION_DURATIONS = {
    heartFloat: { min: 6, max: 12 },
    catFall: { min: 4, max: 8 },
    glitterExplosion: 1200,
    magicRings: 1000,
    messageDisplay: 3500,
    flowerRain: { min: 5, max: 9 },
    goldenRain: { min: 3, max: 7 },
    cardClickScale: 400,
    buttonBgChange: 2000,
    complimentHide: 400,
    fireworkFly: 1500,
    fireworkExplosion: 800,
    rainbowTrailFade: 1000,
    starExplosion: 800,
};

const ANIMATION_DELAYS = {
    heartFloat: 180,
    catFall: 120,
    sparkleCreation: 15,
    magicRingCreation: 80,
    flowerSpawn: 250,
    goldenSpawn: 120,
    cardAnimation: 10,
    rotatingHearts: { base: 2500, perCard: 400, spawn: 80, remove: 1300 },
    magneticButtonDistance: 120,
    magneticButtonStrength: 0.08,
    magneticButtonReturnTime: 250,
    fireworkSpawn: 100,
};

let rotatingHeartsIntervals = [];
let flowerRainInterval;
let goldenRainInterval;

let floatingHeartInterval;
let fallingCatInterval;
let starInterval;

const initialCompliments = [...compliments];
let displayedCompliments = initialCompliments;

function createFloatingHeart() {
    const heartsContainer = document.getElementById("floatingHearts");

    if (!heartsContainer) {
        const newHeartsContainer = document.createElement("div");
        newHeartsContainer.id = "floatingHearts";
        newHeartsContainer.classList.add("floating-hearts");
        document.body.appendChild(newHeartsContainer);
        return;
    }

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
    heart.style.fontSize = Math.random() * 30 + 18 + "px";
    heart.style.animationDuration =
        Math.random() *
            (ANIMATION_DURATIONS.heartFloat.max -
                ANIMATION_DURATIONS.heartFloat.min) +
        ANIMATION_DURATIONS.heartFloat.min +
        "s";
    heart.style.animationDelay = Math.random() * 3 + "s";

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, ANIMATION_DURATIONS.heartFloat.max * 1000);
}

function createFallingCat() {
    const catsContainer = document.getElementById("catsContainer");
    if (!catsContainer) {
        const newCatsContainer = document.createElement("div");
        newCatsContainer.id = "catsContainer";
        newCatsContainer.classList.add("cats-container");
        document.body.appendChild(newCatsContainer);
        return;
    }

    const cat = document.createElement("div");
    cat.classList.add("falling-cat");

    const catSymbols = [
        "🐱",
        "😺",
        "😸",
        "😹",
        "😻",
        "😼",
        "😽",
        "🙀",
        "🐈",
        "🐈",
        "😾",
        "😻",
    ];
    cat.textContent = catSymbols[Math.floor(Math.random() * catSymbols.length)];

    cat.style.left = Math.random() * 100 + "%";
    cat.style.fontSize = Math.random() * 30 + 28 + "px";
    cat.style.animationDuration =
        Math.random() *
            (ANIMATION_DURATIONS.catFall.max -
                ANIMATION_DURATIONS.catFall.min) +
        ANIMATION_DURATIONS.catFall.min +
        "s";
    cat.style.animationDelay = Math.random() * 3 + "s";

    catsContainer.appendChild(cat);

    setTimeout(() => {
        cat.remove();
    }, ANIMATION_DURATIONS.catFall.max * 1000);
}

function createStar() {
    const container = document.createElement("div");
    const size = Math.random() * 3 + 1;
    const opacity = Math.random() * 0.7 + 0.3;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 2;
    const shadowSize = Math.random() * 8 + 4;

    container.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(white, rgba(255,255,255,0.5));
        border-radius: 50%;
        pointer-events: none;
        z-index: 0;
        opacity: ${opacity};
        animation: twinkle ${duration}s ease-in-out infinite alternate;
        box-shadow: 0 0 ${shadowSize}px rgba(255, 255, 255, 0.7);
    `;
    document.body.appendChild(container);
    setTimeout(() => container.remove(), (duration + delay) * 1000);
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
                duration: ANIMATION_DURATIONS.complimentHide + 100,
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
                duration: ANIMATION_DURATIONS.complimentHide,
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
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const glitter = document.createElement("div");
            glitter.innerHTML = ["✨", "💖", "🌟", "💫", "✨", "🌸", "🫧"][
                Math.floor(Math.random() * 7)
            ];
            glitter.style.position = "fixed";
            glitter.style.left = x + "px";
            glitter.style.top = y + "px";
            glitter.style.fontSize = Math.random() * 25 + 15 + "px";
            glitter.style.pointerEvents = "none";
            glitter.style.zIndex = "10000";

            const hue = Math.floor(Math.random() * 360);
            glitter.style.textShadow = `0 0 8px hsl(${hue}, 100%, 70%), 0 0 15px rgba(255,255,255,0.5)`;
            glitter.style.willChange = "transform, opacity";

            document.body.appendChild(glitter);

            glitter.animate(
                [
                    {
                        transform:
                            "translate(-50%, -50%) scale(0) rotate(0deg)",
                        opacity: 1,
                    },
                    {
                        transform: `translate(calc(-50% + ${Math.cos((i / 50) * Math.PI * 2) * (Math.random() * 300 + 100)}px), calc(-50% + ${Math.sin((i / 50) * Math.PI * 2) * (Math.random() * 300 + 100)}px)) scale(1.5) rotate(${Math.random() * 720}deg)`,
                        opacity: 0,
                    },
                ],
                {
                    duration: ANIMATION_DURATIONS.glitterExplosion,
                    easing: "cubic-bezier(0.19, 1, 0.22, 1)",
                    fill: "forwards",
                },
            );

            setTimeout(() => {
                glitter.remove();
            }, ANIMATION_DURATIONS.glitterExplosion);
        }, i * ANIMATION_DELAYS.sparkleCreation);
    }
}

function createMagicRings(x, y) {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const ring = document.createElement("div");
            ring.style.position = "fixed";
            ring.style.left = x + "px";
            ring.style.top = y + "px";
            ring.style.width = "0px";
            ring.style.height = "0px";
            ring.style.borderRadius = "50%";
            const randColor = colors[Math.floor(Math.random() * colors.length)];
            ring.style.border = `3px solid ${randColor}`;
            ring.style.transform = "translate(-50%, -50%)";
            ring.style.pointerEvents = "none";
            ring.style.zIndex = "9998";
            ring.style.boxShadow = `0 0 15px ${randColor}, 0 0 8px rgba(255,255,255,0.7)`;
            ring.style.willChange = "transform, opacity";

            document.body.appendChild(ring);

            const size = 150 + i * 50;
            ring.animate(
                [
                    {
                        width: "0px",
                        height: "0px",
                        opacity: 1,
                        transform: "translate(-50%, -50%) scale(0.3)",
                    },
                    {
                        width: `${size}px`,
                        height: `${size}px`,
                        opacity: 0,
                        transform: "translate(-50%, -50%) scale(1)",
                    },
                ],
                {
                    duration: ANIMATION_DURATIONS.magicRings,
                    easing: "cubic-bezier(0.19, 1, 0.22, 1)",
                    fill: "forwards",
                },
            );

            setTimeout(() => {
                ring.remove();
            }, ANIMATION_DURATIONS.magicRings);
        }, i * 100); // Интервал
    }
}

function showMessage(message, isSpecial = false) {
    const msgDiv = document.getElementById("pop-up-text");
    const msgP = document.getElementById("pop-up-message");

    if (!msgDiv || !msgP) {
        // Создаем элементы, если их нет
        const popupContainer = document.createElement("div");
        popupContainer.id = "pop-up-text";
        popupContainer.classList.add("pop-up-text");
        const popupMessage = document.createElement("p");
        popupMessage.id = "pop-up-message";
        popupContainer.appendChild(popupMessage);
        document.body.appendChild(popupContainer);

        showMessage(message, isSpecial);
        return;
    }

    msgP.innerHTML = message;

    msgDiv.style.visibility = "visible";
    msgDiv.style.opacity = "0";
    msgDiv.style.pointerEvents = "auto";

    const animProps = isSpecial
        ? {
              padding: "35px 60px",
              background: "linear-gradient(45deg, #FF69B4, #EE82EE, #8A2BE2)",
              boxShadow:
                  "0 0 120px rgba(255,105,180,0.9), 0 0 20px rgba(255,255,255,0.9)",
              border: "5px solid #FFC0CB",
              fontSize: "36px",
              color: "#fff",
              textShadow: "0 0 10px rgba(255,255,255,0.8)",
          }
        : {
              padding: "25px 45px",
              background: "rgba(255, 255, 255, 0.98)",
              boxShadow:
                  "0 25px 50px rgba(255,105,180,0.6), 0 0 10px rgba(255,255,255,0.6)",
              border: "3px solid #FBCFE2",
              fontSize: "28px",
              color: "#83184b",
              textShadow: "none",
          };

    Object.assign(msgDiv.style, animProps);

    msgDiv.animate(
        [
            {
                opacity: 0,
                transform: "translate(-50%, -50%) scale(0.7) rotateX(45deg)",
            },
            {
                opacity: 1,
                transform: "translate(-50%, -50%) scale(1.05) rotateX(-5deg)",
            },
            {
                opacity: 1,
                transform: "translate(-50%, -50%) scale(1) rotateX(0deg)",
            },
        ],
        {
            duration: 600,
            easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            fill: "forwards",
        },
    );

    setTimeout(() => {
        msgDiv.animate(
            [
                { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
                {
                    opacity: 0,
                    transform:
                        "translate(-50%, -50%) scale(1.3) rotateX(45deg)",
                },
            ],
            { duration: 700, easing: "ease-in", fill: "forwards" },
        ).onfinish = () => {
            msgDiv.style.visibility = "hidden";
            msgDiv.style.pointerEvents = "none"; // Отключаем события мыши
        };
    }, ANIMATION_DURATIONS.messageDisplay - 700);
}

function createGoldenRain() {
    if (goldenRainInterval) clearInterval(goldenRainInterval);
    goldenRainInterval = setInterval(() => {
        if (Math.random() > 0.9) {
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    const drop = document.createElement("div");
                    drop.innerHTML = ["✨", "💫", "⭐", "🌟", "💛"][
                        Math.floor(Math.random() * 5)
                    ];
                    drop.style.position = "fixed";
                    drop.style.left = Math.random() * 100 + "%";
                    drop.style.top = "-50px";
                    drop.style.fontSize = Math.random() * 20 + 15 + "px";
                    drop.style.color = "gold";
                    drop.style.filter = "drop-shadow(0 0 10px gold)";
                    drop.style.pointerEvents = "none";
                    drop.style.zIndex = "9997";
                    drop.style.willChange = "transform, opacity";
                    document.body.appendChild(drop);

                    const duration =
                        Math.random() *
                            (ANIMATION_DURATIONS.goldenRain.max -
                                ANIMATION_DURATIONS.goldenRain.min) +
                        ANIMATION_DURATIONS.goldenRain.min;

                    drop.animate(
                        [
                            {
                                top: "-50px",
                                transform: "rotate(0deg) scale(0.7)",
                                opacity: 1,
                            },
                            {
                                top: `${window.innerHeight + 50}px`,
                                transform: `rotate(${Math.random() * 360}deg) scale(1.2)`,
                                opacity: 0,
                            }, // Меньше вращения
                        ],
                        {
                            duration: duration * 1000,
                            easing: "linear",
                            fill: "forwards",
                        },
                    );

                    setTimeout(() => {
                        drop.remove();
                    }, duration * 1000);
                }, i * 100);
            }
        }
    }, 2000); // Реже
}

function createRotatingHearts() {}

function setupMagneticButton() {
    const button = document.getElementById("superMagicButton");

    if (!button) return;

    document.addEventListener("mousemove", (e) => {
        const rect = button.getBoundingClientRect();
        const buttonCenter = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
        };

        const distance = Math.hypot(
            e.clientX - buttonCenter.x,
            e.clientY - buttonCenter.y,
        );

        if (distance < ANIMATION_DELAYS.magneticButtonDistance) {
            const strength =
                Math.max(
                    0,
                    ANIMATION_DELAYS.magneticButtonDistance - distance,
                ) * ANIMATION_DELAYS.magneticButtonStrength;
            const moveX =
                (e.clientX - buttonCenter.x) *
                (strength / ANIMATION_DELAYS.magneticButtonDistance);
            const moveY =
                (e.clientY - buttonCenter.y) *
                (strength / ANIMATION_DELAYS.magneticButtonDistance);

            button.style.transition =
                "transform 0.08s ease-out, box-shadow 0.08s ease-out";
            button.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + strength * 0.005})`;
            button.style.boxShadow = `0 12px 25px rgba(255, 105, 180, ${strength * 0.08}), 0 0 5px rgba(255,255,255,0.7)`;
        } else {
            if (
                button.style.transform !== "" ||
                button.style.boxShadow !== ""
            ) {
                button.style.transition = `transform ${ANIMATION_DELAYS.magneticButtonReturnTime / 1000}s ease-out, box-shadow ${ANIMATION_DELAYS.magneticButtonReturnTime / 1000}s ease-out`;
                button.style.transform = "";
                button.style.boxShadow = "";
            }
        }
    });

    button.addEventListener("mouseleave", () => {
        button.style.transition = `transform ${ANIMATION_DELAYS.magneticButtonReturnTime / 1000}s ease-out, box-shadow ${ANIMATION_DELAYS.magneticButtonReturnTime / 1000}s ease-out`;
        button.style.transform = "";
        button.style.boxShadow = "";
    });
}

function createCatPawPrints() {
    document.addEventListener("click", (e) => {
        if (e.target.closest("#superMagicButton")) return;

        for (let i = 0; i < 2; i++) {
            setTimeout(() => {
                const paw = document.createElement("div");
                paw.innerHTML = "🐾";
                paw.style.position = "fixed";
                paw.style.left = e.clientX + (Math.random() - 0.5) * 40 + "px"; // Меньший разброс
                paw.style.top = e.clientY + (Math.random() - 0.5) * 40 + "px";
                paw.style.fontSize = Math.random() * 25 + 15 + "px"; // Меньше размер
                paw.style.pointerEvents = "none";
                paw.style.zIndex = "9995";
                paw.style.filter = `drop-shadow(0 0 5px rgba(255, 105, 180, 0.5))`;
                paw.style.willChange = "transform, opacity";

                document.body.appendChild(paw);

                paw.animate(
                    [
                        { opacity: 0, transform: "scale(0.3) rotate(0deg)" },
                        { opacity: 0.6, transform: "scale(1) rotate(10deg)" },
                        { opacity: 0, transform: "scale(1.5) rotate(20deg)" },
                    ],
                    {
                        duration: 1000,
                        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        fill: "forwards",
                    },
                );

                setTimeout(() => {
                    paw.remove();
                }, 1000);
            }, i * 100);
        }
    });
}

function createFlowerRain() {
    if (flowerRainInterval) clearInterval(flowerRainInterval);
    flowerRainInterval = setInterval(() => {
        if (Math.random() > 0.95) {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const flower = document.createElement("div");
                    flower.innerHTML = ["🌸", "🌼", "🌷"][
                        Math.floor(Math.random() * 3)
                    ];
                    flower.style.position = "fixed";
                    flower.style.left = Math.random() * 100 + "%";
                    flower.style.top = "-50px";
                    flower.style.fontSize = Math.random() * 20 + 15 + "px";
                    flower.style.filter =
                        "drop-shadow(0 0 5px rgba(255,182,193,0.5))";
                    flower.style.pointerEvents = "none";
                    flower.style.zIndex = "9994";
                    flower.style.willChange = "transform, opacity";
                    document.body.appendChild(flower);

                    const duration =
                        Math.random() *
                            (ANIMATION_DURATIONS.flowerRain.max -
                                ANIMATION_DURATIONS.flowerRain.min) +
                        ANIMATION_DURATIONS.flowerRain.min;

                    flower.animate(
                        [
                            {
                                top: "-50px",
                                transform: "rotate(0deg) scale(0.7)",
                                opacity: 1,
                            },
                            {
                                top: `${window.innerHeight + 50}px`,
                                transform: `rotate(${Math.random() * 360}deg) scale(1.0)`,
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
                        flower.remove();
                    }, duration * 1000);
                }, i * 100);
            }
        }
    }, 5000);
}

function createFireworks(x, y) {
    const fireworkColors = [
        "#FF4500",
        "#FFD700",
        "#ADFF2F",
        "#1E90FF",
        "#DA70D6",
        "#FF69B4",
    ];

    for (let i = 0; i < 2; i++) {
        setTimeout(() => {
            const startX = x + (Math.random() - 0.5) * 50;
            const startY = window.innerHeight;

            const firework = document.createElement("div");
            firework.style.cssText = `
                position: fixed;
                left: ${startX}px;
                top: ${startY}px;
                width: 6px;
                height: 6px;
                background: white;
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                box-shadow: 0 0 10px white;
                opacity: 0;
                will-change: transform, opacity;
            `;
            document.body.appendChild(firework);

            const targetX = x + (Math.random() - 0.5) * 80;
            const targetY = y - Math.random() * 150 - 50;

            firework.animate(
                [
                    { opacity: 0, transform: `translate(0px, 0px) scale(0)` },
                    {
                        opacity: 1,
                        transform: `translate(${targetX - startX}px, ${targetY - startY}px) scale(1)`,
                    },
                ],
                {
                    duration: ANIMATION_DURATIONS.fireworkFly,
                    easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    fill: "forwards",
                },
            ).onfinish = () => {
                firework.remove();
                for (let j = 0; j < 40; j++) {
                    const particle = document.createElement("div");
                    const color =
                        fireworkColors[
                            Math.floor(Math.random() * fireworkColors.length)
                        ];
                    particle.style.cssText = `
                        position: fixed;
                        left: ${targetX}px;
                        top: ${targetY}px;
                        width: 4px;
                        height: 4px;
                        background: ${color};
                        border-radius: 50%;
                        pointer-events: none;
                        z-index: 10000;
                        box-shadow: 0 0 8px ${color};
                        will-change: transform, opacity;
                    `;
                    document.body.appendChild(particle);

                    const angle =
                        (j / 40) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
                    const distance = Math.random() * 100 + 30;
                    const px = Math.cos(angle) * distance;
                    const py = Math.sin(angle) * distance;

                    particle.animate(
                        [
                            {
                                transform: "translate(0px, 0px) scale(1)",
                                opacity: 1,
                            },
                            {
                                transform: `translate(${px}px, ${py}px) scale(0.1)`,
                                opacity: 0,
                            },
                        ],
                        {
                            duration: ANIMATION_DURATIONS.fireworkExplosion,
                            easing: "ease-out",
                            fill: "forwards",
                        },
                    ).onfinish = () => particle.remove();
                }
            };
        }, i * 200);
    }
}

function setupRainbowTrail() {
    let trailElements = [];
    let isTrailActive = false;
    let removeTimeout;

    const activateTrail = () => {
        if (isTrailActive) return;
        isTrailActive = true;
        document.addEventListener("mousemove", createTrailParticle);

        if (removeTimeout) clearTimeout(removeTimeout);
        removeTimeout = setTimeout(() => {
            isTrailActive = false;
            document.removeEventListener("mousemove", createTrailParticle);

            trailElements.forEach((el) => el.remove());
            trailElements = [];
        }, 8000); //
    };

    const createTrailParticle = (e) => {
        const particle = document.createElement("div");
        particle.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: ${Math.random() * 6 + 3}px; // Меньшие частицы
            height: ${Math.random() * 6 + 3}px;
            background: linear-gradient(45deg, ${colors[Math.floor(Math.random() * colors.length)]}, ${colors[Math.floor(Math.random() * colors.length)]});
            border-radius: 50%;
            pointer-events: none;
            z-index: 99999;
            opacity: 0.6;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 5px currentColor; // Меньше свечения
            will-change: transform, opacity;
        `;
        document.body.appendChild(particle);
        trailElements.push(particle);

        particle.animate(
            [
                { transform: "translate(-50%, -50%) scale(1)", opacity: 0.6 },
                {
                    transform: "translate(-50%, -50%) scale(0) rotate(360deg)",
                    opacity: 0,
                },
            ],
            {
                duration: 800,
                easing: "ease-out",
                fill: "forwards",
            },
        ).onfinish = () => {
            particle.remove();
            trailElements = trailElements.filter((el) => el !== particle);
        };
    };

    return activateTrail;
}

function createWaveEffect(card, event) {
    const rect = card.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.classList.add("card-ripple");

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    card.appendChild(ripple);

    ripple.animate(
        [
            { width: "0px", height: "0px", opacity: 1 },
            { width: "150px", height: "150px", opacity: 0 },
        ],
        {
            duration: 700,
            easing: "ease-out",
            fill: "forwards",
        },
    ).onfinish = () => ripple.remove();
}

function createStarExplosion(x, y) {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const star = document.createElement("div");
            star.innerHTML = "✨";
            star.style.position = "fixed";
            star.style.left = x + "px";
            star.style.top = y + "px";
            star.style.fontSize = Math.random() * 20 + 10 + "px";
            star.style.pointerEvents = "none";
            star.style.zIndex = "10000";
            star.style.textShadow = `0 0 5px gold, 0 0 10px white`;
            star.style.willChange = "transform, opacity";

            document.body.appendChild(star);

            const angle = (i / 30) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
            const distance = Math.random() * 150 + 50;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            star.animate(
                [
                    {
                        transform:
                            "translate(-50%, -50%) scale(0) rotate(0deg)",
                        opacity: 1,
                    },
                    {
                        transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1.2) rotate(${Math.random() * 360}deg)`,
                        opacity: 0,
                    },
                ],
                {
                    duration: ANIMATION_DURATIONS.starExplosion,
                    easing: "ease-out",
                    fill: "forwards",
                },
            );

            setTimeout(() => {
                star.remove();
            }, ANIMATION_DURATIONS.starExplosion);
        }, i * 30);
    }
}

function activateCommonAnimations(e) {
    createGlitterExplosion(e.clientX, e.clientY);
    createMagicRings(e.clientX, e.clientY);
}

function handleCardClick(e, card, compliment) {
    activateCommonAnimations(e);
    createStarExplosion(e.clientX, e.clientY);

    card.animate(
        [
            { transform: "scale(1)", boxShadow: "" },
            {
                transform: "scale(1.1)",
                boxShadow:
                    "0 0 30px rgba(255, 105, 180, 0.7), 0 0 10px rgba(255,255,255,0.6)",
                backgroundColor: "#fff0f8",
            },
            { transform: "scale(1)", boxShadow: "", backgroundColor: "" },
        ],
        {
            duration: ANIMATION_DURATIONS.cardClickScale,
            easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        },
    );

    showMessage(`💖 ${compliment.text} 💖`, true);
}

function setupSuperMagicButton() {
    const button = document.getElementById("superMagicButton");
    const activateRainbowTrail = setupRainbowTrail();

    button.addEventListener("click", (e) => {
        activateCommonAnimations(e);
        createFireworks(e.clientX, e.clientY);
        activateRainbowTrail();

        setTimeout(() => {
            for (let i = 0; i < 10; i++) {
                setTimeout(createFloatingHeart, i * 150);
            }
        }, 200);

        setTimeout(() => {
            for (let i = 0; i < 5; i++) {
                setTimeout(createFallingCat, i * 200);
            }
        }, 400);

        const initialBodyBackground =
            "linear-gradient(180deg, #0f0f23 0%, #1a0a1a 50%, #0f0f23 100%)";
        document.body.animate(
            [
                { background: initialBodyBackground },
                {
                    background:
                        "linear-gradient(145deg, #FF69B4, #EE82EE, #8A2BE2)",
                },
                { background: initialBodyBackground },
            ],
            {
                duration: ANIMATION_DURATIONS.buttonBgChange,
                easing: "cubic-bezier(0.19, 1, 0.22, 1)",
                fill: "forwards",
            },
        );

        hideCompliments().then(() => {
            const newCompliments = getRandomCompliments();
            displayedCompliments = newCompliments;
            renderCompliments(newCompliments);
        });

        showMessage(
            "✨ КОМПЛИМЕНТЫ ОБНОВЛЕНЫ! ✨<br>🐱 Теперь ещё больше любви! 🐱",
            true,
        );
    });
}

function create3DHeartTitle() {
    const titleHeartContainer = document.getElementById("titleHeart");
    if (!titleHeartContainer) return;

    titleHeartContainer.innerHTML = "";

    for (let i = 0; i < 3; i++) {
        const layer = document.createElement("div");
        layer.classList.add("heart-layer");
        layer.textContent = "💖";
        layer.style.animationDelay = `${i * 0.1}s`;
        titleHeartContainer.appendChild(layer);
    }
}

window.addEventListener("load", () => {
    if (!document.getElementById("floatingHearts")) {
        const floatingHeartsContainer = document.createElement("div");
        floatingHeartsContainer.id = "floatingHearts";
        floatingHeartsContainer.classList.add("floating-hearts");
        document.body.appendChild(floatingHeartsContainer);
    }

    if (!document.getElementById("catsContainer")) {
        const catsContainer = document.createElement("div");
        catsContainer.id = "catsContainer";
        catsContainer.classList.add("cats-container");
        document.body.appendChild(catsContainer);
    }

    if (!document.getElementById("pop-up-text")) {
        const popupContainer = document.createElement("div");
        popupContainer.id = "pop-up-text";
        popupContainer.classList.add("pop-up-text");
        const popupMessage = document.createElement("p");
        popupMessage.id = "pop-up-message";
        popupContainer.appendChild(popupMessage);
        document.body.appendChild(popupContainer);
    }

    renderCompliments();
    setupSuperMagicButton();
    create3DHeartTitle();

    if (floatingHeartInterval) clearInterval(floatingHeartInterval);
    if (fallingCatInterval) clearInterval(fallingCatInterval);
    if (starInterval) clearInterval(starInterval);
    if (goldenRainInterval) clearInterval(goldenRainInterval);
    if (flowerRainInterval) clearInterval(flowerRainInterval);
    rotatingHeartsIntervals.forEach(clearInterval);
    rotatingHeartsIntervals = [];

    floatingHeartInterval = setInterval(
        createFloatingHeart,
        ANIMATION_DELAYS.heartFloat * 3,
    );
    fallingCatInterval = setInterval(
        createFallingCat,
        ANIMATION_DELAYS.catFall * 5,
    );
    starInterval = setInterval(
        createStar,
        ANIMATION_DELAYS.sparkleCreation * 100,
    );
    goldenRainInterval = setInterval(createGoldenRain, 3000);
    flowerRainInterval = setInterval(createFlowerRain, 8000);

    setupMagneticButton();
    createCatPawPrints();

    let scrollGlitterTimeout;
    window.addEventListener("scroll", (e) => {
        clearTimeout(scrollGlitterTimeout);
        scrollGlitterTimeout = setTimeout(() => {
            createGlitterExplosion(
                e.clientX || window.innerWidth / 2,
                e.clientY || window.innerHeight / 2,
            );
        }, 150);
    });
});

const style = document.createElement("style");
style.textContent = `
    .pop-up-text {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        visibility: hidden;
        opacity: 0;
        z-index: 10001;
        text-align: center;
        border-radius: 100px;
        will-change: transform, opacity;
        pointer-events: none;
    }
    .pop-up-text p {
        margin: 0;
        padding: 0;
    }

    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); } /* Чуть меньше движения */
    }
    
    .sparkle-particle { 
        position: fixed;
        pointer-events: none;
        animation: sparkle 1s ease-out forwards;
    }
    
    @keyframes sparkle {
        0% { opacity: 1; transform: scale(0) rotate(0deg); }
        100% { opacity: 0; transform: scale(1.5) rotate(180deg); } /* Меньше масштаб */
    }
    
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .compliment-card {
        overflow: hidden;
        position: relative;
        z-index: 1;
    }

    .card-ripple {
        position: absolute;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(255, 105, 180, 0.4);
        animation: rippleEffect 0.7s ease-out forwards;
        pointer-events: none;
        z-index: 0;
    }

    @keyframes rippleEffect {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 150px; /* Меньше размер круга */
            height: 150px;
            opacity: 0;
        }
    }

    .title-heart-3d {
        display: inline-block;
        position: relative;
        width: 40px;
        height: 40px;
        perspective: 1000px;
    }

    .heart-layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 40px;
        line-height: 1;
        transform-style: preserve-3d;
        animation: rotateHeart 2s infinite ease-in-out;
        will-change: transform;
        color: #FF69B4;
        text-shadow: 0 0 5px #FFC0CB, 0 0 10px #FF1493;
    }

    .heart-layer:nth-child(1) { transform: translateZ(0px); opacity: 0.8; }
    .heart-layer:nth-child(2) { transform: translateZ(-2px); opacity: 0.6; }
    .heart-layer:nth-child(3) { transform: translateZ(-4px); opacity: 0.4; }

    @keyframes rotateHeart {
        0% { transform: rotateY(0deg) rotateX(0deg); }
        50% { transform: rotateY(10deg) rotateX(5deg); }
        100% { transform: rotateY(0deg) rotateX(0deg); }
    }

    .rainbow-trail-particle {
        position: fixed;
        border-radius: 50%;
        pointer-events: none;
        z-index: 99999;
        will-change: transform, opacity;
        animation: fadeOutTrail var(--rainbow-trail-fade-duration) ease-out forwards;
        box-shadow: 0 0 5px currentColor;
    }
    
    @keyframes fadeOutTrail {
        0% { opacity: 0.6; transform: scale(1); } /* Начальная прозрачность */
        100% { opacity: 0; transform: scale(0); }
    }


    @keyframes twinkle {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.1); } /* Меньше масштаб */
    }
    @keyframes rayPulse {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.8; }
    }

    .footer-cat-dance {
        display: inline-block;
        animation: catDance 2s infinite ease-in-out;
        transform-origin: bottom center;
    }

    @keyframes catDance {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(5deg) translateY(-5px); }
        75% { transform: rotate(-5deg) translateY(-5px); }
    }
`;
document.head.appendChild(style);


document.head.appendChild(style);
