import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

export default function Product() {
    const dispatch = useDispatch();
    const { prodId } = useParams();
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8000/api/get/${prodId}`)
            .then(async (response) => {
            if (!response.ok) {
                throw new Error(`Failed to load product (${response.status})`);
            }
            return response.json();
        })
        .then((data) => {
            const foundProduct = data.product;
            setProduct(foundProduct);
            setLoading(false);
        }).catch((err) => {
            console.error(`Error occured while fetching product of id #${prodId}.\n`, err);
            setLoading(false);
        })
    }, [prodId]);

    const handleSubmit = (e, product) => {
        e.preventDefault();
        dispatch(addToCart({
            id: parseInt(prodId),
            title: product.name,
            price: product.price,
            imgURL: product.imageUrl
        }));
    }

    if (loading) return <div className="text-center text-xl mt-10">Loading detailed specs...</div>;
    if (!product) if (!product) return <div className="text-center text-xl mt-10 text-red-500">Product Not Found.</div>;

    return (
        <div className="max-w-5xl mx-auto p-10 flex flex-col md:flex-row gap-10 items-center md:items-start">
            <div className="w-full md:w-1/2">
                <img 
                    src={product.imageUrl} 
                    alt={`Picture of ${product.name}`} 
                    className="w-full h-[450px] object-cover border-2 border-black rounded-3xl shadow-sm"
                />
            </div>

        
            <div className="w-full md:w-1/2 flex flex-col justify-between min-h-[450px]">
                <div>
                    <span className="text-gray-400 font-bold text-sm">{`PRODUCT SKU: #0${product.catalogId}`}</span>
                    <h1 className="text-4xl font-black mt-1 mb-4 text-gray-900">{product.name}</h1>
                    <p className="text-gray-600 leading-relaxed text-base mb-6">{product.description}</p>
                    
                    <h3 className="font-bold text-lg mb-2">Technical Specifications:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        {product.specs?.map((spec, index) => (
                            <li key={index}>{spec}</li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8 flex items-center justify-between border-t-2 border-black/10 pt-4">
                    <span className="text-3xl font-black text-blue-900">{`$${product.price}`}</span>
                    {product.stock !== undefined && (
                        <span className="text-sm bg-green-100 text-green-800 font-semibold px-3 py-1 rounded-full">
                            {`${product.stock} units remaining`}
                        </span>
                    )}
                </div>
                <form onSubmit={(e) => handleSubmit(e, product)}>
                    <button
                        type="submit"
                        className="w-full mt-4 py-3 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 active:scale-[0.98] text-white text-lg font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
                    >Add To Cart</button>
                </form>
            </div>

        </div>
    );
}