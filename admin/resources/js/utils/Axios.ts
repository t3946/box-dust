import $ from 'umbrellajs';
import axios, {AxiosInstance as NativeAxiosInstance} from 'axios';

class Axios {
  public static getCSRFToken() {
    return $('meta[name="csrf-token"]').attr('content');
  }

  constructor() {
  }
}

interface postSMSOptions {
  //user data have not passed validation handler
  onError: (data: any) => void,
  //user data have passed validation handler
  onSuccess: (data: any) => void,
}

interface AxiosInstance extends NativeAxiosInstance {
  postSMS: (url: string, data: Record<any, any> | null, options: postSMSOptions) => {};
}


const axiosInstance = axios.create({
  baseURL: '/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRF-TOKEN': Axios.getCSRFToken(),
  }
});


export default axiosInstance;
