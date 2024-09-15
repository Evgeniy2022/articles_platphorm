import styles from "./Modal.module.css";
import Image from "/exclamation-circle.png";

interface ModalProps {
  setOpen: (arg: boolean) => void;
  deleteArticleFunction: () => Promise<void>;
}

export default function Modal({ setOpen, deleteArticleFunction }: ModalProps) {
  function deleteArticle() {
    deleteArticleFunction();
    setOpen(false);
  }

  return (
    <div className={styles.modal}>
      <div className={styles.top}>
        <img src={Image} alt="" />
        <h2 className={styles.title}>Are you sure to delete this article?</h2>
      </div>
      <div className={styles.btns}>
        <button className={styles.edit} onClick={() => setOpen(false)}>
          No
        </button>
        <button className={styles.delete} onClick={deleteArticle}>
          Yes
        </button>
      </div>
    </div>
  );
}
