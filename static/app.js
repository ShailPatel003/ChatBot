let sendButton = document.querySelector(".send__button");
//let data = [
//    {
//        //fee
//        "0": "college fee",
//        "1": "exam fee",
//        "2": "fees in wrong category",
//        "3": "paid less fees",
//        "4": "entered incorrect info",
//        "5": "fee online process"
//    },
//    {
//        //marksheet
//        "0":"Name correction",
//    }
//]
let html = "";
let data = {
    "fee": [
        //fee
        "fee",
        "To pay college fees, log in to <a href='" + "https://www.vgecg.ac.in/student_section.php" + "' target='"+"_blank"+"' style='"+"color:#36AE7C;"+"'>"+ "student section" + "</a> and proceed to pay fees.",
        "Exam fee payment can be done via the GTU portal, For more details, <a href='" + "http://gtu.ac.in/ImpCircular/SBIPayment%20Instructions.pdf" + "' target='"+"_blank"+"' style='"+"color:#36AE7C;"+"'>"+ "Click here" + "</a> for reference.",
        "If you have paid less fees to GTU (Gujarat Technological University), it's important to <a href='" + "https://www.gtu.ac.in/" + "' target='"+"_blank"+"' style='"+"color:#36AE7C;"+"'>"+ "contact" + "</a> the university's administration or finance department as soon as possible to rectify the situation.",
        "If you have entered incorrect information while paying fees to GTU, <a href='" + "https://www.gtu.ac.in/page.aspx?p=ContactUsC" + "' target='"+"_blank"+"' style='"+"color:#36AE7C;"+"'>"+ "contact GTU" + "</a> administration or finance department",
        "You can refer the online fee payment process <a href='" + "http://gtu.ac.in/ImpCircular/SBIPayment%20Instructions.pdf" + "' target='"+"_blank"+"' style='"+"color:#36AE7C;"+"'>"+ "here" + "</a>",
        "If you have paid fees in the wrong category at GTU (Gujarat Technological University), it's important to <a href='" + "https://www.gtu.ac.in/" + "' target='"+"_blank"+"' style='"+"color:#36AE7C;"+"'>"+ "contact" + "</a> the university's administration or finance department as soon as possible to rectify the situation"
    ],
    "marksheet": [
        "marksheet",
        "You can visit the GTU website to download the duplicate marksheet application form. Fill the form and submit it along with necessary documents.",
        "You can visit the GTU website to download the duplicate marksheet application form. Fill the form and submit it along with necessary documents. For more details, <a href='" + "https://www.gtu.ac.in/Default.aspx" + "' target='"+"_blank"+"' style='"+"color:#36AE7C;"+"'>"+ "Click here" + "</a>"
    ],
    "scholarship": [
        "scholarship",
        "GTU Merit Scholarship, GTU Research Fellowship, VGEC Scholarship, National Scholarships, State Government Scholarships, corporate scholarships are some of the scholarships provided by GTU and VGEC.",
        "You can contact the concerning faculty in case of any query or difficulty. For more details, <a href='" + "https://www.vgecg.ac.in/student_section.php" + "' target='"+"_blank"+"' style='"+"color:#36AE7C;"+"'>"+ "Click here" + "</a> "
    ],
    "library":[
        "library",
        "All registered students and faculty members can issue/return books from Monday to Friday and working Saturday: 11.00 AM to 2:00PM and 3.00 PM to 5.00 PM.",
        "Book borrowing rights are given to all registered students (UG/PG) and faculty members. For more details, <a href='" + "https://www.vgecg.ac.in/library.php" + "' target='"+"_blank"+"' style='"+"color:#36AE7C;"+"'>"+ "Click here" + "</a>",
        "Library timings are 11:00AM to 2:00PM and 3:00PM to 5:00PM for all weekdays and working saturdays."
    ],
    "hostel":[
        "hostel",
        "boys hostel with capacity of 540 students administered by the rector and four wardens. There are messes in the both hostel campus. <a href='" + "https://www.vgecg.ac.in/hostel.php" + "' target='"+"_blank"+"' style='"+"color:#36AE7C;"+"'>"+ "Click here" + "</a> for more details.",
        "The institute has a girls hostel with capacity of 180 students administered by the rector and four wardens. There are messes in the both hostel campus. <a href='" + "https://www.vgecg.ac.in/hostel.php" + "' target='"+"_blank"+"' style='"+"color:#36AE7C;"+"'>"+ "Click here" + "</a> for more details.",
        "Apply for hostel",
        "Yes, there is mess facility in both the hostel. One time charge is ___ rs. For more details you can visit the hostel reception"
    ]
}

