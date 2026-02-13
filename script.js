document.addEventListener('DOMContentLoaded', () => {
    // --- Variables ---
    const heartsContainer = document.querySelector('.hearts-container');
    const sections = document.querySelectorAll('.section');
    // const galleryItems = document.querySelectorAll('.gallery-item'); // Removed

    // --- 1. Background Hearts ---
    function createHearts() {
        // Create a heart every 300ms
        setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.animationDuration = Math.random() * 3 + 4 + "s"; // 4-7s

            heartsContainer.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 7000);
        }, 300);
    }
    createHearts();

    // --- 2. Section Navigation ---
    window.nextSection = function (id) {
        // Hide all
        sections.forEach(sec => sec.classList.remove('active'));
        // Show target
        const target = document.getElementById(id);
        if (target) {
            target.classList.add('active');

            // Special actions when entering sections
            if (id === 'music') {
                // Try to play music if player is ready
                if (videoPlayer) {
                    videoPlayer.play().catch(e => console.log("Autoplay prevented:", e));
                }
            }
        }
    };

    // --- 3. Gallery Scroll Effect ---
    // (Removed for Polaroid Grid Layout)


    // --- 4. Local Video Player ---
    const videoPlayer = document.getElementById('video-player');

    if (videoPlayer) {
        // Ensure volume is reasonable (optional)
        videoPlayer.volume = 0.5;

        // Listen for play event specifically to start typing if not already started
        videoPlayer.addEventListener('play', () => {
            startTyping();
        });
    }

    // --- 5. Lyrics / Message Typing ---
    const typingText = document.getElementById('typing-text');
    // Combine the quote and song title into the message displayed
    const message = `"Pinili ko ang kantang ito dahil mahal ko kayo para sa kung ano ito ay, tatanggapin ko ang iyong mga pagkukulang at nang hindi mo alam kapag dumating ka sa aking mundo, ito nararamdaman mas masaya, mahal ko kayo kaya magkano." <br><br> 🎶 All I Ever Need - Austin Mahone`;
    let typingStarted = false;

    function startTyping() {
        if (typingStarted) return;
        typingStarted = true;

        let i = 0;
        typingText.innerHTML = "";
        const speed = 50;

        function typeWriter() {
            if (i < message.length) {
                // Handle HTML tags properly
                if (message.charAt(i) === '<') {
                    let tag = '';
                    while (message.charAt(i) !== '>') {
                        tag += message.charAt(i);
                        i++;
                    }
                    tag += '>';
                    typingText.innerHTML += tag;
                } else {
                    typingText.innerHTML += message.charAt(i);
                }
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        typeWriter();
    }


    // --- 6. Question "Trick" ---
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    let noClickCount = 0;
    const noTexts = ["No", "Are you sure?", "Really?", "Think again!", "Last chance!", "Just click Yes!", "😭", "Please?"];

    function growYes() {
        // Increase Yes button scale
        let currentScale = parseFloat(yesBtn.style.transform.replace('scale(', '').replace(')', '')) || 1;
        const newScale = currentScale + 0.2; // Grow by 20%
        yesBtn.style.transform = `scale(${newScale})`;

        // Shrink No button or change text
        noClickCount++;
        if (noClickCount < noTexts.length) {
            noBtn.innerText = noTexts[noClickCount];
        } else {
            noBtn.style.display = 'none'; // Give up and hide No
        }

        // Move No button slightly to annoy (optional, but requested "makin gede yang yes sampe ilang yang no")
        // Implementation: Just grow Yes and eventually hide No is simpler and matches request "ilang yang no"
        if (newScale > 2.5) {
            noBtn.style.display = 'none';
        }
    }

    noBtn.addEventListener('click', growYes);
    noBtn.addEventListener('mouseover', () => {
        // Optional: Run same logic on hover for extra annoyance/effect? 
        // Request said "kalo ga tulisan nya bakal makin gede yang yes". implied "kalo ga" (choosing no). 
        // Let's stick to click or maybe hover if desktop.
        // growYes(); 
    });

    // Yes button is handled by inline onclick="nextSection('letter')"

});
