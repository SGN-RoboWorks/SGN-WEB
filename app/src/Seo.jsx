import { useEffect } from 'react';
import { metaFor } from './seoConfig';

/**
 * Applies the head tags for the current route.
 *
 * The build step (scripts/generate-seo.mjs) already bakes these into the
 * static HTML each route is served with, so crawlers see them with zero JS.
 * This component keeps them correct after client-side navigation, which is
 * what social-share scrapers and the browser tab title read.
 *
 * Renders nothing — no DOM, no layout impact.
 */
export default function Seo({ path }) {
    useEffect(() => {
        const { title, canonical, meta, schemas } = metaFor(path);

        document.title = title;

        // Upsert each meta tag by its name/property key.
        meta.forEach(({ name, property, content }) => {
            const attr = property ? 'property' : 'name';
            const key = property || name;
            let el = document.head.querySelector(`meta[${attr}="${key}"]`);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute(attr, key);
                document.head.appendChild(el);
            }
            el.setAttribute('content', content);
        });

        let link = document.head.querySelector('link[rel="canonical"]');
        if (!link) {
            link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            document.head.appendChild(link);
        }
        link.setAttribute('href', canonical);

        // Replace only the JSON-LD blocks this component owns, so the
        // build-time blocks are swapped rather than duplicated.
        document.head
            .querySelectorAll('script[data-seo="sgn"]')
            .forEach((s) => s.remove());

        schemas.forEach((schema) => {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.dataset.seo = 'sgn';
            script.textContent = JSON.stringify(schema);
            document.head.appendChild(script);
        });
    }, [path]);

    return null;
}
