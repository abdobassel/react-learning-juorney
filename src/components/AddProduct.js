import { useState, useEffect } from "react";
import axios from "axios";

export default function AddProduct() {
    const [namear, setNamear] = useState("");
    const [nameen, setNameen] = useState("");
    const [descar, setDescar] = useState("");
    const [descen, setDescen] = useState("");
    const [count, setCount] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Fetch categories on component mount
    useEffect(() => {
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
    }, []);

    const validateForm = () => {
        if (!nameen || !namear || !descar || !descen || !price || !category) {
            setError("Please fill in all fields");
            return false;
        }
        if (nameen.length < 6 || namear.length < 6) {
            setError("Name must be at least 6 characters long");
            return false;
        }
        if (descar.length < 6) {
            setError("Description AR must be at least 6 characters long");
            return false;
        }
        return true;
    };

    function handleSubmit(e) {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setError("");
        setSuccess("");
        const token = window.localStorage.getItem('token');
        axios.post('http://127.0.0.1:8000/api/product/store', {
            name_en: nameen,
            name_ar: namear,
            desc_en: descen,
            desc_ar: descar,
            count: count,
            price: price,
            category_id: category,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setLoading(false);
                setSuccess("Product added successfully!");
                // Reset form fields
                setNameen("");
                setNamear("");
                setDescen("");
                setDescar("");
                setCount("");
                setPrice("");
                setCategory("");
            })
            .catch((error) => {
                setLoading(false);
                setError("Failed to add product. Please try again.");
                if (error.response && error.response.data.errors) {
                    console.error("Validation errors:", error.response.data.errors);
                }
            });
    }

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="col-md-6 col-lg-4">
                <h1 className="text-center mb-4">Add New Product</h1>
                <form className="form-control" onSubmit={handleSubmit}>
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
                            placeholder="Count"
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

                    <button className="btn btn-success w-100" type="submit" disabled={loading}>
                        {loading ? "Adding..." : "Add Product"}
                    </button>
                    {error && <p className="text-danger">{error}</p>}
                    {success && <p className="text-success">{success}</p>}
                </form>
            </div>
        </div>
    );
}
