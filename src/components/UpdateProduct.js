import { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateProduct() {
    const [namear, setNamear] = useState("");
    const [nameen, setNameen] = useState("");
    const [descar, setDescar] = useState("");
    const [descen, setDescen] = useState("");

    const [count, setCount] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState(""); // New state for category
    const [categories, setCategories] = useState([]); // New state to hold all categories

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [dataResponse, setResponseData] = useState([]);

    const id = window.location.pathname.split("/").slice(-1)[0];

    useEffect(() => {
        // Fetch product details
        axios.post('http://127.0.0.1:8000/api/product/details', {
            product_id: id
        }).then((response) => {
            const productsRes = response.data;
            if (productsRes.status) {
                const productData = productsRes.result;
                setNameen(productData.name.en);
                setNamear(productData.name.ar);
                setDescen(productData.description.en);
                setDescar(productData.description.ar);

                setCount(productData.count);
                setPrice(productData.price);
                setCategory(productData.category_id); // Set the category
            }
        }).catch((error) => {
            console.error("Error fetching product details:", error);
        });

        // Fetch all categories
        axios.get('http://127.0.0.1:8000/api/categories')
            .then((response) => {
                const categoriesRes = response.data;
                if (categoriesRes.status) {
                    setCategories(categoriesRes.result);
                }
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, [id]);

    const validateForm = () => {
        if (!nameen || !namear || !descar || !descen || !price || !category) {
            setError("Please fill in all fields");
            return false;
        }
        if (nameen.length < 6 || namear.length < 6) {
            setError("Name must be at least 6 characters long");
            return false;
        }
        if (descar.length < 6) { // التحقق من طول الوصف العربي
            setError("Description AR must be at least 6 characters long");
            return false;
        }
        return true;
    };

    function update(e) {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setError("");
        setSuccess("");
        const token = window.localStorage.getItem('token');
        axios.post('http://127.0.0.1:8000/api/product/update', {
            name_en: nameen,
            name_ar: namear,
            desc_en: descen,
            desc_ar: descar,
            count: count,
            price: price,
            category_id: category, // Include category in the request
            product_id: `${id}`,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setLoading(false);
                setResponseData(response.data);
                setSuccess("Updating product successful!");
            })
            .catch((error) => {
                setLoading(false);
                setError("Update failed. Please try again.");
                if (error.response && error.response.data.errors) {
                    console.error("Validation errors:", error.response.data.errors);
                }
            });
    }

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="col-md-6 col-lg-4">
                <h1 className="text-center mb-4">Update Product</h1>
                <form className="form-control" onSubmit={update}>
                    {error && <p className="text-danger">{error}</p>}
                    {success && <p className="text-success">{success}</p>}

                    <div className="mb-3">
                        <label htmlFor="nameen">Product Name EN</label>
                        <input
                            id="nameen"
                            className="form-control form-control-lg"
                            value={nameen}
                            onChange={(e) => setNameen(e.target.value)}
                            name="nameen"
                            type="text"
                            placeholder="Product Name EN"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="namear">Product Name AR</label>
                        <input
                            id="namear"
                            className="form-control form-control-lg"
                            value={namear}
                            onChange={(e) => setNamear(e.target.value)}
                            name="namear"
                            type="text"
                            placeholder="Product Name AR"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="desc_ar">Description AR</label>
                        <input
                            id="desc_ar"
                            className="form-control form-control-lg"
                            value={descar}
                            onChange={(e) => setDescar(e.target.value)}
                            name="desc_ar"
                            type="text"
                            placeholder="Description AR"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="desc_en">Description EN</label>
                        <input
                            id="desc_en"
                            className="form-control form-control-lg"
                            value={descen}
                            onChange={(e) => setDescen(e.target.value)}
                            name="desc_en"
                            type="text"
                            placeholder="Description EN"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="price">Price</label>
                        <input
                            id="price"
                            className="form-control form-control-lg"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            name="price"
                            type="text"
                            placeholder="Price"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="count">Count</label>
                        <input
                            id="count"
                            className="form-control form-control-lg"
                            value={count}
                            onChange={(e) => setCount(e.target.value)}
                            name="count"
                            type="text"
                            placeholder="count"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            className="form-control form-control-lg"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name.en} / {cat.name.ar}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                        {loading ? "Updating..." : "Update"}
                    </button>
                    {error && <p className="text-danger">{error}</p>}
                    {success && <p className="text-success">{success}</p>}
                </form>
            </div>
        </div>
    );
}
