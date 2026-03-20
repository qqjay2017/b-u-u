import type { ExtractPropTypes, ComponentPublicInstance } from "vue";
import { baseProps, makeStringProp, makeBooleanProp } from "../common/props";

export type ButtonType =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "default";

export type ButtonSize = "small" | "medium" | "large";

export const buttonProps = {
  ...baseProps,
  /** 按钮类型 */
  type: makeStringProp<ButtonType>("default"),
  /** 按钮尺寸 */
  size: makeStringProp<ButtonSize>("medium"),
  /** 是否为朴素按钮 */
  plain: makeBooleanProp(false),
  /** 是否为圆角按钮 */
  round: makeBooleanProp(false),
  /** 是否禁用 */
  disabled: makeBooleanProp(false),
  /** 是否为块级按钮 */
  block: makeBooleanProp(false),
  /** 是否加载中 */
  loading: makeBooleanProp(false),
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

export type ButtonInstance = ComponentPublicInstance<ButtonProps>;
