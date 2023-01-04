import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
      Notify.success(`привет ${user} ёпта`);
      console.dir(user);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  document.querySelector('.back-drop-modal').classList.add('is-hidden');
  window.removeEventListener('scroll', onStopScroll);
  document.body.classList.remove('stop-fon');
}

function onOutFunction() {
  alert('Are you sure you want to leave');
  document.querySelector('.back-drop-modal').classList.remove('is-hidden');
  onStopScroll();
}

window.addEventListener('scroll', onStopScroll);

function onStopScroll() {
  document.body.classList.add('stop-fon');
}
