import axios from 'axios'

let send_notification = {}

send_notification.send = function (title,body,data,user_id) {
  var fcms = null

  axios
    .get("/fcm/"+user_id)
    .then(res => {
      fcms = res.data
    })
    .catch(err => {
      console.log(err)
    }).finally(() => {

      if(fcms != null ){
        fcms.forEach((fcm) =>{
        
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "https://fcm.googleapis.com/fcm/send", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.setRequestHeader("Authorization", 'key=AAAAicmHvzM:APA91bGW7KHx380nwk5TQVbgyU84uId-gu-fMYmBAc6KZCJU44Qu1ACNPAr9UElRUFhpv3mhNavVj4fqGaZpv2TP66-MWwVSe_jouFHZJ4ClkwE4loTrKpD9yAQ1tnfYUpWxfwy6_4Mv');
            let res = {
              'notification': {
                'title': title,
                'body': body 
              },
              data : data,
              'to': fcm.token,
              "priority": "high"
            }

            xhttp.onreadystatechange = function () {
              if (this.readyState == 4 && this.status == 200) {
                console.log(xhttp.responseText)
              }
            };
            xhttp.send(JSON.stringify(res))
        }) 
      }
    });
}

export default send_notification

//