import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from 'notiflix';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { GithubAuthProvider } from 'firebase/auth';

const body = document.querySelector('body');
const backdrop = document.querySelector('.back-drop-modal');
const TOKEN_KEY = 'token';
const googleBtn = document.querySelector('.btn-modal-sign');
const btnOut = document.querySelector('.btn-log-out');
const gitBtn = document.querySelector('.btn-modal-sign-git');
const token = localStorage.getItem(TOKEN_KEY);

gitBtn.addEventListener('click', onSignFunctionGit);
googleBtn.addEventListener('click', onSignFunctionGoogle);
btnOut.addEventListener('click', onOutFunction);
window.addEventListener('load', onStopBackground);
// стоп фон при авторизации
function onStopBackground() {
  body.classList.add('stop-fon');
}

// проверка ключа локального хранилища (убираем окно авторизации делаем фон активным)
if (token) {
  backdrop.classList.add('is-hidden');
  body.classList.remove('stop-fon');
  window.removeEventListener('load', onStopBackground);
}

// объект настроек авторизации firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDT6hn1X6MOlpZ4iiCFr-KMlblHTDyc3Gg',
  authDomain: 'kino-practice.firebaseapp.com',
  projectId: 'kino-practice',
  storageBucket: 'kino-practice.appspot.com',
  messagingSenderId: '564661411790',
  appId: '1:564661411790:web:a813ef026114618e1fd59f',
};

// google авторизация
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// клик по кнопке входа гугл
function onSignFunctionGoogle() {
  signInWithPopup(auth, provider)
    .then(result => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user.displayName;
      Notify.success(`привет ${user}`);
      localStorage.setItem(TOKEN_KEY, token);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  backdrop.classList.add('is-hidden');
  body.classList.remove('stop-fon');
  window.removeEventListener('load', onStopBackground);
}

// github авторизация
const providerGit = new GithubAuthProvider();
const authGit = getAuth();

// клик по кнопке github
function onSignFunctionGit() {
  signInWithPopup(authGit, providerGit)
    .then(result => {
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user.displayName;
      Notify.success(`привет ${user}`);
      localStorage.setItem(TOKEN_KEY, token);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GithubAuthProvider.credentialFromError(error);
    });
  backdrop.classList.add('is-hidden');
  body.classList.remove('stop-fon');
  window.removeEventListener('load', onStopBackground);
}

// клик по кнопке выхода из ресурса
function onOutFunction() {
  Notiflix.Confirm.show(
    'Are You sure you want to go out',
    'Do you agree with me?',
    'Yes',
    'No',
    function okCb() {
      backdrop.classList.remove('is-hidden');
      onStopBackground();
      localStorage.removeItem(TOKEN_KEY);
    },
    function cancelCb() {
      return;
    },
    {
      width: '320px',
      borderRadius: '8px',
      fontFamily: 'Aboreto',
    }
  );
}
