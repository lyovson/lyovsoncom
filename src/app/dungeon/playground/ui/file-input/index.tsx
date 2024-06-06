/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "./input.css";

type Props = Readonly<{
  "data-test-id"?: string;
  accept?: string;
  label: string;
  onChange: (files: FileList | null) => void;
}>;

export const FileInput = ({
  accept,
  label,
  onChange,
  "data-test-id": dataTestId,
}: Props): JSX.Element => {
  return (
    <div className="Input__wrapper">
      <label className="Input__label">{label}</label>
      <input
        className="Input__input"
        type="file"
        accept={accept}
        onChange={(e) => onChange(e.target.files)}
        data-test-id={dataTestId}
        title="Upload an image"
      />
    </div>
  );
};