document.addEventListener('DOMContentLoaded', () => {
  const btnText = document.querySelector('.getText');
  const btnUsers = document.querySelector('.getUsers');
  let textLoaded = false;
  let usersLoaded = false;

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

  btnText.addEventListener('click', getText);
  btnUsers.addEventListener('click', getUsers);

});
