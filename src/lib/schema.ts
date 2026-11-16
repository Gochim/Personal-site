// Structured data (schema.org, JSON-LD) for each page. Home describes the
// person in full; every other page names its own type and points to the same
// person, so all five pages are tied to one identity.

import { profile as p } from '../data/profile';
import { sites, versions } from './articles';
import { absolute, pagePath, type Page } from './render';

const PAGE_TYPES: Record<string, string> = {
  '': 'ProfilePage',
  about: 'AboutPage',
  experience: 'WebPage',
  writing: 'CollectionPage',
  contact: 'ContactPage',
};

/** Every profile Dmytro maintains: LinkedIn, then each writing site that is
    not simply a page of a profile already listed. */
export function ownProfiles(): string[] {
  const urls = [p.linkedin];
  for (const site of sites) {
    if (!urls.some((url) => site.url.startsWith(url))) urls.push(site.url);
  }
  return urls;
}

function person(site: string, imageUrl: string) {
  return {
    '@type': 'Person',
    '@id': `${site}#person`,
    name: p.name,
    givenName: p.givenName,
    familyName: p.familyName,
    alternateName: p.alternateNames.map((alt) => alt.text),
    url: site,
    image: imageUrl,
    jobTitle: p.title,
    description: `${p.name} is a ${p.title} and ${p.secondTitle} at ${p.employer}, based in ${p.region}, ${p.country}, with ${p.years} years of experience in software.`,
    email: `mailto:${p.email}`,
    address: {
      '@type': 'PostalAddress',
      addressRegion: p.region,
      addressCountry: p.countryCode,
    },
    worksFor: {
      '@type': 'Organization',
      description: p.employer.replace(/^an? /, ''),
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: p.university,
    },
    knowsLanguage: p.languages.map((language) => ({
      '@type': 'Language',
      name: language.name,
      alternateName: language.code,
    })),
    knowsAbout: p.knowsAbout,
    sameAs: ownProfiles(),
  };
}

export function schemaFor(page: Page, site: string, imageUrl: string) {
  const url = absolute(pagePath(page), site);
  const isHome = page.slug === '';
  const personRef = { '@id': `${site}#person` };

  const webPage: Record<string, unknown> = {
    '@type': PAGE_TYPES[page.slug] ?? 'WebPage',
    '@id': `${url}#page`,
    url,
    name: page.title,
    description: page.description,
    inLanguage: 'en',
    dateModified: p.updated,
    isPartOf: { '@id': `${site}#website` },
    about: personRef,
  };

  if (isHome) webPage.mainEntity = personRef;

  if (page.slug === 'writing') {
    webPage.mainEntity = {
      '@type': 'ItemList',
      numberOfItems: versions.length,
      itemListElement: versions.map((version, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          headline: version.title,
          url: version.url,
          datePublished: version.date,
          ...(version.lang ? { inLanguage: version.lang } : {}),
          author: personRef,
        },
      })),
    };
  }

  const website = {
    '@type': 'WebSite',
    '@id': `${site}#website`,
    url: site,
    name: p.name,
    inLanguage: 'en',
    publisher: personRef,
  };

  // Home carries the full description of the person. The other pages carry
  // enough to identify him and link back to it.
  const who = isHome
    ? person(site, imageUrl)
    : { '@type': 'Person', '@id': `${site}#person`, name: p.name, url: site };

  return {
    '@context': 'https://schema.org',
    '@graph': [webPage, website, who],
  };
}
