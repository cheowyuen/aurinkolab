import videoURL from '/src/assets/boatsVideo.mp4';

function BoatVideo() {
  console.log(videoURL)
  return (
    <video className="h-100vh w-full object-cover" autoPlay muted loop>
      <source src={videoURL} type="video/mp4" />
    </video>
  );
}

export default BoatVideo;
