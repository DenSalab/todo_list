import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from "./AddItemForm.module.css";

interface IAddItemForm {
  onPressButton: (value: string) => void
}

const AddItemForm: React.FC<IAddItemForm> = (
  {
    onPressButton
  }
) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    setError('');
  }
  const addTaskHandler = () => {
    if (value.trim()) {
      setError('')
      onPressButton(value.trim());
    } else {
      setError('Field is required!');
    }
    setValue('');
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTaskHandler();
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputBox}>
        <input
          className={`${styles.newTaskInput} ${error && styles.error}`}
          value={value}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
        <button className={styles.addTaskButton} onClick={addTaskHandler}>add</button>
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default AddItemForm;