const EasyFTP = require('easy-ftp')

/**
 * @typedef {{ name: string, type: string, time: number, size: string, owner: string, group: string, userPermissions: { read: boolean, write: boolean, exec: boolean }, groupPermissions: { read: boolean, write: boolean, exec: boolean }, otherPermissions: { read: boolean, write: boolean, exec: boolean }, date: Date }} File
 *
 * Manage ftp connection in nodejs
 */
module.exports = class FTP {
  /**
   * connect into remote ftp
   *
   * @param {{ host: string, port: number, username: string, password: string }} config
   */
  connect (config) {
    this.connection = new EasyFTP(config)
  }

  /**
   * close ftp connection
   */
  disconnect () {
    this.connection.close()
  }

  /**
   * go to folder
   *
   * @param {string} path
   * @returns {Promise<string>}
   */
  cd (path) {
    return new Promise((resolve, reject) => {
      this.connection.cd(path, (error, path) => {
        if (error) reject(error)
        else resolve(path)
      })
    })
  }

  /**
   * remove file from ftp
   *
   * @param {string} filename
   */
  rm (filename) {
    return new Promise((resolve, reject) => {
      this.connection.rm(filename, (error) => {
        if (error) reject(error)
        else resolve(true)
      })
    })
  }

  /**
   * create folder in remote ftp
   *
   * @param {string} directory
   * @returns {Promise<boolean>}
   */
  mkdir (directory) {
    return new Promise((resolve, reject) => {
      this.connection.mkdir(directory, (error) => {
        if (error) reject(error)
        else resolve(true)
      })
    })
  }

  /**
   * move files between folders
   *
   * @param {string} currentPath
   * @param {string} newPath
   * @returns {Promise<string>}
   */
  mv (currentPath, newPath) {
    return new Promise((resolve, reject) => {
      this.connection.mv(currentPath, newPath, (error, path) => {
        if (error) reject(error)
        else resolve(path)
      })
    })
  }

  /**
   * list files in current directory
   *
   * @param {string} directory
   * @param {boolean} showHiddenFiles
   * @returns {Promise<File[]>}
   */
  ls (directory, showHiddenFiles = true) {
    return new Promise((resolve, reject) => {
      this.connection.ls(directory, (error, list) => {
        if (error) {
          reject(error)
        } else {
          showHiddenFiles
            ? resolve(list)
            : resolve(list.filter(file => !(/(\/|^)\.[^\/\.]/g).test(file.name)))
        }
      })
    })
  }

  /**
   * get current path location
   *
   * @returns {Promise<string>}
   */
  pwd () {
    return new Promise((resolve, reject) => {
      this.connection.pwd((error, path) => {
        if (error) reject(error)
        else resolve(path)
      })
    })
  }

  /**
   * check if file or folder exist in ftp
   *
   * @param {string} filename
   * @returns {Promise<boolean>}
   */
  exist (filename) {
    return new Promise((resolve, reject) => {
      this.connection.exist(filename, resolve)
    })
  }

  /**
   * upload file to ftp
   *
   * @param {string|string[]} local
   * @param {string} remote
   */
  upload (local, remote) {
    return new Promise((resolve, reject) => {
      this.connection.upload(local, remote, (error) => {
        if (error) reject(error)
        else resolve(true)
      })
    })
  }

  /**
   * download file from ftp
   *
   * @param {string} remote
   * @param {string|string[]} local
   */
  download (remote, local) {
    return new Promise((resolve, reject) => {
      this.connection.download(remote, local, (error, data) => {
        if (error) reject(error)
        else resolve(data)
      })
    })
  }

  /**
   * event manager of connection
   * open (< FTPClient >client) - Emitted when connection and authentication were sucessful.
   * close - Emitted when the connection has fully closed
   * error(< Error >err) - Emitted when the connection has fully closed
   * upload(< string >uploadedRemotePath) - Emitted when file or directory uploaded
   * uploading(< object >data) - (sftp only) Emitted when file was transferred
   * download(< string >downloadedLocalPath) - Emitted when file or directory downloaded
   * downloading(< object >data) - (sftp only) Emitted when file was transferred.
   *
   * @param {string} event
   * @param {Function} callback
   */
  on (event, callback) {
    this.connection.on(event, callback)
  }
}
