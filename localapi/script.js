var button = document.getElementById("send-button");

const googleapi = "http://localhost:3000/local";
const enterclick = document.getElementById("user-input");
const paragraph = document.querySelector(".typing");
const chatBox = document.getElementById("chat-board");
enterclick.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && !event.shiftKey) {
    // Enter tuşuna basıldığında ve shift tuşu basılı değilse
    event.preventDefault(); // Varsayılan Enter olayını iptal et
    sendMessage();
  }
});

button.addEventListener("click", sendMessage);

function sendMessage() {
  const userInput = document.getElementById("user-input");

  const data = {
    message: userInput.value,
  };

  chatBox.innerHTML += `   <div class="chat__conversation-board__message-container reversed">
  <div class="chat__conversation-board__message__person">
    <div class="chat__conversation-board__message__person__avatar">
      <img src="../anonim.png"  />
    </div>
  </div>
  <div class="chat__conversation-board__message__context">
    <div class="chat__conversation-board__message__bubble">
      <span>${userInput.value}</span>
    </div>
  </div>
</div> 
   `;
  typing();
  fetch(googleapi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const lastDiv = document.getElementById("typing1");
      lastDiv.remove();
      console.log(data);

      chatBox.innerHTML += `<div class="chat__conversation-board__message-container" >
      <div class="chat__conversation-board__message__person">
        <div class="chat__conversation-board__message__person__avatar">
          <img src="../1.png" alt="VetGPT" />
        </div>
      </div>
      <div class="chat__conversation-board__message__context">
        <div class="chat__conversation-board__message__bubble">
          <span>${data.response}</span
          >
        </div>
      </div>
    </div>
       `;
    })
    .catch((error) => {
      console.log(
        "There was a problem with the fetch operation:",
        error.message
      );
    });
  userInput.value = "";
}
function typing() {
  chatBox.innerHTML += ` 
<div class="chat__conversation-board__message-container" id="typing1">
<div class="chat__conversation-board__message__person">
  <div class="chat__conversation-board__message__person__avatar">
    <img src="../1.png" alt="VetGPT" />
  </div>
</div>
<div class="chat__conversation-board__message__context">
  <div class="chat__conversation-board__message__bubble">
   <p  class="typing"></p>
  </div>
</div>
</div>
 `;
}

/* <div class="chat__conversation-board__message-container reversed">
<div class="chat__conversation-board__message__person">
  <div class="chat__conversation-board__message__person__avatar">
    <img src="../anonim.png" alt="Dennis Mikle" />
  </div>
</div>
<div class="chat__conversation-board__message__context">
  <div class="chat__conversation-board__message__bubble">
    <span>${data.answer}</span>
  </div>
</div>
</div> */
