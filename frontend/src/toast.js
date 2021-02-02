// Helper for our generic toast messages
import { toast } from 'react-toastify';

export const error = (message) => {
  toast.error(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2500,
  })
}

export const success = (message) => {
  toast.success(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2500,
  })
}