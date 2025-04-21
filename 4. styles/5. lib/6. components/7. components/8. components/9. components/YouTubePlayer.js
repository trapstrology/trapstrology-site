import YouTube from 'react-youtube';

export default function YouTubePlayer() {
  // Replace UCXXXXXXXXXXXX with your channel’s actual ID
  const channelId = 'UCXXXXXXXXXXXX';
  const uploadsPlaylistId = 'UU' + channelId.slice(2);

  const opts = {
    height: '360',
    width: '640',
    playerVars: {
      listType: 'playlist',
      list: uploadsPlaylistId,
      autoplay: 1,
      loop: 1,
      controls: 0,
      modestbranding: 1,
      iv_load_policy: 3
    },
  };

  return (
    <div style={{ textAlign: 'center', margin: '2rem 0' }}>
      <YouTube opts={opts} />
    </div>
  );
}
