// const { response } = require("express");

document.addEventListener('DOMContentLoaded', function () {
    const chatbox = document.getElementById('chatbox');
    const inputField = document.getElementById('input');
    const sendButton = document.getElementById('send');
    const clearButton = document.getElementById('clear-chat');

    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotWindow = document.querySelector('.chat-container');
    const backIcon = document.getElementById('back-icon');

    // bug fixing
    console.log(chatbox, inputField, sendButton, clearButton, chatbotIcon, chatbotWindow, backIcon);


    const responses = {
        "placement": {
            keywords: ["placement", "recruitment", "campus interview", "companies", "job offers", "jobs", "job", "opportunity", "opportunities"],
            response: "The Academy of Technology has a strong placement record with consistent performance. Notable companies like TCS, Wipro, and Tech Mahindra regularly recruit from AOT. In 2023, students achieved 147.36% placement offers till now. For more details, please visit the <a href='/placement' style='text-decoration:none;color:red;'>placement</a> page."
        },
        "college": {
            keywords: ["college", "about the college", "aot", "academy of technology"],
            response: "The Academy of Technology (AOT) is a prestigious institution in Adisaptagram, West Bengal, offering comprehensive engineering programs with a focus on academic excellence, career development, vibrant campus life, and modern facilities. visit <a href='/LifeAOT' style='text-decoration:none;color:red;'>Life at AOT</a> page."
        },
        "admissions": {
            keywords: ["admission", "apply", "enroll"],
            response: "For admissions, you can find all requirements and application procedures on our <a href='/programStructure' style='text-decoration:none;color:red;'>Program Structure</a> page."
        },
        "courses": {
            keywords: ["programs", "courses", "register", "classes"],
            response: "We offer a variety of programs. You can register for classes through the student portal."
        },

        "fees": {
            keywords: ["tuition", "fee", "fees"],
            response: "The tuition fees vary by which program you choose. Contact college for more information. <a href='/contact' style='text-decoration:none;color:red;'>contact</a>."
        },
        "scholarships": {
            keywords: ["scholarships", "scholarship"],
            response: "We offer scholarships like Aikyashree,Swami Vivekananda MeritCum Means (SVMCM) for all eligible students."
        },
        "facility": {
            "keywords": ["facility", "facilities", "infrastructure", "campus", "amenities"],
            "response": "The Academy of Technology offers a range of facilities including e-Classrooms, smart classrooms, seminar halls, extensive computing facilities, a canteen, 24/7 power backup, sports facilities, a plastic-free green campus, and designated no smoking zones. For more details on campus facilities, please visit the <a href='/facility' style='text-decoration:none;color:red;'>facilities</a> page."
        },
        "contact": {
            keywords: ["contact", "phone", "email", "Telephone", "contacts"],
            response: "You can contact the Academy of Technology at +91-98310-21706/ 98310-21641 or via email at admission@aot.edu.in. <span style='display:block;'>For specific Department related contacts you may visit <a href='/contact' style='text-decoration:none;color:red;'>contact</a> page.</span>"

        },
        "events": {
            keywords: ["events", "event", "news", "happening", "schedule", "activities", "activity", "bookings"],
            response: "Here, you'll find a variety of events including Artistix, Football matches, Robo-War, Techfiesta, Maze Runner, and Davewrap. Each event is held at Grand Central Terminal in Adisaptagram, Hooghly. You can find event details such as time, date, and location on this page. To book your spot, please click on the 'Book it' button below each event. For more information and bookings, visit our <a href='/event' style='text-decoration:none;color:red;'>Event page</a>."
        },
        "support": {
            keywords: ["support", "help", "technical", "reset", "password"],
            response: "For technical support, contact our IT helpdesk. To reset your password, use the 'Forgot Password' feature on the login page."
        },
        "faculty": {
            keywords: ["professors", "professor", "teachers", "teacher", "instructors", "instructor", "sirs", "sir", "mam", "faculty", "faculties"],
            response: "The Academy of Technology has a distinguished faculty led by Prof. (Dr.) Dilip Bhattacharya. The team consists of 111 qualified members specializing in various cutting-edge technologies. For more information about our faculty members and their qualifications, please visit the <a href='/faculty' style='text-decoration:none;color:red;'>faculty</a> page."
        },
        "greetings": {
            keywords: ["hi", "hello", "hey"],
            response: "Hello! How can I help you today? &#128522;"
        },
        "curriculum": {
            keywords: ["curriculum", "syllabus"],
            response: "For all the course curriculum at the Academy of Technology is structured over four years, covering a wide range of subjects including English, Mathematics, Computer Fundamentals, Semiconductor Devices, Managerial Economics, C programming, Data Structures, Operating Systems, Database Systems, Artificial Intelligence, Java Programming, Mobile Computing, and more. For a detailed curriculum, please refer to the <a href='/curriculam' style='text-decoration:none;color:red;'>curriculum</a>."
        },

        "department": {
            keywords: ["department", "departments", "stream", "streams", "cse", "ece", "eee", "csbs", "mechanical"],
            response: "We offer veriety of courses. head to the <a href='/department' style='text-decoration:none;color:red;'>Department </a> page for more information."
        },
        "career_page": {
            keywords: ["career"],
            response: "We offer dynamic opportunities for retired professors, senior professionals, and aspiring educators to join our vibrant and collaborative environment. With flexible working hours, career development opportunities, and competitive pay packages, AOT provides a conducive atmosphere for professional growth. We support research and publication with incentives and dedicated research labs. Check out our recruitment advertisements and application format for more details. Interested candidates can email their CV to career@aot.edu.in. Visit our <a href='/assets/pdf/AOT-Application-Format-2021.pdf' download style='text-decoration:none;color:red;'>Application Format</a> to apply now! also visit <a href='/career' style='text-decoration:none;color:red;'>career page</a> for more information"
        },
        "location": {
            keywords: ["location", "locations", "address", "map", "maps"],
            response: "G.T.Road (Adisaptagram), Aedconagar Hooghly, West Bengal Hooghly - 712121 West Bengal, India <a href='/index#location' style='text-decoration:none;color:red;'>map.</a>"
        }

    };

    function appendMessage(content, isUser = true) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        // messageDiv.textContent = content;
        if (!isUser) {
            content = "🤖 : " + content;
            messageDiv.innerHTML = "<img src='/assets/video/loadingnew.gif' style='width:50px;height:35px;object-fit:cover;'>";
            chatbox.appendChild(messageDiv);
            let i = 0;
            let speed = 15;
            setTimeout(() => {

                messageDiv.innerHTML = "";
                typeWriter();

            }, 1500);

            // function typeWriter() {
            //     if (i < content.length) {
            //         messageDiv.innerHTML += content.charAt(i);
            //         i++;
            //         setTimeout(typeWriter, speed);
            //         chatbox.scrollTop = chatbox.scrollHeight;
            //     }


            // }

            function typeWriter() {
                const parser = new DOMParser();
                const doc = parser.parseFromString(content, 'text/html');
                const nodes = Array.from(doc.body.childNodes);
                let nodeIndex = 0;
                let charIndex = 0;

                function typeNode() {
                    if (nodeIndex < nodes.length) {
                        const currentNode = nodes[nodeIndex];
                        if (currentNode.nodeType === Node.TEXT_NODE) {
                            if (charIndex < currentNode.textContent.length) {
                                messageDiv.innerHTML += currentNode.textContent.charAt(charIndex);
                                charIndex++;
                                setTimeout(typeNode, speed);
                            } else {
                                charIndex = 0;
                                nodeIndex++;
                                setTimeout(typeNode, speed);
                            }
                        } else {
                            messageDiv.appendChild(currentNode.cloneNode(true));
                            nodeIndex++;
                            setTimeout(typeNode, speed);
                        }
                        chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom after adding a character
                    }
                }

                typeNode();
            }
        }
        else {
            messageDiv.innerHTML = content;
            chatbox.appendChild(messageDiv);
            chatbox.scrollTop = chatbox.scrollHeight;
        }
        // chatbox.scrollTop = chatbox.scrollHeight;

    }

    // Flag to track if the welcome message has been shown
    let isWelcomeMessageShown = false;

    function showWelcomeMessage() {
        const welcomeMessage = "Welcome! How can I help you today? &#128522;";
        appendMessage(welcomeMessage, false);
    }

    inputField.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevents the default action of the Enter key (like form submission)
            processInput();
        }
    });

    sendButton.addEventListener('click', function () {
        processInput();
    });

    //separate function
    function processInput() {
        const originalInput = inputField.value;
        const userInput = inputField.value.trim().toLowerCase();
        if (userInput === '') return;

        appendMessage(originalInput);
        inputField.value = '';
        console.log("user input:", userInput);
        let match = false;
        let response = "Sorry, I didn't understand that. Can you ask differently?🤔";
        // let response = responses.unknown.response;
        for (const category in responses) {
            const entry = responses[category];
            if (!entry || !Array.isArray(entry.keywords)) {
                console.error('invalid entry or missing keywords for catagory:${category}');
                continue;
            }
            const { keywords, response: categoryResponse } = responses[category];
            for (const keyword of keywords) {
                if (userInput.includes(keyword)) {
                    response = categoryResponse;
                    match = true;
                    // console.log("matched keyword:", keyword);
                    break;
                }
            }
            if (match) {
                break;
            }
        }
        // console.log("response to be displayed:", response);
        appendMessage(response, false);
    }

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
let bot = document.querySelector('#chatbot-icon');
function visibility() {
    if (Math.floor(window.scrollY) >= 190) {
        bot.style.bottom = '80px';
    }
    else {
        bot.style.bottom = '4%';
    }
}
window.addEventListener('scroll', visibility)

