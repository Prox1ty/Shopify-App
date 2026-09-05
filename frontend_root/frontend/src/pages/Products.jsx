import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../features/productSlice";
import { Link } from "react-router-dom";
import { Card } from "../components";

export default function Products() {

    const dispatch = useDispatch();
    const products = useSelector(state => state.products.items);
    const status = useSelector(state => state.products.status);
    const error = useSelector(state => state.products.error);
    const hasMore = useSelector(state => state.products.hasMore);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts(-1));
        }
    }, [status, dispatch]); // adding dispatch here because its an outside function unknown to useEffect.

    if (status === 'loading' && products.length === 0) {
        return <div>Loading products...</div>;
    }
    if (status === 'failed') {
        return <div className="text-center text-xl mt-10 text-red-500">{`Unable to load products: ${error}`}</div>;
    }

    if (status === 'succeeded')
        return (
            <>
                <div className="w-full min-h-screen p-10 bg-gray-50 flex flex-col items-center">
                    <div className="w-full max-w-5xl">
                        <h1 className="text-5xl font-black tracking-tight pb-8 pl-2 text-gray-900">All Products...</h1>
                        <div className="sm:grid sm:grid-cols-3 w-full gap-8 justify-center">
                            {
                                products.map((product) => {
                                    const { id, name, price, imageUrl: url } = product;
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
                        {hasMore && (
                            <button
                                type="button"
                                disabled={status === 'loading'}
                                onClick={() => dispatch(fetchProducts(products.at(-1)?.id))}
                                className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {status === 'loading' ? 'Loading...' : 'Load more'}
                            </button>
                        )}
                    </div>
                </div>
            </>
        );
}