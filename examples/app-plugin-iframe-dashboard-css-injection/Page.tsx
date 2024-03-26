import React from 'react';
import { PluginPage } from '@grafana/runtime';
import { GrafanaTheme2 } from '@grafana/data';
import { useStyles2 } from '@grafana/ui';
import { css } from '@emotion/css';

export const Page = () => {

  const getStyles = (theme: GrafanaTheme2) => ({
    Div: css`
      height: 100%;
      width: 100%;
    `,
    iFrame: css`
      display: flex;
      width: 100%;
      height: 100%;
      border: none;
    `,
  });

  const styles = useStyles2(getStyles);
  const ref = React.useRef<HTMLIFrameElement>(null);

  const appendStyle = () => {
    const item = ref.current?.contentWindow?.document.querySelector('head');
    let style = document.createElement("style");
    style.append(`
      div:has(+ div[data-testid="data-testid Nav toolbar"]) {
        display: none;
      }
      div[data-testid="data-testid Nav toolbar"] > nav[aria-label="Breadcrumbs"],div:has(+ nav[aria-label="Breadcrumbs"]),div > button[title="Enable kiosk mode"],button[title="Toggle top search bar"] {
        display: none;
      }`
    );
    item?.append(style);
  }
  
  return (
    <PluginPage>
      <div className={styles.Div}> 
        <iframe ref={ref} className={styles.iFrame} src="/d/dashboard-id-1/dashboard?orgId=1" onLoad={appendStyle}></iframe>
      </div>
    </PluginPage>
  );
}