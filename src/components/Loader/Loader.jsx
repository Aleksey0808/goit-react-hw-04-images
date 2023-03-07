import { Load } from './Loader.styled';
import { InfinitySpin } from 'react-loader-spinner';

function Loader() {
  return (
    <Load>
      <InfinitySpin width="200" color="#4fa94d" />
    </Load>
  );
}

export default Loader;
