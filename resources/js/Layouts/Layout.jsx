import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col items-center pt-6 sm:pt-0 bg-gray-100">
            <nav className="w-full bg-white border-b border-gray-100">
                <div className="min-w-screen mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center space-x-4">
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
                        </div>
                    </div>
                </div>
            </nav>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
