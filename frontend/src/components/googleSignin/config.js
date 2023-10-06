import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyD9UWQ1LFBobEpQ7IMC6cvGq8I5C42FZQY",
	authDomain: "multi-shop-16964.firebaseapp.com",
	projectId: "multi-shop-16964",
	storageBucket: "multi-shop-16964.appspot.com",
	messagingSenderId: "783479279861",
	appId: "1:783479279861:web:4175d55cb11dad35dbf5bc",
	measurementId: "G-6KQJ33SLNP",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
