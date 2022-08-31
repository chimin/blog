import { useRef, useEffect } from "react";

interface PropsType {
    target: string;
}

export function EmbedGithub(props: PropsType) {
    const divRef = useRef<HTMLParagraphElement>();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://emgithub.com/embed-v2.js?target=${encodeURIComponent(props.target)}&style=default&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on`;
        divRef.current.appendChild(script);

        return () => script.remove();
    }, [props.target]);

    return <div className="embed-github" ref={divRef} />;
}