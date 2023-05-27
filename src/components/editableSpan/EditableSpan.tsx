import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {TextField, Typography} from "@mui/material";

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
          <TextField
            autoFocus
            onBlur={setTitle}
            value={value}
            onChange={onChangeHandler}
            onKeyDown={onKewDownHandler}
            variant="standard"
          />
        ) : (
          <Typography variant={'h6'} onDoubleClick={() => setEditMode(true)}>
            {title}
          </Typography>
        )
      }
    </>
  );
};

export default EditableSpan;