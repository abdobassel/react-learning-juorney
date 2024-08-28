import { Outlet } from "react-router-dom";
import ProductsTable from "./ProductsTable";

export default function Products() {

    // use effect => fetch data 
    // use state => save data products [] before show in pages
    // show data result after products.map(); 
    // data in table bootstrap 
    // product id - index -name - delete - update - show

    return (
        <div>
            <ProductsTable>
                <Outlet></Outlet>
            </ProductsTable>
        </div>
    );
}