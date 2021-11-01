

/** Slide */
let items = document.querySelectorAll('.carousel .carousel-item')
items.forEach((el) => {
    const minPerSlide = 4
    let next = el.nextElementSibling
    for (var i=1; i<minPerSlide; i++) {
        if (!next) {
            // wrap carousel by using first child
        	next = items[0]
      	}
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
})


/**-> Contact */
function getMailForContactUs(){
    var emailInput = document.getElementById("emailInput").value;
    var message = document.getElementById("messageInput").value;
    alert(emailInput + "\n" + message);
}
document.getElementById("sendMessageForContactUs").addEventListener("submit",getMailForContactUs);
