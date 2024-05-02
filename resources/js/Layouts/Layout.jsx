import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DropdownItem from "@/Components/Dropdown-item";

export default function Layout({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [userData, setUserData] = useState({});
    const [isDropdownOpen, setIsDropdownOpen] = useState({
        menu: false,
        profile: false,
    });
    const [mobile, isMobile] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:8000/get-user");
                const data = await response.json();
                if (data.status === true) setIsLoggedIn(data.status);
                const user = data;
                setUserData(user.user);
            } catch (error) {
                console.log("Error fetching data: ", error);
            }
        };
        if (isLoggedIn === null) fetchUserData();

        const checkMobile = () => {
            if (window.innerWidth < 768) {
                isMobile(true);
            } else {
                isMobile(false);
            }
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, [isLoggedIn]);

    const logOut = async () => {
        try {
            Inertia.post(route("logout"));
            setIsLoggedIn(false);
        } catch (error) {
            console.log("Error fetching data: ", error);
        }
    };
    return (
        <div className="min-h-screen flex flex-col items-center pt-6 sm:pt-0 bg-gray-100">
            <nav className="w-full bg-white shadow-md shadow-gray-300">
                <div className="lg:w-3/4 w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="w-full flex items-center space-x-4 ">
                        {mobile ? (
                            <div className="absolute top-4 left-0 px-4 bg-white ">
                                <MenuIcon
                                    onClick={() => {
                                        setIsDropdownOpen({
                                            menu: !isDropdownOpen.menu,
                                        });
                                    }}
                                    onBlur={() => {
                                        setIsDropdownOpen({
                                            menu: false,
                                        });
                                    }}
                                    className="block h-9 w-auto fill-current text-gray-800"
                                />
                                {isDropdownOpen.menu && (
                                    <div
                                        className="flex flex-col relative top-0 left-0 h-screen bg-white border-right border-black py-4 space-y-2 w-full p-4 animate-fade-in-right"
                                        id="mobile-menu"
                                    >
                                        <NavLink link="/insurances">
                                            Biztositások
                                        </NavLink>
                                        <NavLink link="/invoices">
                                            Számlák
                                        </NavLink>
                                        <NavLink link="/shoppinglist">
                                            Bevásarló Lista
                                        </NavLink>
                                        <NavLink link="/transaction">
                                            Tranzakciók
                                        </NavLink>
                                        <NavLink link="/payment">
                                            Fizetések
                                        </NavLink>
                                        <NavLink link="/subscription">
                                            Előfizetések
                                        </NavLink>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex space-x-4 items-center w-full">
                                <NavLink link="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </NavLink>
                                <NavLink link="/insurances">
                                    Biztositások
                                </NavLink>
                                <NavLink link="/invoices">Számlák</NavLink>
                                <NavLink link="/shoppinglist">
                                    Bevásarló Lista
                                </NavLink>
                                <NavLink link="/transaction">
                                    Tranzakciók
                                </NavLink>
                                <NavLink link="/payment">Fizetések</NavLink>
                                <NavLink link="/subscription">
                                    Előfizetések
                                </NavLink>
                            </div>
                        )}
                        {isLoggedIn ? (
                            <div className="w-full flex justify-end space-x-4">
                                <div className=" flex items-center">
                                    <AccountCircleIcon
                                        className="block h-9 w-auto fill-current text-gray-800 cursor-pointer"
                                        onClick={() =>
                                            setIsDropdownOpen({
                                                ...isDropdownOpen,
                                                profile:
                                                    !isDropdownOpen.profile,
                                            })
                                        }
                                        id="dropdownButton"
                                    />
                                    {isDropdownOpen.profile && (
                                        <div
                                            id="dropdown"
                                            className="absolute top-14 bg-white shadow-md p-2 rounded animate-[fade-in-down_0.3s_ease-in-out_forwards] z-10"
                                        >
                                            <div className="flex flex-col w-36 space-y-2 items-center">
                                                <div className="w-3/4 py-2 flex flex-col">
                                                    <DropdownItem link="#">
                                                        {userData.name}
                                                    </DropdownItem>
                                                    <DropdownItem link="/profile">
                                                        Profil
                                                    </DropdownItem>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <form onSubmit={logOut} method="POST">
                                    <button type="submit">Kijelentkezés</button>
                                </form>
                            </div>
                        ) : (
                            <div className="w-full flex justify-end space-x-4">
                                <NavLink link="/login">Bejelentkezés</NavLink>{" "}
                                <NavLink link="/register">Regisztráció</NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <div className="lg:w-full max-w-2xl mt-6 px-6 py-4 bg-white shadow-md overflow-hidden rounded-lg">
                {children}
            </div>
        </div>
    );
}
