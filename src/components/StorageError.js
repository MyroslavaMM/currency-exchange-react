import { useDispatch, useSelector } from "react-redux";
import { getExchangeValues, selectError, resetError } from "../reducers/exchangeReducer";

function Error() {
  const dispatch = useDispatch();
  const storeError = useSelector(selectError);

  const resetStorageError = () => {
    dispatch(resetError());
    dispatch(getExchangeValues());
  };

  if (storeError === true) {
    return (
      <div>
        <div className="error">
          <p className="error-message">The localStorage is full</p>
          <button className="reset btn btn-warning" onClick={resetStorageError}>
            Reset localStorage
          </button>
        </div>
      </div>
    );
  }
}

export default Error;
