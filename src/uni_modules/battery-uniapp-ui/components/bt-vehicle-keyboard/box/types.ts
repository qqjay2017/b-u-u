import { makeBooleanProp, makeStringProp } from '../../common/props'

export const boxProps = {
  vibration: makeBooleanProp(false),
  showChangeBtn: makeBooleanProp(true),
  showCancelBtn: makeBooleanProp(true),
  disable: makeStringProp(''),
}