import { useState } from "react";
import axios from "axios";

export default function UpdateProduct() {
    const [namear, setNamear] = useState("");

    const [nameen, setNameen] = useState("");
    const [descar, setDescar] = useState("");
    const [descen, setDescen] = useState("");
    const [price, setPrice] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [dataResponse, setResponseData] = useState([]);

    //  console.log(dataResponse);
    //http://127.0.0.1:8000/api/product/details
    const id = window.location.pathname.split("/").slice(-1)[0];
    console.log(id);

    axios.post('http://127.0.0.1:8000/api/product/details', {
        product_id: id
    }).then((response) => {
        console.log(response.data);
        const productsRes = response.data;
        if (productsRes.status) {
            const productData = productsRes.result;
            setNameen(productData.name.en);
            setNamear(productData.name.ar);
            setDescen(productData.description.en);
            setDescar(productData.description.ar);
            setPrice(productData.price);


        }
    });
    const validateForm = () => {
        if (!nameen || !namear || !descar || !descen || !price) {
            setError("Please fill in all fields");
            return false;
        }
        if (nameen.length < 6 || namear.length < 6) {
            setError("Name must be at least 6 characters long");
            return false;
        }
        return true;
        // لو اي خطا حصل اللي هيرجع هيكون false 
        // فعشان كده احنا بنرجع في الاخر return true 
        // يعني لو رجع ترو اذن الفاليديشن تمام 
    };

    function update(e) {
        e.preventDefault(); // لمنع ارسال البيانات غير بعد الفاليديشن

        if (!validateForm()) return; // لو رجع الفولس يبقى لازم نوقف الفانكشن


        setLoading(true); // تحت الزرار هيتغير التكست فيه 
        setError(""); //  هيتملي في حالة ان في ايرور
        setSuccess("");
        const token = window.localStorage.getItem('token');
        axios.post('http://127.0.0.1:8000/api/product/update', {
            name_en: nameen,
            desc_en: descen,
            desc_ar: descar,
            price: price,
            product_id: `${id}`,
            // الباك اند انا اللي عامله من  مشروع بلارافيل 
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                // هنغير الحلة بتاع لودينج لفولس عشان الزرار يرجع لاصله طالما العملية تمت سواء نجاح او فشل
                setLoading(false);
                console.log(response.data);
                setResponseData(response.data);

                setSuccess("updating product successful!."); // ملينا الsuccess
                // Optionally, you could redirect the user or clear the form here
            })
            .catch((error) => {
                setLoading(false);
                setError("Update failed. Please try again.");
                console.error(error);
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
                        <input
                            className="form-control form-control-lg"
                            value={nameen}
                            onChange={(e) => setNameen(e.target.value)}
                            name="nameen"
                            type="text"
                            placeholder="Product Name AR"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            className="form-control form-control-lg"
                            value={namear}
                            onChange={(e) => setNamear(e.target.value)}
                            name="namear"
                            type="text"
                            placeholder="Product Name EN"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            className="form-control form-control-lg"
                            value={descar}
                            onChange={(e) => setDescar(e.target.value)}
                            name="desc_ar"
                            type="text"
                            placeholder="Description Ar"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            className="form-control form-control-lg"
                            value={descen}
                            onChange={(e) => setDescen(e.target.value)}
                            name="desc_en"
                            type="text"
                            placeholder="Description EN"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            className="form-control form-control-lg"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            name="price"
                            type="text"
                            placeholder="Price"
                        />
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
