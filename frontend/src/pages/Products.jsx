import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../features/productSlice";
import { Link } from "react-router-dom";
import { Card } from "../components";

export default function Products() {

    const dispatch = useDispatch();
    console.log(useSelector(state => state));
    const products = useSelector(state => state.products.items);
    const status = useSelector(state => state.products.status);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]); // adding dispatch here because its an outside function unknown to useEffect.

    if (status === 'loading') {
        return <div>Loading products...</div>;
    }
    else if (status === 'succeeded')
        return (
            <>
                <div className="w-full min-h-screen p-10 bg-gray-50 flex flex-col items-center">
                    <div className="w-full max-w-5xl">
                        <h1 className="text-5xl font-black tracking-tight pb-8 pl-2 text-gray-900">All Products...</h1>
                        <div className="grid grid-cols-3 w-full gap-8 justify-center">
                            {
                                products.map((product) => {
                                    const { id, name, price, imageUrl:url } = product;

                                    return (
                                        <Link 
                                            to={`/products/${id}`}
                                            key={id}
                                            className="block no-underline hover:no-underline"
                                        >
                                            <Card
                                                prodId={id} 
                                                prodName={name} 
                                                imgSrc={url} 
                                                prodPrice={price}
                                            />
                                    </Link>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </>
        );
}