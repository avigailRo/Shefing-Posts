import axios from 'axios';
import { setLoading } from '../redux/slices/loadingSlice';
import { setError } from '../redux/slices/errorSlice';
const AxiosInstance = (store: any) => {
  const requestInterceptor = axios.interceptors.request.use(
    (next) => {
      store.dispatch(setLoading(true))
      return next;
    },
  );

  const responseInterceptor = axios.interceptors.response.use(
    (next) => {
      store.dispatch(setLoading(false))
      return Promise.resolve(next);
    },
    (error) => {
      store.dispatch(setLoading(false))
      if (error.response?.status == 500) {
        if (error.response.data && error.response.data.message) {
          store.dispatch(setError(error.response.data.message));
          return;
        } else {
          store.dispatch(setError("An error occurred!"));
          return
        }
      }
      return Promise.reject(error);
    }

  );
  return () => {
    axios.interceptors.request.eject(requestInterceptor);
    axios.interceptors.response.eject(responseInterceptor);
  };
}
export default AxiosInstance;
