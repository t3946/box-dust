import * as React from "react";
import { modalClose } from "@redux/reducer/Popup";
import ModalBoxItem from "@components/common/layout/modal-box-item/ModalBoxItem";
import useSelector from "@hooks/useSelector";
import { useDispatch } from "react-redux";

export const ModalStockItem: React.FC = function () {
  const { show, item } = useSelector((state) => state.popup.modal.stockItem);
  const dispatch = useDispatch();

  function close() {
    dispatch(
      modalClose({
        modal: "stockItem",
      })
    );
  }

  if (!item) {
    return null;
  }

  return <ModalBoxItem handleClose={close} item={item} show={show} />;
};

export default ModalStockItem;
