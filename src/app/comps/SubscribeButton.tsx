import appConfig from '../../data/appConfig.json';

export function SubscribeButton() {
    const url = 'https://feedrabbit.com/subscriptions/new?' + new URLSearchParams({
        url: `${appConfig.siteUrl}/rss.xml`
    });

    return <a href={url} target="_blank">Subscribe</a>;
}