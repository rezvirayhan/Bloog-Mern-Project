import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { Alert, Button, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useSelector } from 'react-redux';
import { app } from "../firebase";
const DashProfile = () => {
    const { currentUser } = useSelector(state => state.user)
    const [imageFile, setImageFile] = useState(null)
    const [imageFileUrl, setImageFileUrl] = useState(null)
    const [imageFileUploadProgess, setImageFileProgess] = useState(null)
    const [imageFileUploadError, setImageFileError] = useState(null)
    const filePikerRef = useRef()
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
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                })
            }
        )
    }
    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h2 className='my-7 text-center font-semibold text-3xl'>Profile</h2>
            <form className='flex flex-col gap-4'>
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
                // onChange={handleChange}
                />
                <TextInput
                    type='email'
                    id='email'
                    placeholder='email'
                    defaultValue={currentUser.email}
                // onChange={handleChange}
                />
                <TextInput
                    type='password'
                    id='password'
                    placeholder='Password'
                // onChange={handleChange}
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
        </div >
    );
};

export default DashProfile;