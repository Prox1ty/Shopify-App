import { useNavigate } from "react-router-dom";

function AddProduct() {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);
            const response = await fetch('http://localhost:8000/api/products', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            const data = await response.json();
            console.log(data);
            navigate('/Products');

        } catch (err) {
            console.error(err, err.error);
        }
    }

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Add product</h1>
          <p className="mt-2 text-sm text-gray-600">Add the product details and an image for your catalog.</p>
        </div>

        <form className="space-y-6" encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="grid gap-6 sm:grid-cols-2">

            <label className="block text-sm font-semibold text-gray-700">
              Product name
              <input
                type="text"
                name="name"
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
                required
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </label>
          </div>

          <label htmlFor="image" className="block text-sm font-semibold text-gray-700">
            Product image
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="mt-2 block w-full cursor-pointer rounded-lg border border-gray-300 text-sm font-normal text-gray-600 file:mr-4 file:border-0 file:bg-blue-600 file:px-4 file:py-2.5 file:font-semibold file:text-white hover:file:bg-blue-700"
            />
          </label>

          <label className="block text-sm font-semibold text-gray-700">
            Description
            <textarea
              name="description"
              rows="4"
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
              className="mt-2 block w-full resize-y rounded-lg border border-gray-300 px-3 py-2.5 font-normal text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
          >
            Add product
          </button>
        </form>
      </div>
    </section>
  )
}

export default AddProduct