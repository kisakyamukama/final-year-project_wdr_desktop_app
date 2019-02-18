//login js
 //declarations

//require('../config/db.js');



 const ipc = require('electron').ipcRenderer;
 let $ =  require('jquery')


login_btn.addEventListener('click', function(){
  let user_name = document.getElementById('username').value;
  let pass_word = document.getElementById('password').value;

  // $sql = 'SELECT * FROM `users` LIMIT 10';
  // connection.query($sql, function(err, rows, fields){
  //   if(err){
  //     console.log("an error ocurred" + err)
  //     alert(err)
  //     return
  //   }
  //   console.log('selected')
  //   alert("selected")
  //
  // })

 $query = "SELECT * FROM users WHERE username="+ user_name+ " AND password = "+ pass_word + "LIMIT 0, 1"


  if( user_name == 'michael' && pass_word == 'grace')
      ipc.sendSync('valid_user', 'ping');
  else
    $('#login_error').text(' username or password is incorrect');
})

//
// $('#login_btn').on('click', () => {
//
//     let user_name = $('#username').val();
//     let pass_word = $('#password').val();
//
//     if( user_name == 'michael' && pass_word == 'grace')
//         ipc.sendSync('valid_user', 'ping');
//     else
//       $('#login_error').text(' username or password is incorrect');
//
// })
