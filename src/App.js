function App() {

  const products = [
    {
      id: 1,
      name: "Laptop",
      price: "$900"
    },
    {
      id: 2,
      name: "Phone",
      price: "$500"
    },
    {
      id: 3,
      name: "Headphones",
      price: "$100"
    }
  ];

  return (
    <div style={{ padding: "30px" }}>
      <h1>E-Commerce Store</h1>

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px"
          }}
        >
          <h2>{product.name}</h2>
          <p>{product.price}</p>
          <button>Buy Now</button>
        </div>
      ))}
    </div>
  );
}

export default App;