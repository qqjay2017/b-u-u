import { addUnit, uuid } from '../common/util'
import type {
  ChooseAndUploadResult,
  ChooseAndUploadTempFile,
  UploadImageFile,
  UploadImageModelValue,
  UploadImageReturnType,
  UploadImageStyles
} from './types'

export function getFileExt(name: string) {
  const safeName = name || ''
  const index = safeName.lastIndexOf('.')

  if (index === -1) {
    return {
      name: safeName,
      ext: ''
    }
  }

  return {
    name: safeName.slice(0, index),
    ext: safeName.slice(index + 1)
  }
}

export function getExtname(fileExtname: string[] | string) {
  if (Array.isArray(fileExtname)) return fileExtname.filter(Boolean).map((item) => item.toLowerCase())
  if (!fileExtname) return []

  return fileExtname
    .replace(/(\[|\])/g, '')
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
}

export function getFilesAndIsMax(res: ChooseAndUploadResult, extname: string[]) {
  const filePaths: string[] = []
  const files: ChooseAndUploadTempFile[] = []

  if (!extname.length) {
    return { filePaths, files }
  }

  res.tempFiles.forEach((file) => {
    const fileInfo = getFileExt(file.name || file.path)
    const currentExt = fileInfo.ext.toLowerCase()
    if (extname.includes(currentExt)) {
      files.push(file)
      filePaths.push(file.path)
    }
  })

  if (files.length !== res.tempFiles.length) {
    uni.showToast({
      title: `已过滤 ${res.tempFiles.length - files.length} 个不支持的文件`,
      icon: 'none'
    })
  }

  return { filePaths, files }
}

export function getFileInfo(filePath: string) {
  return new Promise<UniApp.GetImageInfoSuccessData>((resolve, reject) => {
    uni.getImageInfo({
      src: filePath,
      success: resolve,
      fail: reject
    })
  })
}

export async function getFileData(file: ChooseAndUploadTempFile) {
  const fileName = file.name || file.path.slice(file.path.lastIndexOf('/') + 1)
  const fileInfo = getFileExt(fileName)
  const imageInfo = await getFileInfo(file.path)

  const fileData: UploadImageFile = {
    name: fileName,
    extname: fileInfo.ext.toLowerCase(),
    fileType: file.fileType || 'image',
    cloudPath: file.cloudPath,
    url: file.path,
    path: file.path,
    size: file.size,
    image: {
      width: imageInfo.width,
      height: imageInfo.height,
      location: imageInfo.path
    },
    uuid: file.uuid || uuid(),
    status: 'ready',
    progress: 0,
    provider: file.provider,
    file
  }

  return fileData
}

export function isCloudFile(url?: string) {
  return !!url && /^cloud:\/\/([\w.-]+\/?)\S*/.test(url)
}

export function buildCloudPath(file: ChooseAndUploadTempFile, dir = '', index = 0) {
  const fileName = file.name || file.path.slice(file.path.lastIndexOf('/') + 1)
  const fileNameSplit = fileName.split('.')
  const ext = fileNameSplit.pop() || ''
  const baseName = fileNameSplit.join('.').replace(/[\s/?<>\\:*|"]/g, '_') || `image_${Date.now()}`
  const normalizedDir = dir ? (dir.endsWith('/') ? dir : `${dir}/`) : ''

  return `${normalizedDir}${baseName}_${Date.now()}_${index}.${ext}`
}

export function normalizeLimit(limit: number | string, returnType: UploadImageReturnType) {
  if (returnType === 'object') return 1

  const numericLimit = Number(limit)
  if (!numericLimit || Number.isNaN(numericLimit)) return 1

  return numericLimit
}

export function normalizeModelValue(value: UploadImageModelValue) {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

export function getPickerBoxStyle(styles: UploadImageStyles) {
  const width = styles.width ?? 'auto'
  const height = styles.height ?? 'auto'
  const boxStyle: Record<string, string> = {}

  if (height === 'auto') {
    boxStyle.height = width === 'auto' ? '0' : addUnit(width)
    boxStyle.paddingTop = width === 'auto' ? '33.33%' : '0'
  } else {
    boxStyle.height = addUnit(height)
    boxStyle.paddingTop = '0'
  }

  if (width === 'auto') {
    boxStyle.width = height === 'auto' ? '33.33%' : addUnit(height)
  } else {
    boxStyle.width = addUnit(width)
  }

  return boxStyle
}

export function getPickerBorderStyle(styles: UploadImageStyles) {
  const border = styles.border ?? {}

  if (typeof border === 'boolean') {
    return {
      border: border ? '1px solid var(--bt-upload-image-border-color, #e5e7eb)' : 'none'
    }
  }

  return {
    borderWidth: addUnit(border.width ?? 1),
    borderStyle: border.style || 'solid',
    borderColor: border.color || 'var(--bt-upload-image-border-color, #e5e7eb)',
    borderRadius: addUnit(border.radius ?? 'var(--bt-upload-image-radius, 10px)')
  }
}

export function cloneOutputFile(file: UploadImageFile): UploadImageFile {
  return {
    name: file.name,
    extname: file.extname,
    fileType: file.fileType,
    path: file.path,
    url: file.url,
    size: file.size,
    image: file.image ? { ...file.image } : undefined,
    fileID: file.fileID,
    cloudPath: file.cloudPath,
    uuid: file.uuid,
    status: file.status,
    progress: file.progress,
    errMsg: file.errMsg,
    provider: file.provider
  }
}
