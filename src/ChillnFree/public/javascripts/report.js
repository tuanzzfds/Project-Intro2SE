/**-> Report */
async function sendReport(event) {
    // const response = await fetch("/api/top-music", {
    //   method: "GET", // *GET, POST, PUT, DELETE, etc.
    // });
    event.preventDefault();
    var email = document.getElementById("emailInput").value;
    var message = document.getElementById("messageInput").value;
    // let formData = new FormData();
    // formData.append("email",email);
    // formData.append("message", message);
  
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    console.log(dateTime);
    const rawResponse = await fetch("/api/report", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        message: message,
        date: dateTime
      })
    }); 
    document.getElementById("sendMessageForContactUs").reset();
    const data = await rawResponse.json();
    if (data.success){
      alert("Send report successfully!");
  
    }else{
      alert("Send report failed")
    }
  
    
  }
  document
    .getElementById("sendMessageForContactUs")
    .addEventListener("submit", sendReport);
  