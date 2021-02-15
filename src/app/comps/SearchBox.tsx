import { useContext, useEffect, useRef } from 'react';
import { SearchContext } from '../contexts/SearchContext';

export function SearchBox() {
    const searchContext = useContext(SearchContext);
    const divRef = useRef<HTMLDivElement>();

    useEffect(() => {
        if (searchContext.isLoaded) {
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
    }, [searchContext.isLoaded]);

    return (
        <div className="search-box">
            <div ref={divRef}></div>
        </div>
    );
}
