import axios from "axios";

const paystack = () => {
  const MySecretKey = `Bearer ${process.env.PAYSTACK_SECRET}`;

  const authFetch = axios.create({
    withCredentials: true,
  });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers = {
        authorization: MySecretKey,
        Accept: "application/json",
        "content-type": "application/json",
        "cache-control": "no-cache",
      };
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const initializePayment = async (form) => {
    form = JSON.stringify(form);

    try {
      const { data } = await authFetch.post(
        "https://api.paystack.co/transaction/initialize",
        form
      );
      return data;
    } catch (error) {
      console.log(error.response.data, "Initialized Error");
    }
  };

  const verifyPayment = async (ref) => {
    try {
      const { data } = await authFetch.get(
        "https://api.paystack.co/transaction/verify/" + encodeURIComponent(ref)
      );

      return data;
    } catch (error) {
      console.log(error.response.data, "Verify Error");
    }
  };

  return { initializePayment, verifyPayment };
};

export default paystack;
