/* WINDOW DIMENSIONS */
const DESKTOP = 1200;
const TABLET_LANDSCAPE = 992;
const TABLET = 768;
const MOBILE = 480;
/* MEDIA QUERIES */
const DESKTOP_MEDIA_QUERY = `@media screen and (max-width: ${DESKTOP}px)`;
const TABLET_LANDSCAPE_MEDIA_QUERY = `@media screen and (max-width: ${TABLET_LANDSCAPE}px)`;
const TABLET_MEDIA_QUERY = `@media screen and (max-width: ${TABLET}px)`;
const MOBILE_MEDIA_QUERY = `@media screen and (max-width: ${MOBILE}px)`;

export default {
  DESKTOP,
  TABLET_LANDSCAPE,
  TABLET,
  MOBILE,
  DESKTOP_MEDIA_QUERY,
  TABLET_LANDSCAPE_MEDIA_QUERY,
  TABLET_MEDIA_QUERY,
  MOBILE_MEDIA_QUERY,
};
