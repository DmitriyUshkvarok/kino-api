import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from 'notiflix';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

import { initializeApp } from 'firebase/app';

const body = document.querySelector('body');
const backdrop = document.querySelector('.back-drop-modal');
const TOKEN_KEY = 'token';
const googleBtn = document.querySelector('.btn-modal-sign');
const btnOut = document.querySelector('.btn-log-out');
const gitBtn = document.querySelector('.btn-modal-sign-git');
const emailAndPhone = document.querySelector('.btn-register');
const btnSign = document.querySelector('.btn-sign');
const emailSign = document.querySelector('#email');
const passwordSign = document.querySelector('#password');
const token = localStorage.getItem(TOKEN_KEY);

passwordSign.addEventListener('input', test);
function test(e) {
  console.dir(e);
}

gitBtn.addEventListener('click', onSignFunctionGit);
googleBtn.addEventListener('click', onSignFunctionGoogle);
emailAndPhone.addEventListener('click', onRegisterEmailAndPhone);
btnSign.addEventListener('click', onSign);
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

const app = initializeApp(firebaseConfig);

const authStateChange = getAuth();
function authState() {
  onAuthStateChanged(authStateChange, user => {
    if (user) {
      const uid = user.uid;
      console.log(user);
    } else {
      // User is signed out
      // ...
    }
  });
}
authState();

// email and phone регистрация
const authForm = getAuth();

// клик по кнопке регистрации
function onRegisterEmailAndPhone(e) {
  e.preventDefault();
  const email = emailSign.value;
  const password = passwordSign.value;
  createUserWithEmailAndPassword(authForm, email, password)
    .then(userCredential => {
      if (email && password) {
        backdrop.classList.add('is-hidden');
        body.classList.remove('stop-fon');
        window.removeEventListener('load', onStopBackground);
        Notify.success('Спасибо за регестрацию');
        localStorage.setItem(TOKEN_KEY, token);
      }
      const user = userCredential.user;
      console.log(user);
    })
    .catch(error => {
      onErrorValid(error);
    });
}

// вход если уже зарегестрирован
const authSign = getAuth();

// клик по кнопке вход
function onSign(e) {
  e.preventDefault();
  const email = emailSign.value;
  const password = passwordSign.value;
  signInWithEmailAndPassword(authSign, email, password)
    .then(userCredential => {
      if (email && password) {
        backdrop.classList.add('is-hidden');
        body.classList.remove('stop-fon');
        window.removeEventListener('load', onStopBackground);
        Notify.success('Рады тебя снова видеть на нашем сайте');
        localStorage.setItem(TOKEN_KEY, token);
      }
      const user = userCredential.user;
    })
    .catch(error => {
      onErrorValid(error);
    });
}

// google авторизация
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
      // signOut(authGit, auth, authSign, authForm);
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

// error valid
function onErrorValid(error) {
  if (error.message == 'Firebase: Error (auth/email-already-in-use).') {
    Notify.failure('такой адрес уже существует', {
      timeout: 4000,
      background: '#c9a22de6',
    });
  } else if (error.message == 'Firebase: Error (auth/invalid-email).') {
    Notify.failure('не валидный эмеил', {
      timeout: 4000,
      background: '#c9a22de6',
    });
  } else if (error.message == 'Firebase: Error (auth/wrong-password).') {
    Notify.failure('ошибка авторизации!неверный пароль', {
      timeout: 4000,
      background: '#c9a22de6',
    });
  } else {
    Notify.failure(`${error.message}`, {
      timeout: 4000,
      background: '#c9a22de6',
    });
  }
  return;
}
