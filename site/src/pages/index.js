import React, { useState, useMemo } from "react";
import * as icons from "react-heroicons-ui";
import { css } from "@emotion/core";
import { Helmet } from "react-helmet-async";

import libPackageJson from "../../../lib/package.json";
import Searcher from "../utils/search";
import IconCard from "../components/IconCard";
import SearchInput from "../components/SearchInput";
import Modal from "../components/Modal";
import { IconDetails } from "../components/IconDetails";

const allIconNames = Object.keys(icons);

const topColorStripeCss = css`
  width: 100%;
  height: 2px;

  background: var(--theme-color);
`;

const pageContainerStyles = css`
  padding: 2rem;
`;

const listCss = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, 10rem);
  grid-gap: 2rem 1rem;
  justify-content: space-evenly;
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const Seo = () => (
  <Helmet htmlAttributes={{ lang: "en-US" }}>
    <title>react-heroicons-ui</title>
    <meta name="description" content={libPackageJson.description} />
  </Helmet>
);

export default () => {
  const searcher = useMemo(() => new Searcher(allIconNames));

  const [activeIcon, setActiveIcon] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(allIconNames);

  const onInputChange = event => {
    const text = event.target.value;

    setSearchResults(searcher.search(text));
    setSearchText(text);
  };

  return (
    <>
      <Seo />
      <div css={topColorStripeCss} />
      <div css={pageContainerStyles}>
        <SearchInput
          value={searchText}
          onChange={onInputChange}
          enabled={activeIcon == null}
        />
        <ul css={listCss}>
          {searchResults.map(iconName => (
            <li key={iconName}>
              <IconCard
                iconName={iconName}
                onClick={() => setActiveIcon(iconName)}
              />
            </li>
          ))}
        </ul>
      </div>
      {activeIcon != null && (
        <Modal onClose={() => setActiveIcon(null)}>
          <IconDetails iconName={activeIcon} />
        </Modal>
      )}
      <div id="modal-root"></div>
    </>
  );
};
