import { css } from '@emotion/react';

export const docsLayout = () => ({
  wrapper: css`
    margin-top: 48px; // top nav
    min-height: calc(100vh - 48px);
    display: flex;
    .euiPage {
      background: #f5f5f5;
      overflow: visible;
    }
    .euiPageSideBar {
      background: linear-gradient(to bottom right, #b2f7f9, #d4e3fc);
      min-width: 250px !important;
    }
    .euiSideNav__heading {
      margin-bottom: 0px;
    }
  `,
  header: css`
    h1.euiTitle {
      font-size: 25px;
    }
  `,
  sidenavitems: css`
    background: linear-gradient(to bottom right, #b2f7f9, #d4e3fc);
    align-items: center;
    title.euiTitle {
      height: 100px;
      padding: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #75a9f9;
      word-break: normal;
      cursor: pointer;
    }
    .euiSideNavItem--root > a {
      color: #000000;
      font-weight: 500;
      font-size: 20px;
      text-decoration: none !important;
    }
    .euiSideNavItem--root :focus {
      font-weight: bold;
      text-decoration: none !important;
    }
    .euiSideNavItem--root :hover {
      font-weight: bold;
      text-decoration: none !important;
    }
    .euiSideNavItem.euiSideNavItem--root {
      margin: 0;
      padding: 20px 25px;
      height: 70px;
      display: flex;
      align-items: center;
      border-bottom: 0.5px solid #a9c6f9;
    }
    .euiSideNavItem.euiSideNavItem--root:visited {
      background-color: #a8c6fa;
    }
    .euiSideNavItem.euiSideNavItem--root:hover {
      background-color: #ccf9fb;
    }
    .euiSideNavItemButton__label--truncated {
      text-overflow: ellipsis !important;
      white-space: pre-wrap !important;
      word-wrap: normal !important;
    }
  `,
  checkbox: css`
    .em {
      margin-left: 25px;
    }
  `,
  forms: css`
    .euiFormControlLayout--group .euiFormControlLayout__prepend:first-child,
    .euiFormControlLayout--group
      .euiFormControlLayout__prepend:first-child
      [class*='euiButton'] {
      width: inherit;
    }
  `,
});
