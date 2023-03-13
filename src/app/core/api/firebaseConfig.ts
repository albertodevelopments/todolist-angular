import { initializeApp } from 'firebase/app';
import { environment } from '@env/environment';
import { getAuth } from 'firebase/auth';

const firebaseConfig = environment.firebase    

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)