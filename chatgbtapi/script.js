document.addEventListener("DOMContentLoaded", function () {
  var button = document.getElementById("send-button");
  const chatapi = "http://localhost:3000/chatapi";

  const enterclick = document.getElementById("user-input");

  enterclick.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      // Enter tuşuna basıldığında ve shift tuşu basılı değilse
      event.preventDefault(); // Varsayılan Enter olayını iptal et
      // Buraya Enter tuşuna basıldığında yapılacak işlemleri ekleyin
      sendMessage();
    }
  });

  button.addEventListener("click", sendMessage);

  function sendMessage() {
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-board");

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

    function createMessageHTML(data) {
      return `
    <div class="chat__conversation-board__message-container">
    <div class="chat__conversation-board__message__person">
      <div class="chat__conversation-board__message__person__avatar">
        <img src="../1.png" alt="VetGPT" />
      </div>
    </div>
    <div class="chat__conversation-board__message__context">
      <div class="chat__conversation-board__message__bubble">
        <span
          >${data} </span
        >
      </div>
    </div>
  </div>
      `;
    }

    let receivedData = "";

    const fetchData = async () => {
      try {
        const response = await fetch(chatapi, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const reader = response.body.getReader();

        const newDiv = document.createElement("div");
        newDiv.style.marginBottom = "2em";
        document.getElementById("chat-board").appendChild(newDiv);
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          receivedData += new TextDecoder().decode(value);

          newDiv.innerHTML = createMessageHTML(receivedData);
        }
      } catch (error) {
        console.error("Hata:", error.message);
      }
    };
    fetchData();
    userInput.value = "";
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
  // fetch(chatapi, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // })
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     chatmessage.innerHTML += `   <div class="chat__conversation-board__message-container">
  //     <div class="chat__conversation-board__message__person">
  //       <div class="chat__conversation-board__message__person__avatar">
  //         <img src="../1.png" alt="VetGPT" />
  //       </div>
  //     </div>
  //     <div class="chat__conversation-board__message__context">
  //       <div class="chat__conversation-board__message__bubble">
  //         <span>${data}</span
  //         >
  //       </div>
  //     </div>
  //   </div>
  //      `;
  //   })
  //   .catch((error) => {
  //     console.log(
  //       "There was a problem with the fetch operation:",
  //       error.message
  //     );
  //   });
});
