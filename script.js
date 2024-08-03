const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Lion", correct: false },
            { text: "Elephant", correct: false },
        ]
    },
    {
        question: "What is the smallest country in the world?",
        answers: [
            { text: "Monaco", correct: false },
            { text: "Vatican City", correct: true },
            { text: "Malta", correct: false },
            { text: "San Marino", correct: false },
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false },
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Jupiter", correct: false },
            { text: "Mars", correct: true },
            { text: "Venus", correct: false },
        ]
    }
];

// Get references to HTML elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const feedbackElement = document.getElementById("feedback");

let currentQuestionIndex = 0; // Track the current question index
let score = 0; // Track the quiz score

// Start the quiz
function startQuiz() {
    currentQuestionIndex = 0; // Reset the question index
    score = 0; // Reset the score
    nextButton.innerHTML = "Next"; // Set the initial text for the next button
    feedbackElement.innerHTML = ''; // Clear any previous feedback
    showQuestion(); // Show the first question
}

// Show the current question
function showQuestion() {
    resetState(); // Reset the state for the new question
    let currentQuestion = questions[currentQuestionIndex]; // Get the current question
    let questionNo = currentQuestionIndex + 1; // Calculate the question number
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; // Display the question

    // Create buttons for each answer
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn", "btn-outline-primary");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct; // Store the correct answer
        }
        button.addEventListener("click", selectAnswer); // Add event listener to the button
    });
}

// Reset the state for the new question
function resetState() {
    nextButton.style.display = "none"; // Hide the next button
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild); // Remove all answer buttons
    }
    feedbackElement.innerHTML = ''; // Clear any feedback
}

// Handle answer selection
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true"; // Check if the selected answer is correct
    if (isCorrect) {
        selectedBtn.classList.add("correct"); // Highlight the correct answer
        feedbackElement.innerHTML = '<div class="alert alert-success" role="alert">Correct!</div>'; // Show correct feedback
        score++; // Increment the score
    } else {
        selectedBtn.classList.add("incorrect"); // Highlight the incorrect answer
        feedbackElement.innerHTML = '<div class="alert alert-danger" role="alert">Incorrect!</div>'; // Show incorrect feedback
    }
    // Disable all buttons and highlight the correct answer
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true; // Disable the button
    });
    nextButton.style.display = "block"; // Show the next button
}

// Show the final score
function showScore() {
    resetState(); // Reset the state
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`; // Display the score
    nextButton.innerHTML = "Play Again"; // Change the next button text to "Play Again"
    nextButton.style.display = "block"; // Show the next button
}

// Handle the next button click
function handleNextButton() {
    currentQuestionIndex++; // Increment the question index
    if (currentQuestionIndex < questions.length) {
        showQuestion(); // Show the next question
    } else {
        showScore(); // Show the score if it was the last question
    }
}

// Add event listener to the next button
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton(); // Handle next button click
    } else {
        startQuiz(); // Restart the quiz if all questions are done
    }
});

// Start the quiz initially
startQuiz();
