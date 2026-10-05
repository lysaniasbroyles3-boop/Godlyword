// ======================================
// BOBOS BIBLE STUDY
// Main JavaScript
// ======================================


// ======================================
// PAGE NAVIGATION
// ======================================

const pages = document.querySelectorAll(".page");
const navigationButtons = document.querySelectorAll("[data-page]");

function openPage(pageName) {

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById(pageName);

    if (!selectedPage) {
        return;
    }

    selectedPage.classList.add("active");

    // Update navbar buttons
    document.querySelectorAll(".nav-button").forEach(button => {

        button.classList.remove("active");

        if (button.dataset.page === pageName) {
            button.classList.add("active");
        }

    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Every button with data-page works
navigationButtons.forEach(button => {

    button.addEventListener("click", function () {

        const pageName = this.dataset.page;

        openPage(pageName);

    });

});


// ======================================
// PROGRESS
// ======================================

let xp = 0;
let completed = 0;
let streak = 0;
let level = 1;


function updateProgress() {

    document.getElementById("xp").textContent = xp;
    document.getElementById("completed").textContent = completed;
    document.getElementById("streak").textContent = streak;
    document.getElementById("level").textContent = level;

    document.getElementById("current-xp").textContent =
        xp % 100;

    document.getElementById("next-xp").textContent = 100;

    const progress = xp % 100;

    document.getElementById("progress-fill").style.width =
        progress + "%";

    if (xp >= 100) {

        level = Math.floor(xp / 100) + 1;

        document.getElementById("level").textContent = level;
    }

    if (xp === 0) {

        document.getElementById("level-message").textContent =
            "Complete a study to earn XP!";

    } else {

        document.getElementById("level-message").textContent =
            "Keep going! You're making progress.";

    }

}


// ======================================
// BIBLE STUDY QUIZ
// ======================================

const quiz = document.getElementById("quiz");
const quizResult = document.getElementById("quiz-result");

quiz.addEventListener("submit", function(event) {

    event.preventDefault();

    const questionNames = [
        "q1",
        "q2",
        "q3"
    ];

    let score = 0;

    questionNames.forEach(name => {

        const selected = document.querySelector(
            `input[name="${name}"]:checked`
        );

        if (selected && selected.value === "correct") {
            score++;
        }

    });


    if (score === 3) {

        completed++;

        xp += 100;

        streak++;

        updateProgress();

        quizResult.innerHTML = `
            <strong>🎉 Perfect Score!</strong><br><br>
            You got 3/3 correct.<br>
            You earned <strong>100 XP</strong>!
        `;

    } else {

        quizResult.innerHTML = `
            <strong>📖 Keep Studying!</strong><br><br>
            You got ${score}/3 correct.
            Review the passage and try again.
        `;

    }

    quizResult.classList.add("show");

});


// ======================================
// VERSE DATABASE
// ======================================

const verses = {

    "john 3:16": {
        reference: "John 3:16",
        text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
    },

    "psalm 23:1": {
        reference: "Psalm 23:1",
        text: "The Lord is my shepherd; I shall not want."
    },

    "proverbs 3:5": {
        reference: "Proverbs 3:5",
        text: "Trust in the Lord with all your heart and lean not on your own understanding."
    },

    "philippians 4:13": {
        reference: "Philippians 4:13",
        text: "I can do all things through Christ who strengthens me."
    },

    "jeremiah 29:11": {
        reference: "Jeremiah 29:11",
        text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future."
    },

    "psalm 119:105": {
        reference: "Psalm 119:105",
        text: "Your word is a lamp for my feet, a light on my path."
    },

    "romans 8:28": {
        reference: "Romans 8:28",
        text: "And we know that in all things God works for the good of those who love him."
    }

};


// ======================================
// VERSE LOOKUP
// ======================================

const verseInput =
    document.getElementById("verse-input");

const verseSearchButton =
    document.getElementById("verse-search-button");

const verseResult =
    document.getElementById("verse-result");


function findVerse(reference) {

    const search = reference
        .trim()
        .toLowerCase();

    if (search === "") {

        verseResult.innerHTML = `
            <div class="empty-icon">⚠️</div>
            <h2>Enter a verse</h2>
            <p>
                Try something like John 3:16.
            </p>
        `;

        return;
    }


    const verse = verses[search];


    if (verse) {

        verseResult.innerHTML = `
            <div class="empty-icon">📖</div>

            <h2>${verse.reference}</h2>

            <p>
                "${verse.text}"
            </p>
        `;

    } else {

        verseResult.innerHTML = `
            <div class="empty-icon">🔎</div>

            <h2>Verse Not Found</h2>

            <p>
                We don't have that verse in the
                current BOBOS library yet.
            </p>
        `;

    }

}


verseSearchButton.addEventListener("click", function() {

    findVerse(verseInput.value);

});


verseInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        findVerse(verseInput.value);

    }

});


// ======================================
// QUICK VERSE BUTTONS
// ======================================

const quickVerseButtons =
    document.querySelectorAll("[data-verse]");


quickVerseButtons.forEach(button => {

    button.addEventListener("click", function() {

        const reference = this.dataset.verse;

        verseInput.value = reference;

        findVerse(reference);

    });

});


// ======================================
// START WEBSITE
// ======================================

openPage("home");

updateProgress();
