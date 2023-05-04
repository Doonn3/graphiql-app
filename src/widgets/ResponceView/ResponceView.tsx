import LexerJson from '../../shared/LOGIC_EXPEREMENTAL/LexerJson';
import style from './responce.module.scss';

const le = new LexerJson();
const jsonTest = `{
    "data": {
    "countries": [
      {
        "code": "AD"
      },
        ]
    }
}`;

interface IResponceView {
  data: string;
}

function ResponceView(props: IResponceView) {
  console.log(le.parse(jsonTest));
  return <div className={style.responce}>{props.data}</div>;
}

export default ResponceView;
