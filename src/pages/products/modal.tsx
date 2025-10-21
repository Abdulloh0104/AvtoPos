import type { ModalProps, Product } from "@types";

interface DepotProps extends ModalProps {
  update: Product | null;
}
const ProductModal = ({ open, toggle, update }: DepotProps) => {
  console.log(open,toggle,update);
  return <div>ProductModal</div>;
};

export default ProductModal;