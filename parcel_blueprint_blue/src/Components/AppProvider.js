import React, { useEffect, useState, createContext } from 'react';

export const AppContext = createContext()
export default function (props) {

    const [shiftDown, setShiftDown] = useState(false);

    const [rs, setRs] = useState(0);
    const [ws, setWs] = useState(null);

    /* keyboard Halo */
    const [HaloCount, setHaloCount] = useState(5);
    const [HaloCells, setHaloCells] = useState([]);

    const [HaloIndex, setHaloIndex] = useState(0);
    const [HaloTheta, setHaloTheta] = useState(null);
    const [HaloRadius, setHaloRadius] = useState(null);
    const [microIndex, setMicroIndex] = useState(1);

    const [HaloZoom, setHaloZoom] = useState(0);
    const [HaloAngleCss, setHaloAngleCss] = useState('rotateY(0deg)');
    const [HaloZoomCss, setHaloZoomCss] = useState('translateZ(0px)');
    const [StaticHaloZoom, setStaticHaloZoom] = useState(0);

    const [loading, setLoading] = useState(true);

    const request = async (type, data) => {
        let payload = {
            jwt: null,
            type,
            data
        };
        ws.send(JSON.stringify(payload));
    }

    const heartbeat = async (ws) => {
        setTimeout(function () {
            if (rs !== ws.readyState) { setRs(ws.readyState); }
            heartbeat(ws);
        }.bind(this), 1000);
    }

    const configureWebSocket = async () => {
        ws.onopen = function (open_event) {
            console.log(open_event);
            ws.onmessage = function (msg_event) {
                console.log(msg_event);
                let tjo = JSON.parse(msg_event.data);
                console.log(tjo);
                switch (tjo['type']) {
                    case "test-response-from-node-server":
                        console.log(tjo['data']);
                        break;
                    default:
                        break;
                }
            }
            ws.onclose = function (close_event) {
                console.log(close_event);
            }
            ws.onerror = function (error_event) {
                console.log(error_event);

            }
            request('node-client-test-msg', 'Hello node server from client.');

        }
    }

    /* Halo Stuff */

	const doRotate = (anInt) => {
		setHaloIndex(HaloIndex + anInt);
		if(anInt == -1) {
			((microIndex - 1) === 0) ? setMicroIndex(HaloCount) : setMicroIndex(microIndex - 1)
		}
		if(anInt == 1) {
			((microIndex + 1) === (HaloCount + 1)) ?setMicroIndex(1) : setMicroIndex(microIndex + 1);
		}
	}

    

	useEffect(() => {
		let theta = 360 / HaloCount;
		setHaloTheta(theta);
		
		let cz = window.innerWidth;
		let r = Math.round( (cz / 2) / Math.tan( Math.PI / HaloCount))
		setHaloRadius(r);
		
		let nhcts = []; //new halo cell tranlates
		for ( var i=0; i < HaloCount; i++) {
			let ca = theta * i; //cell angle
			nhcts[i] = 'rotateY(' + ca + 'deg) translateZ(' + r + 'px)';
		}

		setHaloCells( [ ...nhcts] );
		
		setStaticHaloZoom(-r);
		if(loading === true) { r = r + 500; }
	
		setHaloZoomCss('translateZ(' + -r + 'px)');
		
		setHaloIndex(0);
		setMicroIndex(1);
	},[HaloCount]);	
	

    /* keyboard stuff */
    const handleKeyUpEvent = async (key_event) => {
        if (key_event.type == "keyup") {
            switch (key_event.key) {
                case 'Escape':
                    break;
                case 'Shift':
                    setShiftDown(false);
                    break;
                case 'Enter':
                    break;
                case 'ArrowLeft':
                    break;
                case 'ArrowRight':
                    break;
                case 'ArrowDown':
                    break;
                case 'ArrowUp':
                    break;
            }
        }
    };

    const handleKeyDownEvent = async (key_event) => {
        if (key_event.type == "keydown") {
            switch (key_event.key) {
                case 'Escape':
                    break;
                case 'Shift':
                    setShiftDown(true);
                    break;
                case 'Enter':
                    break;
                case 'ArrowLeft':
                case 'ArrowRight':
                case 'ArrowDown':
                case 'ArrowUp':
                    if (key_event.shiftKey === true && key_event.key == 'ArrowLeft') { doRotate(-1); };
                    if (key_event.shiftKey === true && key_event.key == 'ArrowRight') { doRotate(1); };
                    break;
                default:
                    break;
            }
        }
    }

    useEffect(()=>{
        let angle = HaloTheta * HaloIndex * -1;
        setHaloAngleCss('rotateY('+angle+'deg)');
    },[HaloIndex])
	

    useEffect(() => {
        
        if (shiftDown == true) {
            let nzv = StaticHaloZoom + -HaloZoom;
            setHaloZoomCss('translateZ(' + nzv + 'px)');
        } else if (shiftDown == false && HaloZoom !== 0) {
            let nzv = StaticHaloZoom + HaloZoom;
            setHaloZoomCss('translateZ(' + nzv + 'px)');
        }
    }, [shiftDown]);


    useEffect(() => {
        if (loading === false) {
            setHaloZoomCss('translateZ(' + StaticHaloZoom + 'px)');
        }
    }, [loading]);


    useEffect(() => {
        window.addEventListener("keyup", handleKeyUpEvent);

        return () => {
            window.removeEventListener("keyup", handleKeyUpEvent);
        }
    }, [handleKeyUpEvent])

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDownEvent);
        return () => {
            window.removeEventListener("keydown", handleKeyDownEvent);
        }
    }, [handleKeyDownEvent])

    /**Load web socket */
    useEffect(() => {
        if (ws == null) { setWs(new WebSocket("ws://localhost:1300/ws")) }
        if (ws !== null && rs == 0) { configureWebSocket(); heartbeat(ws); }
    }, [ws, rs]);


    return (
        <AppContext.Provider value={{
            rs,
            HaloCount,
            HaloCells,
            HaloIndex,
            microIndex,
            setHaloIndex,
            HaloZoomCss,
            HaloAngleCss
        }}>
            {props.children}
        </AppContext.Provider>
    )
}