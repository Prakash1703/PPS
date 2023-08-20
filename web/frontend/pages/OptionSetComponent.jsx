import {
  Page,
  Button,
  LegacyCard,
  IndexTable,
  useIndexResourceState,
  Text,
  Badge,
  Spinner,
  EmptyState,
  useSetIndexFiltersMode,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import { trophyImage } from "../assets";
import CrudOptionSet from "./CrudOptionSet";
import { ProductsCard } from "../components";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { useEffect, useState } from "react";

export default function OptionSetComponent(props) {
  const fetch = useAuthenticatedFetch();
  const { t } = useTranslation();
  const [optionSets, setOptionSets] = useState([]);
  const [isCreateOptionSet, setIsCreateOptionSet] = useState(false);
  const [showLoader,setShowLoader]=useState(false);
  useEffect(() => {
    const controller = new AbortController();
    setShowLoader(true);
    loadOptionSet();
    return () => {
      controller.abort(); // Clean up when component is unmounted
    };
    props.setIsRecordInserted ? props.setIsRecordInserted(false) : null;
  }, []);

  const loadOptionSet = async () => {
    const controller = new AbortController();
    try {
      const response = await fetch("/api/app/optionSet/getOptionSet", {
        signal: controller.signal,
      });
      if (response.status == 200) {
        const data = await response.json(); // Parse the JSON content
        setOptionSets(data.optionSetList);
        console.log("OptionSet DETAILS:", data.optionSetList);
        setShowLoader(false);
      } else {
        console.log("Error");
        setShowLoader(true);
      }
    } catch (error) {
      console.log("Error:", error);
      setShowLoader(true);
    } finally {
      controller.abort(); // Abort the request when done
    }
  };
  // const loadOptionSet=async()=>{

  //   const response = await fetch("/api/app/optionSet/getOptionSet");
  //   if (response.status == 200) {
  //     const data = await response.json(); // Parse the JSON content
  //     setOptionSets( data.optionSetList)
  //     console.log("OptionSet DETAILS:", data.optionSetList);
  //   } else {
  //     console.log("Error");
  //   }
  // }

  // const optionSets = [
  //   {
  //     id: "1020",
  //     name: "Option Set 1",
  //     status: <Badge status="success">Active</Badge>,
  //     createdDate: "date",
  //     updatedDate: "date",
  //   },
  //   {
  //     id: "1021",
  //     name: "Option Set 2",
  //     status: <Badge progress="incomplete">In Active</Badge>,
  //     createdDate: "date",
  //     updatedDate: "date",
  //   },
  //   {
  //     id: "1022",
  //     name: "Option Set 3",
  //     status: <Badge status="success">Active</Badge>,
  //     createdDate: "date",
  //     updatedDate: "date",
  //   },
  // ];
  const resourceName = {
    singular: "option set",
    plural: "option sets",
  };
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(optionSets);

  const rowMarkup = optionSets.map(
    ({ id, name,status, createdAt, updatedAt }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{status?(<Badge status="success">Active</Badge>):(<Badge progress="incomplete">In Active</Badge>)}</IndexTable.Cell>
        <IndexTable.Cell>{createdAt}</IndexTable.Cell>
        <IndexTable.Cell>{updatedAt}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  const actionCreateOptionsets = () => {
    alert("hello");
  };
  const promotedBulkActions = [
    {
      content: "Duplicate Option Set",
      onAction: () => console.log("Todo: implement bulk edit"),
    },
    {
      content: "Delete Option Set",
      onAction: () => console.log("Todo: implement bulk edit"),
    },
  ];
  const bulkActions = [
    {
      content: "Enable Option Set",
      onAction: () => console.log("Todo: implement bulk enable option set"),
    },
    {
      content: "Disable Option Set",
      onAction: () => console.log("Todo: implement bulk disable option set"),
    },
  ];
  const handleCreateOptionSet = () => {
    props.setIsRecordInserted ? props.setIsRecordInserted(false) : null;
    setIsCreateOptionSet(true);
  };
  return isCreateOptionSet ? (
    <CrudOptionSet />
  ) : (
    <>
     {showLoader?<div style={{position: "fixed",top: "0",left: "0",width: "100%",height: "100%",backgroundColor: "rgba(0, 0, 0, 0.1)", display: showLoader ? 'flex' : 'none',justifyContent: "center",alignItems: "center"}}  ><Spinner /></div>:null}
    <Page
      title="Option Sets"
      primaryAction={
        <Button primary onClick={handleCreateOptionSet}>
          Create Option Set
        </Button>
      }
    >
      {optionSets.length > 0 ? (
        <LegacyCard title="OptionSets" sectioned>
          <IndexTable
            resourceName={resourceName}
            itemCount={optionSets.length}
            selectedItemsCount={
              allResourcesSelected ? "All" : selectedResources.length
            }
            onSelectionChange={handleSelectionChange}
            headings={[
              { title: "Name" },
              { title: "Status" },
              { title: "Created Date" },
              { title: "Updated Date" },
            ]}
            bulkActions={bulkActions}
            promotedBulkActions={promotedBulkActions}
          >
            {rowMarkup}
          </IndexTable>
        </LegacyCard>
      ) : (
        <EmptyState
          heading="Manage your option sets"
          action={{
            content: "Add Optionsets",
            onAction: () => {
              handleCreateOptionSet;
            },
          }}
          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        ></EmptyState>
      )}
    </Page>
    </>
  );
}
