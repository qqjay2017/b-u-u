import type { ChooseAndUploadResult, ChooseAndUploadTempFile, UploadImageSizeType, UploadImageSourceType } from './types'

const ERR_MSG_OK = 'chooseAndUploadFile:ok'
const ERR_MSG_FAIL = 'chooseAndUploadFile:fail'

type ChooseAndUploadType = 'image' | 'video' | 'all'

interface ChooseAndUploadOptions {
  type?: ChooseAndUploadType
  count?: number
  sizeType?: UploadImageSizeType[]
  sourceType?: UploadImageSourceType[]
  extension?: string[]
  compressed?: boolean
  maxDuration?: number
  onChooseFile?: (res: ChooseAndUploadResult) => ChooseAndUploadResult | false | void | Promise<ChooseAndUploadResult | false | void>
}

interface UploadCloudProgressEvent {
  loaded: number
  total: number
  index: number
}

interface UploadCloudResult extends ChooseAndUploadTempFile {
  index: number
  url?: string
  errMsg?: string
}

function chooseImage(options: ChooseAndUploadOptions) {
  const { count = 9, sizeType = ['original', 'compressed'], sourceType = ['album', 'camera'], extension } = options

  return new Promise<ChooseAndUploadResult>((resolve, reject) => {
    // #ifdef MP-WEIXIN
    uni.chooseMedia({
      count,
      sizeType,
      sourceType,
      mediaType: ['image'],
      extension,
      success(res: any) {
        const sourceFiles = Array.isArray(res.tempFiles) ? res.tempFiles : []
        const tempFiles = sourceFiles.map((item: any) => ({
          ...item,
          name: item.name || item.tempFilePath?.slice(item.tempFilePath.lastIndexOf('/') + 1) || '',
          path: item.tempFilePath
        }))

        resolve(
          normalizeChooseAndUploadFileRes(
            {
              errMsg: 'chooseImage:ok',
              tempFiles,
              tempFilePaths: tempFiles.map((item: ChooseAndUploadTempFile) => item.path)
            },
            'image'
          )
        )
      },
      fail(res: any) {
        reject({
          errMsg: res.errMsg.replace('chooseMedia:fail', ERR_MSG_FAIL)
        })
      }
    } as any)
    // #endif
    // #ifndef MP-WEIXIN
    uni.chooseImage({
      count,
      sizeType,
      sourceType,
      extension,
      success(res: any) {
        const sourceFiles = Array.isArray(res.tempFiles) ? res.tempFiles : res.tempFiles ? [res.tempFiles] : []
        resolve(
          normalizeChooseAndUploadFileRes(
            {
              errMsg: res.errMsg,
              tempFiles: sourceFiles.map((item: any) => ({
                ...item,
                path: item.path || item.tempFilePath
              })),
              tempFilePaths: Array.isArray(res.tempFilePaths) ? res.tempFilePaths : []
            },
            'image'
          )
        )
      },
      fail(res) {
        reject({
          errMsg: res.errMsg.replace('chooseImage:fail', ERR_MSG_FAIL)
        })
      }
    })
    // #endif
  })
}

function chooseVideo(options: ChooseAndUploadOptions) {
  const { count = 1, compressed = false, maxDuration, sourceType = ['album', 'camera'], extension } = options

  return new Promise<ChooseAndUploadResult>((resolve, reject) => {
    // #ifdef MP-WEIXIN
    uni.chooseMedia({
      count,
      compressed,
      maxDuration,
      sourceType,
      extension,
      mediaType: ['video'],
      success(res: any) {
        const sourceFiles = Array.isArray(res.tempFiles) ? res.tempFiles : []
        const tempFiles = sourceFiles.map((item: any) => ({
          name: item.name || item.tempFilePath?.slice(item.tempFilePath.lastIndexOf('/') + 1) || '',
          path: item.tempFilePath,
          thumbTempFilePath: item.thumbTempFilePath,
          size: item.size,
          type: item.fileType || '',
          width: item.width,
          height: item.height,
          duration: item.duration,
          fileType: 'video',
          cloudPath: ''
        }))

        resolve(
          normalizeChooseAndUploadFileRes(
            {
              errMsg: 'chooseVideo:ok',
              tempFiles,
              tempFilePaths: tempFiles.map((item: ChooseAndUploadTempFile) => item.path)
            },
            'video'
          )
        )
      },
      fail(res: any) {
        reject({
          errMsg: res.errMsg.replace('chooseMedia:fail', ERR_MSG_FAIL)
        })
      }
    } as any)
    // #endif
    // #ifndef MP-WEIXIN
    uni.chooseVideo({
      compressed,
      maxDuration,
      sourceType,
      extension,
      success(res: any) {
        const tempFilePath = res.tempFilePath
        resolve(
          normalizeChooseAndUploadFileRes(
            {
              errMsg: 'chooseVideo:ok',
              tempFilePaths: [tempFilePath],
              tempFiles: [
                {
                  name: res.tempFile?.name || tempFilePath.slice(tempFilePath.lastIndexOf('/') + 1),
                  path: tempFilePath,
                  size: res.size,
                  type: res.tempFile?.type || '',
                  width: res.width,
                  height: res.height,
                  duration: res.duration,
                  fileType: 'video',
                  cloudPath: ''
                }
              ]
            },
            'video'
          )
        )
      },
      fail(res) {
        reject({
          errMsg: res.errMsg.replace('chooseVideo:fail', ERR_MSG_FAIL)
        })
      }
    })
    // #endif
  })
}

