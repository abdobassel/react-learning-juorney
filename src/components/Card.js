export function Card(props) {
    return (
        <div style={{ width: "300px" }}>
            <div style={{
                backgroundImage: `url(${props.img})`, width: "300px",
                height: "300px", backgroundRepeat: "no-repeat", backgroundSize: "cover", borderRadius: "50px"
            }}>

            </div>
            <div style={{ display: "flex", justifyContent: "space-between", }}>
                <h1 style={{ fontSize: "20px", color: "green" }}>Title: {props.title}</h1>

                <h3 style={{ fontSize: "18px", color: "grey" }}>Review:{props.review}</h3>
            </div>
            <hr></hr>
            <h2>Price: {props.price}</h2>


        </div>
    );
}