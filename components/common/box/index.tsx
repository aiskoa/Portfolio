import React, { ReactElement, PropsWithChildren } from "react";
import { BoxType } from "../../../models";

/**
 * ```jsx
 * // Example component
 * <Box title="Hello world!" icons={sampleIcon} />
 * ```
 * @param { BoxType }               props.title - Title of the box
 * @param { BoxType }               props.icons - Icons of the box
 * @description                     About Section
 * @returns { ReactElement }        A box square with a title and icons
 */

const Box: React.FC<PropsWithChildren<BoxType>> = ({ title, icons }: PropsWithChildren<BoxType>): ReactElement => {
  return (
    <div className="p-2 m-5 text-4xl font-thin border-2 border-gray-900 flex-column rounded-2xl dark:hover:border-violet-700 hover:border-yellow-500 dark:border-white">
      <h3 className="text-2xl text-center">{title}</h3>
      <div className="flex mt-5 justify-evenly">{icons}</div>
    </div>
  );
};

export default Box;
