import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";
import appConfig from '../../data/appConfig.json';

const isLoaded$ = new BehaviorSubject(false);
var isInitialized = false;

export function initializeSearch() {
    if (isInitialized) return;

    (window as any).__gcse = {
        parsetags: 'explicit',
        callback: () => isLoaded$.next(true)
    };

    const gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = appConfig.googleSearchJsUrl;

    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);

    isInitialized = true;
}

export function useSearchIsLoaded() {
    const [isLoaded, setIsLoaded] = useState(isLoaded$.getValue());

    useEffect(() => {
        const subscription = isLoaded$.subscribe(value => setIsLoaded(value));
        return () => subscription.unsubscribe();
    }, []);

    return isLoaded;
}
