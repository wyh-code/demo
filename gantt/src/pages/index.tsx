import styles from './index.less';
import Gantt from '../gantt';

export default function IndexPage() {

  return (
    <div 
      style={{ 
        width: 600, 
        height: 400, 
        border: '1px solid red',
        marginLeft: 100,
        overflow: 'scroll',
        padding: 20
      }}>
      <Gantt data={data} />
    </div>
  );
}
