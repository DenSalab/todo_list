import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from "./AddItemForm.module.css";
import {Box, Button, TextField} from "@mui/material";

interface IAddItemForm {
  onPressButton: (value: string) => void
  label: string
}

const AddItemForm: React.FC<IAddItemForm> = (
  {
    onPressButton,
    label
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
      e.preventDefault();
      addTaskHandler();
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputBox}>
        <Box
          component="form"
          sx={{
            '& > :not(style)': {m: 1},
          }}
          autoComplete="off"
          className={styles.inputBox}
        >
          <TextField
            className={`${styles.newTaskInput} ${error && styles.error}`}
            value={value}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            variant={"outlined"}
            size={"small"}
            label={label}
            margin={"dense"}
          />
          <Button
            className={styles.addTaskButton}
            variant="contained"
            size={"small"}
            onClick={addTaskHandler}
          >
            add
          </Button>
        </Box>
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default AddItemForm;