import { Notify } from 'notiflix';
// ауетентификация с помощью гугл
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
// ауетентификация с помощью гит хаб
import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { GithubAuthProvider } from 'firebase/auth';

const TOKEN_KEY = 'token';
// const token = localStorage.getItem(TOKEN_KEY);
const backdrop = document.querySelector('.back-drop-modal');

const firebaseConfig = {
  apiKey: 'AIzaSyD3BbBXldF6joP2YSzYphMAgDhQoeY1jvI',
  authDomain: 'kino-api-test.firebaseapp.com',
  projectId: 'kino-api-test',
  storageBucket: 'kino-api-test.appspot.com',
  messagingSenderId: '916238277743',
  appId: '1:916238277743:web:eb2124321b1bdbca1e419a',
  measurementId: 'G-JPQTZ5J1FC',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// запрос на google аккаунт
const provider = new GoogleAuthProvider();

const btnSign = document.querySelector('.btn-modal-sign');
const btnOut = document.querySelector('.btn-log-out');

btnSign.addEventListener('click', onSignFunction);
btnOut.addEventListener('click', onOutFunction);

function onSignFunction() {
  signInWithPopup(auth, provider)
    .then(result => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user.displayName;
      Notify.success(`Thanks ${user} for entering our resource`);
      backdrop.classList.add('is-hidden');
      window.removeEventListener('scroll', onStopScroll);
      document.body.classList.remove('stop-fon');
      // localStorage.setItem(TOKEN_KEY, backdrop);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

function onOutFunction() {
  alert('Are you sure you want to leave');
  Notify.success(`Thanks for visiting our resource`);
  document.querySelector('.back-drop-modal').classList.remove('is-hidden');
  onStopScroll();
  // localStorage.removeItem(TOKEN_KEY);
}

window.addEventListener('scroll', onStopScroll);

function onStopScroll() {
  document.body.classList.add('stop-fon');
}
// запрос на github аккаунт
const providerGit = new GithubAuthProvider();
const authGit = getAuth();
const btnGit = document.querySelector('.btn-modal-sign-git');

btnGit.addEventListener('click', onSignFunctionGit);
function onSignFunctionGit() {
  signInWithPopup(authGit, providerGit)
    .then(result => {
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user.displayName;
      Notify.success(`Thanks ${user} for entering our resource`);
      // localStorage.setItem('token', token);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GithubAuthProvider.credentialFromError(error);
    });
  document.querySelector('.back-drop-modal').classList.add('is-hidden');
  window.removeEventListener('scroll', onStopScroll);
  document.body.classList.remove('stop-fon');
}
