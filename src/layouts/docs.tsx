import {
  EuiHeader,
  EuiHeaderLogo,
  EuiPage,
  EuiPageTemplate,
  EuiSideNav,
  useGeneratedHtmlId,
  htmlIdGenerator,
} from "@elastic/eui";
import Link from "next/link";
import { useState } from "react";
import ThemeSwitcher from "../components/chrome/theme_switcher";
import { docsLayout } from "./docs.styles";

const pathPrefix = process.env.PATH_PREFIX;

const DocsLayout = ({ pageHeader, children }) => {
  const [isSideNavOpenOnMobile, setisSideNavOpenOnMobile] = useState(false);

  const sideNav = [
    {
      name: "Ekran topologije",
      id: htmlIdGenerator("microgrid")(),
      renderItem: () => (
        <Link href={`${pathPrefix}/docs/ekran-topologije`}>
          Ekran topologije
        </Link>
      ),
    },
    {
      name: "Tehno-ekonomski ekran",
      id: htmlIdGenerator("microgrid")(),
      renderItem: () => (
        <Link href={`${pathPrefix}/docs/tehno-ekonomski-ekran`}>
          Tehno-ekonomski ekran
        </Link>
      ),
    },
    {
      name: "Tehnološki ekran",
      id: htmlIdGenerator("microgrid")(),
      renderItem: () => (
        <Link href={`${pathPrefix}/docs/tehnoloski-ekran`}>
          Tehnološki ekran
        </Link>
      ),
    },
    {
      name: "Ekran pozadinskog modela",
      id: htmlIdGenerator("microgrid")(),
      renderItem: () => (
        <Link href={`${pathPrefix}/docs/ekran-pozadinskog-modela`}>
          Ekran pozadinskog modela
        </Link>
      ),
    },
  ];

  const toggleOpenOnMobile = () => {
    setisSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const styles = docsLayout();

  return (
    <div css={styles.wrapper}>
      <EuiHeader
        theme="dark"
        position="fixed"
        sections={[
          {
            items: [
              <Link href={`${pathPrefix}/docs`}>
                <EuiHeaderLogo
                  key="elastic-docs"
                  iconType="/images/micro-grid-logo.png"
                  style={{ cursor: "pointer" }}
                >
                  Microgrid
                </EuiHeaderLogo>
              </Link>,
            ],
            borders: "none",
          },
          {
            items: [<ThemeSwitcher key={useGeneratedHtmlId()} />],
            borders: "none",
          },
        ]}
      />
      <EuiPage
        restrictWidth={"80vw"}
        paddingSize="l"
        style={{ margin: "25px auto" }}
      >
        <EuiPageTemplate
          css={styles.header}
          pageHeader={pageHeader}
          pageSideBar={
            <EuiSideNav
              css={styles.sidenavitems}
              items={sideNav}
              toggleOpenOnMobile={() => toggleOpenOnMobile()}
              isOpenOnMobile={isSideNavOpenOnMobile}
            />
          }
          template="default"
          fullHeight="noscroll"
          paddingSize="s"
        >
          {children}
        </EuiPageTemplate>
      </EuiPage>
    </div>
  );
};

export default DocsLayout;
