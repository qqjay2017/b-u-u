/** 判断值是否已定义（非 undefined 且非 null） */
export function isDef<T>(value: T): value is NonNullable<T> {
  return value !== undefined && value !== null;
}

/** 驼峰转 kebab-case */
export function kebabCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

/** 对象样式转字符串（用于 :style 绑定） */
export function objToStyle(
  styles: Record<string, string | number | undefined>,
): string {
  return Object.keys(styles)
    .filter((key) => isDef(styles[key]) && styles[key] !== "")
    .map((key) => `${kebabCase(key)}:${styles[key]}`)
    .join(";");
}
