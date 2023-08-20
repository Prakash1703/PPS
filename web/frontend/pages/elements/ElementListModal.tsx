import React, { useState } from "react";
import {
  Button,
  Modal,
  TextContainer,
  List,
  TextStyle,
  Icon,
  Text,
  ResourceList,
  ResourceItem,
  Checkbox,
  Label
} from "@shopify/polaris";

import { CirclePlusMinor } from "@shopify/polaris-icons";
function ElementListModal({ isModalOpen, toggleModal, selectedItems, handleItemToggle }) {

  
  const resourceListItems = [
    {
      id: "100",
      url: "#",
      name: "Text",
    },
    {
      id: "200",
      url: "#",
      name: "Textarea",
    },
    {
      id: "300",
      url: "#",
      name: "Number",
    },
    {
      id: "400",
      url: "#",
      name: "Phone",
    },
    {
      id: "500",
      url: "#",
      name: "Email",
    },
    {
      id: "600",
      url: "#",
      name: "HiddenField",
    },
    {
      id: "700",
      url: "#",
      name: "Datetime",
    },
    {
      id: "800",
      url: "#",
      name: "Fileupload",
    },
    {
      id: "900",
      url: "#",
      name: "Colorpicker",
    },
    {
      id: "1000",
      url: "#",
      name: "Dropdown",
    },
    {
      id: "1100",
      url: "#",
      name: "Image Dropdown",
    },
    {
      id: "1200",
      url: "#",
      name: "Radio Button",
    },
    {
      id: "1300",
      url: "#",
      name: "Checkbox",
    },
    {
      id: "1400",
      url: "#",
      name: "Button",
    },
    {
      id: "1500",
      url: "#",
      name: "Color Swatch",
    },
    {
      id: "1600",
      url: "#",
      name: "Image Swatch",
    },
    {
      id: "1700",
      url: "#",
      name: "Heading",
    },
    {
      id: "1800",
      url: "#",
      name: "Devider",
    },
    {
      id: "1900",
      url: "#",
      name: "Paragraph",
    },
    {
      id: "2000",
      url: "#",
      name: "Popup Modal",
    },
    {
      id: "2100",
      url: "#",
      name: "Switch",
    },
    {
      id: "2200",
      url: "#",
      name: "Google Font Selector",
    },
  ];
  return (
    <>
    
      <Button onClick={toggleModal}>Add Element</Button>
      <Modal
        open={isModalOpen}
        onClose={toggleModal}
        title="Select Elements To Add "
        primaryAction={{
          content: "Add",
          onAction: toggleModal,
        }}
        secondaryActions={{
            content: "Close",
          onAction: toggleModal,
        }}
      >
        <Modal.Section>
        <ResourceList
            resourceName={{ singular: "item", plural: "items" }}
            items={resourceListItems}
            renderItem={(item) => (
              <ResourceItem id={item.id} onClick={() => handleItemToggle(item.id,item.name)}>
                 <h3>
                  <Text>{item.name}</Text>
                </h3>
              </ResourceItem>
            )}
          />
        </Modal.Section>
      </Modal>
    </>
  );
}

export default ElementListModal;
