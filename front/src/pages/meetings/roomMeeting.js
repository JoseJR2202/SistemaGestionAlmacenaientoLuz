import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import {Row, Col, Container, Card} from 'react-bootstrap'
import { useParams } from "react-router-dom";
import {BsCameraVideo, BsCameraVideoOff } from 'react-icons/bs';
import {AiOutlineAudio, AiOutlineAudioMuted, AiOutlineVideoCamera, AiTwotoneAudio } from 'react-icons/ai';

const StyledVideo = styled.video`
    height: 100%;
    width: 100%;
`;

const StyledVideoRemote = styled.video`
    height: 100%;
    width: 100%;
`;

const StyledListVideo = styled.div`
    height: 100vh;
    width: 100%;
    overflow: scroll;
`;

//componente de video
const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
        // eslint-disable-next-line
    }, []);

    return (
        <StyledVideoRemote playsInline autoPlay ref={ref} />
    );
}

const Room = () => {

    const searchParams = useParams();
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const [streamvideo, setStreamvideo]= useState(new MediaStream());
    const peersRef = useRef([]);
    const roomID = searchParams.id;
    const [isAdmin, setAdimn]= useState(false);
    const [controlParticipates, setControlParticipates]=useState([{id:'', video:true}])
    const [video, setVideo]= useState(true);
    const [audio, setAudio]= useState(true)
    useEffect(() => {
        socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            setStreamvideo(stream)
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                console.log(users);
                if(users.length===0)
                    setAdimn(true)
                const peers = [];
                const control=[];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push({
                        peerID: userID,
                        peer,
                    });
                    control.push({
                        id:userID,
                        video:true,
                        audio:true
                    })
                })
                setPeers(peers);
                setControlParticipates(control);
                console.log(control)
                console.log(peers)

            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, {
                    peerID:payload.callerID,
                    peer
                }]);
                setControlParticipates(control=>[...control,{
                    id:payload.callerID,
                    video:true
                }]);

            });

            socketRef.current.on('hide cam',()=>{
                const video=stream.getTracks().find(track=> track.kind==='video');
                console.log(video)
                video.enabled=false;
                setVideo(false)
            });

            socketRef.current.on("show cam", ()=>{
                const video=stream.getTracks().find(track=> track.kind==='video');
                console.log(video)
                video.enabled=true;
                setVideo(true);
            });

            socketRef.current.on('hide sound',()=>{
                const audio=stream.getTracks().find(track=> track.kind==='audio');
                console.log(video)
                audio.enabled=false;
                setAudio(false)
            });

            socketRef.current.on("show sound", ()=>{
                const audio=stream.getTracks().find(track=> track.kind==='audio');
                console.log(video)
                audio.enabled=true;
                setAudio(true);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });

            socketRef.current.on("user left", id => {
                const peerOut= peersRef.current.find(item=>item.peerID===id);
                if(peerOut)
                    peerOut.peer.destroy();
                const peers= peersRef.current.filter(item=> item.peerID!==id);
                peersRef.current=peers;
                setPeers(peers);
            });
        })
        // eslint-disable-next-line
    }, []);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    return (
        <Container fluid={true}>
            <Row>
                <Col xs={8}>
                    <Card>
                        <Card.Body>
                            <StyledVideo muted ref={userVideo} autoPlay playsInline />
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            <Row className="justify-content-center">
                                <Col xs={"auto"}>
                                    {video?
                                    <BsCameraVideo size={40} onClick={()=>{
                                        //Misma funcionalidad para el audio, solo debe de buscar el track.kind=== audio
                                        const video=streamvideo.getTracks().find(track=> track.kind==='video');
                                        console.log(video)
                                        video.enabled=!video.enabled;
                                        video.enabled?setVideo(true):setVideo(false)
                                    }}/>
                                    :
                                    <BsCameraVideoOff size={40} onClick={()=>{
                                        //Misma funcionalidad para el audio, solo debe de buscar el track.kind=== audio
                                        const video=streamvideo.getTracks().find(track=> track.kind==='video');
                                        console.log(video)
                                        video.enabled=!video.enabled;
                                        video.enabled?setVideo(true):setVideo(false)
                                    }}/>
                                    }
                                </Col>
                                <Col xs={"auto"}>
                                    {audio?
                                    <AiOutlineAudio size={40} onClick={()=>{
                                        //Misma funcionalidad para el audio, solo debe de buscar el track.kind=== audio
                                        const audio=streamvideo.getTracks().find(track=> track.kind==='audio');
                                        console.log(audio)
                                        audio.enabled=!audio.enabled;
                                        audio.enabled?setAudio(true):setAudio(false)
                                    }}/>
                                    :
                                    <AiOutlineAudioMuted size={40} onClick={()=>{
                                         //Misma funcionalidad para el audio, solo debe de buscar el track.kind=== audio
                                         const audio=streamvideo.getTracks().find(track=> track.kind==='audio');
                                         console.log(audio)
                                         audio.enabled=!audio.enabled;
                                         audio.enabled?setAudio(true):setAudio(false)
                                     }}/>
                                    }
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col>
                <StyledListVideo>
                {isAdmin?
                    <>
                    {peers.map((peer) => {
                        return (
                            <Row key={peer.peerID}>
                                <Card>
                                    <Card.Body>
                                        <Video peer={peer.peer} />
                                    </Card.Body>
                                    <Card.Footer className="text-muted">
                                        <Row className="justify-content-center">
                                            <Col xs={"auto"}>
                                                <AiOutlineVideoCamera size={30} onClick={()=>{
                                                    if(controlParticipates.find(item=> item.id===peer.peerID).video){
                                                        socketRef.current.emit('hide remote cam', peer.peerID);
                                                        controlParticipates.find(item=> item.id===peer.peerID).video=false;
                                                    }else{
                                                        socketRef.current.emit('show remote cam', peer.peerID);
                                                        controlParticipates.find(item=> item.id===peer.peerID).video=true;
                                                    }
                                                }}/>
                                            </Col>
                                            <Col xs={"auto"}>
                                                <AiTwotoneAudio size={30} onClick={()=>{
                                                    if(controlParticipates.find(item=> item.id===peer.peerID).audio){
                                                        socketRef.current.emit('hide remote sound', peer.peerID);
                                                        controlParticipates.find(item=> item.id===peer.peerID).audio=false;
                                                    }else{
                                                        socketRef.current.emit('show remote sound', peer.peerID);
                                                        controlParticipates.find(item=> item.id===peer.peerID).audio=true;
                                                    }
                                                }}/>
                                            </Col>
                                        </Row>
                                    </Card.Footer>
                                </Card>
                            </Row>
                            );
                        })}
                    </>
                    :
                    <>
                    {peers.map((peer) => {
                        return (
                            <Row key={peer.peerID}>
                                <Card>
                                    <Card.Body>
                                        <Video peer={peer.peer} />
                                    </Card.Body>
                                </Card>
                            </Row>
                        );
                    })}
                    </> 
                }
                </StyledListVideo>
                </Col>
            </Row>
        </Container> 
    );
};

export default Room;
