
import { IoPersonCircleOutline } from "react-icons/io5";
import Rootments from '../../public/Rootments.jpg'
const Header = ({
    // eslint-disable-next-line react/prop-types
    title
}) => {
    return (

        <>


            <nav className="bg-white ml-[250px] border-gray-200  dark:border-gray-700">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={Rootments} className="h-8 rounded-md" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">{title}</span>
                    </a>

                    <div className="hidden w-full md:block md:w-auto" id="navbar-multi-level">
                        <div className="flex items-center gap-4">
                            <h2>Store Name</h2>
                            <IoPersonCircleOutline className="text-4xl text-green-600" />
                        </div>
                    </div>
                </div>
            </nav>

        </>

    )
}

export default Header