const gameArea = document.getElementById('game');
const scoreDisplay = document.getElementById('score');
let score = 0;

function createBalloon() {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.style.left = Math.random() * (window.innerWidth - 60) + 'px';
    balloon.style.bottom = '-100px';
    balloon.style.backgroundColor = getRandomColor();
    gameArea.appendChild(balloon);

    let riseInterval = setInterval(() => {
        balloon.style.bottom = parseInt(balloon.style.bottom) + 1 + 'px';
        if (parseInt(balloon.style.bottom) > window.innerHeight) {
            clearInterval(riseInterval);
            gameArea.removeChild(balloon);
        }
    }, 8);

    balloon.addEventListener('click', () => {
        score++;
        scoreDisplay.textContent = 'Score: ' + score;
        clearInterval(riseInterval);
        burstBalloon(balloon);
    });
}
function burstBalloon(balloon) {
    const balloonRect = balloon.getBoundingClientRect();
    const balloonColor = balloon.style.backgroundColor;

    // Change background color to balloon's color
    document.body.style.backgroundColor = balloonColor;

    // Create paint splash effect
    const splash = document.createElement('div');
    splash.className = 'paint-splash';
    splash.style.backgroundColor = balloonColor;
    splash.style.width = '200px'; // Larger size for more impact
    splash.style.height = '200px'; // Larger size for more impact
    splash.style.left = `${balloonRect.left + window.scrollX + balloonRect.width / 2 - 100}px`; // Center the splash
    splash.style.top = `${balloonRect.top + window.scrollY + balloonRect.height / 2 - 100}px`; // Center the splash
    splash.style.transform = 'scale(1)';
    splash.style.animation = 'paintSplash 1s forwards'; // Adjust duration if needed

    gameArea.appendChild(splash);

    setTimeout(() => {
        splash.remove(); // Remove splash after animation
    }, 1000); // Match duration of animation

    const fragmentCount = 8;

    for (let i = 0; i < fragmentCount; i++) {
        const fragment = document.createElement('div');
        fragment.className = 'fragment';
        fragment.style.backgroundColor = balloonColor;

        const angle = (Math.PI * 2) / fragmentCount * i;
        const radius = 50;  // Distance fragments will travel

        fragment.style.setProperty('--x', `${Math.cos(angle) * radius}px`);
        fragment.style.setProperty('--y', `${Math.sin(angle) * radius}px`);

        fragment.style.left = `${balloonRect.left + window.scrollX + balloonRect.width / 2 - 5}px`;
        fragment.style.top = `${balloonRect.top + window.scrollY + balloonRect.height / 2 - 5}px`;

        gameArea.appendChild(fragment);
    }

    balloon.remove();  // Remove the balloon after it bursts

    setTimeout(() => {
        document.querySelectorAll('.fragment').forEach(fragment => fragment.remove());
    }, 600); // Remove fragments after animation
}


function getRandomColor() {
    const colors = ['#ffcccb', '#ff6666', '#ff9966', '#ffcc66', '#66ff66', '#66ffff', '#6666ff', '#cc66ff'];
    return colors[Math.floor(Math.random() * colors.length)];
}

setInterval(createBalloon, 1000);
