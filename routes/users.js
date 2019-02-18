let express =  require('express')
let app = express()
//SOW LIST OF users
app.get('/', function(req, res, next){
  req.getConnection(function(err, conn){
    conn.query('SELECT * FROM users_node ORDER BY id DESC ', function(err, rows, fields){
      if(err){
        req.flash('error ', err)
        res.render('user/list', {
          title: 'User List ',
          data: ''
        })
      } else {
        //render to views/user/list.ejs template file
        res.render('user/list', {
          title: 'user List',
          data: rows
        })

      }
    })
  })
})

//show add user form
app.get('/add', function(req, res, next){
  //render to views/user/add.ejs
  res.render('user/add', {
    title: 'Add New User',
    name: '',
    age: '',
    email: ''
  })
})
//add new post action
app.post('/add', function(req, res, next){
  req.assert('name', "Name is required").notempty()
  req.assert('age', 'age is required').notempty()
  req.assert('email', 'A valid email is required').isemail()

  let errors = req.validationerrors()

  if(!errors){
    let user = {
      name: req.sanitize('name').escape().trim(),
      age: req.sanitize('age').escape().trim(),
      email:req.sanitize('email').escape().trim()
    }

    req.getConnection(function(error, conn){
      conn.query('INSERT INTO users_node SET ?', user, function(err, result){
        if(err){
          req.flash('error', err)

          //render to views/user/add.ejs
          res.render('user/add', {
            title: 'Add New User',
            name: '',
            age: '',
            email: ''
          })
        }
      })
    })
  }else{
    //display errors to users
    let error_msg = ''
    errors.forEach(function(error){
      error_msg += error.msg + '<br>'
    })
    req.flash('error', error_msg)

    //using req.body.name because req.param('name') is deprecated
    res.render('user/add', {
      title: 'Add New User',
      name: req.body.name,
      age: req.body.age,
      email:req.body.email
    })

  }
})
//show edit
app.get('/edit/(;id)', function(req, res, next){
  req.getConnection(function(error, conn){
    conn.query('SELECT * FROM users_node WHERE id =  ?', [res.params.id], function(err, rows, fields){
      if(err) throw error

      //if user not found
      if(rows.length <= 0){
        req.flas('error', 'user not found with id = ' + req.param.id)
        req.redirect('/users')

      }else{
        //render to views/user/edit.ejs template file
        res.render('user/edit', {
          title: 'Edit User',
          id: rows[0].id,
          name: rows[0].name,
          age: rows[0].age,
          email:rows[0].email
        })
      }
    })
  })
})
//EDIT USER POST ACTION
app.put('edit/(:id)', function(req, res, next){
  req.assert('name', 'Name is required').notEmpty()
  req.assert('age', 'Age is required').notempty()
  req.assert('email', 'A valid email is required').isEmail()


  let errors = req.validationErrors()

  if(!error){

    /********************************************
		 * Express-validator module

		req.body.comment = 'a <span>comment</span>';
		req.body.username = '   a user    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('username').trim(); // returns 'a user'
		********************************************/

    let user = {
      name: req.sanitize('name').escape().trim(),
      age:req.sanitize('age').escape().trim(),
      email:req.sanitize('email').escape().trim()
    }

    req.getConnection(function(error, conn){
      conn.query('UPDATE users_node SET ?  WHERE id = ' + req.params.id, user, function(err, result){
        if(err){
          req.flash('error', err)

          //render to view/user/add.ejs
          res.render('user/edit', {
            title: 'Edit User',
            id: req.params.id,
            name: req.body.name,
            age: req.body.age,
            email:req.body.email
          })
        }else {
          req.flash('success', 'Data updated successfully!')

          //render to views/user/ad.ejs
          res.render('user/edit', {
            title: 'Edit User',
            id: req.params.id,
            name: req.body.name,
            age: req.body.age,
            email:req.body.email
          })
        }
      })
    })
  }else{
    //display errors to users
    let error_msg = ''
    errors.forEach(function(error){
      error_msg += error.msg + '<br>'
    })
    req.flash('error', error_msg)

    //using req.body.name because req.param('name') is deprecated
    res.render('user/edit', {
      title: 'Edit User',
      name: req.body.name,
      age: req.body.age,
      email:req.body.email
    })

  }
})
//DELETE USER
app.delete('/delete/(:id)', function(req, res, next){
  let user =  { id: req.params.id }
  req.getConnection(function(error, conn){
    if(err){
      req.flas('error', err)

      //redirect to users list page
      res.redirect('/users')
    }else{
      req.flash('success', 'User deleted successfully1 id = '+ req.params.id)

      //redirect
      res.redirect('/users')
    }
  })
})


module.exports = app
