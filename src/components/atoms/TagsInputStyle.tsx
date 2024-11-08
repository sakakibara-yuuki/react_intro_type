/*
 * TagsInput.tsx
 * Copyright (C) 2024 sakakibara <sakakibara@organon>
 *
 * Distributed under terms of the MIT license.
 */

import { TagsInput } from "react-tag-input-component";
import type { TagsInputProps } from "react-tag-input-component";
import type { ChangeHandler } from "react-hook-form";

type TagsInputStyleProps = {id: string; onChangeRegister: ChangeHandler} & TagsInputProps;

export function TagsInputStyle({id, onChangeRegister, value, onChange, onBlur, name}: TagsInputStyleProps) {

  return (
    <div id={id} onChange={onChangeRegister}>
      <style>{` .rti--container { --rti-s: 1px; } `}</style>
      <TagsInput
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
      />
    </div>
  );
}