function chooseAll(options: ChooseAndUploadOptions) {
  const { count = 9, extension } = options

  return new Promise<ChooseAndUploadResult>((resolve, reject) => {
    let chooseFile = uni.chooseFile as undefined | ((options: Record<string, any>) => void)
    const wxAny = (globalThis as any).wx

    if (typeof wxAny?.chooseMessageFile === 'function') {
      chooseFile = wxAny.chooseMessageFile
    }

    if (typeof chooseFile !== 'function') {
      reject({
        errMsg: `${ERR_MSG_FAIL}: 当前平台仅支持 image 或 video`
      })
      return
    }

    chooseFile({
      type: 'all',
      count,
      extension,
      success(res: any) {
        resolve(
          normalizeChooseAndUploadFileRes({
            errMsg: res.errMsg,
            tempFilePaths: res.tempFilePaths || res.tempFiles?.map((item: any) => item.path) || [],
            tempFiles: (res.tempFiles || []).map((item: any) => ({
              ...item,
              path: item.path || item.tempFilePath
            }))
          })
        )
      },
      fail(res: any) {
        reject({
          errMsg: res.errMsg.replace('chooseFile:fail', ERR_MSG_FAIL)
        })
      }
    })
  })
}

function normalizeChooseAndUploadFileRes(res: ChooseAndUploadResult, fileType?: string) {
  res.tempFiles = res.tempFiles.map((item, index) => {
    const currentPath = item.path || item.tempFilePath || ''
    const name = item.name || currentPath.slice(currentPath.lastIndexOf('/') + 1)

    return {
      ...item,
      name,
      path: currentPath,
      fileType: fileType || item.fileType,
      cloudPath: item.cloudPath || `${Date.now()}_${index}${name.slice(name.lastIndexOf('.'))}`
    }
  })

  if (!res.tempFilePaths?.length) {
    res.tempFilePaths = res.tempFiles.map((file) => file.path)
  }

  return res
}

export async function uploadCloudFiles(files: ChooseAndUploadTempFile[], max = 5, onUploadProgress?: (event: UploadCloudProgressEvent) => void) {
  const cloud = (globalThis as any).uniCloud

  if (!cloud?.uploadFile) {
    throw new Error('未检测到 uniCloud.uploadFile，无法执行上传')
  }

  const queue = files.map((file) => ({ ...file }))
  const results: UploadCloudResult[] = new Array(queue.length)
  let cursor = 0

  async function worker() {
    while (cursor < queue.length) {
      const current = cursor++
      const item = queue[current]

      try {
        const response = await cloud.uploadFile({
          filePath: item.path,
          cloudPath: item.cloudPath,
          fileType: item.fileType,
          onUploadProgress: (event: UploadCloudProgressEvent) => {
            onUploadProgress?.({
              ...event,
              index: current
            })
          }
        })

        results[current] = {
          ...item,
          index: current,
          url: response.fileID
        }
      } catch (error: any) {
        results[current] = {
          ...item,
          index: current,
          errMsg: error?.errMsg || error?.message || 'uploadFile:fail'
        }
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(max, queue.length) }, () => worker()))

  return results
}

export async function chooseAndUploadFile(options: ChooseAndUploadOptions = { type: 'all' }) {
  let result: ChooseAndUploadResult

  if (options.type === 'image') {
    result = await chooseImage(options)
  } else if (options.type === 'video') {
    result = await chooseVideo(options)
  } else {
    result = await chooseAll(options)
  }

  if (!options.onChooseFile) return result

  const customResult = await options.onChooseFile(result)

  if (customResult === false) {
    return {
      errMsg: ERR_MSG_OK,
      tempFilePaths: [],
      tempFiles: []
    }
  }

  return customResult || result
}
