// questionPool.js
// Purpose: Manages loading, shuffling, and providing questions for game modes, including dynamic MCQ options.
// Usage: Imported by main.js and game mode scripts.
// Timestamp: 2025-05-29 03:19 AM BST
// License: MIT License (https://opensource.org/licenses/MIT)
// Copyright (c) 2025 AllieBaig (https://alliebaig.github.io/LingoQuest1/)

let loadedQuestions = []; // All questions loaded for a mode
let currentSessionQuestions = []; // Questions for the current session (unanswered)
let answeredQuestionIds = new Set(); // To track answered questions within a session
let currentQuestionIndex = -1;

const QUESTION_DATA_PATHS = {
    'solo': {
        'fr': 'lang/solo-fr.json'
    },
    'mixlingo': {
        'en': 'lang/mixlingo-en.json'
        // Add other MixLingo languages as needed, e.g., 'es', 'de', 'it'
    },
    'wordrelic': {
        'default': 'lang/wordrelic.json'
    },
    'wordsafari': {
        'default': 'lang/wordsafari.json'
    }
};

const DIFFICULTY_CHOICES = {
    'easy': 2,
    'medium': 3,
    'hard': 4
};

/**
 * Shuffles an array in place (Fisher-Yates algorithm).
 * @param {Array} array - The array to shuffle.
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * Loads questions for a given mode and language.
 * @param {string} mode - The game mode (e.g., 'solo', 'mixlingo').
 * @param {string} [lang='default'] - The language code (e.g., 'fr', 'en').
 * @returns {Promise<void>}
 */
export async function loadQuestionPool(mode, lang = 'default') {
    const path = QUESTION_DATA_PATHS[mode]?.[lang] || QUESTION_DATA_PATHS[mode]?.['default'];

    if (!path) {
        throw new Error(`No question data path found for mode: ${mode} and language: ${lang}`);
    }

    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        loadedQuestions = data.questions; // Store all loaded questions
        resetSessionQuestions(); // Initialize session questions
        console.log(`Loaded ${loadedQuestions.length} total questions for ${mode} (${lang}).`);
    } catch (error) {
        console.error('Error loading question pool:', error);
        throw error;
    }
}

/**
 * Resets the pool of questions for the current session, excluding previously answered ones.
 */
export function resetSessionQuestions() {
    currentSessionQuestions = loadedQuestions.filter(q => !answeredQuestionIds.has(q.id));
    shuffleArray(currentSessionQuestions);
    currentQuestionIndex = -1; // Reset index for a new session
    console.log(`Initialized session with ${currentSessionQuestions.length} questions.`);
}

/**
 * Gets the next question from the pool, dynamically generating MCQ options based on difficulty.
 * @param {string} difficulty - The difficulty level ('easy', 'medium', 'hard').
 * @returns {object | null} The next question object with generated options, or null if no more questions.
 */
export function getNextQuestion(difficulty) {
    currentQuestionIndex++;
    if (currentQuestionIndex >= currentSessionQuestions.length) {
        return null; // No more questions
    }

    const question = { ...currentSessionQuestions[currentQuestionIndex] }; // Clone to avoid modifying original

    const numChoices = DIFFICULTY_CHOICES[difficulty] || DIFFICULTY_CHOICES['easy']; // Default to easy

    // Generate distractors (incorrect options)
    const distractors = [];
    const allCorrectAnswers = loadedQuestions
        .map(q => q.correctAnswer)
        .filter(answer => answer !== question.correctAnswer); // Don't include the current correct answer

    // Shuffle all possible incorrect answers to pick random ones
    shuffleArray(allCorrectAnswers);

    // Add distractors up to numChoices - 1
    for (let i = 0; i < numChoices - 1 && i < allCorrectAnswers.length; i++) {
        // Ensure distractor is not already in the list of distractors
        if (!distractors.includes(allCorrectAnswers[i])) {
             distractors.push(allCorrectAnswers[i]);
        }
    }

    // Combine correct answer and distractors
    const allOptions = [question.correctAnswer, ...distractors];
    shuffleArray(allOptions); // Shuffle the final options for display

    question.options = allOptions; // Assign the newly generated options
    return question;
}

/**
 * Marks a question as answered so it's not repeated in the current session.
 * @param {string} questionId - The ID of the question to mark as answered.
 */
export function markQuestionAsAnswered(questionId) {
    answeredQuestionIds.add(questionId);
}

/**
 * Gets the total number of questions currently loaded (for the current session).
 * @returns {number}
 */
export function getTotalQuestionsCount() {
    return currentSessionQuestions.length;
}

/**
 * Gets the number of questions remaining in the current pool.
 * @returns {number}
 */
export function getRemainingQuestionsCount() {
    return currentSessionQuestions.length - (currentQuestionIndex + 1);
}

/**
 * Resets the answered questions tracker and session pool for a new game session.
 */
export function resetAnsweredQuestionsTracker() {
    answeredQuestionIds.clear();
    resetSessionQuestions(); // Regenerate session questions
}

