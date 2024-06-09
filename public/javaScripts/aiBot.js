(() => {
    const script = document.currentScript;
    let openChatModal = false;
    const url = "https://widget.cxgenie.ai";
    const apiUrl = "https://api.cxgenie.ai/api";

    const loadWidget = async () => {
        const agentId =
            script.attributes["data-aid"]?.nodeValue ||
            script.attributes["data-bot_id"]?.nodeValue;
        const lang = script.attributes["data-lang"]?.nodeValue;
        const userToken = script.attributes["data-token"]?.nodeValue;
        const isMobile = JSON.parse(
            script.attributes["data-mobile"]?.nodeValue ||
            script.attributes["data-is_mobile"]?.nodeValue ||
            "false"
        );

        if (!agentId) {
            return;
        }

        const icon = await fetch(`${apiUrl}/v1/bots/public/${agentId}`)
            .then((res) => res.json())
            .then((res) => res.data?.chat_widget_icon);


        const object = document.createElement("object");
        object.className = `cxgenie-chat-modal ${isMobile ? "mobile open" : ""}`;
        object.data = `${url}?agent-id=${agentId}&is-mobile=${isMobile}&user-token=${userToken}${lang ? `&lang=${lang}` : ""
            }`;
        object.ariaLabel = "Chat modal";

        const chatButton = document.createElement("div");
        chatButton.id = "cxgenie-chat-button";
        chatButton.className = "cxgenie-chat-button";
        const documentIcon = icon
            ? `
<img 
src="${icon}"
width="100%"
height="100%"
style="border-radius: 100%; object-fit: cover;"
/>`
            : `
<svg
width="20"
height="20"
viewBox="0 0 20 20"
fill="none"
xmlns="http://www.w3.org/2000/svg"
class="document-icon"
>
<path
d="M15 0H5C2.24 0 0 2.23 0 4.98V11.96C0 14.71 2.24 16.94 5 16.94H6.5C6.77 16.94 7.13 17.12 7.3 17.34L8.8 19.33C9.46 20.21 10.54 20.21 11.2 19.33L12.7 17.34C12.89 17.09 13.19 16.94 13.5 16.94H15C17.76 16.94 20 14.71 20 11.96V4.98C20 2.23 17.76 0 15 0ZM11 11.75H5C4.59 11.75 4.25 11.41 4.25 11C4.25 10.59 4.59 10.25 5 10.25H11C11.41 10.25 11.75 10.59 11.75 11C11.75 11.41 11.41 11.75 11 11.75ZM15 6.75H5C4.59 6.75 4.25 6.41 4.25 6C4.25 5.59 4.59 5.25 5 5.25H15C15.41 5.25 15.75 5.59 15.75 6C15.75 6.41 15.41 6.75 15 6.75Z"
fill="white"
/>
</svg>
`;
        const closeIcon = `
<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="close-icon">
<path d="M26.1871 27.9549L12.045 13.8128C11.5618 13.3296 11.5618 12.5282 12.045 12.045C12.5282 11.5618 13.3296 11.5618 13.8128 12.045L27.9549 26.1871C28.4381 26.6703 28.4381 27.4717 27.9549 27.9549C27.4717 28.4381 26.6703 28.4381 26.1871 27.9549Z" fill="white"/>
<path d="M12.045 27.9549C11.5618 27.4717 11.5618 26.6703 12.045 26.1871L26.1871 12.045C26.6703 11.5618 27.4717 11.5618 27.9549 12.045C28.4381 12.5282 28.4381 13.3296 27.9549 13.8128L13.8128 27.9549C13.3296 28.4381 12.5282 28.4381 12.045 27.9549Z" fill="white"/>
</svg>        
`;
        chatButton.innerHTML = documentIcon;

        const handleOpenChatModal = () => {
            setTimeout(() => {
                object.classList.add("open");
                openChatModal = true;
                document.querySelector('body').style.overflowY = 'hidden';
                chatButton.innerHTML = closeIcon;
            }, 0);
        };

        const handleCloseChatModal = () => {
            object.classList.remove("open");
            openChatModal = false;
            document.querySelector('body').style.overflowY = 'auto';
            chatButton.innerHTML = documentIcon;
        };

        chatButton.onclick = () => {
            if (!openChatModal) {
                handleOpenChatModal();
            } else {
                handleCloseChatModal();
            }
        };

        const onClickOutside = (element, callback) => {
            document.addEventListener("click", (e) => {
                if (!element.contains(e.target)) callback();
            });
        };

        document.addEventListener("keydown", (event) => {
            if (event.code === "Escape") {
                handleCloseChatModal();
            }
        });

        onClickOutside(object, () => {
            handleCloseChatModal();
        });

        fetch(`${apiUrl}/v1/sites`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ bot_id: agentId, domain: window.origin }),
        });

        fetch(`${apiUrl}/v1/bots/public/${agentId}`)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (res.data) {
                    const chatButtonStyle = chatButton.style;
                    chatButtonStyle.background = res.data.theme_color || "#364de7";
                    chatButton.classList.add("open");

                    if (!isMobile) {
                        document.body.append(chatButton);
                    }
                }
            });


        if (isMobile) {
            const container = document.createElement("div");
            container.style.width = "100vw";
            container.style.height = "100vh";
            container.style.overflow = "hidden";
            container.appendChild(object);
            document.body.appendChild(container);
            document.body.classList.add("mobile");
            console.log(container);
        } else {
            console.log(object);
            document.body.appendChild(object);
        }
    };

    if (document.readyState === "complete") {
        loadWidget();
    } else {
        document.addEventListener("readystatechange", () => {
            if (document.readyState === "complete") {
                loadWidget();
            }
        });
    }
})();