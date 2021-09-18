document.addEventListener('DOMContentLoaded', () => {
  const btnText = document.querySelector('.getText');
  const btnUsers = document.querySelector('.getUsers');
  const btnPosts = document.querySelector('.getPosts');
 

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
        let output = `<h2>Posts</h2>`;
        posts.forEach(post => {
          output += `
          <div>
            <h4>${post.title}</h4>
            <p>${post.body}</p>
          </div>        
          `
        });
        document.querySelector('.posts_cnt').innerHTML = output
      })
      .catch(err => alert(err));
  }

  btnText.addEventListener('click', getText);
  btnUsers.addEventListener('click', getUsers);
  btnPosts.addEventListener('click', getPosts);

});