class Chatbox
{

  constructor()
  {
    this.args =
    {
      openButton: document.querySelector(".chatbox__button"),
      chatBox: document.querySelector(".chatbox__support"),
      sendButton: document.querySelector(".send__button"),
    };
    this.state = false;
    this.messages = [];
  }



  display()
  {
    const { openButton, chatBox, sendButton } = this.args;
    openButton.addEventListener("click", () => this.toggleState(chatBox));
    sendButton.addEventListener("click", () => this.onSendButton(chatBox));

    const node = chatBox.querySelector("input"); //ithr input liye
    node.addEventListener("keyup", ({ key }) => { //keyboard se enter krne ke liye
      if (key === "Enter") {
        this.onSendButton(chatBox);
      }
    });
  }
  toggleState(chatbox) {
    this.state = !this.state;
    if (this.state)
    {
      chatbox.classList.add("chatbox--active");
      //updateChatText(chatbox);

      if(html === ""){
        html += '<div class="click_btn_boxes">';
        html += '<div class="messages__item messages__item--visitor">' +
                "hey!! I'm IRA" +
            "</div>";
        html += '</div>';
        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
        console.log(html);
      }
    }
    else
    {
      chatbox.classList.remove("chatbox--active");
    }
  }
  onSendButton(chatbox)
  {
    let textField = chatbox.querySelector("input");
    let text1 = textField.value; //input ki value li
    if (text1 === "") //agar kuch ni dala toh
    {
      return;
    }
    let msg1 = { name: "User", message: text1 }; //jab user message type krke send krega
    this.messages.push(msg1); //tab woh text messages m push kr denge
    textField.value = "";
    sendButton.style.display = "none";


    fetch($SCRIPT_ROOT + "/predict", { //ye wala JSON ka part h, jisme hum database comb krte
      method: "POST",
      body: JSON.stringify({ message: text1 }),
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((r) => {
        let msg2 = { name: "SDF", message: r.answer }; //response ke liye
        this.messages.push(msg2); //ye response ko add kiye messages mein
        this.updateChatText(chatbox);
        textField.value = ""; //wapis textfield wala space clear kr denge


      })
      .catch((error) => { //error ke liye
        console.error("Error: ", error);
        this.updateChatText(chatbox);
        textField.value = "";
      });
  }



  updateChatText(chatbox)
  {

      let html="";
//    if(html === ""){
//        html += '<div class="click_btn_boxes">';
//        html += '<div class="messages__item messages__item--visitor">' +
//                "hey!! I'm IRA" +
//            "</div>";
//        html += '</div>';
//        const chatmessage = chatbox.querySelector('.chatbox__messages');
//        chatmessage.innerHTML = html;
//    }
//    console.log(html);
    this.messages.slice().reverse().forEach(function (item)
      {
        if (item.name === "SDF")
        {

          if(Array.isArray(item.message)) {
              let allOptions = item.message;

            html += '<div class="click_btn_boxes">';
            html += '<div class="messages__item messages__item--visitor">' +
                'Choose appropriate option' +
            "</div>";
            for(let i=1;i<allOptions.length;i++) {
                html += '<button class="click_btn" onclick=chatbox.clickBtnHandleMessage(chatbox,"' +  allOptions[0]  + '",' + i + ') ><span class="click_btn_text">' + allOptions[i] + '</span></button>'
            }
            html += '</div>';

          }
          else {
              html +=
                '<div class="messages__item messages__item--visitor">' +
                item.message +
                "</div>";
          }

        }

        else
        {
          html +=
            '<div class="messages__item messages__item--operator">' +
            item.message +
            "</div>";
        }

      });


        //text response
        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;

  }

  clickBtnHandleMessage(chatbox,key,index) {
       let msg = data[key][index];
       let msg2 = { name: "SDF", message: msg }; //response ke liye
       this.messages.push(msg2); //ye response ko add kiye messages mein
       this.updateChatText(chatbox.args.chatBox);
  }


  refundFeesResponse(chatbox)
  {
        //button
        var button = document.createElement("button");
        button.innerHTML = "Do Something";var body = chatbox.querySelector(".chatbox__messages");body.appendChild(button);button.addEventListener ("click", function() {alert("did something");});

  }
}


const chatbox = new Chatbox();
chatbox.display();

sendButton.style.display = "none";

function handleInputChangeField() {
    let inputValue = document.querySelector("input");
    if(inputValue.value.length === 0) {
        sendButton.style.display = "none";
    }
    else {
        sendButton.style.display = "flex";
    }
}