document.addEventListener('DOMContentLoaded', function () {
    const chatbox = document.getElementById('chatbox');
    const inputField = document.getElementById('input');
    const sendButton = document.getElementById('send');
    const clearButton = document.getElementById('clear-chat');

    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotWindow = document.querySelector('.chat-container');
    const backIcon = document.getElementById('back-icon');





    const responses = {
        "admissions": {
            keywords: ["admission", "apply", "enroll"],
            response: "For admissions, you can find all requirements and application procedures on our admissions page."
        },
        "courses": {
            keywords: ["programs", "courses", "register", "classes"],
            response: "We offer a variety of programs. You can register for classes through the student portal."
        },
        "fees": {
            keywords: ["tuition", "fee", "scholarships", "scholarship"],
            response: "The tuition fees vary by program. We also offer scholarships for eligible students."
        },
        "facilities": {
            keywords: ["library", "dining", "cafeteria", "gym"],
            response: "Our facilities include a library, multiple dining options, and a fully equipped gym."
        },
        "contact": {
            keywords: ["contact", "phone", "email"],
            response: "You can contact us through our main office or via email at contact@university.edu."
        },
        "events": {
            keywords: ["events", "event", "news", "happening"],
            response: "Upcoming events are listed on our events page. Check out the latest news section for more updates."
        },
        "support": {
            keywords: ["support", "help", "technical", "reset", "password"],
            response: "For technical support, contact our IT helpdesk. To reset your password, use the 'Forgot Password' feature on the login page."
        },
        "faculty": {
            keywords: ["professors", "professor", "teachers", "teacher", "instructors", "instructor", "sirs", "sir", "faculty", "faculties"],
            response: "we have established and reputed faculty members, you can visit <a href='../pages/faculty.html'>faculty page</a> for more information."
        }
    };

    function appendMessage(content, isUser = true) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        // messageDiv.textContent = content;
        messageDiv.innerHTML = content;
        chatbox.appendChild(messageDiv);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    function showWelcomeMessage() {
        const welcomeMessage = "Welcome! How can I help you today? You can ask me about admissions, courses, fees, facilities, contact information, events, or support.";
        appendMessage(welcomeMessage, false);
    }

    sendButton.addEventListener('click', function () {
        const userInput = inputField.value.trim().toLowerCase();
        if (userInput === '') return;

        appendMessage(userInput);
        inputField.value = '';

        let response = "Sorry, I didn't understand that. Can you ask differently?";
        for (const category in responses) {
            const { keywords, response: categoryResponse } = responses[category];
            for (const keyword of keywords) {
                if (userInput.includes(keyword)) {
                    response = categoryResponse;
                    break;
                }
            }
            if (response !== "Sorry, I didn't understand that. Can you ask differently?") {
                break;
            }
        }

        setTimeout(() => appendMessage(response, false), 500);
    });

    clearButton.addEventListener('click', function () {
        chatbox.innerHTML = '';
    });

    // Show the chatbot window when the chatbot icon is clicked
    chatbotIcon.addEventListener('click', function () {
        chatbotWindow.classList.remove('hidden');
        chatbotIcon.classList.add('hidden');
        document.body.style.overflow = 'hidden';
        // Show the welcome message when the chatbot window is opened
        showWelcomeMessage();
    });

    // Hide the chatbot window when the back icon is clicked
    backIcon.addEventListener('click', function () {
        chatbotWindow.classList.add('hidden');
        chatbotIcon.classList.remove('hidden');
        document.body.style.overflow = '';
    });
});
