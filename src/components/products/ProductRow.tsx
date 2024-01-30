interface Product {
  product: {
    category: string;
    price: string;
    stocked: boolean;
    name: string;
  };
}

export function ProductRow({ product }: Product) {
  const style = product.stocked ? undefined : { color: "red" };

  return (
    <tr>
      <td style={style}>{product.name}</td>
      <td>{product.price}</td>
    </tr>
  );
}
