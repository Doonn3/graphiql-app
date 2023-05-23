import { useDispatch, useSelector } from 'react-redux';
import './ModalError.scss';
import Modal from 'react-bootstrap/Modal';
import { RootState } from '@shared/store/store';
import { changeShowModal } from '@shared/store/textEditorSlice';

const ModalError = () => {
  const showModal = useSelector((state: RootState) => state.ide.showModal);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(changeShowModal(false));
  };

  return (
    <Modal className="modal-error" show={showModal} onHide={handleClose}>
      <Modal.Dialog className="modal-error-window">
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>eeeerrrroooeoeoeof.</p>
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
  );
};

export default ModalError;
