const getChatGptResponse = async (message) => {
    const jsonKey = await (await fetch('./key.json')).json();
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jsonKey.key,
        },
        body: JSON.stringify({ model: "gpt-3.5-turbo", messages: [{ role: "system", content: "You are a helpful assistant." }, { "role": "user", "content": message }] }),
    });
    const data = await response.json();
    return data;
}

const onSendMessage = async (event) => {
    event.preventDefault();
    const message = document.getElementById('message').value;
    document.getElementById('message').value = '';
    document.getElementsByClassName('chat')[0].innerHTML += `<div class="mychat">
        <img src="https://images.unsplash.com/photo-1639768641148-932f033710dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fDJkJTIwYXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60" alt="myavatar" class="avatar" />
        <p>${message}</p>
      </div>`
    ;

    const response = await getChatGptResponse(message);
    const gptResponse = response.choices[0].message.content;

    document.getElementsByClassName('chat')[0].innerHTML += `<div class="gptchat">
        <img src="https://images.unsplash.com/photo-1679083216051-aa510a1a2c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hhdGdwdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60" alt="gptavatar" class="avatar" />
        <p>${gptResponse}</p>
        </div>`
    ;
}