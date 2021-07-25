gsap.set(".svg1", {transformOrigin: "50% 50%"});

gsap.to(".svg1", {duration: 60, rotation:360 });

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyDDiScoN2tmMoHsT-N1HX8serH2W5cFQ6k",
    authDomain: "contact-form-4d70b.firebaseapp.com",
    databaseURL: "https://contact-form-4d70b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "contact-form-4d70b",
    storageBucket: "contact-form-4d70b.appspot.com",
    messagingSenderId: "136649794727",
    appId: "1:136649794727:web:fd282571b1166eb4cce782",
    measurementId: "G-JQML3BE9QD"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);


//firebase.initializeApp(firebaseConfig);
console.log(firebase)

// referance

let contactInfo = firebase.database().ref("user");


document.getElementById("contactform1").addEventListener("submit", submitForm);

function submitForm(e){
    e.preventDefault();
    // Get Values
    var name = getInputVal('name1');
    var mail = getInputVal('Mail1');
    var msg = getInputVal('Message1');
    

    saveContactInfo(name, mail, msg);
    


    document.querySelector(".alert").style.display='block';

    setTimeout(function(){
    document.querySelector(".alert").style.display='none';

    },3000);

    document.getElementById('contactform1').reset();

    sendEmail(name, mail, msg);

    
}

// function to get form values

function getInputVal(id){
    return document.getElementById(id).value;
}

// save infos to firbase

function saveContactInfo(name, mail, msg){
    let newContactInfo = contactInfo.push();
    newContactInfo.set({
        name: name,
        email: mail,
        message: msg,
    });

    retriveInfos();

}


//retrive data
function retriveInfos(){
    let ref = firebase.database().ref("user");
    ref.on("value", gotData);   
}

function gotData(data){
    let info = data.val();
    let keys = Object.keys(info);

    for(let i= 0; i < keys.length; i++){
        let infoData = keys[i];
        let name = info[infoData].name;
        let email = info[infoData].email;
        let message = info[infoData].message;
        console.log(name,email,message);

    
    }
}


retriveInfos();

function sendEmail(name, email, message){
  Email.send({
      Host: "smtp.gmail.com",
      Username: 'amanvishen46@gmail.com',
      Password: "wlokhjypuqavqjhb",
      To: 'melixsystemssolutions@gmail.com',
      From:'amanvishen46@gmail.com',
      Subject: `${name} sent you a message`,
      Body: `Name: ${name}<br/> Email: ${email} <br/> Message: ${message}`,
  }).then((message)=>alert("mail sent successfully"))
}
