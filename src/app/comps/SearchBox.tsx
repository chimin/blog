import { useContext, useEffect, useRef } from 'react';
import { useSearchIsLoaded } from '../states/SearchState';

export function SearchBox() {
    const searchIsLoaded = useSearchIsLoaded();
    const divRef = useRef<HTMLDivElement>();

    useEffect(() => {
        if (searchIsLoaded) {
            (window as any).google.search.cse.element.render({
                div: divRef.current,
                tag: 'search',
            });
        }

        return () => {
            if (divRef.current) {
                divRef.current.innerHTML = '';
            }
        };
    }, [searchIsLoaded]);

    return (
        <div className="search-box">
            <div ref={divRef}></div>
        </div>
    );
}
