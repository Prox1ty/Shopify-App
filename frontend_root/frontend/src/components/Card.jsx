import { useDispatch } from "react-redux";
import { deleteProduct } from '../features/productSlice.js'
export default function Card({ prodId, prodName, imgSrc, prodPrice }) {

    const dispatch = useDispatch();

    const imageSource = imgSrc?.startsWith('/uploads/')
        ? `http://localhost:8000${imgSrc}`
        : imgSrc;

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteProduct(prodId));
    }

    return (
        <>
            <div className="w-full bg-white border-2 border-black p-5 rounded-3xl flex flex-col items-center justify-between shadow-sm hover:shadow-md transition-shadow h-[420px]">
                <div className="w-full flex flex-col items-center">
                    <div className="w-full h-48 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
                        <img 
                            src={imageSource || "https://via.placeholder.com/256?text=No+Image"} 
                            alt={`Picture of a ${prodName}`} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="text-gray-400 text-xs font-semibold mt-4">{`#0${prodId}`}</span>
                    <h3 className="font-bold text-base text-center mt-1 px-2 line-clamp-2 text-gray-800">{prodName}</h3>
                </div>
                
                <div className="mt-4">
                    <span className="text-lg font-black bg-gray-100 px-4 py-1.5 rounded-full border border-black/10">
                        {`$${prodPrice}`}
                    </span>
                </div>
            </div>
            <button
                type="button"
                onClick={handleDelete}
                aria-label={`Delete ${prodName}`}
                className="delete-button relative z-10 flex w-full -translate-y-5 cursor-pointer justify-center overflow-hidden rounded-full rounded-t-2xl border-white p-1 text-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
            >
                <span className="relative z-10">X</span>
            </button>
        </>

    );
}