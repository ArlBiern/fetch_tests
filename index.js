document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.getText');

  const getText = () => {
    fetch('sampe.txt')
      .then(res => {
        if (res.ok) {
          return res.text()
        } else {
          return Promise.reject(`Something went wrong: ${res.status} - ${res.statusText}`)
        }
      })
      .then( text => {
        document.querySelector('.txt_cnt').innerText = text
      })
      .catch(err => alert(err));
  }

  btn.addEventListener('click', getText);

});
