import "../tailwindcss.less"
import styles from './index.module.less';
import classNames from 'classnames';

export default function IndexPage() {
  return (
    <div>
      <h1 className={classNames(styles.title, 'text-[#f40]')}>Page index</h1>
    </div>
  );
}
