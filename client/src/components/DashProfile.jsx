import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { Alert, Button, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { app } from "../firebase";
import { updateFailure, updateStart, updateSuccess } from "../redux/user/userSlice";
const DashProfile = () => {
    const { currentUser } = useSelector(state => state.user)

    const [imageFile, setImageFile] = useState(null)
    const [imageFileUrl, setImageFileUrl] = useState(null)
    const [imageFileUploadProgess, setImageFileProgess] = useState(null)
    const [imageFileUploadError, setImageFileError] = useState(null)
    const [formData, setFormData] = useState({})
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);

    const filePikerRef = useRef()
    const dispatch = useDispatch()
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            setImageFileUrl(URL.createObjectURL(file))
        }
    }
    useEffect(() => {
        if (imageFile) {
            uploadImage()
        }
    }, [imageFile])
    const uploadImage = async () => {
        // match / b / { bucket } / o {
        //     match / { allPaths=**} {
        //       allow read;
        //       allow write: if
        //       request.resource.size < 2 * 1024 * 1024 &&
        //             request.resource.contentType.matches('image/.*')
        //     }
        // }
        setImageFileUploading(true)
        setImageFileError(null)
        const storage = getStorage(app)
        const fileName = new Date().getTime() + imageFile.name
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, imageFile)
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setImageFileProgess(progress.toFixed(0))
            },
            (error) => {
                setImageFileError('Could Not Upload Images (File Must Be Less Then 2MB)')
                setImageFileProgess(null)
                setImageFile(null)
                setImageFileUrl(null)
                setImageFileUploading(false)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                    setFormData({ ...formData, profilePicture: downloadURL })
                    setImageFileUploading(false)
                })
            }
        )
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setUpdateUserError(null);
        setUpdateUserSuccess(null);
        if (Object.keys(formData).length === 0) {
            setUpdateUserError('No Change Made...')
            return;
        }
        if (imageFileUploading) {
            setUpdateUserError("Please Wite For image to upload....")
            return
        }
        try {
            dispatch(updateStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json()
            if (!res.ok) {
                dispatch(updateFailure(data.message))
                setUpdateUserError(data.message)
            }
            else {
                dispatch(updateSuccess(data))
                setUpdateUserSuccess("User Profile Update Successfully Done....")
            }
        } catch (error) {
            dispatch(updateFailure(error.message))
            setUpdateUserError(error.message)
        }

    }
    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h2 className='my-7 text-center font-semibold text-3xl'>Profile</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input hidden onChange={handleImageChange} ref={filePikerRef} type="file" accept='image/*' />
                <div className=' relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() => filePikerRef.current.click()}>
                    {imageFileUploadProgess && (
                        <CircularProgressbar value={imageFileUploadProgess || 0} text={`${imageFileUploadProgess}%`} strokeWidth={5}
                            styles={{
                                root: {
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: '0',
                                    left: '0'
                                },
                                path: {
                                    stroke: `rgba(62,152,199, ${imageFileUploadProgess / 100})`
                                }
                            }}
                        />

                    )}
                    <img className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadProgess && imageFileUploadProgess < 100 && 'opacity-60'}`}
                        src={imageFileUrl || currentUser.profilePicture} alt="User" />
                </div>
                {
                    imageFileUploadError && (
                        <Alert color='failure'>
                            {imageFileUploadError}
                        </Alert>
                    )

                }
                <TextInput
                    type='text'
                    id='username'
                    placeholder='username'
                    defaultValue={currentUser.username}
                    onChange={handleChange}
                />
                <TextInput
                    type='email'
                    id='email'
                    placeholder='email'
                    defaultValue={currentUser.email}
                    onChange={handleChange}
                />
                <TextInput
                    type='password'
                    id='password'
                    placeholder='Password'
                    onChange={handleChange}
                />
                <Button
                    type='submit'
                    gradientDuoTone='purpleToBlue'
                    outline
                >
                    Update
                </Button>
            </form >
            <div className='text-red-500 flex justify-between mt-5'>
                <span className='cursor-pointer'>
                    Delete Account
                </span>
                <span className='cursor-pointer'>
                    Sign Out
                </span>
            </div>
            {
                updateUserSuccess && (

                    <Alert color="success" className="mt-5">
                        {updateUserSuccess}
                    </Alert>
                )
            }

            {
                updateUserError && (

                    <Alert color="failure" className="mt-5">
                        {updateUserError}
                    </Alert>
                )
            }

        </div >
    );
};

export default DashProfile;