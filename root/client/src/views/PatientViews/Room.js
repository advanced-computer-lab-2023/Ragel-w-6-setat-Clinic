import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { VideoPlayer } from './VideoPlayer';

const APP_ID = 'ba68b1f23e454d549869f522611a02b3'
const TOKEN = '007eJxTYHhTY3LYVM3NN/OI3VPWht6pzE9dWyWnv943782tJa+Zz+5TYEhKNLNIMkwzMk41MTVJMTWxtDCzTDM1MjIzNEw0MEoyrmapS20IZGQoN/nNwAiFID4LQ0lqcQkDAwBxcB+y'
const CHANNEL = 'test';

const client = AgoraRTC.createClient({
  mode: 'rtc',
  codec: 'vp8',
});

const Room = () => { 
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);

  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);

    if (mediaType === 'video') {
      setUsers((previousUsers) => [...previousUsers, user]);
    }

    if (mediaType === 'audio') {
        user.audioTrack.play()
    }
  };
  const handleUserLeft = (user) => {
    setUsers((previousUsers) =>
      previousUsers.filter((u) => u.uid !== user.uid)
    );
  };
  useEffect(() => {
    client.on('user-published', handleUserJoined);
    client.on('user-left', handleUserLeft);

    client
      .join(APP_ID, CHANNEL, TOKEN, null)
      .then((uid) =>
        Promise.all([
          AgoraRTC.createMicrophoneAndCameraTracks(),
          uid,
        ])
      ).then(([tracks,uid]) => {
        const [audioTrack, videoTrack] = tracks;
        setUsers((previousUsers) => [...previousUsers,
             {
              uid,
              audioTrack,
              videoTrack 
            }]);
        return client.publish(tracks);
      })
  }, []);
  return (
    <div> VideoRoom 
        {users.map((user) => (
          <VideoPlayer key={user.uid} user={user} /> 
          ))}
    </div>
  );
  
};
export default Room;


