# TODO: Fix ProductDetails Page Layout to Match Screenshot

## Steps to Complete:

1. **[x] Update assets.js**: Add 'rating: 4.5' and 'weight: "500g"' to the potato product (_id: "gd46g23h") in dummyProducts array. This enables dynamic rating and explicit weight display.

2. **[x] Edit ProductDetails.jsx**:
   - [x] Implement dynamic star rating: Render filled stars for Math.floor(rating), half-star if decimal >0, empty for remainder. Use product.rating || 4.
   - [x] Add weight display: Below rating, show `{product.weight || extract from name} e.g., 500g`.
   - [x] Adjust price display: Show crossed-out original if offerPrice < price, else single MRP. Match screenshot's "MRP 20".
   - [x] Fix Tailwind classes: Replace "max-w-100" with "w-full max-w-md"; add "h-96 object-cover" to main image for fixed sizing.
   - [x] Add related products section: Below buttons, render up to 4 related products using ProductCard component (import from "../components/ProductCard").

3. **Test Changes**:
   - Ensure dev server is running (npm run dev in client/).
   - Navigate to /products/gd46g23h (Potato ID).
   - Verify: Breadcrumbs, stacked thumbnails + main image, name, dynamic rating with "500g", price "MRP ₹20", description bullets, Add to Cart/Buy Now buttons, related products grid.
   - Test cart: Click Add to Cart, check toast, navigate to /cart to see item.

4. **Finalize**:
   - Update this TODO.md with [x] for completed steps.
   - If issues, investigate index.css or routing in App.jsx.

Progress: Steps 1-2 completed. Proceeding to testing.
