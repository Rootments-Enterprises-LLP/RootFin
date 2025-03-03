
import { IoPersonCircleOutline } from "react-icons/io5";

const Header = () => {
    return (
        <div className="w-full flex justify-end border-b-1 border-gray-300 shadow  h-20">

            <div className="">

                <div className="flex mr-5 ">
                    <div>
                        <h4 className="text-xl">Store Name</h4>
                        <p className="text-sm">Store Number</p>
                    </div>
                    <div className="items-center text-5xl text-gray-400">
                        <IoPersonCircleOutline />
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Header