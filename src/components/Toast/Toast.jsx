import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { ToastContext } from '../../context/ToastContext';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import './Toast.css';

export const Toast = () => {
  const { toasts, removeToast } = useContext(ToastContext);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={18} className="toast-icon success" />;
      case 'error':
        return <XCircle size={18} className="toast-icon error" />;
      case 'warning':
        return <AlertTriangle size={18} className="toast-icon warning" />;
      default:
        return <Info size={18} className="toast-icon info" />;
    }
  };

  const toastList = (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-item ${toast.type}`}>
          {getIcon(toast.type)}
          <span className="toast-message">{toast.message}</span>
          <button onClick={() => removeToast(toast.id)} className="toast-close-btn">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );

  const portalRoot = document.getElementById('portal-root');
  return portalRoot ? ReactDOM.createPortal(toastList, portalRoot) : null;
};
export default Toast;
