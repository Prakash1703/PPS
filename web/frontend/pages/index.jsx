import {
  Page,
  Layout,
  ButtonGroup,
  Button,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";

import { trophyImage } from "../assets";

import { ProductsCard } from "../components";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

export default function HomePage() {
  const fetch = useAuthenticatedFetch();
  const { t } = useTranslation();
  const getShopDetails = async () => {
    const response = await fetch("/api/shop");
    console.log("GET SHOP CALL");
    if (response.status == 200) {
      console.log("SHOP DETAILS:",response);
    } else {
      console.log("Error");
    }
  };
  return (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
            <ButtonGroup>
              <Button primary onClick={getShopDetails}>Shop Details</Button>
              <Button primary>Product Count</Button>
              <Button primary>Order Count</Button>
              <Button primary>Webhook </Button>
              <Button primary>Customer Count</Button>
            </ButtonGroup>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
