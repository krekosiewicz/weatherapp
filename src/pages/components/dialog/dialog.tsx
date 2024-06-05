// src/components/Dialog.tsx
import React, { useRef, useEffect } from 'react';
import styles from './dialog.module.scss';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      if (isOpen) {
        if (!dialog.open) {
          dialog.showModal();
        }
      } else {
        dialog.close();
      }
    }
  }, [isOpen]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog ref={dialogRef} className={styles.dialog} onClick={handleBackdropClick}>
      <div className={styles.dialogContent}>
        {children}
        <div className={styles.dialogHeader}>
          <div onClick={onClose} className={`appButton ${styles.closeButton}`}>Close</div>
        </div>
      </div>
    </dialog>
  );
};

export default Dialog;
