import snamilmail_logo from '../../img/snamilmail_logo.png';

const Home: React.FC = () => {
  return (
    <div className='block fixed right-0 w-5/6 z-10 bg-white border-purple-400 overflow-y-auto mt-28 flex justify-center items-center'>
      <div className='flex flex-col mt-10'>
        <div>
          <span className='text-purple-800 text-6xl font-bold'>느린 우체통</span>
          <span className='ml-2 text-3xl'>이란</span>
        </div>
      <div className='flex flex-col'>
        <span className='text-sm text-lg text-gray-800'>전 세계 여러 나라 사람들과 편지를 주고받는 펜팔 서비스입니다.</span>
        <span className='text-sm text-lg text-gray-800 mb-6'>거리에 따라 달라지는 편지 도착 시간으로 편지를 기다리는 설레임을 느껴보세요.</span>
      </div>
      </div>
      <div className='ml-4 mt-10'>
          <img src={snamilmail_logo} className='w-96 h-96' alt="Logo" />
      </div>
    </div>
  );
}

export default Home;