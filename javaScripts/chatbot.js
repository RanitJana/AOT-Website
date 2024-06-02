document.addEventListener('DOMContentLoaded', function () {
    const chatbox = document.getElementById('chatbox');
    const inputField = document.getElementById('input');
    const sendButton = document.getElementById('send');
    const clearButton = document.getElementById('clear-chat');

    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotWindow = document.querySelector('.chat-container');
    const backIcon = document.getElementById('back-icon');

    // Show the chatbot window when the chatbot icon is clicked
    chatbotIcon.addEventListener('click', function () {
        chatbotWindow.classList.remove('hidden');
        chatbotIcon.classList.add('hidden');
    });

    // Hide the chatbot window when the back icon is clicked
    backIcon.addEventListener('click', function () {
        chatbotWindow.classList.add('hidden');
        chatbotIcon.classList.remove('hidden');
    });



    const responses = {
        "admissions": {
            "What are the admission requirements?": "The admission requirements are...",
            "How can I apply?": "You can apply by..."
        },
        "courses": {
            "What programs are offered?": "We offer programs in...",
            "How do I register for classes?": "You can register for classes by..."
        },
        "fees": {
            "What is the tuition fee?": "The tuition fee is...",
            "Are there any scholarships available?": "Yes, we offer scholarships..."
        },
        "facilities": {
            "Where is the library located?": "The library is located at...",
            "What are the dining options on campus?": "The dining options are..."
        },
        "contact": {
            "How can I contact the admissions office?": "You can contact the admissions office at...",
            "What is the phone number for the registrar's office?": "The phone number is..."
        },
        "events": {
            "What events are happening this month?": "The events happening this month are...",
            "Where can I find the latest news?": "You can find the latest news at..."
        },
        "support": {
            "How do I reset my password?": "You can reset your password by...",
            "Who do I contact for technical support?": "Contact technical support at..."
        }
    };

    function appendMessage(content, isUser = true) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messageDiv.textContent = content;
        chatbox.appendChild(messageDiv);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    sendButton.addEventListener('click', function () {
        const userInput = inputField.value.trim().toLowerCase();
        if (userInput === '') return;

        appendMessage(userInput);
        inputField.value = '';

        let response = "Sorry, I didn't understand that. Can you ask differently?";
        for (const category in responses) {
            for (const question in responses[category]) {
                if (userInput.includes(question.toLowerCase())) {
                    response = responses[category][question];
                }
            }
        }

        setTimeout(() => appendMessage(response, false), 500);
    });

    clearButton.addEventListener('click', function () {
        chatbox.innerHTML = '';
    });
});
