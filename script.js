/* FINANTO - JavaScript puro, sem dependências. */
(function () {
  'use strict';

  // Ano automático no rodapé
  document.querySelectorAll('.ano').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Menu móvel
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var aberto = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', aberto);
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Formulário: abre o cliente de e-mail do utilizador (sem servidor).
  // EDITE aqui o e-mail real de atendimento.
  var EMAIL_ATENDIMENTO = ''; // ex.: 'apoio@seudominio.com'

  var form = document.getElementById('form');
  if (form) {
    var estado = document.getElementById('estado');
    if (EMAIL_ATENDIMENTO) {
      var txt = document.getElementById('email-txt');
      if (txt) txt.textContent = EMAIL_ATENDIMENTO;
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nome = form.nome.value.trim();
      var email = form.email.value.trim();
      var msg = form.msg.value.trim();
      if (!nome || !/^\S+@\S+\.\S+$/.test(email) || !msg) {
        estado.textContent = 'Preencha todos os campos com um e-mail válido.';
        return;
      }
      if (!EMAIL_ATENDIMENTO) {
        estado.textContent = 'Formulário ainda não configurado: defina o e-mail de atendimento em script.js.';
        return;
      }
      var corpo = 'Nome: ' + nome + '\nE-mail: ' + email + '\n\n' + msg;
      window.location.href = 'mailto:' + EMAIL_ATENDIMENTO +
        '?subject=' + encodeURIComponent('Contacto via site FINANTO') +
        '&body=' + encodeURIComponent(corpo);
      estado.textContent = 'A abrir a sua aplicação de e-mail…';
    });
  }
})();
