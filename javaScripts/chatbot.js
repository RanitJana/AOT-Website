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
        "facility": {
            "keywords": ["facility", "facilities", "infrastructure", "campus", "amenities"],
            "response": "The Academy of Technology offers a range of facilities including e-Classrooms, smart classrooms, seminar halls, extensive computing facilities, a canteen, 24/7 power backup, sports facilities, a plastic-free green campus, and designated no smoking zones. For more details on campus facilities, please visit the <a href='../pages/facility.html' style='text-decoration:none;color:red;'>facilities</a> page."
        },
        "contact": {
            keywords: ["contact", "phone", "email", "Telephone", "contacts"],
            response: "You can contact the Academy of Technology at +91-98310-21706/ 98310-21641 or via email at admission@aot.edu.in. <span style='display:block;'>For specific Department related contacts you may visit <a href='../pages/contact.html' style='text-decoration:none;color:red;'>contact</a> page.</span>"

        },
        "events": {
            keywords: ["events", "event", "news", "happening", "schedule", "activities", "activity", "bookings"],
            response: "Here, you'll find a variety of events including Artistix, Football matches, Robo-War, Techfiesta, Maze Runner, and Davewrap. Each event is held at Grand Central Terminal in Adisaptagram, Hooghly. You can find event details such as time, date, and location on this page. To book your spot, please click on the 'Book it' button below each event. For more information and bookings, visit our <a href='../pages/event.html' style='text-decoration:none;color:red;'>Event page</a>."
        },
        "support": {
            keywords: ["support", "help", "technical", "reset", "password"],
            response: "For technical support, contact our IT helpdesk. To reset your password, use the 'Forgot Password' feature on the login page."
        },
        "faculty": {
            keywords: ["professors", "professor", "teachers", "teacher", "instructors", "instructor", "sirs", "sir", "mam", "faculty", "faculties"],
            "response": "The Academy of Technology has a distinguished faculty led by Prof. (Dr.) Dilip Bhattacharya. The team consists of 111 qualified members specializing in various cutting-edge technologies. For more information about our faculty members and their qualifications, please visit the <a href='../pages/faculty.html' style='text-decoration:none;color:red;'>faculty</a> page."
        },
        "greetings": {
            keywords: ["hi", "hello", "hey"],
            response: "Hello! How can I help you today?"
        },
        "curriculum": {
            "keywords": ["curriculum", "syllabus"],
            "response": "For all the course curriculum at the Academy of Technology is structured over four years, covering a wide range of subjects including English, Mathematics, Computer Fundamentals, Semiconductor Devices, Managerial Economics, C programming, Data Structures, Operating Systems, Database Systems, Artificial Intelligence, Java Programming, Mobile Computing, and more. For a detailed curriculum, please refer to the <a href='../pages/curriculam.html' style='text-decoration:none;color:red;'>curriculum</a>."
        },
        "placement": {
            "keywords": ["placement", "recruitment", "campus interview", "companies", "job offers", "jobs", "job", "opportunity", "opportunities"],
            "response": "The Academy of Technology has a strong placement record with consistent performance. Notable companies like TCS, Wipro, and Tech Mahindra regularly recruit from AOT. In 2023, students achieved 147.36% placement offers till now. For more details, please visit the <a href='../pages/placement.html' style='text-decoration:none;color:red;'>placement</a> page."
        },
        "career_page": {
            "keywords": ["career"],
            "response": "We offer dynamic opportunities for retired professors, senior professionals, and aspiring educators to join our vibrant and collaborative environment. With flexible working hours, career development opportunities, and competitive pay packages, AOT provides a conducive atmosphere for professional growth. We support research and publication with incentives and dedicated research labs. Check out our recruitment advertisements and application format for more details. Interested candidates can email their CV to career@aot.edu.in. Visit our <a href='../assets/pdf/AOT-Application-Format-2021.pdf' download style='text-decoration:none;color:red;'>Application Format</a> to apply now! also visit <a href='../pages/career.html' style='text-decoration:none;color:red;'>career page</a> for more information"
        },
        "location": {
            keywords: ["location", "locations", "address", "map", "maps"],
            response: "G.T.Road (Adisaptagram), Aedconagar Hooghly, West Bengal Hooghly - 712121 West Bengal, India <a href='../index.html#location' style='text-decoration:none;color:red;'>map.</a>"
        },
        "general": {
            keyword: ["aboutcollege"],
            response: "<p>The Academy of Technology (AOT) is a prestigious institution in Adisaptagram, West Bengal, offering comprehensive engineering programs with a focus on academic excellence, career development, vibrant campus life, and modern facilities.</p>"
        }
        // "unknown": {
        //     response: "Sorry, I didn't understand that. Can you ask differently?"
        // }
    };

    function appendMessage(content, isUser = true) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        // messageDiv.textContent = content;
        if (!isUser) {

            messageDiv.innerHTML = "<img src='../assets/video/loading.gif' style='width:50px;height:35px;object-fit:cover;'>";
            chatbox.appendChild(messageDiv);
            setTimeout(() => {
                messageDiv.innerHTML = content;
            }, 1500);
        }
        else {
            messageDiv.innerHTML = content;
            chatbox.appendChild(messageDiv);
        }
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    // Flag to track if the welcome message has been shown
    let isWelcomeMessageShown = false;

    function showWelcomeMessage() {
        const welcomeMessage = "Welcome! How can I help you today? You can ask me about admissions, courses, fees, facilities, contact information, events, or support.";
        appendMessage(welcomeMessage, false);
    }

    sendButton.addEventListener('click', function () {
        const originalInput = inputField.value;
        const userInput = inputField.value.trim().toLowerCase();
        if (userInput === '') return;

        appendMessage(originalInput);
        inputField.value = '';

        let response = "Sorry, I didn't understand that. Can you ask differently?";
        // let response = responses.unknown.response;
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

        setTimeout(() => appendMessage(response, false), 200);
    });

    clearButton.addEventListener('click', function () {
        chatbox.innerHTML = '';
        isWelcomeMessageShown = false;
    });

    // Show the chatbot window when the chatbot icon is clicked
    chatbotIcon.addEventListener('click', function () {
        chatbotWindow.classList.remove('hidden');
        chatbotIcon.classList.add('hidden');
        document.body.style.overflow = 'hidden';
        // Show the welcome message when the chatbot window is opened
        if (!isWelcomeMessageShown) {
            showWelcomeMessage();
        }
        isWelcomeMessageShown = true;
    });

    // Hide the chatbot window when the back icon is clicked
    backIcon.addEventListener('click', function () {
        chatbotWindow.classList.add('hidden');
        chatbotIcon.classList.remove('hidden');
        document.body.style.overflow = '';
    });
});
