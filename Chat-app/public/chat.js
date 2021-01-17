$(function () {
  var socket = io.connect("http://localhost:3000");

  var message = $("#message");
  var username = $("#username");
  var send_message = $("#send_message");
  var send_username = $("#send_username");
  var chatroom = document.querySelector("#chatroom");
  var feedback = $("#feedback");

  let myId;

  send_message.click(sendMessage);
  document.addEventListener('keypress',(e) =>{
    if (e.key !== 'Enter') return;
    if (e.target.id === "message") sendMessage();
    if (e.target.id === "username") changeUsername();
    // console.log(chatroom.scrollTop);
  })

  function sendMessage() {
    if (message.val() === "") return;
    socket.emit("new_message", {
      message: message.val(),
      className: alertClass,
    });
    message.val("");
  }
  
  var min = 1;
  var max = 6;
  var random = Math.floor(Math.random() * (max - min)) + min;

  // Устаналиваем класс в переменную в зависимости от случайного числа
  // Эти классы взяты из Bootstrap стилей
  var alertClass;
  switch (random) {
    case 1:
      alertClass = "secondary";
      break;
    case 2:
      alertClass = "danger";
      break;
    case 3:
      alertClass = "success";
      break;
    case 4:
      alertClass = "warning";
      break;
    case 5:
      alertClass = "info";
      break;
    case 6:
      alertClass = "light";
      break;
  }

  socket.on("add_mess", (data) => {
    let classLeft = '';
    let name = data.username
    if (data.userId === myId) {
      classLeft = "left";
      name = "Я";
    }
    feedback.html("");
    feedback.before(`<div class='alert ${classLeft} alert-${data.className}'<b>${name}</b>: ${data.message}</div>`);
    chatroom.scrollTop += 200;
  });

  send_username.click(changeUsername());
  
  function changeUsername(){
    socket.emit("change_username", { username: username.val() });
    username.blur();
  };

  message.bind("keypress", () => {
    socket.emit("typing");
  });

  socket.on("typing", (data) => {
    feedback.html(
      "<p><i>" + data.username + " печатает сообщение..." + "</i></p>"
    );
    chatroom.scrollTop += 200;
  });

  socket.on("notTyping", (data) => {
    feedback.html("");
  });

  message.blur(()=>{
    socket.emit("notTyping");
  });

  socket.on("greeting_message", (data) => {
    if(!myId) myId = data.userId;
    feedback.before(
      `<div class='alert'> <b>${data.greeting}</b></div>`
    );
    chatroom.scrollTop += 200;
  });
});
