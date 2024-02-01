import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { signInSuccess } from "../redux/user/userSlice";
const OAuth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async () => {
        const auth = getAuth(app)
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: "select_account" })
        try {
            const resultFormGoogle = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultFormGoogle.user.displayName,
                    email: resultFormGoogle.user.email,
                    googlePhotoUrl: resultFormGoogle.user.photoURL
                }),
            })
            const data = await res.json()
            if (res.ok) {
                dispatch(signInSuccess(data))
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Button onClick={handleGoogleClick} type="button" gradientDuoTone="pinkToOrange" outline >
            <AiFillGoogleCircle className="w-6 h-6 mr-2" />
            <span>Continue With Google</span>
        </Button>
    );
};

export default OAuth;