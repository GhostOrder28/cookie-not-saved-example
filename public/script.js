const responsePlaceHolder = document.getElementsByClassName('response')[0];
async function sendCredentials () {
  console.log('it works!');
  try {
    const res = await fetch('https://localhost:3001/signin', {
      method: 'post',
      body: JSON.stringify({ username: 'myuser', password: '123' }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(r => r.json()).catch(e => e.json());
    responsePlaceHolder.innerHTML = res
  } catch (err) {
    throw new Error(`there was an error, ${err}`)
  }
};
