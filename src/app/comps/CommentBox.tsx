import { useEffect } from 'react';

export function CommentBox() {
    useEffect(() => {
        (window as any).gc_params = {
            graphcomment_id: 'c4compile',
            fixed_header_height: 0,
        };

        const gc = document.createElement('script'); gc.type = 'text/javascript'; gc.async = true;
        gc.src = 'https://graphcomment.com/js/integration.js?' + Math.round(Math.random() * 1e8);
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(gc);

        return () => {
            gc.remove();
        };
    }, []);

    return <div id="graphcomment"></div>;
}