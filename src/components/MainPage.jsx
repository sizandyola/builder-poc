import React, { useEffect, useRef } from "react";
import { Editor, Frame, Element, useEditor } from "@craftjs/core";
import { useParams } from "react-router-dom";
// Layout Components
import { Container } from "./Container";
import { Grid } from "./Grid";
import { Columns, Column } from "./Columns";
import { Spacer } from "./Spacer";
import { Divider } from "./Divider";
// Content Components
import { Text } from "./Text";
import { Heading } from "./Heading";
import { Image } from "./Image";
import { Logo } from "./Logo";
// UI Components
import { Button } from "./Button";
import { LinksCard } from "./LinksCard";
import { ResourceCard } from "./ResourceCard";
import { SplitHero } from "./SplitHero";
// Editor Components
import { Toolbox } from "./Toolbox";
import { SettingsPanel } from "./SettingsPanel";
import { CategoryTreePanel } from "./CategoryTreePanel";
import { FloatingEditButton } from "./FloatingEditButton";
import { usePages } from "../context/PagesContext";
import { useEditorMode } from "../context/EditorContext";
import { useData } from "../context/DataContext";

function PageCanvas() {
  const { currentPageId, getCurrentPage, updatePageContent } = usePages();
  const { actions, query } = useEditor();
  const currentPage = getCurrentPage();
  const loadedPageRef = useRef(null);

  // Load page content when switching pages
  useEffect(() => {
    if (currentPage && currentPage.content && loadedPageRef.current !== currentPageId) {
      actions.deserialize(currentPage.content);
      loadedPageRef.current = currentPageId;
    }
  }, [currentPageId, currentPage, actions]);

  // Auto-save page content
  useEffect(() => {
    const timer = setTimeout(() => {
      const json = query.serialize();
      updatePageContent(currentPageId, json);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, currentPageId, updatePageContent]);

  return (
    <Frame>
      <Element is={Container} canvas background="#ffffff" padding={0} style={{ minHeight: "100vh" }}>
        <Container background="#f9fafb" padding={40}>
          <Heading text="Welcome to Your Website" level={1} />
          <Text text="Click the Edit button in the top-right to start editing this page." fontSize={16} />
          <Button text="Learn More" />
        </Container>
      </Element>
    </Frame>
  );
}

export const MainPage = () => {
  const { isEditMode } = useEditorMode();
  const { pageId } = useParams();
  const { setCurrentPageId, ensurePageExists } = usePages();

  // Set current page based on URL
  useEffect(() => {
    if (pageId) {
      ensurePageExists(pageId);
      setCurrentPageId(pageId);
    } else {
      setCurrentPageId("home");
    }
  }, [pageId, ensurePageExists, setCurrentPageId]);

  return (
    <div style={{ width: "100%", minHeight: "90vh", position: "relative" }}>
      <Editor
        resolver={{
          // Layout
          Container,
          Grid,
          Columns,
          Column,
          Spacer,
          Divider,
          // Content
          Text,
          Heading,
          Image,
          Logo,
          // UI
          Button,
          LinksCard,
          ResourceCard,
          SplitHero,
        }}
        enabled={isEditMode}
      >
        <FloatingEditButton />

        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
          {isEditMode && <CategoryTreePanel />}
          <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
            {isEditMode && <Toolbox />}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: isEditMode ? "20px" : "0",
                background: isEditMode ? "#f5f5f5" : "transparent",
              }}
            >
              <PageCanvas />
            </div>
            {isEditMode && <SettingsPanel />}
          </div>
        </div>
      </Editor>
    </div>
  );
};
