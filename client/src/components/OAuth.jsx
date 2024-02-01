import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { app } from "../firebase";

const OAuth = () => {
    const handleGoogleClick = async () => {
        const auth = getAuth(app)
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: "select_account" })
        try {
            const resultFormGoogle = await signInWithPopup(auth, provider)
            // console.log(resultFormGoogle);   
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