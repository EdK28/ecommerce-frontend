import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "./ProductGrid.css";

const categories = ["All", "Consoles", "Games", "Accessories", "Subscriptions"];

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Fetch products from backend on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products");
        const data = await res.json();
        setProducts(data);
        setFiltered(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Re-filter whenever category changes
  useEffect(() => {
    if (category === "All") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((p) => p.category === category));
    }
  }, [category, products]);

  if (loading) return <p style={{ padding: "2rem" }}>Loading products...</p>;

  return (
    <div className="shop-wrapper">

      {/* Header */}
      <div className="shop-header">
        <h1 className="shop-title">Welcome to My Game Shop</h1>

        {/* Category Dropdown */}
        <div className="filter-wrap">
          <label className="filter-label">Filter:</label>
          <select
            className="filter-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Status */}
      <p className="status-bar">
        Showing <strong>{filtered.length}</strong> of{" "}
        <strong>{products.length}</strong> products
      </p>

      {/* Grid */}
      <div className="product-grid">
        {filtered.length === 0 ? (
          <p className="empty">No products found in this category.</p>
        ) : (
          filtered.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>

    </div>
  );
};

export default ProductGrid;