const responsePlaceHolder = document.getElementsByClassName('response')[0];
const cookieConfirmationPlaceHolder = document.getElementsByClassName('cookieConfirmation')[0];
async function sendCredentials () {
  try {
    const res = await fetch('/signin', {
      method: 'post',
      body: JSON.stringify({ username: 'myuser', password: '123' }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(r => r.json());
    responsePlaceHolder.innerHTML = res
  } catch (err) {
    throw new Error(`there was an error, ${err}`)
  }
};

async function callTest () {
  try {
    const res = await fetch('/test', {
      method: 'get',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(r => r.json());
    cookieConfirmationPlaceHolder.innerHTML = res
  } catch (err) {
    throw new Error(`there was an error, ${err}`)
  }
};
