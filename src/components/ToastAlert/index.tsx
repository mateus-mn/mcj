import { ToastContainer } from 'react-toastify';

const ToastAlert = () => {
    return (
        <ToastContainer
            position="top-center"
            theme="colored"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick={true}
            style={{ width: '400px' }}
        />
    );
};

export default ToastAlert;
