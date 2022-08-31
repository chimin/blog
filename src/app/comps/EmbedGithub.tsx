import { useRef, useEffect } from "react";
import { post } from "selenium-webdriver/http";
import { PostHeader } from "./PostHeader";

interface PropsType {
    target: string;
}

export function EmbedGithub(props: PropsType) {
    const divRef = useRef<HTMLParagraphElement>();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://emgithub.com/embed-v2.js?target=${encodeURIComponent(props.target)}&style=default&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on`;
        divRef.current.appendChild(script);
    }, []);

    return <div className="embed-github" ref={divRef} />;
}