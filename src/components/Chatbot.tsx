import React, { useEffect } from 'react';

// Extend window interface to prevent TS errors
declare global {
  interface Window {
    chatbase: any;
  }
}

const Chatbot: React.FC = () => {
  useEffect(() => {
    // Inject Chatbase script only once
    const scriptId = 'chatbase-script';
    if (!document.getElementById(scriptId)) {
      (function(){
        if(!window.chatbase || window.chatbase("getState") !== "initialized"){
          window.chatbase=(...args: any[])=>{
            if(!window.chatbase.q){window.chatbase.q=[]}
            window.chatbase.q.push(args)
          };
          window.chatbase=new Proxy(window.chatbase,{
            get(target,prop){
              if(prop==="q"){return target.q}
              return(...args: any[])=>target(prop,...args)
            }
          })
        }
        const onLoad=function(){
          const script=document.createElement("script");
          script.src="https://www.chatbase.co/embed.min.js";
          script.id="RQAqJS_-EAZ5aNXVTrMa1"; // This was in the original script
          script.domain="www.chatbase.co";
          document.body.appendChild(script);
        };
        if(document.readyState==="complete"){
          onLoad()
        }else{
          window.addEventListener("load",onLoad)
        }
      })();
    }

    // Cleanup: Remove bubble when component unmounts (e.g. going to /studio)
    return () => {
      // Chatbase iframe or bubble elements
      const bubbles = document.querySelectorAll('[id^="chatbase"]');
      bubbles.forEach(bubble => bubble.remove());
      const script = document.getElementById("RQAqJS_-EAZ5aNXVTrMa1");
      if (script) script.remove();
      // Remove any global state if necessary, but usually removing DOM is enough
      delete (window as any).chatbase;
    };
  }, []);

  return null;
};

export default Chatbot;
