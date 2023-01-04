import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDT6hn1X6MOlpZ4iiCFr-KMlblHTDyc3Gg',
  authDomain: 'kino-practice.firebaseapp.com',
  projectId: 'kino-practice',
  storageBucket: 'kino-practice.appspot.com',
  messagingSenderId: '564661411790',
  appId: '1:564661411790:web:a813ef026114618e1fd59f',
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
