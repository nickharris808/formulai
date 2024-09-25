import React, { useEffect } from 'react';

const ProductSorter = () => {
  useEffect(() => {
    const sortProductsByScore = () => {
      if (!window.personalizationData) return;

      const productItems = Array.from(document.querySelectorAll('.product-item'));
      const productsWithScores = productItems.map((item) => {
        const productId = item.getAttribute('data-product-id');
        const score = window.personalizationData[`product_${productId}`]?.score || 0;
        return { element: item, score };
      });

      productsWithScores.sort((a, b) => b.score - a.score);

      const parent = productItems[0]?.parentNode;
      if (!parent) return;

      productsWithScores.forEach((product) => {
        parent.appendChild(product.element);
      });
    };

    // Initial sort
    sortProductsByScore();

    // Re-sort when personalization data changes
    window.addEventListener('personalizationDataUpdated', sortProductsByScore);

    return () => {
      window.removeEventListener('personalizationDataUpdated', sortProductsByScore);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default ProductSorter;