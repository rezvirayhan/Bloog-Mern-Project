
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
    const [formData, setFormData] = useState({})
    const [errorMassage, setErrorMassage] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            return setErrorMassage("Please Fill out all fildes")
        }
        try {
            setLoading(true)
            setErrorMassage(null)
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                return setErrorMassage(data.message)
            }
            setLoading(false)
            if (res.ok) {
                navigate('/')
            }
        } catch (error) {
            setErrorMassage(error.message)
            setLoading(false)
        }
    };
    return (
        <div className="min-h-screen mt-20 ">
            <div className="flex p-4 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
                {/* left side */}
                <div className="flex-1">
                    <Link to="/" className="font-bold dark:text-white text-4xl" >
                        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-orange-500 rounded-lg text-white">Rezvi's</span>
                        Blog
                    </Link>
                    <p className="text-sm mt-5">
                        This is a demo Project. You can Sign In with your email and password Or with Google
                    </p>
                </div>
                {/* right side */}

                <div className="flex-1">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        <div>
                            <Label value="Your Email" />
                            <TextInput
                                type="email"
                                placeholder="Your Email"
                                id="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label value="Your Password" />
                            <TextInput
                                type="password"
                                placeholder="Your Password"
                                id="password"
                                onChange={handleChange}
                            />
                        </div>
                        <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
                            {
                                loading ? (
                                    <>
                                        <Spinner size='sm' />
                                        <span className="pl-3">Loading...</span>
                                    </>

                                ) : 'Sign-In'
                            }
                        </Button>
                    </form>
                    <div className="flex gap-2 text-sm mt-5">
                        <span>Don't Have an account</span>
                        <Link className="text-blue-600 font-semibold" to="/sign-up">Sign-Up</Link>
                    </div>
                    {
                        errorMassage && (
                            <Alert className="mt-5" color="failure">
                                {errorMassage}
                            </Alert>
                        )
                    }
                </div>
            </div>
        </div>
    );
};


export default SignIn;