import React from "react";
import Tooltip from "../../common/tooltip";
import { IconsType } from "../../../models";

/**
 * @description                Creates a tooltip above the specified component
 * @param { string }           text - The text to display in the tooltip
 * @param { React.ReactNode }  children - the children component
 * @returns { ReactElement }   Tooltip component
 */

const SkillsIcon: React.FC<IconsType> = ({
  children,
  text,
}: IconsType): React.ReactElement => {
  return (
    <Tooltip
      placement="top"
      content={text}
    >
      <div>{children}</div>
    </Tooltip>
  );
};

export default SkillsIcon;
