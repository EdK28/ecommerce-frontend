const ProductCard = ({ product }) => {
  return (
    <div className="card">

      {/* Name and Badge */}
      <div className="card-top">
        <h3 className="card-name">{product.name}</h3>
        <span className={`badge badge-${product.category}`}>
          {product.category}
        </span>
      </div>

      {/* Description */}
      <p className="card-desc">{product.description}</p>

      {/* Price */}
      <p className="card-price">${product.price.toFixed(2)}</p>

      {/* Action Buttons */}
      <div className="card-actions">
        <button className="btn btn-cart">Add to cart</button>
        <button className="btn">Edit</button>
        <button className="btn btn-delete">Delete</button>
      </div>

    </div>
  );
};

export default ProductCard;