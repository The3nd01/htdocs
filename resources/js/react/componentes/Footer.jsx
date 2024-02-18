import Lista from './Lista'
import logo from '../assets/logo.png'

const Footer = () =>{


    return(
        <footer className="bg-black">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                  <img  className="w-12 h-12" src={logo} alt="Logo de la página" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Rincón Gourmet</span>
                </a>
                <Lista/>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="#" className="hover:underline">RincónGourmet™</a>. All Rights Reserved.</span>
        </div>
    </footer>
    )
}

export default Footer