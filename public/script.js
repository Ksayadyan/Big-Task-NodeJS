console.log('Started')
$('#submit').on('click',()=>{
  let login = $('#login').val();
  let password = $('#password').val();
  let name = $('#name').val();
  let lastname = $('#lastname').val();
  let gender = $('#gender').val();
  let address = $('#address').val();
  let phone = $('#phone').val();
  let question = $('#question').val();
  let answer = $('#answer').val();
  let mail = $('#mail').val();
  let birthday = $('#birthday').val();
  if(login.length >= 6 || password.length >= 6){
      $.post('/api',{
        login,
        password,
        name,
        lastname,
        gender,
        address,
        phone,
        question,
        answer,
        birthday,
        mail,


      },(data,status)=>{
        console.log(data);
      })
  }else{
    console.log('Check length');
  }
})
$('#recoverpassword').on('click',()=>{
  $.post('/recoverpassword',{
    login: $('#rp').val(),
  },(data,status)=>{
    console.log(data);
  })
})
