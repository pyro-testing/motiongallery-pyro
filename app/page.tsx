import Image from 'next/image';
import MotionGallery from './components/MotionGallery';

export default function Home() {
  return (
    <div className="w-screen h-screen ">
      <MotionGallery />
    </div>
  );
}
