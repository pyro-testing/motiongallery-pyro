import Image from 'next/image';
import MouseGallery from './components/MouseGallery';

export default function Home() {
  return (
    <div className="w-screen h-screen ">
      <MouseGallery />
    </div>
  );
}
