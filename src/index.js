const EasyFTP = require('easy-ftp')

/**
 * @typedef {{ name: string, type: string, time: number, size: string, owner: string, group: string, userPermissions: { read: boolean, write: boolean, exec: boolean }, groupPermissions: { read: boolean, write: boolean, exec: boolean }, otherPermissions: { read: boolean, write: boolean, exec: boolean }, date: Date }} File
 *
 * Manage ftp connection in nodejs
 */
module.exports = class FTP {
  /**
   * @param {{ host: string, port: number, username: string, password: string }} config
   */
  constructor (config) {
    this.connection = new EasyFTP(config)
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
  ls (directory, showHiddenFiles = false) {
    return new Promise((resolve, reject) => {
      this.connection[ showHiddenFiles ? 'lsAll' : 'ls' ](directory, (error, list) => {
        if (error) reject(error)
        else resolve(list)
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
   * @param {string|string[]} local
   * @param {string} remote
   */
  download (local, remote) {
    return new Promise((resolve, reject) => {
      this.connection.download(local, remote, (error) => {
        if (error) reject(error)
        else resolve(true)
      })
    })
  }

  /**
   * end ftp connection
   */
  close () {
    this.connection.close()
  }
}
