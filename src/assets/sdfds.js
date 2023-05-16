document.body.addEventListener('click', function () {
    function doomTimer() {

        let timeLeft = 3500;
        const timerElement = document.createElement('div');
        timerElement.style.position = 'fixed';
        timerElement.style.top = '50%';
        timerElement.style.right = '50%';
        timerElement.style.color = 'red';
        timerElement.style.fontSize = '120px';
        timerElement.style.fontWeight = 'bold';
        timerElement.style.zIndex = 9999;
        document.body.appendChild(timerElement);

        const timerInterval = setInterval(() => {
            timeLeft -= 10;
            const minutes = Math.floor(timeLeft / 60000);
            const seconds = Math.floor((timeLeft % 60000) / 1000);
            const milliseconds = timeLeft % 1000;
            timerElement.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                document.body.removeChild(timerElement);
                harassText();
                hackAllText();
            } else {
                let minutes = Math.floor((timeLeft / 1000) / 60);
                let seconds = Math.floor((timeLeft / 1000) % 60);
                let milliseconds = Math.floor(timeLeft % 1000);
                minutes = minutes < 10 ? `0${minutes}` : minutes;
                seconds = seconds < 10 ? `0${seconds}` : seconds;
                milliseconds = milliseconds < 10 ? `00${milliseconds}` : milliseconds < 100 ? `0${milliseconds}` : milliseconds;
                timerElement.innerText = `${minutes}:${seconds}.${milliseconds}`;
            }
        }, 10);
    };

    function harassText() {
        let elapsedTime = 0;

        const interval = setInterval(() => {
            const textElement = document.createElement('div');
            textElement.innerText = elapsedTime <= 4500 ? 'hacking mainframe....' :
                elapsedTime <= 6500 ? 'stealing secrets...' :
                    elapsedTime <= 10000 ? 'uploading....' : 'HACKED!!!1';

            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const randomX = Math.floor(Math.random() * viewportWidth * 0.4 + viewportWidth * 0.3);
            const randomY = Math.floor(Math.random() * viewportHeight * 0.4 + viewportHeight * 0.3);
            textElement.style.position = 'absolute';
            textElement.style.top = `${Math.floor(Math.random() * (randomX * 0.4) + window.innerHeight * 0.6)}px`;
            textElement.style.left = `${Math.floor(Math.random() * (randomY * 0.4) + window.innerWidth * 0.6)}px`;
            textElement.style.color = 'red';
            textElement.style.fontWeight = 'bold';
            textElement.style.zIndex = 9999;
            let textElapsedTime = 0;

            const textInterval = setInterval(() => {
                const size = 150 + (elapsedTime / 10);
                textElement.style.transform = `rotate(${textElapsedTime / 10}deg) scale(${size}%)`;
                document.body.appendChild(textElement);
                if (textElapsedTime <= 400) {
                    textElement.style.transform = `rotate(${textElapsedTime / 10}deg)`;
                } else if (textElapsedTime <= 900) {
                    const size = 100 + (elapsedTime) / 30;
                    textElement.style.transform = `rotate(${textElapsedTime / 10}deg) scale(${size}%)`;
                } else if (textElapsedTime <= 1200) {
                    const size = 130 + (elapsedTime) / 20;
                    textElement.style.transform = `scale(${size}%)`;
                } else {
                    const size = 100 + (elapsedTime) / 20;
                    textElement.style.transform = `rotate(${textElapsedTime / 90}deg) scale(${size}%)`;
                }
                if (textElapsedTime >= 1500) {
                    clearInterval(textInterval);
                    document.body.removeChild(textElement);
                }
                textElapsedTime += 200;
            }, 100);

            if (elapsedTime >= 20000) {
                clearInterval(interval);
            }
            elapsedTime += 150;
        }, 100);
    }
    function gatherVisibleTextElements() {
        const paragraphsAndHeaders = Array.from(document.querySelectorAll('i, span, a, p, h1, h2, h3, h4, h5, h6'));
        const visibleParagraphsAndHeaders = paragraphsAndHeaders.filter((element) => {
            return element.textContent.trim().length > 0 &&
                element.getBoundingClientRect().height > 0 &&
                element.getBoundingClientRect().width > 0;
        });
        return visibleParagraphsAndHeaders;
    }
    function hackAllText() {
        const arr = gatherVisibleTextElements();
        const letters = "abcdefghijklmnopqrstuvwxyz";

        arr.forEach((element) => {
            const value = element.textContent;
            if (value) {
                const iterationValue = 0;
                let iteration = 0;
                let interval;

                interval = setInterval(() => {
                    element.textContent = element.textContent.trim()
                        .split("")
                        .map((letter, index) => {
                            if (index < iteration) {
                                return value[index];
                            }
                            return letters[Math.floor(Math.random() * 26)]
                        })
                        .join("");
                    iteration += iterationValue;
                }, 30);
            }
        });
    }

    doomTimer();
});
