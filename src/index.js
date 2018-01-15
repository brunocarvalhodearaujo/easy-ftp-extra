const EasyFTP = require('easy-ftp')

/**
 * @typedef {{ name: string, type: string, time: number, size: string, owner: string, group: string, userPermissions: { read: boolean, write: boolean, exec: boolean }, groupPermissions: { read: boolean, write: boolean, exec: boolean }, otherPermissions: { read: boolean, write: boolean, exec: boolean }, date: Date }} File
 */
module.exports = class FTP {
  /**
   * @param {{ host: string, port: number, username: string, password: string }} config
   */
  constructor (config) {
    this.connection = new EasyFTP(config)
  }

  /**
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
   * @param {string} directory
   * @returns {Promise<File[]>}
   */
  ls (directory) {
    return new Promise((resolve, reject) => {
      this.connection.ls(directory, (error, list) => {
        if (error) reject(error)
        else resolve(list)
      })
    })
  }

  /**
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

  exist (filename) {
    return new Promise((resolve, reject) => {
      this.connection.exist(filename, resolve)
    })
  }

  /**
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
}
