  document.querySelector("nav .burger .inside #burger").addEventListener("change", ev => {
    document.querySelector("nav .color-change").classList[["add", "remove"][Number(!document.querySelector("nav .burger .inside #burger").checked)]]("show");
  })

// Update the API_URL to use a relative path
const API_URL = '/api';

// Rest of the code remains the same
document.querySelector("nav .burger .inside #burger").addEventListener("change", ev => {
    document.querySelector("nav .color-change").classList[["add", "remove"][Number(!document.querySelector("nav .burger .inside #burger").checked)]]("show");
})

async function loadMessages() {
    try {
        const response = await fetch(`${API_URL}/messages`);
        messages = await response.json();
        const messageList = document.getElementById('message-list');
        messageList.innerHTML = '';
        messages.forEach(message => {
            displayMessage(message);
        });
    } catch (error) {
        console.error('Error loading messages:', error);
    }
}

// ... (rest of the functions remain unchanged)

window.onload = function() {
    loadMessages();
    document.getElementById('message-file').addEventListener('change', function(event) {
        handleFileSelect(event, 'message-preview');
    });
};