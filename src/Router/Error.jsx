import { Link } from "react-router-dom";

const PageNotFound = ()=>{
return (
    <div className="h-[91vh] flex justify-center items-center">

      <Link to="/" replace className="text-9xl max-sm:text-2xl max-lg:text-6xl max-xl:text-8xl text-secondColor animate-shimmer bg-gradient-to-r from-secondColor via-gray-200 to-secondColor bg-clip-text text-transparent bg-[length:200%_100%]">
        Page Is Not Found!
      </Link>
    </div>
)
}

export default PageNotFound;