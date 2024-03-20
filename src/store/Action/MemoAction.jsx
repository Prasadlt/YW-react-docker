import axios from "axios";
import { getMemoList } from "../Reducer/MemoReducer";

export const getMemoAction = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    axios
      .get("https://localhost:7142/api/Memos/memos")
      .then((res) => {
        /* eslint-disable no-console */
        console.log(res);
        dispatch(getMemoList(res));
        return resolve(res);
      })
      .catch((err) => {
        /* eslint-disable no-console */
        console.log(err);
        return reject(err);
      });
  });
};
