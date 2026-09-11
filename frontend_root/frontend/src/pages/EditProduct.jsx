import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function UpdateProduct() {

    const navigate = useNavigate();
    const {prodId} = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const [productName, setProductName] = useState(null);
    const [productPrice, setProductPrice] = useState(null);
    const [productStock, setProductStock] = useState(null);
    const [productDescription, setProductDescription] = useState(null);
    const [productSpecs, setProductSpecs] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);
    
    useEffect(() => {
        fetch(`http://localhost:8000/api/get/${prodId}`, {
            method: 'GET'
        })
        .then(async (response) => {
            if (!response.ok) {
                throw new Error(`Error while fetching product in edit page: ${response.status}`);
            }
            const data = await response.json();
            return data;
        })
        .then((prod) => {
            const product = prod.product;
            setProduct(product);
            setProductName(product.name);
            setProductPrice(product.price);
            setProductStock(product.stock);
            setProductDescription(product.description);
            setProductSpecs(product.specs?.join('\n') ?? '');
            setImgPreview(
              product.imageUrl?.startsWith('/uploads/')
                ? `http://localhost:8000${product.imageUrl}`
                : product.imageUrl
            );
            setLoading(false);
        }).catch(err => {
            console.error("Error occured while fetching product in edit page (catch block): ", err);
            setLoading(false);
        })
    }, [prodId]);
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImgPreview(URL.createObjectURL(file));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);
            const response = await fetch(`http://localhost:8000/api/products/${prodId}`, {
                method: 'PATCH',
                body: formData,
                credentials: 'include'
            });

            if (!response.ok) {
              throw new Error(`Update failed (${response.status})`);
            }

            const data = await response.json();
            console.log(data);
            navigate('/Products');

        } catch (err) {
            console.error(err, err.error);
        }
    }
  if (loading) return <div className="text-center text-xl mt-10">Loading detailed specs...</div>;
  if (!product) if (!product) return <div className="text-center text-xl mt-10 text-red-500">Product Not Found.</div>;  

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit product</h1>
          <p className="mt-2 text-sm text-gray-600">Editing product particulars or remove content</p>
        </div>

        <form className="space-y-6" encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="grid gap-6 sm:grid-cols-2">

            <label className="block text-sm font-semibold text-gray-700">
              Product name
              <input
                type="text"
                name="name"
                value={productName}
                onChange={(e) => {setProductName(e.target.value)}}
                required
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </label>

            <label className="block text-sm font-semibold text-gray-700">
              Price
              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                value={productPrice}
                onChange={(e) => {setProductPrice(e.target.value)}}
                required
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </label>

            <label className="block text-sm font-semibold text-gray-700">
              Stock
              <input
                type="number"
                name="stock"
                min="0"
                value={productStock}
                onChange={(e) => {setProductStock(e.target.value)}}
                required
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </label>
          </div>

          <label htmlFor="image" className="block text-sm font-semibold text-gray-700">
            Product image
            <img 
                src={imgPreview}
                alt="Product image preview"
                className="h-40 w-40 object-cover rounded-lg border border-gray-200"
            />
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              className="mt-2 block w-full cursor-pointer rounded-lg border border-gray-300 text-sm font-normal text-gray-600 file:mr-4 file:border-0 file:bg-blue-600 file:px-4 file:py-2.5 file:font-semibold file:text-white hover:file:bg-blue-700"
            />
          </label>

          <label className="block text-sm font-semibold text-gray-700">
            Description
            <textarea
              name="description"
              rows="4"
              value={productDescription}
              onChange={(e) => {setProductDescription(e.target.value)}}
              required
              className="mt-2 block w-full resize-y rounded-lg border border-gray-300 px-3 py-2.5 font-normal text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </label>

          <label className="block text-sm font-semibold text-gray-700">
            Specs
            <textarea
              name="specs"
              rows="3"
              placeholder="Enter product specs, one per line"
              value={productSpecs}
              onChange={(e) => {setProductSpecs(e.target.value)}}
              className="mt-2 block w-full resize-y rounded-lg border border-gray-300 px-3 py-2.5 font-normal text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
          >
            Update Product
          </button>
        </form>
      </div>
    </section>
  )
}

export default UpdateProduct;