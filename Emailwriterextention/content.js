console.log("Content script loaded");
function findComposeToolbar() {
    const toolbarSelectors = [
         '.btC','.aDh', // Gmail's new compose toolbar
                        // Gmail's older compose toolbar
        '[role="toolbar"], .gU.Up' // Toolbar inside dialog
         // Older toolbar inside dialog
    ];
    for (const selector of toolbarSelectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) {
            return toolbar;
        }
        return null;
    }
}
function createAIbutton() {
    const button = document.createElement('div');
    button.className='T-I J-J5-Ji aoO v7 T-I-atl L3';
    button.style.marginRight = "8px";
    button.innerHTML= "AI Reply";
    button.setAttribute('role','button');
    button.setAttribute('data-tooltip','Generate AI Reply');
    return button;
}
function getEmailContent() {
    const selectors = [
        '.h7',
        '.a3s.aiL',
         '.gmail_quote',
         '[role="presentation"]'
    ];
    for (const selector of selectors) {
        const element = document.querySelector(selector);
        if (element) {
            return element.innerText.trim();
        }
    }
    return null;
}
function injectButton() {
    const existingButton = document.querySelector(".ai-reply-button");
    if (existingButton) {
        existingButton.remove();
    }
    const toolbar= findComposeToolbar();
    if (!toolbar) {
        console.warn("Compose toolbar not found");
        return;
    }
        const button = createAIbutton();
        button.classList.add("ai-reply-button");

        button.addEventListener('click', async() => {
            try{
              button.innerText = "Generating...";
              button.disabled = true;
              const emailcontent = getEmailContent();

              const response = await fetch("http://localhost:8080/api/email/generate", {
                method: "POST",
                headers: {  "Content-Type": "application/json" },
                body: JSON.stringify({ emailContent: emailcontent,
                    tone:"Professional"
                 })
              });

              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              const generatedReply = await response.text();
              const composeBox = document.querySelector(
                '[role="textbox"][g_editable="true"]');
                if (composeBox) {
                    composeBox.focus();
                    document.execCommand("insertText", false, generatedReply);
                }
            }catch(error){

            }
            finally{
                button.innerText = "AI Reply";
                button.disabled = false;
            }
        });
        toolbar.insertBefore(button, toolbar.firstChild);
    
}
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {

        const hasComposeElements = Array.from(mutation.addedNodes).some(node => {

            if (node.nodeType !== Node.ELEMENT_NODE) {
                return false;
            }

            return (
                node.matches('.aDh, .btC, [role="dialog"]') ||
                node.querySelector('.aDh, .btC, [role="dialog"]')
            );
        });

        if (hasComposeElements) {
            console.log("Compose window detected");
            setTimeout(injectButton, 1000);
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});