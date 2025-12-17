import { initializeApp, getApps, getApp } from 'firebase/app'
import {
    getMessaging,
    getToken,
    onMessage,
    isSupported,
} from 'firebase/messaging'
import { getAuth } from 'firebase/auth'

// 🔥 Your Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyCvXzOHDfsJtNrUpF-Ga9lvdVEr4D-Rzxo",
    authDomain: "trkgo-4f0dc.firebaseapp.com",
    databaseURL: "https://trkgo-4f0dc-default-rtdb.firebaseio.com",
    projectId: "trkgo-4f0dc",
    storageBucket: "trkgo-4f0dc.firebasestorage.app",
    messagingSenderId: "412786016318",
    appId: "1:412786016318:web:637bcc2b2611c04fda116f",
    measurementId: "G-TEJFMR6WWB"
}

// Initialize Firebase App
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp()

// Initialize Messaging (with browser support check)
const messaging = (async () => {
    try {
        const isSupportedBrowser = await isSupported()
        if (isSupportedBrowser) {
            return getMessaging(firebaseApp)
        }
        return null
    } catch (err) {
        return null
    }
})()

// ⚡ Fetch FCM Token
export const fetchToken = async (setFcmToken) => {
    return getToken(await messaging, {
        vapidKey: "BGFt8pfE3I3ERR5X2nzqm73QQzELf1h1Lv_ZmBU7qbDMKcEW2Ybmt1NRkDjDIDYTJefeM5QZ76CJAgyYO2jqO69JU"  // <-- Yaha apna Web Push (VAPID) key dalna hota hai 
    })
        .then((currentToken) => {
            if (currentToken) {
                setFcmToken(currentToken)
            } else {
                setFcmToken()
            }
        })
        .catch((err) => {
            console.error(err)
        })
}

// 🔔 Listen to foreground messages
export const onMessageListener = async () =>
    new Promise((resolve) =>
        (async () => {
            const messagingResolve = await messaging
            onMessage(messagingResolve, (payload) => {
                resolve(payload)
            })
        })()
    )

// Firebase Auth Export
export const auth = getAuth(firebaseApp)
