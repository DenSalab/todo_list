import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import styles from './EditableSpan.module.css';

interface IEditableSpan {
  title: string
  changeTitle: (value: string) => void
}

const EditableSpan: React.FC<IEditableSpan> = (
  {
    title,
    changeTitle
  }
) => {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(title);

  const setTitle = () => {
    setEditMode(false);
    changeTitle(value);
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }

  const onKewDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setTitle();
    }
  }

  return (
    <>
      {
        editMode ? (
          <input
            autoFocus
            onBlur={setTitle}
            value={value}
            onChange={onChangeHandler}
            onKeyDown={onKewDownHandler}
          />
        ) : (
          <span
            className={styles.taskTitle}
            onDoubleClick={() => setEditMode(true)}
          >
            {title}
          </span>
        )
      }
    </>
  );
};

export default EditableSpan;