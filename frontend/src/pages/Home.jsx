import { Link } from "react-router-dom";

export default function Home() {
    return(
        <>
            <div className="mt-29 ml-50">
                <h1 className="font-bold text-3xl">Random Text Haha</h1>
                <h2 className="mt-5 text-xl">Looking for something? Go to <span className="font-bold transition-all hover:underline"><Link to="/Products">Products</Link></span></h2>
            </div>
        </>
    )
}