import { useState, useEffect } from 'react' 
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { deleteProduct } from '../features/productSlice.js'
export default function Card({ prodId, prodName, imgSrc, prodPrice }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const imageSource = imgSrc?.startsWith('/uploads/')
        ? `http://localhost:8000${imgSrc}`
        : imgSrc;

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteProduct(prodId));
    }

    const handleEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/editProduct/${prodId}`);
    }

    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/user/api/me", { credentials: "include" })
          .then((response) => response.ok ? response.json() : null)
          .then((currentUser) => setUser(currentUser))
          .catch(() => setUser(null));
      }, []);


    return (
        <>
            <div className="w-full bg-white border-2 border-black p-5 rounded-3xl flex flex-col items-center justify-between shadow-sm hover:shadow-md transition-shadow h-[420px]">
                <div className="w-full flex flex-col items-center">
                    <div className="relative w-full h-48 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
                        <img 
                            src={imageSource || "https://via.placeholder.com/256?text=No+Image"} 
                            alt={`Picture of a ${prodName}`} 
                            className="w-full h-full object-cover"
                        />
                        { user?.role.toUpperCase().includes("ADMIN") &&
                        <button
                            type="button"
                            onClick={handleEdit}
                            aria-label={`Edit ${prodName}`}
                            className="edit-button absolute right-3 top-3 flex h-10 w-10 origin-right cursor-pointer items-center justify-start overflow-hidden rounded-full px-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <EditOutlinedIcon fontSize="small" />
                            <span className="edit-button-label ml-2 overflow-hidden whitespace-nowrap text-sm font-semibold">
                                Edit
                            </span>
                        </button>
                        }
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
            { user?.role.toUpperCase().includes("ADMIN") &&
            <>
                <button
                    type="button"
                    onClick={handleDelete}
                    aria-label={`Delete ${prodName}`}
                    className="delete-button relative z-10 flex w-full -translate-y-5 cursor-pointer justify-center overflow-hidden rounded-full rounded-t-2xl border-white p-1 text-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                >
                    <span className="relative z-10">X</span>
                </button>
            </>
            }
        </>

    );
}