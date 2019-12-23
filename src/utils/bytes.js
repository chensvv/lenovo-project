// eslint-disable-next-line no-unused-vars
export function readablizeBytes (bytes) {
  var s = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
  var e = Math.floor(Math.log(bytes) / Math.log(1024))
  return (bytes / Math.pow(1024, Math.floor(e))).toFixed(2) + '' + s[e]
}
