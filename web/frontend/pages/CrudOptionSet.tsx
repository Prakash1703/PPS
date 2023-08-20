import {
  Page,
  Button,
  FullscreenBar,
  ButtonGroup,
  TextField,
  LegacyCard,
  Tabs,
  ResourceList,
  Text,
  ResourceItem,
  Avatar,
  Icon,
  Link,
  Badge,
  Spinner,
} from "@shopify/polaris";
import { useTranslation, Trans } from "react-i18next";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import React, { useCallback, useEffect, useState } from "react";
import OptionSetComponent from "./OptionSetComponent.jsx";

import ElementListModal from "./elements/ElementListModal";

export default function CrudOptionSet() {
  const fetch = useAuthenticatedFetch();
  const { t } = useTranslation();
  const [isFullscreen, setFullscreen] = useState(true);
  const [isFirstButtonActive, setIsFirstButtonActive] = useState(true);
  const [isRecordInserted, setIsRecordInserted] = useState(false);
  
  
  //loader
  const [isSaving, setIsSaving] = useState(false);

  const handleActionClick = useCallback(() => {
    setFullscreen(false);
  }, []);

  const [optionSetName, setOptionSetName] = useState("New Option Set");

  const handleOptionSetNameActionChange = useCallback(
    (newValue: string) => setOptionSetName(newValue),
    []
  );

  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex: number) => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
    {
      id: "all-customers-fitted-2",
      content: "Elements",
      accessibilityLabel: "All customers",
      panelID: "all-customers-fitted-content-2",
    },

    {
      id: "accepts-marketing-fitted-2",
      content: "Accepts marketing",
      panelID: "accepts-marketing-fitted-Ccontent-2",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleItemToggle = (itemId, itemName) => {
    setSelectedItems([...selectedItems, { itemId, itemName }]);
    console.log("Selected Elements:", selectedItems);
    toggleModal();
  };

  const handleFirstButtonClick = useCallback(() => {
    if (isFirstButtonActive) return;
    setIsFirstButtonActive(true);
  }, [isFirstButtonActive]);

  const handleSecondButtonClick = useCallback(() => {
    if (!isFirstButtonActive) return;
    setIsFirstButtonActive(false);
    console.log("setIsFirstButtonActive:",isFirstButtonActive);
    
  }, [isFirstButtonActive]);

  const saveDataToDatabase = async () => {

    const method = "POST";
    const obj = {
      name: optionSetName,
      option_set: selectedItems,
      status: isFirstButtonActive,
    };
    console.log("OptionSet Obj :", obj);
    const response = await fetch("/api/app/optionSet/UpsertOptionSet", {
      method,
      body: JSON.stringify(obj),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status == 200) {
      return true;
    } else {
      return false;
    }
  };
  const saveOptionSetToDB = async () => {
    setIsSaving(true); // Show loader
    const status = await saveDataToDatabase();
    console.log("STATUS:", status);
    try {
        if (status) {
          setIsRecordInserted(true);
          setSelectedItems([]);
          setIsSaving(false);

        }else{
          // Handle error
          setIsSaving(false); // Hide loader on error as well
        }
    } catch (error) {
      // Handle error
      setIsSaving(false); // Hide loader on error as well
     
    }
  };
  const fullscreenBarMarkup = (
    <FullscreenBar onAction={handleActionClick}>
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        <ButtonGroup segmented>
          <Button
            pressed={isFirstButtonActive}
            onClick={handleFirstButtonClick}
          >
            Active
          </Button>
          <Button
            pressed={!isFirstButtonActive}
            onClick={handleSecondButtonClick}
          >
            Draft
          </Button>
        </ButtonGroup>
        <div style={{ marginLeft: "1rem", marginRight: "1rem", flexGrow: 1 }}>
          <TextField
            value={optionSetName}
            onChange={handleOptionSetNameActionChange}
            autoComplete="off"
          />
        </div>
        <ButtonGroup>
          <Button primary onClick={saveOptionSetToDB}>
            Save
          </Button>
        </ButtonGroup>
      </div>
    </FullscreenBar>
  );

  return (
    <>
      {isRecordInserted ? (
        <OptionSetComponent setIsRecordInserted={setIsRecordInserted}  />
      ) : (
         <LegacyCard>
          <div style={{position: "fixed",top: "0",left: "0",width: "100%",height: "100%",backgroundColor: "rgba(0, 0, 0, 0.1)", display: isSaving ? 'flex' : 'none',justifyContent: "center",alignItems: "center"}}  ><Spinner /></div>
          <div style={{ width: "100%" }}>
            {isFullscreen && fullscreenBarMarkup}
            <div style={{ padding: "1rem" }}>
              {!isFullscreen && (
                <Button onClick={() => setFullscreen(true)}>
                  Go Fullscreen
                </Button>
              )}
            </div>
          </div>
          <Tabs
            tabs={tabs}
            selected={selected}
            onSelect={handleTabChange}
            fitted
          >
            <LegacyCard.Section title={tabs[selected].content}>
              <ResourceList
                resourceName={{
                  singular: "selectedItem",
                  plural: "selectedItem",
                }}
                items={selectedItems}
                renderItem={(item) => (
                  <ResourceItem id={item.itemId}>
                    <Link url="/elements/TextElement">
                      <h3>
                        <Text>{item.itemName}</Text>
                      </h3>
                    </Link>
                  </ResourceItem>
                )}
              />
              <ElementListModal
                isModalOpen={isModalOpen}
                toggleModal={toggleModal}
                selectedItems={selectedItems}
                handleItemToggle={handleItemToggle}
              />
            </LegacyCard.Section>
          </Tabs>
        </LegacyCard>
      )}
    </>
  );
}
