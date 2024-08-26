import UsersTable from "./TableComponent";

export default function Users() {

    // use effect => fetch data 
    // use state => save data users [] before show in pages
    // show data result after users.map(); 
    // data in table bootstrap 
    // user id - index - email - name - delete - update

    return (
        <div>


            <UsersTable></UsersTable>
        </div>
    );
}