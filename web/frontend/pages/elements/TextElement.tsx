import { Page, Button, LegacyCard, IndexTable, useIndexResourceState, Text, Badge,useSetIndexFiltersMode } from "@shopify/polaris";
import { useTranslation, Trans } from "react-i18next";
import { useAppQuery, useAuthenticatedFetch } from "../../hooks";

export default function OptionSet() {
  const fetch = useAuthenticatedFetch();
  const { t } = useTranslation();
 

  return (
    <h1>Hello</h1>
  );
}


