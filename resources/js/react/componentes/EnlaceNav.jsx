import { Link } from "react-router-dom"

const EnlaceNav = ({href,nombre}) =>{


    return(
        <Link to={href} className=" mx-4 hover:text-amber-400">{nombre}</Link>
    )
}

export default EnlaceNav