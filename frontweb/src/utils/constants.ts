import Swal from 'sweetalert2';

export const SwalRequestError = () => {
  Swal.fire({
    title: 'Oops',
    text: 'Houve um erro ao processar sua requisição',
    timer: 2700,
    icon: 'error',
    showConfirmButton: false,
  });
};
