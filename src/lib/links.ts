/**
 * The site has more than one page (/ and /founder/). The copy writes links to the home
 * page's sections as '#work'; on other pages they must become '/#work'. Each page's HTML
 * names itself (<html data-page="founder">); the home page has no name.
 */
export const page = document.documentElement.dataset.page ?? 'home';

/** A copy link, made to work from the current page. */
export function link(href: string) {
  return href.startsWith('#') && page !== 'home' ? `/${href}` : href;
}

/** aria-current for a link to the page being shown. */
export function current(href: string) {
  return page !== 'home' && href === `/${page}/` ? ('page' as const) : undefined;
}
