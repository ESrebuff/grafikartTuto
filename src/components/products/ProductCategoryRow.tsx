export function ProductCategoryRow({ name }: { name: string }) {
  return (
    <tr>
      <td colSpan={2}>
        <strong>{name}</strong>
      </td>
    </tr>
  );
}
