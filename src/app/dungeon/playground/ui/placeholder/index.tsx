/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "./placeholder.css";

import { ReactNode } from "react";

export const Placeholder = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}): JSX.Element => {
  return <div className={className || "Placeholder__root"}>{children}</div>;
};
