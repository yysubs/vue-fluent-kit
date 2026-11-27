import type { BrandVariants } from '../index'

export interface BrandPreset {
  /** 预设标识 */
  id: 'default' | 'teal' | 'violet' | 'forest'
  /** 显示名称 */
  label: string
  /** 预览圆点色值 */
  swatch: string
  /** Fluent 2 16 阶品牌色，null 表示恢复默认 Fluent 蓝 */
  brand: BrandVariants | null
}

export const demoBrandPresets: BrandPreset[] = [
  {
    id: 'default',
    label: 'Fluent 蓝',
    swatch: '#0f6cbd',
    brand: null,
  },
  {
    id: 'teal',
    label: 'Teal 青碧',
    swatch: '#27a6aa',
    brand: {
      10: '#021a1b',
      20: '#043234',
      30: '#05494c',
      40: '#056064',
      50: '#04777c',
      60: '#038387',
      70: '#0f9599',
      80: '#27a6aa',
      90: '#42b8bc',
      100: '#5fc9cd',
      110: '#7ed8db',
      120: '#9de5e7',
      130: '#bceff0',
      140: '#d7f6f7',
      150: '#ecfbfb',
      160: '#f7fefe',
    },
  },
  {
    id: 'violet',
    label: 'Violet 堇紫',
    swatch: '#8d73d3',
    brand: {
      10: '#160d2d',
      20: '#291a51',
      30: '#3c2773',
      40: '#4e3593',
      50: '#5d42aa',
      60: '#6b4fbb',
      70: '#7b60c7',
      80: '#8d73d3',
      90: '#9f87de',
      100: '#b29ce8',
      110: '#c4b2f0',
      120: '#d6c8f6',
      130: '#e6ddfa',
      140: '#f1ecfd',
      150: '#f8f5fe',
      160: '#fcfbff',
    },
  },
  {
    id: 'forest',
    label: 'Forest 森绿',
    swatch: '#31a162',
    brand: {
      10: '#041c0e',
      20: '#08331a',
      30: '#0c4926',
      40: '#0e6032',
      50: '#10713b',
      60: '#107c41',
      70: '#1d8f4f',
      80: '#31a162',
      90: '#49b477',
      100: '#64c68e',
      110: '#82d6a6',
      120: '#a1e4be',
      130: '#c0f0d4',
      140: '#dcf8e7',
      150: '#effcf4',
      160: '#f8fefb',
    },
  },
]
