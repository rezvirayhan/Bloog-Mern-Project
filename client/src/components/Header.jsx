import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signOutSuccess } from "../redux/user/userSlice";

const Header = () => {
    const path = useLocation().pathname
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.user)
    const { theme } = useSelector(state => state.theme)



    const handleSignOut = async () => {
        try {
            const res = await fetch('/api/user/signOut', {
                method: "POST"
            })
            const data = await res.json()
            if (!res.ok) {
                console.log(data.message);
            }
            else {
                dispatch(signOutSuccess())
            }
        } catch (error) {
            console.log(error.message);
        }
    }



    return (
        <Navbar className="border-b-2">
            <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white" >
                <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-orange-500 rounded-lg text-white">Rezvi's</span>
                Blog
            </Link>
            <form>
                <TextInput
                    className="hidden lg:inline"
                    type="text" placeholder="Search..."
                    rightIcon={AiOutlineSearch} />
            </form>
            <Button className="w-12 h-12 lg:hidden" color="gray">
                <AiOutlineSearch></AiOutlineSearch>
            </Button>
            <div className="flex gap-2 md:order-2">
                <Button onClick={() => dispatch(toggleTheme())}
                    className="w-12 h-10 hidden sm:inline"
                    color="gray" pill>
                    {theme === 'light' ? <FaSun /> : <FaMoon />}
                </Button>
                {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt="Photo"
                                img={currentUser.profilePicture}
                                rounded
                                status="online"
                                bordered
                                color="success"
                            />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">@{currentUser.username}</span>
                            <span className="text-sm font-medium ">{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to={'/dashboard?tab=profile'}>
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
                    </Dropdown>
                ) :

                    (<Link to="/sign-in">
                        <Button className="" gradientDuoTone="purpleToBlue" outline>Sign In</Button>
                    </Link>
                    )
                }
                <Navbar.Toggle />
            </div >
            <Navbar.Collapse>
                <Navbar.Link active={path == '/'} as={'div'}>
                    <Link to="/">
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path == '/about'} as={'div'}>
                    <Link to="/about">
                        About
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path == '/projects'} as={'div'}>
                    <Link to="/projects">
                        Project
                    </Link>
                </Navbar.Link>

            </Navbar.Collapse>
        </Navbar >
    );
};

export default Header;
