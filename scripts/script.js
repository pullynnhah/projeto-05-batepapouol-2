function renderLogin() {
  container.innerHTML = `
    <section class="login">
      <img src="images/uol.png" alt="logo bate-papo uol" />
      <div>
        <p class="error-message">Nome inválido!</p>
        <input type="text" placeholder="Digite seu nome" />
        <button onclick="login()">Entrar</button>
      </div>
    </section>
  `;
}

function renderLoading() {
  const div = document.querySelector(".login div");
  div.innerHTML = `
    <img class="loader" src="images/loading.gif" />
    <p class="loading">Carregando...</p>
  `;
}

function login() {
  const input = document.querySelector(".login input");
  const name = input.value;
  input.value = "";
  const promise = axios.post(`${URI}/participants`, {name});
  promise.then(response => {
    renderLoading();
    message.from = name;
    keepLogged();
  });

  promise.catch(error => {
    const div = document.querySelector(".login div");
    div.classList.add("error");
  });
}

function keepLogged() {
  const promise = axios.post(`${URI}/status`, {name: message.from});
  promise.then(response => {
    setTimeout(keepLogged, 5000);
  });
  
  promise.catch(error => window.location.reload());
}

const URI = "https://mock-api.driven.com.br/api/v6/uol";
const message = {
  from: null,
};

const container = document.querySelector(".container");
// renderLogin();
