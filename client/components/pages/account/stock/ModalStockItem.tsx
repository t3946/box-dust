import * as React from "react";
import { modalClose } from "@redux/reducer/Popup";
import ModalBoxItem from "@components/common/layout/modal-box-item/ModalBoxItem";
import useSelector from "@hooks/useSelector";
import { useDispatch } from "react-redux";
import Counter from "@components/common/form/Counter";
import * as Yup from "yup";
import { Form as FormikForm, Formik } from "formik";
import ButtonBlinkFlat, {
  ETheme,
} from "@components/common/ui/button-blink-flat/ButtonBlinkFlat";
import Style from "@components/pages/account/stock/ModalStockItem.module.scss";
import cn from "classnames";

export const ModalStockItem: React.FC = function () {
  const { show, item: stockItem } = useSelector(
    (state) => state.popup.modal.stockItem
  );

  if (!stockItem) {
    return null;
  }

  const { item, total } = stockItem;
  const dispatch = useDispatch();

  function close() {
    dispatch(
      modalClose({
        modal: "stockItem",
      })
    );
  }

  const initialValues = {
    count: 1,
  };
  const validationSchema = Yup.object().shape({
    count: Yup.number().required().min(1).max(total),
  });

  function submit() {
    alert("Submit");
  }

  function actionsTemplate() {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({ values, isSubmitting, handleChange, setValues }) => {
          return (
            <FormikForm>
              <div className={"d-flex"}>
                <div>
                  <div
                    className={cn(Style.listPrice)}
                    title={"Товаров на складе"}
                  >
                    <span>В наличии: </span>
                    <span>{total} шт.</span>
                  </div>

                  <div
                    className={cn(Style.listPrice)}
                    title={"Рассчётная рыночная стоимость выбранных предметов"}
                  >
                    <span>Стоимость: </span>
                    <span className="rouble">
                      {(item.list_price * values.count).toLocaleString("ru")}
                    </span>
                  </div>

                  <div
                    className={cn(
                      "d-flex",
                      "justify-content-between",
                      "align-items-center",
                      "mt-2",
                      "flex-row"
                    )}
                  >
                    <div className={"d-flex"}>
                      <Counter
                        name="count"
                        value={values.count}
                        handleChange={handleChange}
                        setValues={setValues}
                        min={1}
                        max={total}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className={"ms-4"}>
                      <ButtonBlinkFlat
                        theme={ETheme.primary}
                        className={cn("py-2")}
                      >
                        <span>Продать</span> <br />
                        <span className={Style.sellForText}>
                          (за{" "}
                          <span className="rouble">
                            {(
                              (item.list_price * values.count) /
                              2
                            ).toLocaleString("ru")}
                          </span>
                          )
                        </span>
                      </ButtonBlinkFlat>
                    </div>
                  </div>
                </div>
              </div>
            </FormikForm>
          );
        }}
      </Formik>
    );
  }

  return (
    <ModalBoxItem
      handleClose={close}
      item={item}
      show={show}
      actions={actionsTemplate()}
    />
  );
};

export default ModalStockItem;
