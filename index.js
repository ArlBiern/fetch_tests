document.addEventListener('DOMContentLoaded', () => {
  const btnText = document.querySelector('.getText');
  const btnUsers = document.querySelector('.getUsers');
  const btnPosts = document.querySelector('.getPosts');
  const btnAddPost = document.querySelector('.addPost');
 

  const getText = () => {
    fetch('sample.txt')
      .then(res => {
        if (res.ok) {
          btnText.removeEventListener('click', getText);
          return res.text();
        } else {
          return Promise.reject(`Something went wrong: ${res.status} - ${res.statusText}`)
        }
      })
      .then( text => {
        document.querySelector('.txt').innerText = text
      })
      .catch(err => alert(err));
  }

  const getUsers = () => {
    fetch('users.json')
      .then(res => {
        if (res.ok) {
          btnUsers.removeEventListener('click', getUsers);
          return res.json()
        } else {
          return Promise.reject(`Something went wrong: ${res.status} - ${res.statusText}`)
        }
      })
      .then( data => {
        let list = document.querySelector('.users');
        data.forEach(el => {
          list.innerHTML += `<li>Name: ${el.name}, email: ${el.email}</li>`
        });
      })
      .catch(err => alert(err));
  }

  const getPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then( res => {
        if(res.ok) {
          btnPosts.removeEventListener('click', getPosts);
          return res.json()
        } else {
          console.dir(res)
          return Promise.reject(`Something went wrong, you get ${res.status} error code`)
        }
      })
      .then(posts => {
        let output = ``;
        posts.forEach(post => {
          output += `
          <div>
            <h4>${post.title}</h4>
            <p>${post.body}</p>
          </div>        
          `
        });
        document.querySelector('.posts').innerHTML = output
      })
      .catch(err => alert(err));
  }

  const addPost = (e) => {
    e.preventDefault();

    let title = document.getElementById('title').value;
    let body = document.getElementById('body').value;

    if (body && title) {
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST', 
        headers: {
          'Accept': 'application/json text/plain', 
          'Content-type': 'application/json'
        }, 
        body: JSON.stringify({title: title, body: body})
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return Promise.reject(`Something went wrong, you get ${res.status} error code`)
        }
      })
      .then(data => {
        let div = document.createElement('div');
        div.innerHTML = `
          <h4>${data.title}</h4>
          <p>${data.body}</p>
        `
        document.querySelector('.posts').prepend(div);
      })
      .catch(err => alert(err));
    } else {
      alert('Both fields should not be empty');
    }   
  }

  btnText.addEventListener('click', getText);
  btnUsers.addEventListener('click', getUsers);
  btnPosts.addEventListener('click', getPosts);
  btnAddPost.addEventListener('submit', addPost);

});
