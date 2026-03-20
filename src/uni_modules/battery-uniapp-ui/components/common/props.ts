import type { PropType } from "vue";

/** 所有组件共享的基础 props */
export const baseProps = {
  customClass: {
    type: String,
    default: "",
  },
  customStyle: {
    type: String,
    default: "",
  },
};

/** 创建 String 类型 prop */
export const makeStringProp = <T extends string>(defaultValue: T) => ({
  type: String as unknown as PropType<T>,
  default: defaultValue,
});

/** 创建 Boolean 类型 prop */
export const makeBooleanProp = (defaultValue = false) => ({
  type: Boolean,
  default: defaultValue,
});

/** 创建 Number 类型 prop */
export const makeNumericProp = (defaultValue = 0) => ({
  type: Number,
  default: defaultValue,
});

/** 创建 Array 类型 prop */
export const makeArrayProp = <T>(defaultValue: T[] = []) => ({
  type: Array as PropType<T[]>,
  default: () => defaultValue,
});
