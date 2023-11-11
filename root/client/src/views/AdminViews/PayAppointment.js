import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';

const PayWithWalletButton = ({ onPaymentSuccess }) => {
  const [modal, setModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const { id } = useParams();

  const toggle = () => setModal(!modal);

  const handlePayment = async () => {
    try {
      const response = await axios.post(`/patients/payAppointmentWallet/${id}`, {});
      if (response.status === 200) {
        setPaymentStatus('success');
        toggle();
        if (onPaymentSuccess) {
          onPaymentSuccess();
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.error === 'Insufficient wallet balance') {
        setPaymentStatus('insufficientBalance');
      } else {
        setPaymentStatus('error');
        // Handle other errors (display an error message, etc.)
        console.error('Payment error:', error);
      }
    }
  };

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        Pay with Wallet
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Confirm Payment</ModalHeader>
        <ModalBody>
          Are you sure you want to proceed with the payment using your wallet?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handlePayment}>
            Confirm Payment
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {paymentStatus === 'success' && (
        <Alert color="success" style={{ marginTop: '1rem' }}>
          Payment successful from wallet.
        </Alert>
      )}

      {paymentStatus === 'insufficientBalance' && (
        <Alert color="danger" style={{ marginTop: '1rem' }}>
          Insufficient wallet balance. Please add funds to your wallet.
        </Alert>
      )}

      {paymentStatus === 'error' && (
        <Alert color="danger" style={{ marginTop: '1rem' }}>
          An error occurred during the payment. Please try again. (No pending appointment)
        </Alert>
      )}
    </div>
  );
};

export default PayWithWalletButton;
