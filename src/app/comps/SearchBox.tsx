import { useEffect, useRef } from 'react';
import { useSearchIsLoaded } from '../states/SearchState';

export function SearchBox() {
    const searchIsLoaded = useSearchIsLoaded();
    const divRef = useRef<HTMLDivElement>();

    useEffect(() => {
        const div = divRef.current;
        if (searchIsLoaded) {
            (window as any).google.search.cse.element.render({
                div: div,
                tag: 'search',
            });
        }

        return () => {
            if (div) {
                div.innerHTML = '';
            }
        };
    }, [searchIsLoaded]);

    return (
        <div className="search-box">
            <div ref={divRef}></div>
        </div>
    );
}
