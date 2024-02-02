import { Button, TextInput } from 'flowbite-react';
import { useSelector } from 'react-redux';

const DashProfile = () => {
    const { currentUser } = useSelector(state => state.user)
    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h2 className='my-7 text-center font-semibold text-3xl'>Profile</h2>
            <form className='flex flex-col gap-4'>
                <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
                    <img className='rounded-full w-full h-full border-8 object-cover border-[lightgray]' src={currentUser.profilePicture} alt="User" />
                </div>
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
                    placeholder='password'
                // onChange={handleChange}
                />
                <Button
                    type='submit'
                    gradientDuoTone='purpleToBlue'
                    outline

                >
                    Update
                </Button>

            </form>
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