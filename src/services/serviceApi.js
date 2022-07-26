import axios from "axios";
import { toast } from 'react-toastify';
import {trigger} from "../events";


const axiosClient = axios.create();
const isDev = process.env.NODE_ENV === "development";
// const loginRoute = isDev ? process.env.REACT_APP_DEV_LOGIN_URL : process.env.REACT_APP_PROD_LOGIN_URL

axiosClient.interceptors.response.use(
    res => res,
    err => {

    switch(err && err.response.status) {
        case 400:
          // code block
          toast.error(`${err.response.data.error}.`,{autoClose: false});
          break;
        case 401:
          // code block
          trigger("handleLogout")
          break;
        case 403:
        // code block
            toast.error(`${err.response.data.error}.`,{autoClose: false});
            break;
        case 404:
        // code block
        toast.error(`${err.response.data.error}.`,{autoClose: false});
        break;
        case 500:
         // code block
         toast.error(`${err.response.data.error}.`,{autoClose: false});
         break;
        default:
          // code block
          throw err;
      }
    }

  );

class ServiceApi {
    url = "";

    // SELECT BASE URL VERSION
    service() {
        axiosClient.defaults.baseURL = isDev ?
            process.env.REACT_APP_BASE_DEV_URL :
            process.env.REACT_APP_BASE_PROD_URL;
        return this;
    }

    // APPEND URL TO API URL
    appendToURL(url) {
        return (`${this.url}${url}`);
    }

    // GET API REQUEST
    async fetch(url, resolve = false) {
        try {
            const response = await axiosClient.get(
                this.appendToURL(url),
                this.setupHeaders()
            );
            return !resolve ?
                response : {...response };
        } catch (err) {
            return this.handleErrors(err);
        }
    }

    // POST API REQUEST
    async push(url, payload = null, resolve = false, is_attached = false) {
        try {
            const response = await axiosClient.post(
                this.appendToURL(url),
                payload,
                this.setupHeaders(is_attached)
            );

            return !resolve ?
                response : {...response };
        } catch (err) {
            return this.handleErrors(err);
        }
    }


    // PUT API REQUEST
    async update(url, payload = {}, resolve = false, is_attached = false) {
        try {
            const response = await axiosClient.put(
                this.appendToURL(url),
                payload,
                this.setupHeaders(is_attached),
            );

            return !resolve ?
                response : {...response };
        } catch (err) {
            return this.handleErrors(err);
        }
    }

    // DELETE API REQUEST
    async remove(url, payload = {}, resolve = false) {
        try {
            const response = await axiosClient.delete(
                this.appendToURL(url), {
                    data: payload,
                    ...this.setupHeaders(),
                }
            );

            return !resolve ?
                response : {...response };
        } catch (err) {
            return this.handleErrors(err);
        }
    }

    // SETUP HEADERS FOR SCENARIOS LIKE IMAGE UPLOAD
    setupHeaders(is_attached = false) {
        return is_attached ? {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `${localStorage.getItem("token")}`
            }, 
        } : {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem("token")}`
            },
        };
    }

    // HANDLE API REQUEST ERRORS
    handleErrors(err) {
        // Alert an error message
        const toastOptions = {
            autoClose: false,
        };
        // toast.error(`An error occured due to ${err.response.data.error}.Please try again`, toastOptions);
        console.error('API ERROR:', err.response.data.error);
        return err;
    }

    isSuccessful(response) {
        const codes = [200, 201, 202, 204];
        return codes.includes(response['status'] || response['statusCode'] || response['code']) ?
            true :
            false;
    }
}

export default new ServiceApi();