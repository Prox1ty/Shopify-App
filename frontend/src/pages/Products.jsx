import { products } from "../utils/data";
import { Link } from "react-router-dom";
import Card from "../components/Card";

export default function Products() {
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