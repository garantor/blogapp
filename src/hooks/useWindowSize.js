import { useState, useEffect } from 'react'

function useWindowSize () {
    const [windowSize, setWindowSize ] = useState({
        width:undefined,
        height:undefined
    });
    useEffect(() => {
        function handleResize (){
            setWindowSize({
                width:window.innerWidth,
                height: window.innerHeight,
            });
        }
        handleResize();
        window.addEventListener('resize', handleResize);

        //This function cleanup
        function cleanUp (){
            console.log(" run if a useEffect changes")
            window.removeEventListener("resize", handleResize);
        }
        return cleanUp;


    }, [])
    return windowSize;
}

export default useWindowSize;