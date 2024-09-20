  document.querySelector("nav .burger .inside #burger").addEventListener("change", ev => {
    document.querySelector("nav .color-change").classList[["add", "remove"][Number(!document.querySelector("nav .burger .inside #burger").checked)]]("show");
  })

  const API_URL = 'http://localhost:5000/api';

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

async function addMessage() {
    const messageText = document.querySelector('.message-input').value.trim();
    const fileInput = document.getElementById('message-file');
    if (messageText === '' && fileInput.files.length === 0) return;

    let file = null;
    if (fileInput.files.length > 0) {
        file = await processFile(fileInput.files[0]);
    }

    try {
        const response = await fetch(`${API_URL}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: messageText, file: file }),
        });
        const newMessage = await response.json();
        displayMessage(newMessage);
        document.querySelector('.message-input').value = '';
        fileInput.value = '';
        document.getElementById('message-preview').innerHTML = '';
    } catch (error) {
        console.error('Error adding message:', error);
    }
}

async function addReply(parentId) {
    const replyInput = document.querySelector(`#message-${parentId} .reply-input`);
    const replyText = replyInput.value.trim();
    const fileInput = document.getElementById(`reply-file-${parentId}`);
    if (replyText === '' && fileInput.files.length === 0) return;

    let file = null;
    if (fileInput.files.length > 0) {
        file = await processFile(fileInput.files[0]);
    }

    try {
        const response = await fetch(`${API_URL}/messages/${parentId}/replies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: replyText, file: file }),
        });
        const updatedMessage = await response.json();
        const replyList = document.getElementById(`reply-list-${parentId}`);
        replyList.innerHTML = '';
        updatedMessage.replies.forEach(reply => displayReply(parentId, reply));
        replyInput.value = '';
        fileInput.value = '';
        document.getElementById(`reply-preview-${parentId}`).innerHTML = '';
    } catch (error) {
        console.error('Error adding reply:', error);
    }
}

async function deleteMessage(id) {
    try {
        await fetch(`${API_URL}/messages/${id}`, {
            method: 'DELETE',
        });
        document.getElementById(`message-${id}`).remove();
    } catch (error) {
        console.error('Error deleting message:', error);
    }
}

async function deleteReply(messageId, replyId) {
    try {
        await fetch(`${API_URL}/messages/${messageId}/replies/${replyId}`, {
            method: 'DELETE',
        });
        document.getElementById(`reply-${replyId}`).remove();
    } catch (error) {
        console.error('Error deleting reply:', error);
    }
}

// 其他函數保持不變...

window.onload = function() {
    loadMessages();
    document.getElementById('message-file').addEventListener('change', function(event) {
        handleFileSelect(event, 'message-preview');
    });
};