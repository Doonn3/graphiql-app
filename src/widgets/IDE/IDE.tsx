import React, { useState } from 'react';
import style from './ide.module.scss';

const defaultText = `
    query {
        countries {
            code
        }
    }
`.trim();

interface IIDE {
  handler: (data: string) => void;
}

function IDE(props: IIDE) {
  const [value, setValue] = useState(defaultText);

  const handlerButtonClick = () => {
    props.handler(value);
  };

  const handlerKeyDown = (event: React.KeyboardEvent) => {
    if (event.ctrlKey && event.code === 'Space') {
      props.handler(value);
    }
  };

  const handlerInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value);
  };

  return (
    <section className={style.ide}>
      <div className={style.header}>
        <button className={style.btn} onClick={handlerButtonClick}>
          Start
        </button>
      </div>

      <textarea
        className={style.edit}
        onKeyDown={handlerKeyDown}
        onInput={handlerInput}
        value={value}
      ></textarea>
    </section>
  );
}

export default IDE;
